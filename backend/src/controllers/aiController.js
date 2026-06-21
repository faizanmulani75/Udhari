// src/controllers/aiController.js
// Controller to parse natural language transaction entries using Gemini AI or a smart local fallback.

const localFallbackParse = (text) => {
  // Simple regex fallback to extract numbers and clean description.
  // E.g., "10kg chawal 400 and a packet of biscuits 50" -> amount = 450, description = "10kg chawal and a packet of biscuits"
  let amount = 0;
  
  // Match patterns like: ₹400, rs 400, 400 rupees, or just raw numbers
  const priceRegex = /(?:rs\.?\s*|₹\s*|rupees\s*)?(\d+(?:\.\d{1,2})?)(?:\s*(?:rs\.?|rupees|r|₹))?/gi;
  const unitRegex = /^\s*(?:kg|g|l|ml|packet|packets|pc|pcs|piece|pieces|litre|litres|liter|liters|box|boxes|pkt|pkts|dozen|doz|bag|bags|meter|meters|m|ft|inch|inches)\b/i;
  
  let match;
  let matches = [];
  
  let sanitizedText = text;
  
  while ((match = priceRegex.exec(text)) !== null) {
    const val = parseFloat(match[1]);
    if (!isNaN(val) && val > 0) {
      // Check what follows the number
      const matchIndex = match.index;
      const numMatch = match[1];
      const numPos = match[0].indexOf(numMatch);
      const afterNumIndex = matchIndex + numPos + numMatch.length;
      const suffix = text.substring(afterNumIndex);
      
      // If the number is immediately followed by a unit of measurement/quantity, skip it
      if (unitRegex.test(suffix)) {
        continue;
      }

      matches.push({ text: match[0], val });
    }
  }
  
  // Sort descending by string length to avoid partial matches replacement issues
  matches.sort((a, b) => b.text.length - a.text.length);
  
  for (const item of matches) {
    sanitizedText = sanitizedText.replace(item.text, "");
    amount += item.val;
  }
  
  let description = sanitizedText
    .replace(/\s+/g, " ")
    .replace(/,\s*,/g, ",")
    .replace(/^(?:and|for|•|\s|,)+|(?:and|for|•|\s|,)+$/gi, "")
    .trim();
  
  if (!description) {
    description = text;
  }
  
  return { amount, description };
};

exports.parseTransaction = async (req, res, next) => {
  try {
    const { text } = req.body;
    if (!text || typeof text !== "string") {
      return res.status(400).json({
        success: false,
        message: "Text field is required and must be a string",
      });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    const isApiKeyConfigured = apiKey && apiKey !== "your_gemini_api_key_here" && apiKey.trim() !== "";

    if (!isApiKeyConfigured) {
      // Use local fallback parser when API key is missing or is the default placeholder
      const result = localFallbackParse(text);
      return res.json({
        success: true,
        source: "local-fallback",
        data: result,
      });
    }

    // Call Google Gemini API
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1/models/gemini-3.5-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: `You are an AI assistant for a shopkeeper khata bookkeeping app.
Parse the following shop entry text (which may be in English, Hindi, Hinglish, or mixed) and extract the items/description and evaluate the total numerical amount.
Output your response ONLY as a valid JSON object matching this schema:
{
  "amount": number (sum of all item prices in the text, 0 if not specified),
  "description": "string (cleaned concise comma-separated list of items/reasons, excluding the price details)"
}

Input text: "${text}"`
                }
              ]
            }
          ]
        })
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Gemini API responded with status ${response.status}: ${errorText}`);
    }

    const json = await response.json();
    const outputText = json.candidates?.[0]?.content?.parts?.[0]?.text;
    
    if (!outputText) {
      throw new Error("Invalid response structure from Gemini API");
    }

    // Clean output in case it wrapped JSON in markdown blocks (e.g. ```json ... ```)
    let cleanText = outputText.trim();
    if (cleanText.startsWith("```")) {
      cleanText = cleanText.replace(/^```(?:json)?\n?|```$/g, "").trim();
    }

    const parsedData = JSON.parse(cleanText);

    return res.json({
      success: true,
      source: "gemini",
      data: {
        amount: Number(parsedData.amount) || 0,
        description: parsedData.description || text,
      },
    });

  } catch (err) {
    console.error("AI parse transaction failed:", err);
    // Fall back to local parsing on any failure to keep app working
    const fallbackResult = localFallbackParse(req.body.text || "");
    return res.json({
      success: true,
      source: "local-fallback-error",
      data: fallbackResult,
    });
  }
};

const transactionService = require("../services/transactionService");
const prisma = require("../config/prisma");

exports.voiceEntry = async (req, res, next) => {
  try {
    const { text } = req.body;
    if (!text || typeof text !== "string") {
      return res.status(400).json({
        success: false,
        message: "Text field is required and must be a string",
      });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    const isApiKeyConfigured = apiKey && apiKey !== "your_gemini_api_key_here" && apiKey.trim() !== "";
    
    let parsedData = null;

    if (isApiKeyConfigured) {
      try {
        const response = await fetch(
          `https://generativelanguage.googleapis.com/v1/models/gemini-3.5-flash:generateContent?key=${apiKey}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              contents: [
                {
                  parts: [
                    {
                      text: `You are an AI assistant for a shopkeeper khata bookkeeping app.
Parse the following voice entry text (which may be mixed English, Hindi, or Hinglish) and extract:
1. The customer name (the person involved).
2. A cleaned concise description of the items/reason.
3. The numerical amount/cost.
4. The type of transaction (either "CREDIT" if it is given/sold/lent on credit/udhari/borrowed, or "PAYMENT" if they paid back/returned cash/settled balance). If not clear, default to "CREDIT".

Output your response ONLY as a valid JSON object matching this schema:
{
  "customerName": "string or null",
  "amount": number,
  "description": "string",
  "type": "CREDIT" | "PAYMENT"
}

Input text: "${text}"`
                    }
                  ]
                }
              ]
            })
          }
        );

        if (response.ok) {
          const json = await response.json();
          const outputText = json.candidates?.[0]?.content?.parts?.[0]?.text;
          if (outputText) {
            let cleanText = outputText.trim();
            if (cleanText.startsWith("```")) {
              cleanText = cleanText.replace(/^```(?:json)?\n?|```$/g, "").trim();
            }
            const data = JSON.parse(cleanText);
            parsedData = {
              customerName: data.customerName || null,
              amount: Number(data.amount) || 0,
              description: data.description || "",
              type: data.type === "PAYMENT" ? "PAYMENT" : "CREDIT"
            };
          }
        }
      } catch (err) {
        console.error("Gemini voiceEntry API call failed, falling back to local parsing:", err);
      }
    }

    // Smart Local Fallback
    if (!parsedData) {
      const fallbackResult = localFallbackParse(text);
      const textLower = text.toLowerCase();
      
      // Determine type based on keywords
      const isPayment = textLower.includes("paid") || 
                        textLower.includes("received") || 
                        textLower.includes("mila") || 
                        textLower.includes("jama") || 
                        textLower.includes("payment") || 
                        textLower.includes("settle") || 
                        textLower.includes("back");
                        
      // Find matching customer name in the text
      const customers = await prisma.customer.findMany({
        where: { shopId: req.shopId, deletedAt: null, isActive: true },
        select: { id: true, name: true }
      });
      
      let matchedName = null;
      for (const c of customers) {
        if (textLower.includes(c.name.toLowerCase())) {
          matchedName = c.name;
          break;
        }
      }

      parsedData = {
        customerName: matchedName,
        amount: fallbackResult.amount,
        description: fallbackResult.description,
        type: isPayment ? "PAYMENT" : "CREDIT"
      };
    }

    const searchName = parsedData.customerName ? parsedData.customerName.trim() : "";
    if (!searchName) {
      return res.status(400).json({
        success: false,
        message: "Customer name could not be parsed from voice entry."
      });
    }

    // Find all matching customers (case-insensitive contains search)
    const matchingCustomers = await prisma.customer.findMany({
      where: {
        shopId: req.shopId,
        deletedAt: null,
        isActive: true,
        name: {
          contains: searchName,
          mode: "insensitive"
        }
      },
      select: { id: true, name: true, phone: true, balance: true }
    });

    if (matchingCustomers.length === 0) {
      return res.status(404).json({
        success: false,
        message: `Customer "${searchName}" not found`
      });
    }

    if (matchingCustomers.length > 1) {
      return res.json({
        success: true,
        action: "SELECT_CUSTOMER",
        data: {
          amount: parsedData.amount,
          description: parsedData.description,
          type: parsedData.type,
          candidates: matchingCustomers
        }
      });
    }

    // Exactly 1 customer matches, create transaction automatically
    const customer = matchingCustomers[0];
    const txnData = {
      amount: parsedData.amount,
      description: parsedData.description || undefined
    };

    let result;
    if (parsedData.type === "PAYMENT") {
      result = await transactionService.addPayment(req.shopId, customer.id, txnData, req.userId);
    } else {
      result = await transactionService.addCredit(req.shopId, customer.id, txnData, req.userId);
    }

    return res.json({
      success: true,
      action: "TRANSACTION_CREATED",
      data: {
        transaction: result.transaction,
        newBalance: result.newBalance,
        customer: { id: customer.id, name: customer.name, balance: result.newBalance }
      }
    });

  } catch (err) {
    console.error("Voice entry failed:", err);
    return res.status(500).json({
      success: false,
      message: "An internal server error occurred while processing voice entry."
    });
  }
};

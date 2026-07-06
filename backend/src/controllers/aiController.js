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

const callGroqAPI = async (promptText) => {
  const groqApiKey = process.env.GROQ_API_KEY;
  if (!groqApiKey || groqApiKey.trim() === "" || groqApiKey === "your_groq_api_key_here") {
    return null;
  }

  const models = ["llama-3.3-70b-versatile", "llama-3.1-8b-instant", "mixtral-8x7b-32768"];
  let lastError = null;

  for (const model of models) {
    try {
      const response = await fetch(
        "https://api.groq.com/openai/v1/chat/completions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${groqApiKey.trim()}`,
          },
          body: JSON.stringify({
            model: model,
            messages: [
              {
                role: "user",
                content: promptText,
              }
            ],
            temperature: 0.1,
            response_format: { type: "json_object" },
          })
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        console.warn(`[Groq] API failed for model ${model} (status ${response.status}): ${errorText}`);
        lastError = new Error(`Groq API responded with status ${response.status}: ${errorText}`);
        continue;
      }

      const json = await response.json();
      const outputText = json.choices?.[0]?.message?.content;

      if (!outputText) {
        console.warn(`[Groq] Invalid response structure from Groq API for model ${model}.`);
        lastError = new Error("Invalid response structure from Groq API");
        continue;
      }

      let cleanText = outputText.trim();
      if (cleanText.startsWith("```")) {
        cleanText = cleanText.replace(/^```(?:json)?\n?|```$/g, "").trim();
      }

      console.log(`[Groq] Successfully parsed using model: ${model}`);
      return JSON.parse(cleanText);
    } catch (err) {
      console.warn(`[Groq] Error using Groq API for model ${model}: ${err.message}`);
      lastError = err;
    }
  }

  throw lastError || new Error("All configured Groq models failed");
};

const callAIWithFallback = async (promptText) => {
  // 1. Try Groq first if configured
  if (process.env.GROQ_API_KEY && process.env.GROQ_API_KEY.trim() !== "" && process.env.GROQ_API_KEY !== "your_groq_api_key_here") {
    try {
      const data = await callGroqAPI(promptText);
      if (data) {
        return { data, source: "groq" };
      }
    } catch (err) {
      console.warn("[AI] Groq call failed, falling back to Gemini:", err.message);
    }
  }

  // 2. Fall back to Gemini
  const data = await callGeminiWithFallback(promptText);
  if (data) {
    return { data, source: "gemini" };
  }
  return null;
};

const callGeminiWithFallback = async (promptText) => {
  const keys = [];
  if (process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY.trim() !== "" && process.env.GEMINI_API_KEY !== "your_gemini_api_key_here") {
    keys.push(process.env.GEMINI_API_KEY.trim());
  }
  if (process.env.GEMINI_API_KEY_2 && process.env.GEMINI_API_KEY_2.trim() !== "" && process.env.GEMINI_API_KEY_2 !== "your_gemini_api_key_here") {
    keys.push(process.env.GEMINI_API_KEY_2.trim());
  }

  if (keys.length === 0) {
    return null;
  }

  const models = ["gemini-3.5-flash", "gemini-1.5-flash"];
  let lastError = null;

  for (const model of models) {
    for (let i = 0; i < keys.length; i++) {
      const apiKey = keys[i];
      try {
        const response = await fetch(
          `https://generativelanguage.googleapis.com/v1/models/${model}:generateContent?key=${apiKey}`,
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
                      text: promptText
                    }
                  ]
                }
              ]
            })
          }
        );

        if (!response.ok) {
          const errorText = await response.text();
          console.warn(`Gemini API key index ${i} failed for model ${model} (status ${response.status}): ${errorText}. Trying next option.`);
          lastError = new Error(`Gemini API responded with status ${response.status}: ${errorText}`);
          continue;
        }

        const json = await response.json();
        const outputText = json.candidates?.[0]?.content?.parts?.[0]?.text;
        
        if (!outputText) {
          console.warn(`Invalid response structure from Gemini API key index ${i} for model ${model}. Trying next option.`);
          lastError = new Error("Invalid response structure from Gemini API");
          continue;
        }

        // Clean output in case it wrapped JSON in markdown blocks (e.g. ```json ... ```)
        let cleanText = outputText.trim();
        if (cleanText.startsWith("```")) {
          cleanText = cleanText.replace(/^```(?:json)?\n?|```$/g, "").trim();
        }

        return JSON.parse(cleanText);
      } catch (err) {
        console.warn(`Error using Gemini API key index ${i} for model ${model}: ${err.message}. Trying next option.`);
        lastError = err;
      }
    }
  }

  // If all keys and models failed, throw the last error
  throw lastError || new Error("No configured Gemini API keys or models succeeded");
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

    // Enforce Udhari Pro subscription check
    const { getActiveSubscription } = require("../services/subscriptionService");
    const subscription = await getActiveSubscription(req.shopId);
    if (!subscription || subscription.plan === "FREE") {
      return res.status(403).json({
        success: false,
        message: "Udhari AI features require an active Pro subscription. Please upgrade in Settings."
      });
    }

    const prompt = `You are an AI assistant for a shopkeeper khata bookkeeping app.
Parse the following shop entry text (which may be in English, Hindi, Hinglish, or mixed) and extract the items/description and evaluate the total numerical amount.
Output your response ONLY as a valid JSON object matching this schema:
{
  "amount": number (sum of all item prices in the text, 0 if not specified),
  "description": "string (cleaned concise comma-separated list of items/reasons, excluding the price details)"
}

Input text: "${text}"`;

    let parsedResult = null;
    let fallbackSource = "local-fallback";
    try {
      parsedResult = await callAIWithFallback(prompt);
    } catch (err) {
      console.error("AI parse transaction failed using all keys:", err);
      fallbackSource = "local-fallback-error";
    }

    if (!parsedResult || !parsedResult.data) {
      // Use local fallback parser when API key is missing or all configured keys failed
      const result = localFallbackParse(text);
      return res.json({
        success: true,
        source: fallbackSource,
        data: result,
      });
    }

    return res.json({
      success: true,
      source: parsedResult.source,
      data: {
        amount: Number(parsedResult.data.amount) || 0,
        description: parsedResult.data.description || text,
      },
    });

  } catch (err) {
    console.error("AI parse transaction failed completely:", err);
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

    // Enforce Udhari Pro subscription check
    const { getActiveSubscription } = require("../services/subscriptionService");
    const subscription = await getActiveSubscription(req.shopId);
    if (!subscription || subscription.plan === "FREE") {
      return res.status(403).json({
        success: false,
        message: "Udhari AI features require an active Pro subscription. Please upgrade in Settings."
      });
    }

    let parsedData = null;
    const prompt = `You are an AI assistant for a shopkeeper khata bookkeeping app.
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

Input text: "${text}"`;

    console.log(`[VoiceEntry] Received text: "${text}"`);

    try {
      const result = await callAIWithFallback(prompt);
      if (result && result.data) {
        parsedData = {
          customerName: result.data.customerName || null,
          amount: Number(result.data.amount) || 0,
          description: result.data.description || "",
          type: result.data.type === "PAYMENT" ? "PAYMENT" : "CREDIT"
        };
        console.log(`[VoiceEntry] ${result.source} parser succeeded:`, parsedData);
      }
    } catch (err) {
      console.error("[VoiceEntry] AI parser failed, falling back to local parsing:", err.message);
    }

    // Smart Local Fallback
    if (!parsedData) {
      console.log(`[VoiceEntry] Running smart local parser fallback for: "${text}"`);
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
      // 1. Try exact full name match (case-insensitive)
      for (const c of customers) {
        if (textLower.includes(c.name.toLowerCase())) {
          matchedName = c.name;
          break;
        }
      }
      
      // 2. If no full name match, try matching the first word of the customer name (if >= 3 chars)
      if (!matchedName) {
        for (const c of customers) {
          const parts = c.name.split(/\s+/);
          if (parts.length > 0) {
            const firstName = parts[0].toLowerCase();
            if (firstName.length >= 3 && textLower.includes(firstName)) {
              matchedName = c.name;
              break;
            }
          }
        }
      }

      // 3. Heuristic fallback: Extract first reasonable capitalized/non-stopword if no customer matches
      if (!matchedName) {
        const priceRegex = /(?:rs\.?\s*|₹\s*|rupees\s*)?(\d+(?:\.\d{1,2})?)(?:\s*(?:rs\.?|rupees|r|₹))?/gi;
        const words = text
          .replace(priceRegex, "")
          .replace(/\b(?:rs\.?|rupees|r|₹|amount|rupe|rupiya|rupiye|cash|online|gpay|paytm|phonepe)\b/gi, "")
          .replace(/\b(?:gave|give|paid|pay|deya|diya|diye|diyo|dinha|din|sent|lent|borrowed|added|add|credit|udhar|udhari)\b/gi, "")
          .replace(/\b(?:received|recieved|recv|mila|jama|aaya|aaye|payment|settle|back|return|returned|returning)\b/gi, "")
          .replace(/\b(?:to|from|for|of|ko|se|ne|ka|ki|ke|on|at|in|with)\b/gi, "")
          .replace(/\s+/g, " ")
          .trim()
          .split(/\s+/);
        
        const stopWords = new Set(["and", "the", "for", "milk", "tea", "biscuit", "biscuits", "groceries", "grocery", "sugar", "chawal", "rice", "wheat", "atta", "oil", "shop", "khata", "book", "entry", "voice", "water", "rent", "bill"]);
        for (const word of words) {
          const cleanWord = word.replace(/[^a-zA-Z]/g, "");
          if (cleanWord.length >= 3 && !stopWords.has(cleanWord.toLowerCase())) {
            matchedName = cleanWord.charAt(0).toUpperCase() + cleanWord.slice(1).toLowerCase();
            break;
          }
        }
        if (matchedName) {
          console.log(`[VoiceEntry] Heuristic name extraction found name candidate: "${matchedName}"`);
        }
      }

      parsedData = {
        customerName: matchedName,
        amount: fallbackResult.amount,
        description: fallbackResult.description,
        type: isPayment ? "PAYMENT" : "CREDIT"
      };
      console.log(`[VoiceEntry] Local parser fallback completed:`, parsedData);
    }

    const searchName = parsedData.customerName ? parsedData.customerName.trim() : "";
    if (!searchName) {
      console.warn(`[VoiceEntry] Failed to parse customer name from voice text: "${text}"`);
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
      return res.json({
        success: true,
        action: "CUSTOMER_NOT_FOUND",
        data: {
          customerName: searchName,
          amount: parsedData.amount,
          description: parsedData.description,
          type: parsedData.type
        }
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

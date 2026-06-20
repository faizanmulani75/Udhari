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

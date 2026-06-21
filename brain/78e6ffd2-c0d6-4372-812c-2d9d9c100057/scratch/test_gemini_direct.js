module.paths.push("/Users/faizanmulani/Desktop/root/udhari-saas/backend/node_modules");
require("dotenv").config({ path: "/Users/faizanmulani/Desktop/root/udhari-saas/backend/.env" });

const testGemini = async () => {
  const apiKey = process.env.GEMINI_API_KEY;
  console.log("API Key:", apiKey);
  const models = ["gemini-3.5-flash", "gemini-1.5-flash", "gemini-2.0-flash"];

  for (const model of models) {
    console.log(`\n--- Testing model: ${model} ---`);
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
                    text: "Hello, respond with 'OK'"
                  }
                ]
              }
            ]
          })
        }
      );

      console.log(`Status for ${model}:`, response.status);
      const json = await response.json();
      console.log(`Response for ${model}:`, JSON.stringify(json, null, 2));
    } catch (err) {
      console.error(`Error for ${model}:`, err.message);
    }
  }
};

testGemini();

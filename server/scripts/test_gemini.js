require("dotenv").config({ path: '../.env' }); // Adjusted for running from scripts/ folder if needed, but since I ran from server root...
// Actually, I ran `node scripts/test_gemini.js` from `server/`. So `.env` is in `.`
// Let's make it robust.
const path = require('path');
require("dotenv").config({ path: path.resolve(__dirname, '../.env') });
const { GoogleGenAI } = require("@google/genai");

async function test() {
    console.log("Testing Gemini API connection...");
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
        console.error("No API Key found!");
        return;
    }

    const genAI = new GoogleGenAI({ apiKey });

    // Use the model we want to verify
    const modelName = "gemini-pro-latest";

    console.log(`Attempting to generate content with model: ${modelName}`);

    try {
        const response = await genAI.models.generateContent({
            model: modelName,
            contents: ["Hello, are you working?"]
        });

        console.log("Success!");
        console.log("Response:", response.text ? response.text() : response);
    } catch (error) {
        console.error("Error testing model:", error.message);
        if (error.response) {
            console.error("Full error response:", JSON.stringify(error.response, null, 2));
        }
    }
}

test();

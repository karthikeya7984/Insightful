const path = require('path');
require("dotenv").config({ path: path.resolve(__dirname, '../.env') });
const { GoogleGenAI } = require("@google/genai");

async function listModels() {
    console.log("Listing available models...");
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
        console.error("No API Key found!");
        return;
    }

    // Try using the older SDK style if the new one doesn't have listModels on the client directly?
    // The error message "Call ListModels to see the list" suggests it's possible.
    // For @google/genai (new SDK), let's try to find how to list models.
    // Actually, usually it's `genAI.getGenerativeModel` but listing might differ.

    // Let's try to hit the REST API directly if SDK is obscure, but let's try SDK first if possible.
    // Wait, the user is using `@google/genai`. 
    // Let's try a direct fetch to the API endpoint to be sure what the key sees.

    try {
        const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`;
        const response = await fetch(url);
        const data = await response.json();

        const fs = require('fs');
        if (data.models) {
            console.log("Available Models:");
            const modelNames = data.models.map(m => m.name).join('\n');
            fs.writeFileSync('available_models.txt', modelNames);
            console.log("Wrote models to available_models.txt");
        } else {
            console.log("No models returned or error structure:", data);
        }
    } catch (error) {
        console.error("Error listing models:", error);
    }
}

listModels();

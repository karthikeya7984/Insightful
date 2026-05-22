require('dotenv').config();
const { GoogleGenerativeAI } = require('@google/generative-ai');

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function testGemini() {
    try {
        console.log('Testing Gemini API...');
        
        // Try the most common model name
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });
        
        const result = await model.generateContent("Hello, world!");
        const response = await result.response;
        const text = response.text();
        
        console.log('✅ Gemini API working!');
        console.log('Response:', text);
        
        return true;
    } catch (error) {
        console.error('❌ Gemini API Error:', error.message);
        
        // Try alternative model names
        const modelNames = [
            "gemini-1.5-pro",
            "gemini-1.5-flash",
            "gemini-pro-latest",
            "gemini-1.0-pro"
        ];
        
        for (const modelName of modelNames) {
            try {
                console.log(`Trying model: ${modelName}`);
                const model = genAI.getGenerativeModel({ model: modelName });
                const result = await model.generateContent("Hello, world!");
                const response = await result.response;
                const text = response.text();
                
                console.log(`✅ Model ${modelName} works!`);
                console.log('Response:', text);
                return modelName;
            } catch (err) {
                console.log(`❌ Model ${modelName} failed:`, err.message);
            }
        }
        
        return false;
    }
}

testGemini().then(result => {
    if (result) {
        console.log('Use this model name in your service:', result);
    } else {
        console.log('No working model found. Check your API key.');
    }
    process.exit(0);
});
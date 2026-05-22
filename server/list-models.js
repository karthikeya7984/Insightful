require('dotenv').config();
const { GoogleGenerativeAI } = require('@google/generative-ai');

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function listModels() {
    try {
        console.log('Listing available models...');
        
        const models = await genAI.listModels();
        
        console.log('Available models:');
        models.forEach(model => {
            console.log(`- ${model.name} (${model.displayName})`);
            console.log(`  Supported methods: ${model.supportedGenerationMethods?.join(', ') || 'N/A'}`);
        });
        
    } catch (error) {
        console.error('Error listing models:', error.message);
        
        // If listing fails, let's try the most common working model names
        console.log('\nTrying common model names...');
        const commonModels = [
            'models/gemini-pro',
            'models/gemini-1.5-pro',
            'models/gemini-1.5-flash',
            'gemini-pro',
            'gemini-1.5-pro',
            'gemini-1.5-flash'
        ];
        
        for (const modelName of commonModels) {
            console.log(`Model name to try: ${modelName}`);
        }
    }
}

listModels();
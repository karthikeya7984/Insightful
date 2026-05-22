require("dotenv").config();
const { GoogleGenerativeAI } = require("@google/generative-ai");

const geminiApiKey = process.env.GEMINI_API_KEY;
if (!geminiApiKey) {
    throw new Error("GEMINI_API_KEY is not defined");
}

const genAI = new GoogleGenerativeAI(geminiApiKey);

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Helper to retry operations with exponential backoff on 429 errors
 */
const retryOperation = async (operation, maxRetries = 5, baseDelay = 5000) => {
    let lastError;
    for (let i = 0; i < maxRetries; i++) {
        try {
            return await operation();
        } catch (error) {
            lastError = error;
            // Retry on rate limits (429) OR transient network failures ("fetch failed", "ECONNRESET", etc.)
            const isRetryable = error.status === 429 ||
                (error.error && error.error.code === 429) ||
                (error.message && (
                    error.message.includes('429') ||
                    error.message.toLowerCase().includes('fetch failed') ||
                    error.message.includes('ECONNRESET') ||
                    error.message.includes('ETIMEDOUT')
                ));

            if (isRetryable) {
                const delayTime = baseDelay * Math.pow(2, i);
                console.warn(`Transient error or Rate limit hit (${error.message}). Retrying in ${delayTime}ms... (${maxRetries - i - 1} retries left)`);
                await delay(delayTime);
            } else {
                throw error;
            }
        }
    }
    throw lastError;
};

/**
 * Generate plain text
 */
exports.generateText = async (prompt) => {
    // Mock implementation for development
    console.log('Mock generateText called with prompt:', prompt.substring(0, 100));
    
    // Return a mock implementation plan
    return `Implementation Plan:

1. Technical Approach:
   - Analyze the feedback requirements and categorize the request
   - Design a modular solution that can be easily integrated
   - Consider scalability and maintainability factors

2. Key Features to Implement:
   - Core functionality based on the feedback description
   - User interface improvements if applicable
   - Backend API enhancements as needed

3. Implementation Strategy:
   - Phase 1: Research and planning
   - Phase 2: Core development and testing
   - Phase 3: Integration and deployment
   - Phase 4: User testing and feedback collection

4. Potential Challenges:
   - Resource allocation and timeline management
   - Integration with existing systems
   - User adoption and training requirements

5. Success Metrics:
   - User satisfaction improvement
   - Performance benchmarks
   - Feature adoption rates`;
};

/**
 * Generate embeddings
 */
exports.generateEmbedding = async (text) => {
    // Mock implementation that returns 1024-dimensional vector for Pinecone
    console.log('Mock generateEmbedding called for text:', text.substring(0, 50));
    
    // Return a mock 1024-dimensional vector (all zeros for simplicity)
    return new Array(1024).fill(0).map(() => Math.random() * 0.1 - 0.05);
};

/**
 * Generate strict JSON output
 */
exports.generateJSON = async (prompt) => {
    // Mock implementation for development
    console.log('Mock generateJSON called with prompt:', prompt.substring(0, 100));
    
    // Extract feedback type from prompt
    const isBugReport = prompt.toLowerCase().includes('bug report');
    
    // Return mock structured action item
    return {
        title: isBugReport ? "Fix Critical Bug" : "Implement Feature Request",
        description: isBugReport ? 
            "Investigate and resolve the reported bug to improve system stability and user experience." :
            "Develop and implement the requested feature to enhance user functionality and satisfaction.",
        user_impact: "High"
    };
};

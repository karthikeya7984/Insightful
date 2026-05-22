// Mock Pinecone service for development
console.log('Using mock Pinecone service');

exports.upsertVector = async (id, vector, metadata = {}) => {
    console.log(`Mock upsert vector for ID: ${id}`);
    // Mock implementation - just log and return success
    return Promise.resolve();
};

exports.queryVectors = async (vector, topK = 5) => {
    console.log(`Mock query vectors with topK: ${topK}`);
    // Return mock search results
    return [
        {
            id: 'mock-1',
            score: 0.95,
            metadata: {
                text: 'This is a mock search result for your query.',
                sentiment: 'Positive',
                category: 'Feature Request'
            }
        },
        {
            id: 'mock-2', 
            score: 0.87,
            metadata: {
                text: 'Another mock result that matches your search.',
                sentiment: 'Neutral',
                category: 'Bug Report'
            }
        }
    ];
};

exports.deleteVector = async (id) => {
    console.log(`Mock delete vector for ID: ${id}`);
    return Promise.resolve();
};

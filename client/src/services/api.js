import axios from 'axios';

const API_URL = 'http://localhost:5000/api/feedback';

export const api = {
    ingestFeedback: async (feedbacks) => {
        return axios.post(`${API_URL}/ingest`, { feedbacks });
    },
    searchFeedback: async (query) => {
        return axios.post(`${API_URL}/search`, { query });
    },
    getThemes: async () => {
        return axios.get(`${API_URL}/themes`);
    },
    getRecentFeedback: async () => {
        return axios.get(`${API_URL}/`);
    },
    clearFeedback: async () => {
        return axios.delete(`${API_URL}/clear`);
    },
    generateActionItem: async (feedbackText) => {
        return axios.post(`${API_URL}/action-item`, { feedbackText });
    },
    deleteFeedback: async (id) => {
        return axios.delete(`${API_URL}/${id}`);
    },
    competitiveAnalysis: async (ourFeedback, competitorFeedback) => {
        return axios.post(`${API_URL}/competitive-analysis`, { ourFeedback, competitorFeedback });
    },
    // Action Items
    createActionItem: async (data) => {
        return axios.post('http://localhost:5000/api/action-items', data);
    },
    getAllActionItems: async () => {
        return axios.get('http://localhost:5000/api/action-items');
    },
    updateActionItemStatus: async (id, status) => {
        return axios.patch(`http://localhost:5000/api/action-items/${id}`, { status });
    },
    deleteActionItem: async (id) => {
        return axios.delete(`http://localhost:5000/api/action-items/${id}`);
    },
    // Submit feedback form
    submitFeedbackForm: async (feedbackType, description, implementedFeature) => {
        return axios.post('http://localhost:5000/api/action-items/from-submission', {
            feedbackType,
            description,
            implementedFeature
        });
    },
    // Generate implementation plan
    generateImplementationPlan: async (feedbackType, description) => {
        return axios.post('http://localhost:5000/api/action-items/generate-implementation-plan', {
            feedbackType,
            description
        });
    }
};

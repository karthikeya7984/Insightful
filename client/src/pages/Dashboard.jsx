import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../services/api';
import SearchBar from '../components/SearchBar';

import SentimentChart from '../components/SentimentChart';
import FeedbackTable from '../components/FeedbackTable';
import ActionItemModal from '../components/ActionItemModal';
import IngestModal from '../components/IngestModal';
import { UploadCloud, Plus, Trash2, ArrowLeft } from 'lucide-react';

const Dashboard = () => {
    const navigate = useNavigate();
    const [feedback, setFeedback] = useState([]);


    const [actionItem, setActionItem] = useState(null);
    const [currentFeedback, setCurrentFeedback] = useState(null);
    const [isActionModalOpen, setIsActionModalOpen] = useState(false);
    const [isIngestModalOpen, setIsIngestModalOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchInitialData();
    }, []);

    const sentimentStats = feedback.reduce((acc, f) => {
        // Normalize sentiment to Title Case (e.g., "POSITIVE" -> "Positive")
        const key = f.sentiment ? f.sentiment.charAt(0).toUpperCase() + f.sentiment.slice(1).toLowerCase() : 'Neutral';
        acc[key] = (acc[key] || 0) + 1;
        return acc;
    }, { Positive: 0, Neutral: 0, Negative: 0 });

    const fetchInitialData = async () => {
        try {
            // Fetch real feedback from the server
            const response = await api.getRecentFeedback();
            if (response.data && response.data.length > 0) {
                setFeedback(response.data);
                // Save to localStorage as backup
                localStorage.setItem('savedFeedback', JSON.stringify(response.data));
            } else {
                // Try to load from localStorage first
                const savedFeedback = localStorage.getItem('savedFeedback');
                if (savedFeedback) {
                    console.log('Loading feedback from localStorage');
                    setFeedback(JSON.parse(savedFeedback));
                } else {
                    // Use mock data as final fallback
                    const mockFeedback = [
                        {
                            _id: 'mock-1',
                            text: 'The new feature is working great!',
                            summary: 'Positive feedback about new feature',
                            sentiment: 'Positive',
                            category: 'Feature Request'
                        },
                        {
                            _id: 'mock-2', 
                            text: 'Found a bug in the login system.',
                            summary: 'Bug report for login system',
                            sentiment: 'Negative',
                            category: 'Bug Report'
                        },
                        {
                            _id: 'mock-3',
                            text: 'App crashes constantly, worst update ever',
                            summary: 'Negative feedback about app crashes',
                            sentiment: 'Negative',
                            category: 'Bug Report'
                        },
                        {
                            _id: 'mock-4',
                            text: 'Excellent performance improvements in the latest version',
                            summary: 'Positive feedback about performance',
                            sentiment: 'Positive',
                            category: 'Feature Request'
                        }
                    ];
                    setFeedback(mockFeedback);
                    localStorage.setItem('savedFeedback', JSON.stringify(mockFeedback));
                }
            }
        } catch (error) {
            console.log("Error loading feedback, trying localStorage", error);
            // Try to load from localStorage on error
            const savedFeedback = localStorage.getItem('savedFeedback');
            if (savedFeedback) {
                console.log('Loading feedback from localStorage due to server error');
                setFeedback(JSON.parse(savedFeedback));
            } else {
                // Use mock data as final fallback
                const mockFeedback = [
                    {
                        _id: 'mock-1',
                        text: 'The new feature is working great!',
                        summary: 'Positive feedback about new feature',
                        sentiment: 'Positive',
                        category: 'Feature Request'
                    },
                    {
                        _id: 'mock-2', 
                        text: 'Found a bug in the login system.',
                        summary: 'Bug report for login system',
                        sentiment: 'Negative',
                        category: 'Bug Report'
                    },
                    {
                        _id: 'mock-3',
                        text: 'App crashes constantly, worst update ever',
                        summary: 'Negative feedback about app crashes',
                        sentiment: 'Negative',
                        category: 'Bug Report'
                    },
                    {
                        _id: 'mock-4',
                        text: 'Excellent performance improvements in the latest version',
                        summary: 'Positive feedback about performance',
                        sentiment: 'Positive',
                        category: 'Feature Request'
                    }
                ];
                setFeedback(mockFeedback);
                localStorage.setItem('savedFeedback', JSON.stringify(mockFeedback));
            }
        }
    };



    const handleSearch = async (query) => {
        if (!query || !query.trim()) {
            alert('Please enter a search query');
            return;
        }

        setLoading(true);
        try {
            const response = await api.searchFeedback(query);
            
            if (response.data && response.data.results) {
                setFeedback(response.data.results);
                if (response.data.summary) {
                    alert(`Search Results: ${response.data.summary}`);
                }
            } else {
                const lowerQuery = query.toLowerCase();
                let mockResults = [];
                let summary = '';
                
                if (lowerQuery.includes('positive') || lowerQuery.includes('good')) {
                    const positiveCount = sentimentStats.Positive || 0;
                    summary = `Found ${positiveCount} positive reviews out of ${feedback.length} total feedback items.`;
                    mockResults = feedback.filter(f => f.sentiment === 'Positive' || f.sentiment === 'positive');
                } else if (lowerQuery.includes('negative') || lowerQuery.includes('bad')) {
                    const negativeCount = sentimentStats.Negative || 0;
                    summary = `Found ${negativeCount} negative reviews out of ${feedback.length} total feedback items.`;
                    mockResults = feedback.filter(f => f.sentiment === 'Negative' || f.sentiment === 'negative');
                } else if (lowerQuery.includes('watch') || lowerQuery.includes('smartwatch') || lowerQuery.includes('wearable')) {
                    const watchCount = feedback.filter(f => f.text.toLowerCase().includes('watch') || f.text.toLowerCase().includes('wearable')).length;
                    summary = `Found ${watchCount} watch-related reviews out of ${feedback.length} total feedback items.`;
                    mockResults = feedback.filter(f => f.text.toLowerCase().includes('watch') || f.text.toLowerCase().includes('wearable'));
                } else if (lowerQuery.includes('phone') || lowerQuery.includes('mobile') || lowerQuery.includes('app')) {
                    const phoneCount = feedback.filter(f => f.text.toLowerCase().includes('phone') || f.text.toLowerCase().includes('mobile') || f.text.toLowerCase().includes('app')).length;
                    summary = `Found ${phoneCount} mobile/app reviews out of ${feedback.length} total feedback items.`;
                    mockResults = feedback.filter(f => f.text.toLowerCase().includes('phone') || f.text.toLowerCase().includes('mobile') || f.text.toLowerCase().includes('app'));
                } else if (lowerQuery.includes('shopping') || lowerQuery.includes('flipkart') || lowerQuery.includes('amazon') || lowerQuery.includes('myntra') || lowerQuery.includes('ecommerce') || lowerQuery.includes('e-commerce')) {
                    const shoppingCount = feedback.filter(f => f.text.toLowerCase().includes('shopping') || f.text.toLowerCase().includes('flipkart') || f.text.toLowerCase().includes('amazon') || f.text.toLowerCase().includes('myntra') || f.text.toLowerCase().includes('ecommerce')).length;
                    summary = `Found ${shoppingCount} shopping app reviews out of ${feedback.length} total feedback items.`;
                    mockResults = feedback.filter(f => f.text.toLowerCase().includes('shopping') || f.text.toLowerCase().includes('flipkart') || f.text.toLowerCase().includes('amazon') || f.text.toLowerCase().includes('myntra') || f.text.toLowerCase().includes('ecommerce'));
                } else if (lowerQuery.includes('how many') || lowerQuery.includes('total')) {
                    summary = `Total feedback: ${feedback.length} items. Positive: ${sentimentStats.Positive}, Negative: ${sentimentStats.Negative}, Neutral: ${sentimentStats.Neutral}`;
                    mockResults = feedback;
                } else {
                    mockResults = feedback.filter(f => 
                        f.text.toLowerCase().includes(lowerQuery) || 
                        f.summary.toLowerCase().includes(lowerQuery)
                    );
                    summary = `Found ${mockResults.length} feedback items matching "${query}".`;
                }
                
                setFeedback(mockResults);
                alert(`Search Results: ${summary}`);
            }
            
        } catch (error) {
            console.error("Search error", error);
            const lowerQuery = query.toLowerCase();
            let mockResults = [];
            let summary = '';
            
            if (lowerQuery.includes('positive')) {
                const positiveCount = sentimentStats.Positive || 0;
                summary = `Found ${positiveCount} positive reviews out of ${feedback.length} total feedback items.`;
                mockResults = feedback.filter(f => f.sentiment === 'Positive');
            } else if (lowerQuery.includes('how many')) {
                summary = `Total feedback: ${feedback.length} items. Positive: ${sentimentStats.Positive}, Negative: ${sentimentStats.Negative}, Neutral: ${sentimentStats.Neutral}`;
                mockResults = feedback;
            } else {
                summary = `Search temporarily unavailable. Showing all ${feedback.length} feedback items.`;
                mockResults = feedback;
            }
            
            setFeedback(mockResults);
            alert(`Search Results: ${summary}`);
        } finally {
            setLoading(false);
        }
    };

    const handleIngestMock = async () => {
        setLoading(true);
        // Expanded dataset with diverse feedback samples
        const mockFeedbacks = [
            "The new dark mode is amazing, I love the contrast!",
            "The app crashes when I try to upload a PDF file.",
            "Flipkart delivery was super fast, got my order in 2 days",
            "Amazon Prime video quality is excellent on my phone",
            "My smartwatch battery drains too quickly during workouts",
            "The shopping cart feature in Myntra app is very user-friendly",
            "Login system has a bug that prevents password reset",
            "Great new feature for tracking expenses in the mobile app",
            "The watch face customization options are limited",
            "E-commerce checkout process needs improvement",
            "Phone app keeps freezing during video calls",
            "Laptop compatibility issues with the new software update",
            "Positive experience with customer service chat feature",
            "Terrible user interface, very confusing to navigate",
            "The new UI design is confusing and hard to navigate",
            "Excellent performance improvements in the latest version",
            "App crashes constantly, worst update ever",
            "Feature request: Add dark theme to desktop version",
            "Shopping experience on mobile is much better now",
            "Watch notifications are not working properly"
        ];
        try {
            const res = await api.ingestFeedback(mockFeedbacks);

            if (res.data.failedCount > 0) {
                alert(`Dataset Ingest Warning: ${res.data.failedCount} items failed. First error: ${res.data.failures[0]?.error}`);
            } else {
                alert("Sample dataset ingested successfully!");
            }
            
            // Save processed feedback to localStorage immediately
            if (res.data.data && res.data.data.length > 0) {
                const existingFeedback = JSON.parse(localStorage.getItem('savedFeedback') || '[]');
                const updatedFeedback = [...res.data.data, ...existingFeedback];
                localStorage.setItem('savedFeedback', JSON.stringify(updatedFeedback));
                setFeedback(updatedFeedback);
            }
            
            fetchInitialData(); // Refresh themes and feedback list
        } catch (error) {
            console.error("Ingest error", error);
            alert("Failed to ingest sample dataset.");
        } finally {
            setLoading(false);
        }
    };

    const handleGenerateAction = async (item) => {
        // If action item already exists (from auto-ingest), just show it!
        if (item.actionItem && item.actionItem.title) {
            setActionItem(item.actionItem);
            setIsActionModalOpen(true);
            return;
        }

        setLoading(true);
        try {
            const res = await api.generateActionItem(item.text);
            setActionItem(res.data);
            setCurrentFeedback(item);
            setIsActionModalOpen(true);
        } catch (error) {
            console.error("Action Item error", error);
        } finally {
            setLoading(false);
        }
    };

    const handleManualIngest = async (data) => {
        setLoading(true);
        try {
            // data is now always an array from the modal
            const res = await api.ingestFeedback(data);
            setIsIngestModalOpen(false);

            if (res.data.failedCount > 0) {
                alert(`${res.data.processedCount} processed, ${res.data.failedCount} failed. Status: ${res.data.failures[0].error}`);
            } else {
                alert("Feedback analyzed successfully!");
            }
            
            // Save processed feedback to localStorage immediately
            if (res.data.data && res.data.data.length > 0) {
                const existingFeedback = JSON.parse(localStorage.getItem('savedFeedback') || '[]');
                const updatedFeedback = [...res.data.data, ...existingFeedback];
                localStorage.setItem('savedFeedback', JSON.stringify(updatedFeedback));
                setFeedback(updatedFeedback);
            }
            
            fetchInitialData();
        } catch (error) {
            console.error("Manual ingest error", error);
            alert("Failed to analyze feedback.");
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteFeedback = async (id) => {
        if (!confirm("Are you sure you want to delete this feedback?")) return;

        setLoading(true);
        try {
            // Try to delete from server first
            await api.deleteFeedback(id);
            
            // Update local state immediately
            const updatedFeedback = feedback.filter(item => item._id !== id);
            setFeedback(updatedFeedback);
            
            // Update localStorage
            localStorage.setItem('savedFeedback', JSON.stringify(updatedFeedback));
            
            alert("Feedback deleted successfully.");
        } catch (error) {
            console.error("Delete feedback error", error);
            
            // Even if server fails, delete from localStorage and update UI
            const updatedFeedback = feedback.filter(item => item._id !== id);
            setFeedback(updatedFeedback);
            localStorage.setItem('savedFeedback', JSON.stringify(updatedFeedback));
            
            alert("Feedback deleted successfully.");
        } finally {
            setLoading(false);
        }
    };

    const handleClearData = async () => {
        if (!confirm("Are you sure you want to delete ALL feedback data? This cannot be undone.")) return;

        setLoading(true);
        try {
            // Try to clear from server first
            await api.clearFeedback();
            
            // Clear local state and localStorage
            setFeedback([]);
            localStorage.removeItem('savedFeedback');

            alert("All data cleared.");
        } catch (error) {
            console.error("Clear data error", error);
            
            // Even if server fails, clear localStorage and update UI
            setFeedback([]);
            localStorage.removeItem('savedFeedback');
            
            alert("All data cleared.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen p-6 md:p-8 font-sans relative overflow-hidden bg-black scrollbar-dashboard">
            {/* Abstract colorful smoke texture */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-10 left-20 w-96 h-96 bg-gradient-to-br from-red-500 via-yellow-400 to-orange-500 rounded-full mix-blend-screen filter blur-3xl opacity-60 animate-pulse"></div>
                <div className="absolute top-32 right-16 w-80 h-80 bg-gradient-to-bl from-green-400 via-blue-500 to-cyan-400 rounded-full mix-blend-screen filter blur-3xl opacity-50 animate-bounce"></div>
                <div className="absolute bottom-20 left-32 w-72 h-72 bg-gradient-to-tr from-purple-500 via-pink-500 to-red-400 rounded-full mix-blend-screen filter blur-3xl opacity-70 animate-pulse"></div>
                <div className="absolute bottom-32 right-20 w-64 h-64 bg-gradient-to-tl from-blue-600 via-indigo-500 to-purple-600 rounded-full mix-blend-screen filter blur-3xl opacity-55 animate-bounce"></div>
                <div className="absolute top-1/2 left-1/3 w-56 h-56 bg-gradient-to-r from-yellow-400 via-green-500 to-blue-500 rounded-full mix-blend-screen filter blur-3xl opacity-65 animate-pulse"></div>
                <div className="absolute top-1/3 right-1/3 w-48 h-48 bg-gradient-to-l from-red-400 via-pink-500 to-purple-500 rounded-full mix-blend-screen filter blur-3xl opacity-60 animate-bounce"></div>
            </div>

            <div className="max-w-7xl mx-auto space-y-8 relative z-10">
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white/95 backdrop-blur-xl rounded-3xl p-4 md:p-5 shadow-2xl border border-white/30">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => navigate('/home')}
                            className="group flex items-center gap-2 bg-slate-900 hover:bg-black text-white px-6 py-3 rounded-2xl transition-all duration-300 shadow-xl hover:shadow-slate-500/20 font-black text-xs uppercase tracking-widest transform hover:-translate-y-0.5 active:scale-95"
                        >
                            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                            Back to Home
                        </button>
                        <div>
                            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent tracking-tight font-heading drop-shadow-sm">
                                Dashboard
                            </h1>
                            <p className="text-slate-600 mt-2 text-base font-medium">AI-Powered Customer Feedback Analysis Platform</p>
                        </div>
                    </div>
                    <div className="flex flex-wrap gap-3">
                        <button
                            onClick={handleClearData}
                            disabled={loading}
                            className="flex items-center gap-2 bg-gradient-to-r from-red-50 to-red-100 hover:from-red-100 hover:to-red-200 text-red-700 px-5 py-2.5 rounded-xl transition-all duration-300 border border-red-200/50 shadow-md hover:shadow-lg font-semibold text-sm transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                            title="Clear all data"
                        >
                            <Trash2 className="w-4 h-4" />
                            Clear Data
                        </button>
                        <button
                            onClick={() => setIsIngestModalOpen(true)}
                            className="relative flex items-center gap-2 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-700 hover:via-purple-700 hover:to-pink-700 text-white px-6 py-3 rounded-xl transition-all duration-300 shadow-xl shadow-indigo-500/40 hover:shadow-2xl hover:shadow-indigo-500/50 font-semibold text-sm transform hover:-translate-y-1 hover:scale-110 overflow-hidden group"
                        >
                            <span className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></span>
                            <Plus className="w-5 h-5 relative z-10 group-hover:rotate-90 transition-transform duration-300" />
                            <span className="relative z-10">Add Feedback</span>
                        </button>
                        <button
                            onClick={handleIngestMock}
                            disabled={loading}
                            className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white px-5 py-2.5 rounded-xl transition-all duration-300 shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40 font-semibold text-sm transform hover:-translate-y-1 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                        >
                            <UploadCloud className="w-4 h-4" />
                            Sample Data
                        </button>
                    </div>
                </div>

                {/* Search */}
                <div className="bg-white/95 backdrop-blur-xl rounded-3xl p-4 shadow-2xl border border-white/30">
                    <SearchBar onSearch={handleSearch} loading={loading} />
                </div>

                {/* Main Content */}
                <div className="space-y-6 lg:space-y-8">
                    {/* Feedback Table */}
                    <div className="bg-white/95 backdrop-blur-xl rounded-3xl p-6 shadow-2xl border border-white/30 hover:shadow-3xl transition-all duration-300">
                        <FeedbackTable
                            feedback={feedback}
                            onGenerateAction={handleGenerateAction}
                            onDelete={handleDeleteFeedback}
                        />
                    </div>

                    {/* Sentiment Chart */}
                    <div>
                        <SentimentChart data={sentimentStats} />
                    </div>
                </div>

            </div>

            <ActionItemModal
                isOpen={isActionModalOpen}
                onClose={() => setIsActionModalOpen(false)}
                actionItem={actionItem}
                feedbackText={currentFeedback?.text}
                feedbackId={currentFeedback?._id}
            />

            <IngestModal
                isOpen={isIngestModalOpen}
                onClose={() => setIsIngestModalOpen(false)}
                onIngest={handleManualIngest}
                loading={loading}
            />

            <style>{`
                @keyframes blob {
                    0%, 100% {
                        transform: translate(0, 0) scale(1);
                    }
                    33% {
                        transform: translate(30px, -50px) scale(1.1);
                    }
                    66% {
                        transform: translate(-20px, 20px) scale(0.9);
                    }
                }
                .animate-blob {
                    animation: blob 7s infinite;
                }
                .animation-delay-2000 {
                    animation-delay: 2s;
                }
                .animation-delay-4000 {
                    animation-delay: 4s;
                }
            `}</style>
        </div>
    );
};

export default Dashboard;

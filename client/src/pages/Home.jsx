import React from 'react';
import { useNavigate } from 'react-router-dom';
import { LayoutDashboard, ListTodo, MessageSquare, Sparkles, TrendingUp, Zap, ArrowLeft } from 'lucide-react';

const Home = () => {
    const navigate = useNavigate();

    return (
        <div className="h-screen flex items-center justify-center p-6 font-sans relative overflow-hidden bg-black scrollbar-dashboard">
            {/* Abstract colorful smoke texture */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-10 left-20 w-96 h-96 bg-gradient-to-br from-red-500 via-yellow-400 to-orange-500 rounded-full mix-blend-screen filter blur-3xl opacity-60 animate-pulse"></div>
                <div className="absolute top-32 right-16 w-80 h-80 bg-gradient-to-bl from-green-400 via-blue-500 to-cyan-400 rounded-full mix-blend-screen filter blur-3xl opacity-50 animate-bounce"></div>
                <div className="absolute bottom-20 left-32 w-72 h-72 bg-gradient-to-tr from-purple-500 via-pink-500 to-red-400 rounded-full mix-blend-screen filter blur-3xl opacity-70 animate-pulse"></div>
                <div className="absolute bottom-32 right-20 w-64 h-64 bg-gradient-to-tl from-blue-600 via-indigo-500 to-purple-600 rounded-full mix-blend-screen filter blur-3xl opacity-55 animate-bounce"></div>
                <div className="absolute top-1/2 left-1/3 w-56 h-56 bg-gradient-to-r from-yellow-400 via-green-500 to-blue-500 rounded-full mix-blend-screen filter blur-3xl opacity-65 animate-pulse"></div>
                <div className="absolute top-1/3 right-1/3 w-48 h-48 bg-gradient-to-l from-red-400 via-pink-500 to-purple-500 rounded-full mix-blend-screen filter blur-3xl opacity-60 animate-bounce"></div>
            </div>

            <div className="max-w-6xl w-full relative z-10">
                {/* Back Button */}
                <div className="absolute top-0 left-0 pt-4 px-4">
                    <button
                        onClick={() => navigate('/')}
                        className="flex items-center gap-2 bg-white/10 backdrop-blur-md hover:bg-white/20 text-white px-4 py-2 rounded-xl transition-all duration-300 border border-white/20 shadow-lg font-semibold text-sm transform hover:scale-105"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back
                    </button>
                </div>

                {/* Header */}
                <div className="text-center mb-16">
                    <div className="inline-flex items-center justify-center mb-6">
                        <div className="relative">
                            <div className="absolute inset-0 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-full blur-2xl opacity-75 animate-pulse"></div>
                            <div className="relative bg-white/10 backdrop-blur-md rounded-full p-4 border border-white/20 shadow-2xl">
                                <Sparkles className="w-12 h-12 text-white" />
                            </div>
                        </div>
                    </div>
                    <h1 className="text-6xl md:text-7xl font-bold text-white mb-6 tracking-tight font-heading drop-shadow-2xl">
                        Insightful
                    </h1>
                    <p className="text-xl md:text-2xl text-white/90 font-medium mb-4 drop-shadow-lg">
                        AI-Powered Customer Feedback Analysis Platform
                    </p>
                    <p className="text-white/70 text-lg max-w-2xl mx-auto">
                        Transform customer feedback into actionable insights with the power of artificial intelligence
                    </p>
                </div>

                {/* Navigation Buttons */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Dashboard Button */}
                    <button
                        onClick={() => navigate('/dashboard')}
                        className="group relative bg-white/10 backdrop-blur-2xl border border-white/20 rounded-3xl p-8 shadow-[0_32px_64px_rgba(0,0,0,0.3)] hover:shadow-[0_40px_80px_rgba(0,0,0,0.4)] transition-all duration-500 transform hover:-translate-y-3 hover:scale-105 overflow-hidden"
                    >
                        {/* Glossy highlight */}
                        <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent rounded-3xl pointer-events-none" />
                        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        <div className="relative flex flex-col items-center text-center space-y-5">
                            <div className="relative">
                                <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity duration-500"></div>
                                <div className="relative w-20 h-20 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-xl">
                                    <LayoutDashboard className="w-10 h-10 text-white" />
                                </div>
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold text-white font-heading mb-2 group-hover:text-indigo-400 transition-colors duration-300">
                                    Dashboard
                                </h3>
                                <p className="text-sm text-white/70 leading-relaxed">
                                    View feedback analytics and insights
                                </p>
                            </div>
                            <div className="flex items-center gap-2 text-indigo-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <TrendingUp className="w-4 h-4" />
                                <span className="text-xs font-semibold">Explore Analytics</span>
                            </div>
                        </div>
                    </button>

                    {/* Saved Action Items Button */}
                    <button
                        onClick={() => navigate('/saved-action-items')}
                        className="group relative bg-white/10 backdrop-blur-2xl border border-white/20 rounded-3xl p-8 shadow-[0_32px_64px_rgba(0,0,0,0.3)] hover:shadow-[0_40px_80px_rgba(0,0,0,0.4)] transition-all duration-500 transform hover:-translate-y-3 hover:scale-105 overflow-hidden"
                    >
                        {/* Glossy highlight */}
                        <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent rounded-3xl pointer-events-none" />
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        <div className="relative flex flex-col items-center text-center space-y-5">
                            <div className="relative">
                                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-2xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity duration-500"></div>
                                <div className="relative w-20 h-20 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-2xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-xl">
                                    <ListTodo className="w-10 h-10 text-white" />
                                </div>
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold text-white font-heading mb-2 group-hover:text-blue-400 transition-colors duration-300">
                                    Saved Action Items
                                </h3>
                                <p className="text-sm text-white/70 leading-relaxed">
                                    Track and manage your action items
                                </p>
                            </div>
                            <div className="flex items-center gap-2 text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <Zap className="w-4 h-4" />
                                <span className="text-xs font-semibold">View Items</span>
                            </div>
                        </div>
                    </button>

                    {/* Submit Feedback Button */}
                    <button
                        onClick={() => navigate('/submit-feedback')}
                        className="group relative bg-white/10 backdrop-blur-2xl border border-white/20 rounded-3xl p-8 shadow-[0_32px_64px_rgba(0,0,0,0.3)] hover:shadow-[0_40px_80px_rgba(0,0,0,0.4)] transition-all duration-500 transform hover:-translate-y-3 hover:scale-105 overflow-hidden"
                    >
                        {/* Glossy highlight */}
                        <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent rounded-3xl pointer-events-none" />
                        <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-emerald-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        <div className="relative flex flex-col items-center text-center space-y-5">
                            <div className="relative">
                                <div className="absolute inset-0 bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity duration-500"></div>
                                <div className="relative w-20 h-20 bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-xl">
                                    <MessageSquare className="w-10 h-10 text-white" />
                                </div>
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold text-white font-heading mb-2 group-hover:text-green-400 transition-colors duration-300">
                                    Submit Feedback
                                </h3>
                                <p className="text-sm text-white/70 leading-relaxed">
                                    Create new action items from feedback
                                </p>
                            </div>
                            <div className="flex items-center gap-2 text-green-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <Sparkles className="w-4 h-4" />
                                <span className="text-xs font-semibold">Get Started</span>
                            </div>
                        </div>
                    </button>
                </div>
            </div>


        </div>
    );
};

export default Home;


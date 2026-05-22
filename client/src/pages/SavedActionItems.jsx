import React from 'react';
import { useNavigate } from 'react-router-dom';
import ActionItemsList from '../components/ActionItemsList';
import { ArrowLeft, ListTodo } from 'lucide-react';

const SavedActionItems = () => {
    const navigate = useNavigate();

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
                {/* Header with Back Button */}
                <div className="flex flex-col md:flex-row items-start md:items-center gap-4 bg-white/95 backdrop-blur-xl rounded-3xl p-6 md:p-8 shadow-2xl border border-white/30">
                    <button
                        onClick={() => navigate('/home')}
                        className="flex items-center gap-2 bg-gradient-to-r from-slate-100 to-slate-50 hover:from-slate-200 hover:to-slate-100 text-slate-700 px-5 py-2.5 rounded-xl transition-all duration-300 border border-slate-200 shadow-md hover:shadow-lg font-semibold text-sm transform hover:scale-105"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back to Home
                    </button>
                    <div className="flex items-center gap-4 flex-1">
                        <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-2xl flex items-center justify-center shadow-xl">
                            <ListTodo className="w-8 h-8 text-white" />
                        </div>
                        <div>
                            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 via-cyan-600 to-indigo-600 bg-clip-text text-transparent tracking-tight font-heading drop-shadow-sm">
                                Saved Action Items
                            </h1>
                            <p className="text-slate-600 mt-2 text-base font-medium">Track and manage action items created from customer feedback</p>
                        </div>
                    </div>
                </div>

                {/* Action Items List */}
                <div className="bg-white/95 backdrop-blur-xl rounded-3xl p-6 shadow-2xl border border-white/30 hover:shadow-3xl transition-all duration-300">
                    <ActionItemsList />
                </div>
            </div>

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

export default SavedActionItems;


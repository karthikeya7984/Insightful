import React from 'react';
import { useNavigate } from 'react-router-dom';
import FeedbackSubmissionForm from '../components/FeedbackSubmissionForm';
import { ArrowLeft, MessageSquare } from 'lucide-react';

const SubmitFeedback = () => {
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

            <div className="max-w-4xl mx-auto space-y-10 relative z-10">
                {/* Refined High-Contrast Header */}
                <div className="flex flex-col md:flex-row items-start md:items-center gap-6 bg-white rounded-[2.5rem] p-8 md:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-200/60">
                    <button
                        onClick={() => navigate('/home')}
                        className="group flex items-center gap-2 bg-slate-900 hover:bg-black text-white px-6 py-3 rounded-2xl transition-all duration-300 shadow-xl hover:shadow-slate-500/20 font-black text-xs uppercase tracking-widest transform hover:-translate-y-0.5 active:scale-95"
                    >
                        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                        Back to Home
                    </button>
                    <div className="flex items-center gap-6 flex-1">
                        <div className="w-16 h-16 bg-gradient-to-br from-sky-400 to-blue-600 rounded-2xl flex items-center justify-center shadow-2xl shadow-sky-500/40">
                            <MessageSquare className="w-8 h-8 text-white" />
                        </div>
                        <div>
                            <h1 className="text-5xl md:text-6xl font-black text-slate-900 tracking-tighter">
                                Feedback <span className="text-sky-500">Submission</span> Form
                            </h1>
                            <p className="text-slate-400 mt-2 text-sm font-black uppercase tracking-[0.3em]">AI-Powered Insight Engine</p>
                        </div>
                    </div>
                </div>

                {/* Feedback Submission Form Container - Floating Light Blue Card */}
                <div className="bg-sky-50 backdrop-blur-3xl rounded-[3rem] p-4 md:p-8 shadow-[0_32px_128px_-32px_rgba(186,230,253,0.5)] border border-sky-200/60 transition-all duration-500">
                    <FeedbackSubmissionForm />
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

export default SubmitFeedback;


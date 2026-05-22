import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const LandingPage = () => {
    const navigate = useNavigate();

    return (
        <div className="h-screen bg-black flex flex-col items-center justify-center p-8 md:p-16 font-sans overflow-hidden text-center relative scrollbar-dashboard">
            {/* removed logo div */}

            {/* Abstract colorful smoke texture */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-10 left-20 w-96 h-96 bg-gradient-to-br from-red-500 via-yellow-400 to-orange-500 rounded-full mix-blend-screen filter blur-3xl opacity-60 animate-pulse"></div>
                <div className="absolute top-32 right-16 w-80 h-80 bg-gradient-to-bl from-green-400 via-blue-500 to-cyan-400 rounded-full mix-blend-screen filter blur-3xl opacity-50 animate-bounce"></div>
                <div className="absolute bottom-20 left-32 w-72 h-72 bg-gradient-to-tr from-purple-500 via-pink-500 to-red-400 rounded-full mix-blend-screen filter blur-3xl opacity-70 animate-pulse"></div>
                <div className="absolute bottom-32 right-20 w-64 h-64 bg-gradient-to-tl from-blue-600 via-indigo-500 to-purple-600 rounded-full mix-blend-screen filter blur-3xl opacity-55 animate-bounce"></div>
                <div className="absolute top-1/2 left-1/3 w-56 h-56 bg-gradient-to-r from-yellow-400 via-green-500 to-blue-500 rounded-full mix-blend-screen filter blur-3xl opacity-65 animate-pulse"></div>
                <div className="absolute top-1/3 right-1/3 w-48 h-48 bg-gradient-to-l from-red-400 via-pink-500 to-purple-500 rounded-full mix-blend-screen filter blur-3xl opacity-60 animate-bounce"></div>
            </div>

            {/* Content Column - Now Centered */}
            <div className="max-w-4xl space-y-12 z-10 flex flex-col items-center">
                {/* Glossy Container */}
                <div className="bg-white/10 backdrop-blur-2xl border border-white/20 rounded-2xl p-4 md:p-6 shadow-[0_16px_32px_rgba(0,0,0,0.3)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.4)] transition-all duration-500 hover:scale-[1.01] relative overflow-hidden">

                    
                    <h1 className="text-4xl md:text-6xl font-extrabold text-white leading-[1.2] tracking-tight font-heading max-w-4xl mb-8">
                        Feedback Analysis <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">
                            How To Analyze Both Qualitative and Quantitative Feedback Data
                        </span>
                    </h1>

                    <p className="text-xl md:text-2xl text-white/90 font-medium max-w-2xl leading-relaxed mb-10 text-center mx-auto">
                        Unlock deep insights from every customer interaction. Combine the power of hard metrics with the nuance of human sentiment.
                    </p>

                    <div className="flex justify-center pt-6">
                        <button
                            onClick={() => navigate('/home')}
                            className="group flex items-center justify-center gap-3 bg-white/20 backdrop-blur-sm border border-white/30 text-white px-10 py-5 rounded-2xl font-bold text-xl transition-all duration-300 hover:bg-white/30 hover:scale-105 shadow-xl hover:shadow-2xl"
                        >
                            Go to Home Page
                            <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
                        </button>
                    </div>
                </div>
            </div>


        </div>
    );
};

export default LandingPage;

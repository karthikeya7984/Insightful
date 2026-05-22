import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const SentimentChart = ({ data }) => {
    // data format: { Positive: 10, Neutral: 5, Negative: 2 }
    const chartData = {
        labels: ['Positive', 'Neutral', 'Negative'],
        datasets: [
            {
                data: [data.Positive || 0, data.Neutral || 0, data.Negative || 0],
                backgroundColor: [
                    '#10b981', // Emerald 500
                    '#6366f1', // Indigo 500 (Updated Neutral to a more premium Indigo)
                    '#f43f5e', // Rose 500 (Updated Negative to a more vibrant Rose)
                ],
                hoverBackgroundColor: [
                    '#059669', // Emerald 600
                    '#4f46e5', // Indigo 600
                    '#e11d48', // Rose 600
                ],
                borderWidth: 0,
                borderRadius: 8,
                spacing: 5,
                cutout: '75%',
            },
        ],
    };

    const options = {
        plugins: {
            legend: {
                display: true,
                position: 'bottom',
                labels: {
                    usePointStyle: true,
                    padding: 20,
                    color: '#64748b',
                    font: {
                        size: 12,
                        weight: '500'
                    }
                }
            },
            tooltip: {
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                titleColor: '#1e293b',
                bodyColor: '#64748b',
                borderColor: '#e2e8f0',
                borderWidth: 1,
                padding: 12,
                boxPadding: 6,
                usePointStyle: true,
                callbacks: {
                    label: (context) => {
                        const label = context.label || '';
                        const value = context.raw || 0;
                        const totalCount = context.dataset.data.reduce((a, b) => a + b, 0);
                        const percentage = ((value / totalCount) * 100).toFixed(1);
                        return ` ${label}: ${value} (${percentage}%)`;
                    }
                }
            }
        },
        maintainAspectRatio: false,
        animation: {
            animateScale: true,
            animateRotate: true
        }
    };

    const total = (data.Positive || 0) + (data.Neutral || 0) + (data.Negative || 0);

    return (
        <div className="bg-white/90 backdrop-blur-md p-6 rounded-3xl border border-white/60 shadow-2xl transition-all hover:shadow-emerald-500/10 hover:border-emerald-500/20">
            <div className="mb-6 flex justify-between items-start">
                <div>
                    <h3 className="text-xl font-extrabold text-slate-800 tracking-tight">Sentiment</h3>
                    <p className="text-xs font-medium text-slate-400 mt-0.5 uppercase tracking-wider">Analysis Overview</p>
                </div>
                <div className="bg-emerald-50 text-emerald-600 px-3 py-1 rounded-full text-xs font-bold">
                    Live
                </div>
            </div>

            {total > 0 ? (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                    {/* Left: Feedback Items Summary */}
                    <div className="space-y-4">
                        <div className="flex items-baseline gap-2 mb-4">
                            <span className="text-3xl font-black text-slate-800 leading-none">{total}</span>
                            <span className="text-sm uppercase font-bold text-slate-400 tracking-widest">Total Feedback Items</span>
                        </div>
                        
                        <div className="space-y-3">
                            <div className="flex items-center justify-between p-3 bg-emerald-50 rounded-xl border border-emerald-100">
                                <div className="flex items-center gap-3">
                                    <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
                                    <span className="font-semibold text-slate-700">Positive</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="font-bold text-slate-800">{data.Positive || 0}</span>
                                    <span className="text-xs text-slate-500">({total > 0 ? (((data.Positive || 0) / total) * 100).toFixed(1) : 0}%)</span>
                                </div>
                            </div>
                            
                            <div className="flex items-center justify-between p-3 bg-indigo-50 rounded-xl border border-indigo-100">
                                <div className="flex items-center gap-3">
                                    <div className="w-3 h-3 bg-indigo-500 rounded-full"></div>
                                    <span className="font-semibold text-slate-700">Neutral</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="font-bold text-slate-800">{data.Neutral || 0}</span>
                                    <span className="text-xs text-slate-500">({total > 0 ? (((data.Neutral || 0) / total) * 100).toFixed(1) : 0}%)</span>
                                </div>
                            </div>
                            
                            <div className="flex items-center justify-between p-3 bg-rose-50 rounded-xl border border-rose-100">
                                <div className="flex items-center gap-3">
                                    <div className="w-3 h-3 bg-rose-500 rounded-full"></div>
                                    <span className="font-semibold text-slate-700">Negative</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="font-bold text-slate-800">{data.Negative || 0}</span>
                                    <span className="text-xs text-slate-500">({total > 0 ? (((data.Negative || 0) / total) * 100).toFixed(1) : 0}%)</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right: Chart Analysis */}
                    <div className="flex items-center justify-center">
                        <div className="w-64 h-64">
                            <Doughnut data={chartData} options={options} />
                        </div>
                    </div>
                </div>
            ) : (
                <div className="text-center py-12">
                    <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-slate-50 border-2 border-dashed border-slate-200 flex items-center justify-center">
                        <span className="text-3xl filter grayscale opacity-50">📊</span>
                    </div>
                    <p className="text-slate-400 text-sm font-semibold tracking-wide">No insights yet</p>
                </div>
            )}
        </div>
    );
};

export default SentimentChart;

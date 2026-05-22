import React from 'react';
import { MoreHorizontal, Zap, Trash2 } from 'lucide-react';

const FeedbackTable = ({ feedback, onGenerateAction, onDelete }) => {
    return (
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl border border-white/50 shadow-xl overflow-hidden">
            <div className="p-6 border-b border-slate-100 bg-gradient-to-r from-indigo-50/50 to-purple-50/50">
                <h3 className="text-xl font-bold text-slate-800 font-heading">Recent Feedback</h3>
                <p className="text-sm text-slate-500 mt-1">Analyze and generate action items from customer feedback</p>
            </div>
            <div className="overflow-x-auto max-h-[26rem] scrollbar-table">
                <table className="w-full text-left text-sm">
                    <thead className="bg-gradient-to-r from-slate-50 to-slate-100/50 text-xs uppercase font-bold text-slate-600 tracking-wider sticky top-0 z-10">
                        <tr>
                            <th className="px-6 py-4">Feedback</th>
                            <th className="px-6 py-4">Category</th>
                            <th className="px-6 py-4">Sentiment</th>
                            <th className="px-6 py-4 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {feedback.length === 0 ? (
                            <tr>
                                <td colSpan="4" className="px-6 py-12 text-center">
                                    <div className="text-slate-400 text-sm">No feedback data available. Add some feedback to get started!</div>
                                </td>
                            </tr>
                        ) : (
                            feedback.map((item) => (
                                <tr key={item._id} className="hover:bg-gradient-to-r hover:from-indigo-50/30 hover:to-purple-50/30 transition-all duration-200 group">
                                    <td className="px-6 py-4 max-w-md">
                                        <div className="text-slate-900 font-semibold truncate group-hover:text-indigo-700 transition-colors">{item.summary || item.text.substring(0, 50)}</div>
                                        <div className="text-xs text-slate-500 mt-1 line-clamp-2">{item.text}</div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="inline-block px-3 py-1.5 rounded-lg bg-gradient-to-r from-slate-100 to-slate-200 text-slate-700 text-xs font-semibold border border-slate-300/50 shadow-sm whitespace-nowrap">
                                            {item.category}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`px-3 py-1.5 rounded-lg text-xs font-bold border shadow-sm
                    ${item.sentiment === 'Positive' ? 'text-green-700 bg-gradient-to-r from-green-50 to-emerald-50 border-green-300/50' :
                                                item.sentiment === 'Negative' ? 'text-red-700 bg-gradient-to-r from-red-50 to-rose-50 border-red-300/50' :
                                                    'text-slate-600 bg-gradient-to-r from-slate-50 to-slate-100 border-slate-300/50'}`}>
                                            {item.sentiment}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex justify-end items-center gap-2">
                                            <button
                                                onClick={() => onGenerateAction(item)}
                                                className={`rounded-xl transition-all duration-200 flex items-center gap-2 text-xs font-bold px-4 py-2 shadow-sm hover:shadow-md transform hover:-translate-y-0.5
                                                ${item.actionItem
                                                        ? 'bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white border-0'
                                                        : 'bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white border-0'}`}
                                                title={item.actionItem ? "View Action Plan" : "Generate Action Plan"}
                                            >
                                                {item.actionItem ? (
                                                    <>View Action</>
                                                ) : (
                                                    <><Zap className="w-3.5 h-3.5" /> Generate</>
                                                )}
                                            </button>
                                            <button
                                                onClick={() => onDelete(item._id)}
                                                className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200"
                                                title="Delete Feedback"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default FeedbackTable;

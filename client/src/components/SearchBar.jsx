import React, { useState } from 'react';
import { Search } from 'lucide-react';

const SearchBar = ({ onSearch, loading = false }) => {
    const [query, setQuery] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        e.stopPropagation();
        const trimmedQuery = query.trim();
        if (trimmedQuery && !loading) {
            console.log('SearchBar: Submitting search for:', trimmedQuery);
            onSearch(trimmedQuery);
        } else if (!trimmedQuery) {
            alert('Please enter a search query');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="relative w-full max-w-3xl mx-auto my-0">
            <div className="relative group">
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Ask a question about your feedback (e.g., 'What are users saying about the new feature?')"
                    disabled={loading}
                    className="w-full pl-14 pr-6 py-4 bg-white/90 backdrop-blur-sm border-2 border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-slate-900 placeholder-slate-400 shadow-lg shadow-slate-200/50 transition-all duration-200 text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                />
                <Search className="absolute left-5 top-1/2 transform -translate-y-1/2 text-indigo-500 w-5 h-5 group-focus-within:text-indigo-600 transition-colors" />
                <button
                    type="submit"
                    disabled={loading}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed text-white px-6 py-2 rounded-xl transition-all duration-200 shadow-md hover:shadow-lg font-medium text-sm cursor-pointer z-10"
                >
                    {loading ? (
                        <span className="flex items-center gap-2">
                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            Searching...
                        </span>
                    ) : (
                        'Search'
                    )}
                </button>
            </div>
        </form>
    );
};

export default SearchBar;

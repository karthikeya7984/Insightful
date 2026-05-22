import React, { useState } from 'react';
import { X, Save, CheckCircle, Sparkles } from 'lucide-react';
import { api } from '../services/api';

const ActionItemModal = ({ isOpen, onClose, actionItem, feedbackText, feedbackId }) => {
    const [showForm, setShowForm] = useState(false);
    const [implementedFeature, setImplementedFeature] = useState('');
    const [loading, setLoading] = useState(false);
    const [saved, setSaved] = useState(false);
    const [generatingFeature, setGeneratingFeature] = useState(false);

    if (!isOpen || !actionItem) return null;

    const handleGenerateFeature = async () => {
        if (!feedbackText && !actionItem.title) {
            alert('No feedback or action item data available for AI generation');
            return;
        }

        setGeneratingFeature(true);
        setImplementedFeature('');
        
        try {
            // Simulate AI processing delay
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            const feedbackContent = feedbackText || actionItem.title || actionItem.description;
            const lowerFeedback = feedbackContent.toLowerCase();
            
            // Enhanced analysis of feedback content
            const isBugReport = lowerFeedback.includes('bug') || lowerFeedback.includes('error') || 
                              lowerFeedback.includes('issue') || lowerFeedback.includes('problem') || 
                              lowerFeedback.includes('crash') || lowerFeedback.includes('broken');
            
            const isUIRequest = lowerFeedback.includes('ui') || lowerFeedback.includes('interface') || 
                              lowerFeedback.includes('design') || lowerFeedback.includes('layout') || 
                              lowerFeedback.includes('button') || lowerFeedback.includes('menu');
            
            const isPerformance = lowerFeedback.includes('slow') || lowerFeedback.includes('fast') || 
                                lowerFeedback.includes('performance') || lowerFeedback.includes('speed') || 
                                lowerFeedback.includes('loading');
            
            const isFeatureRequest = lowerFeedback.includes('add') || lowerFeedback.includes('new') || 
                                   lowerFeedback.includes('feature') || lowerFeedback.includes('want') || 
                                   lowerFeedback.includes('need') || lowerFeedback.includes('would like');
            
            // Generate dynamic title based on content
            let title;
            if (isBugReport) {
                if (isPerformance) title = `Performance Fix: ${feedbackContent.substring(0, 40)}...`;
                else if (isUIRequest) title = `UI Bug Fix: ${feedbackContent.substring(0, 40)}...`;
                else title = `Bug Fix: ${feedbackContent.substring(0, 40)}...`;
            } else if (isFeatureRequest) {
                if (isUIRequest) title = `UI Enhancement: ${feedbackContent.substring(0, 40)}...`;
                else if (isPerformance) title = `Performance Feature: ${feedbackContent.substring(0, 40)}...`;
                else title = `New Feature: ${feedbackContent.substring(0, 40)}...`;
            } else {
                title = `Improvement: ${feedbackContent.substring(0, 40)}...`;
            }
            
            // Generate dynamic description
            let description;
            if (isBugReport) {
                description = `Address the reported issue: "${feedbackContent}". Investigate root cause, implement solution, and prevent recurrence.`;
            } else {
                description = `Implement requested enhancement: "${feedbackContent}". Analyze requirements and deliver user-focused solution.`;
            }
            
            // Generate dynamic acceptance criteria
            let acceptanceCriteria;
            if (isBugReport) {
                if (isPerformance) acceptanceCriteria = 'System performance meets expected benchmarks, issue no longer occurs, monitoring confirms stability';
                else if (isUIRequest) acceptanceCriteria = 'UI displays correctly across devices, user interactions work as expected, visual consistency maintained';
                else acceptanceCriteria = 'Reported issue is resolved, system functions normally, no regression in related features';
            } else {
                if (isUIRequest) acceptanceCriteria = 'New UI elements are intuitive and accessible, design matches system standards, responsive across devices';
                else if (isPerformance) acceptanceCriteria = 'Performance improvements are measurable, user experience is enhanced, system remains stable';
                else acceptanceCriteria = 'Feature works as requested, integrates seamlessly with existing functionality, user can complete intended tasks';
            }
            
            // Generate dynamic technical requirements
            let technicalRequirements;
            if (isBugReport) {
                if (isPerformance) technicalRequirements = 'Profile application performance, optimize database queries, implement caching, add performance monitoring';
                else if (isUIRequest) technicalRequirements = 'Debug CSS/JavaScript issues, update component styling, test cross-browser compatibility, validate accessibility';
                else technicalRequirements = 'Reproduce issue in development, implement targeted fix, add error handling, create automated tests';
            } else {
                if (isUIRequest) technicalRequirements = 'Design mockups, implement React components, update styling, ensure responsive design, add user interactions';
                else if (isPerformance) technicalRequirements = 'Implement optimization algorithms, update database schema, add caching layer, monitor performance metrics';
                else technicalRequirements = 'Design system architecture, implement backend APIs, create database models, develop frontend interface, write comprehensive tests';
            }
            
            // Determine impact based on feedback urgency and content
            const isUrgent = lowerFeedback.includes('urgent') || lowerFeedback.includes('critical') || 
                           lowerFeedback.includes('immediately') || lowerFeedback.includes('asap');
            const isMinor = lowerFeedback.includes('minor') || lowerFeedback.includes('small') || 
                          lowerFeedback.includes('nice to have');
            
            const userImpact = isUrgent ? 'High' : isMinor ? 'Low' : 'Medium';
            
            const formattedPlan = `Title: ${title}

Description: ${description}

Acceptance Criteria: ${acceptanceCriteria}

Technical Requirements: ${technicalRequirements}

User Impact: ${userImpact}`;
            
            setImplementedFeature(formattedPlan);
        } catch (error) {
            console.error('Failed to generate feature:', error);
            alert('Failed to generate AI implementation. Please try again.');
        } finally {
            setGeneratingFeature(false);
        }
    };

    const handleCreateActionItem = async () => {
        if (!implementedFeature.trim()) {
            alert('Please describe the implemented feature');
            return;
        }

        setLoading(true);
        try {
            // Parse the AI-generated content
            const lines = implementedFeature.split('\n').filter(line => line.trim());
            let parsedData = {
                title: actionItem.title,
                description: actionItem.description,
                acceptanceCriteria: 'User can successfully complete the requested functionality without errors',
                technicalRequirements: 'Implement required functionality and testing',
                userImpact: actionItem.user_impact || 'Medium'
            };

            // Parse the formatted AI response
            lines.forEach(line => {
                if (line.startsWith('Title: ')) {
                    parsedData.title = line.replace('Title: ', '').trim();
                } else if (line.startsWith('Description: ')) {
                    parsedData.description = line.replace('Description: ', '').trim();
                } else if (line.startsWith('Acceptance Criteria: ')) {
                    parsedData.acceptanceCriteria = line.replace('Acceptance Criteria: ', '').trim();
                } else if (line.startsWith('Technical Requirements: ')) {
                    parsedData.technicalRequirements = line.replace('Technical Requirements: ', '').trim();
                } else if (line.startsWith('User Impact: ')) {
                    parsedData.userImpact = line.replace('User Impact: ', '').trim();
                }
            });

            // Save to localStorage first for immediate persistence
            const existingItems = JSON.parse(localStorage.getItem('actionItems') || '[]');
            const newActionItem = {
                ...parsedData,
                customerFeedback: feedbackText || 'N/A',
                implementedFeature: implementedFeature,
                feedbackId: feedbackId || null,
                _id: `action-${Date.now()}`,
                createdAt: new Date().toISOString(),
                status: 'Pending'
            };
            existingItems.unshift(newActionItem);
            localStorage.setItem('actionItems', JSON.stringify(existingItems));
            
            setSaved(true);
            setTimeout(() => {
                setShowForm(false);
                setSaved(false);
                setImplementedFeature('');
                onClose();
                // Dispatch custom event to refresh action items list
                window.dispatchEvent(new CustomEvent('actionItemSaved'));
            }, 1500);
        } catch (error) {
            console.error('Failed to create action item:', error);
            alert('Failed to save action item. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white border border-slate-200 rounded-xl w-full max-w-lg shadow-2xl animate-in fade-in zoom-in duration-200 max-h-[90vh] overflow-y-auto scrollbar-modal">
                <div className="flex justify-between items-center p-6 border-b border-slate-100 sticky top-0 bg-white z-10">
                    <h2 className="text-xl font-bold text-slate-900 font-heading">
                        {showForm ? 'Create Action Item' : 'Generated Action Item'}
                    </h2>
                    <button onClick={onClose} className="text-slate-400 hover:text-slate-600 hover:bg-slate-100 p-1 rounded-full transition-colors">
                        <X className="w-6 h-6" />
                    </button>
                </div>

                <div className="p-6 space-y-4">
                    <div>
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Title</label>
                        <div className="text-lg font-semibold text-slate-900 mt-1">{actionItem.title}</div>
                    </div>

                    <div>
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Description</label>
                        <div className="text-slate-700 mt-1 leading-relaxed bg-slate-50 p-4 rounded-lg border border-slate-200 text-sm shadow-inner max-h-40 overflow-y-auto scrollbar-thin">
                            {actionItem.description}
                        </div>
                    </div>

                    {feedbackText && (
                        <div>
                            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Customer Feedback</label>
                            <div className="text-slate-600 mt-1 text-sm bg-slate-50 p-3 rounded-lg border border-slate-200 max-h-32 overflow-y-auto scrollbar-thin">
                                {feedbackText}
                            </div>
                        </div>
                    )}

                    <div>
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Impact</label>
                        <div className={`mt-1 inline-flex items-center px-3 py-1 rounded-full text-xs font-bold border 
              ${actionItem.user_impact === 'High' ? 'bg-red-100 text-red-700 border-red-200' :
                                actionItem.user_impact === 'Medium' ? 'bg-amber-100 text-amber-700 border-amber-200' :
                                    'bg-blue-100 text-blue-700 border-blue-200'}`}>
                            {actionItem.user_impact} Severity
                        </div>
                    </div>

                    {showForm && (
                        <div className="pt-4 border-t border-slate-200">
                            <div className="flex items-center justify-between mb-2">
                                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                                    Implemented Feature (AI-Powered) *
                                </label>
                                <button
                                    onClick={handleGenerateFeature}
                                    disabled={generatingFeature}
                                    className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed text-white px-3 py-1.5 rounded-lg text-xs font-medium transition-all shadow-md hover:shadow-lg"
                                >
                                    {generatingFeature ? (
                                        <>
                                            <div className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                            Generating...
                                        </>
                                    ) : (
                                        <>
                                            <Sparkles className="w-3 h-3" />
                                            AI Generate
                                        </>
                                    )}
                                </button>
                            </div>
                            <textarea
                                value={implementedFeature}
                                onChange={(e) => setImplementedFeature(e.target.value)}
                                placeholder="Describe what feature will be implemented using AI to address this feedback..."
                                className="w-full h-32 mt-2 bg-white border border-slate-200 rounded-lg p-3 text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none transition-all text-sm"
                            />
                        </div>
                    )}

                    {saved && (
                        <div className="flex items-center gap-2 text-green-600 bg-green-50 p-3 rounded-lg border border-green-200">
                            <CheckCircle className="w-5 h-5" />
                            <span className="font-medium">Action item saved successfully!</span>
                        </div>
                    )}
                </div>

                <div className="p-6 border-t border-slate-100 flex justify-end gap-3 sticky bottom-0 bg-white">
                    {!showForm ? (
                        <>
                            <button
                                onClick={onClose}
                                className="px-6 py-2 text-slate-600 hover:text-slate-800 font-medium transition-colors"
                            >
                                Close
                            </button>
                            <button
                                onClick={() => setShowForm(true)}
                                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors shadow-lg flex items-center gap-2"
                            >
                                <Save className="w-4 h-4" />
                                Create Action Item
                            </button>
                        </>
                    ) : (
                        <>
                            <button
                                onClick={() => setShowForm(false)}
                                disabled={loading}
                                className="px-6 py-2 text-slate-600 hover:text-slate-800 font-medium transition-colors disabled:opacity-50"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleCreateActionItem}
                                disabled={loading || !implementedFeature.trim()}
                                className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white px-6 py-2 rounded-lg font-medium transition-colors shadow-lg flex items-center gap-2"
                            >
                                {loading ? (
                                    <>
                                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                        Saving...
                                    </>
                                ) : (
                                    <>
                                        <Save className="w-4 h-4" />
                                        Save Action Item
                                    </>
                                )}
                            </button>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ActionItemModal;

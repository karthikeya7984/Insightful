const ActionItem = require('../models/ActionItem');

// Create a new action item
exports.createActionItem = async (req, res) => {
    try {
        const { title, description, customerFeedback, implementedFeature, userImpact, feedbackId } = req.body;

        // Validate required fields
        if (!title || !description || !customerFeedback || !implementedFeature) {
            return res.status(400).json({
                error: "Missing required fields: title, description, customerFeedback, implementedFeature"
            });
        }

        const newActionItem = new ActionItem({
            title,
            description,
            customerFeedback,
            implementedFeature,
            userImpact: userImpact || 'Medium',
            feedbackId: feedbackId || null
        });

        await newActionItem.save();
        res.status(201).json(newActionItem);
    } catch (error) {
        console.error("Create Action Item Error:", error);
        res.status(500).json({ error: "Failed to create action item" });
    }
};

// Get all action items
exports.getAllActionItems = async (req, res) => {
    try {
        const actionItems = await ActionItem.find()
            .sort({ createdAt: -1 })
            .populate('feedbackId', 'text sentiment category');

        res.json(actionItems);
    } catch (error) {
        console.error("Get Action Items Error:", error);
        res.status(500).json({ error: "Failed to fetch action items" });
    }
};

// Update action item status
exports.updateActionItemStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        if (!['Pending', 'In Progress', 'Completed'].includes(status)) {
            return res.status(400).json({ error: "Invalid status value" });
        }

        const updatedItem = await ActionItem.findByIdAndUpdate(
            id,
            { status },
            { new: true }
        );

        if (!updatedItem) {
            return res.status(404).json({ error: "Action item not found" });
        }

        res.json(updatedItem);
    } catch (error) {
        console.error("Update Action Item Error:", error);
        res.status(500).json({ error: "Failed to update action item" });
    }
};

// Delete action item
exports.deleteActionItem = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedItem = await ActionItem.findByIdAndDelete(id);

        if (!deletedItem) {
            return res.status(404).json({ error: "Action item not found" });
        }

        res.json({ message: "Action item deleted successfully" });
    } catch (error) {
        console.error("Delete Action Item Error:", error);
        res.status(500).json({ error: "Failed to delete action item" });
    }
};

// Create action item directly from feedback submission form
exports.createFromSubmission = async (req, res) => {
    try {
        const { feedbackType, description, implementedFeature } = req.body;

        // Validate required fields
        if (!feedbackType || !description || !implementedFeature) {
            return res.status(400).json({
                error: "Missing required fields: feedbackType, description, implementedFeature"
            });
        }

        // First, create a feedback entry
        const Feedback = require('../models/Feedback');
        const sentiment = description.toLowerCase().includes('good') || description.toLowerCase().includes('great') || description.toLowerCase().includes('love') ? 'Positive' : 
                         description.toLowerCase().includes('bad') || description.toLowerCase().includes('issue') || description.toLowerCase().includes('bug') || description.toLowerCase().includes('problem') ? 'Negative' : 'Neutral';
        
        const newFeedback = new Feedback({
            text: description,
            summary: description.substring(0, 100) + (description.length > 100 ? '...' : ''),
            sentiment: sentiment,
            category: feedbackType
        });
        
        await newFeedback.save();

        // Then create the action item
        const mockTitle = feedbackType === 'Bug Report' 
            ? `Fix: ${description.substring(0, 50)}...`
            : `Feature: ${description.substring(0, 50)}...`;
        
        const mockDescription = feedbackType === 'Bug Report'
            ? `Investigate and resolve the reported issue: ${description.substring(0, 100)}...`
            : `Implement the requested feature: ${description.substring(0, 100)}...`;

        const newActionItem = new ActionItem({
            title: mockTitle,
            description: mockDescription,
            customerFeedback: description,
            implementedFeature: implementedFeature,
            userImpact: 'Medium',
            status: 'Pending',
            feedbackId: newFeedback._id
        });

        await newActionItem.save();
        res.status(201).json({
            actionItem: newActionItem,
            feedback: newFeedback,
            message: 'Feedback and action item created successfully'
        });
    } catch (error) {
        console.error("Create From Submission Error:", error);
        res.status(500).json({ error: "Failed to create action item from submission" });
    }
};

// Generate AI implementation plan
exports.generateImplementationPlan = async (req, res) => {
    console.log('✅ generateImplementationPlan controller called!');
    try {
        const { feedbackType, description } = req.body;
        console.log('Received:', { feedbackType, description: description?.substring(0, 50) });

        if (!feedbackType || !description || !description.trim()) {
            return res.status(400).json({
                error: "Missing required fields: feedbackType and description"
            });
        }

        // Mock implementation plan to avoid API issues
        let mockPlan;
        if (feedbackType === 'Bug Report') {
            mockPlan = `## Bug Resolution Plan

**Issue Analysis:**
${description}

**Implementation Steps:**
1. Reproduce the issue in development environment
2. Identify root cause through debugging and code analysis
3. Develop and test the fix
4. Conduct thorough testing including edge cases
5. Deploy fix to production with monitoring

**Timeline:** 2-3 business days
**Priority:** High
**Testing Requirements:** Unit tests, integration tests, user acceptance testing`;
        } else {
            mockPlan = `## Feature Implementation Plan

**Feature Request:**
${description}

**Implementation Strategy:**
1. Requirements analysis and technical specification
2. UI/UX design and user flow mapping
3. Backend API development and database schema updates
4. Frontend component development and integration
5. Testing, optimization, and deployment

**Timeline:** 1-2 weeks
**Priority:** Medium
**Success Metrics:** User engagement, feature adoption rate, performance impact`;
        }

        console.log('Generated mock implementation plan for:', feedbackType);
        res.json({ implementationPlan: mockPlan });
    } catch (error) {
        console.error("Generate Implementation Plan Error:", error);
        console.error("Error details:", error.message, error.stack);
        res.status(500).json({ 
            error: "Failed to generate implementation plan",
            details: error.message 
        });
    }
};
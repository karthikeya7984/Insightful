const express = require('express');
const router = express.Router();
const feedbackController = require('../controllers/feedbackController');

router.post('/ingest', feedbackController.ingestFeedback);
router.post('/search', feedbackController.searchFeedback);
router.get('/themes', feedbackController.getThemes);
router.get('/', feedbackController.getRecentFeedback);
router.delete('/clear', feedbackController.clearAllFeedback);
router.post('/action-item', feedbackController.generateActionItem);
router.post('/competitive-analysis', feedbackController.competitiveAnalysis);
router.delete('/:id', feedbackController.deleteFeedback);

module.exports = router;

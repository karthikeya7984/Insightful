# Insightful - AI Customer Feedback Analysis Platform

Insightful is a web-based dashboard that analyzes customer feedback using Generative AI (Gemini) and Retrieval-Augmented Generation (RAG).

## Features
- **Feedback Ingestion**: Batch process raw feedback with auto-summarization and categorization.
- **Sentiment Analysis**: Visualization of positive, neutral, and negative feedback.
- **Semnatic Search (RAG)**: Ask natural language questions about your feedback.
- **Theme Detection**: Identify emerging trends from recent feedback.
- **Action Item Generator**: Convert feedback into structured Jira-style tickets.
- **Competitive Analysis**: Compare your feedback against competitors.

## Tech Stack
- **Frontend**: React, Tailwind CSS, Chart.js
- **Backend**: Node.js, Express, MongoDB, Pinecone, Google Gemini

## Setup Instructions

### Prerequisites
- Node.js (v18+)
- MongoDB (Local or Atlas)
- Google Gemini API Key
- Pinecone API Key

### Backend Setup
1. Navigate to server:
   ```bash
   cd Insightful/server
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create `.env` file (see `.env.example` or use provided template):
   ```env
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/insightful
   GEMINI_API_KEY=your_key
   PINECONE_API_KEY=your_key
   PINECONE_INDEX_NAME=insightful-feedback
   ```
4. Start server:
   ```bash
   npm run dev
   # or
   node src/server.js
   ```

### Frontend Setup
1. Navigate to client:
   ```bash
   cd Insightful/client
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start development server:
   ```bash
   npm run dev
   ```

## API Endpoints
- POST `/api/feedback/ingest`
- POST `/api/feedback/search`
- GET `/api/feedback/themes`
- POST `/api/feedback/action-item`

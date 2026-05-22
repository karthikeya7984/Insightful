const promptTemplates = {
  summary: `Analyze the following customer feedback and provide a concise summary (max 2 sentences).
Feedback: "{feedbackText}"
Summary:`,

  fullAnalysis: `Analyze the following customer feedback and provides a structured response.
1. Summary: A very concise one-sentence summary of the core issue or praise.
2. Sentiment: Determine if it is Positive, Neutral, or Negative. 
   - Positive: Praise, happiness, or satisfaction.
   - Negative: Frustration, bugs, complaints, or dissatisfaction.
   - Neutral: Factual statements without strong emotion.
3. Category: Categorize as Bug Report, Feature Request, Praise, or Other.
4. Action Item: Create a concrete next step for the team (title, description, and user_impact as High/Medium/Low).

Feedback: "{feedbackText}"

Respond STRICTLY in this JSON format:
{
  "summary": "...",
  "sentiment": "...",
  "category": "...",
  "actionItem": {
    "title": "...",
    "description": "...",
    "user_impact": "..."
  }
}`,

  sentimentCategoryAndAction: `Analyze the following customer feedback. 
1. Determine the sentiment (Positive, Neutral, or Negative).
2. Categorize it into one of these: Bug Report, Feature Request, Praise, Other.
3. Generate a concrete action item for the development team.

Feedback: "{feedbackText}"

Respond STRICTLY in this JSON format:
{
  "sentiment": "...",
  "category": "...",
  "actionItem": {
    "title": "Short actionable title",
    "description": "Detailed description of the issue or request and recommended action",
    "user_impact": "High/Medium/Low"
  }
}`,

  ragAnswer: `You are an AI assistant for a product team. Use the following context (retrieved customer feedback) to answer the user's question.
If the answer is not in the context, say "I don't have enough information from the feedback to answer that."

Context:
{context}

Question: {question}

Answer (concise bullet points):`,

  themes: `Analyze the following list of customer feedback summaries and identify the top 3 emerging themes or trends.
Feedback Summaries:
{summaries}

Respond STRICTLY in this JSON format:
[
  {
    "theme": "Title of theme",
    "description": "Brief description",
    "sentiment": "Overall sentiment (Positive/Neutral/Negative)"
  },
  ...
]`,

  actionItem: `Convert the following feedback into a structured action item for the development team.
Feedback: "{feedbackText}"

Respond STRICTLY in this JSON format:
{
  "title": "Short actionable title",
  "description": "Detailed description of the issue or request",
  "user_impact": "High/Medium/Low based on severity/tone"
}`,

  competitiveAnalysis: `Compare our product feedback with the following competitor feedback.
Our Feedback Summary: "{ourFeedback}"
Competitor Feedback: "{competitorFeedback}"

Provide a comparison including Strengths, Weaknesses, and Key Insights.`,

  directActionItemCreation: `You are processing a user-submitted feedback form. Create a structured action item from the following:

Feedback Type: {feedbackType}
Description: "{description}"

RULES:
1. Title must be concise and actionable (max 10 words)
2. Description must be rewritten in clear, professional language suitable for engineers
3. Infer user_impact (High/Medium/Low) from the text if not explicitly stated
4. Output ONLY valid JSON, no extra text, explanations, or markdown

Respond STRICTLY in this JSON format:
{
  "title": "Concise actionable title",
  "description": "Clear professional description for engineers",
  "user_impact": "High/Medium/Low"
}`,

  implementationPlan: `You are an AI assistant helping to create an implementation plan for a {feedbackType}.

Feedback Description: "{description}"

Generate a detailed AI-powered implementation plan that includes:
1. Technical approach and architecture considerations
2. Key features or fixes to implement
3. AI/ML components that could be used (if applicable)
4. Step-by-step implementation strategy
5. Potential challenges and solutions

Provide a comprehensive, professional implementation plan that engineers can use as a guide. Format it in clear paragraphs with logical flow.

Implementation Plan:`,

  feedbackSplitter: `Split the following customer feedback into a list of distinct, independent points. 
If the feedback contains multiple separate issues, requests, or praises, split them into individual items so they can be analyzed separately.
Maintain the original meaning and tone of each point.
If the feedback is already a single point, return it as a single-item list.

Example Input: "The UI is great but the app is slow. I also want a dark mode."
Example Output: ["The UI is great", "the app is slow", "I also want a dark mode"]

Feedback: "{feedbackText}"

Respond STRICTLY in this JSON format:
[
  "Point 1",
  "Point 2",
  ...
]`
};

module.exports = promptTemplates;

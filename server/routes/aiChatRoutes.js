const express = require('express');
const router = express.Router();
const { OpenAI } = require('openai');
require('dotenv').config();

// Import your authentication middleware
const authenticate = require('../middleware/authenticate');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// POST /api/ai-chat
router.post('/', authenticate, async (req, res) => {
  const { message } = req.body;
  if (!message) {
    return res.status(400).json({ error: 'Message is required.' });
  }
  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: 'You are a helpful mental wellness assistant.' },
        { role: 'user', content: message },
      ],
      max_tokens: 200,
      temperature: 0.7,
    });
    const aiResponse = completion.choices[0].message.content;
    res.json({ response: aiResponse });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to get AI response.' });
  }
});

module.exports = router; 
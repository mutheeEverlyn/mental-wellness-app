const express = require('express');
const router = express.Router();
const Testimonial = require('../models/TestimonialModel');
const User = require('../models/userModel');
const asyncHandler = require('express-async-handler');

// Middleware to require authentication (assume req.user is set)
const requireAuth = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ error: 'Not authenticated' });
  }
  next();
};

// POST /api/testimonials - Submit a testimonial (one per user)
router.post('/', requireAuth, asyncHandler(async (req, res) => {
  const { job, review, rating } = req.body;
  const userId = req.user._id;
  const name = req.user.name;
  const shorthand = name.split(' ').map(n => n[0]).join('').toUpperCase();

  if (!rating || rating < 1 || rating > 5) {
    return res.status(400).json({ error: 'Rating must be between 1 and 5.' });
  }

  // Check if user already submitted a testimonial
  const existing = await Testimonial.findOne({ user: userId });
  if (existing) {
    return res.status(400).json({ error: 'You have already submitted a testimonial.' });
  }

  const testimonial = new Testimonial({
    user: userId,
    name,
    job,
    review,
    shorthand,
    rating,
  });
  await testimonial.save();
  res.status(201).json({ message: 'Testimonial submitted!', testimonial });
}));

// GET /api/testimonials - Get all testimonials
router.get('/', asyncHandler(async (req, res) => {
  const testimonials = await Testimonial.find().sort({ createdAt: -1 });
  res.json(testimonials);
}));

module.exports = router; 
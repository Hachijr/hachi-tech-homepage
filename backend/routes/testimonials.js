import express from 'express';
import { body, validationResult } from 'express-validator';
import Testimonial from '../models/Testimonial.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

// Validation middleware
const validateTestimonial = [
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('review').trim().notEmpty().withMessage('Review is required'),
  body('rating').isInt({ min: 1, max: 5 }).withMessage('Rating must be between 1 and 5')
];

// GET all testimonials (public - only approved)
router.get('/', async (req, res) => {
  try {
    const { featured, limit } = req.query;
    let query = { approved: true };

    if (featured === 'true') query.featured = true;

    const testimonials = await Testimonial.find(query)
      .sort({ featured: -1, createdAt: -1 })
      .limit(limit ? parseInt(limit) : 0);

    res.json({ success: true, count: testimonials.length, data: testimonials });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
});

// GET all testimonials including unapproved (protected)
router.get('/all', authenticate, async (req, res) => {
  try {
    const testimonials = await Testimonial.find()
      .sort({ createdAt: -1 });

    res.json({ success: true, count: testimonials.length, data: testimonials });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
});

// GET single testimonial by ID
router.get('/:id', async (req, res) => {
  try {
    const testimonial = await Testimonial.findById(req.params.id);

    if (!testimonial) {
      return res.status(404).json({ success: false, message: 'Testimonial not found' });
    }

    res.json({ success: true, data: testimonial });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
});

// CREATE new testimonial (protected)
router.post('/', authenticate, validateTestimonial, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    const testimonial = new Testimonial(req.body);
    await testimonial.save();

    res.status(201).json({ success: true, message: 'Testimonial created successfully', data: testimonial });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
});

// UPDATE testimonial (protected)
router.put('/:id', authenticate, validateTestimonial, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    const testimonial = await Testimonial.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!testimonial) {
      return res.status(404).json({ success: false, message: 'Testimonial not found' });
    }

    res.json({ success: true, message: 'Testimonial updated successfully', data: testimonial });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
});

// APPROVE testimonial (protected)
router.patch('/:id/approve', authenticate, async (req, res) => {
  try {
    const testimonial = await Testimonial.findByIdAndUpdate(
      req.params.id,
      { approved: true },
      { new: true }
    );

    if (!testimonial) {
      return res.status(404).json({ success: false, message: 'Testimonial not found' });
    }

    res.json({ success: true, message: 'Testimonial approved successfully', data: testimonial });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
});

// DELETE testimonial (protected)
router.delete('/:id', authenticate, async (req, res) => {
  try {
    const testimonial = await Testimonial.findByIdAndDelete(req.params.id);

    if (!testimonial) {
      return res.status(404).json({ success: false, message: 'Testimonial not found' });
    }

    res.json({ success: true, message: 'Testimonial deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
});

export default router;

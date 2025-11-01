import express from 'express';
import { body, validationResult } from 'express-validator';
import Blog from '../models/Blog.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

// Validation middleware
const validateBlog = [
  body('title').trim().notEmpty().withMessage('Title is required'),
  body('content').trim().notEmpty().withMessage('Content is required'),
  body('excerpt').trim().notEmpty().withMessage('Excerpt is required').isLength({ max: 200 }),
  body('featuredImage').trim().notEmpty().withMessage('Featured image is required'),
  body('category').isIn(['Technology', 'Web Development', 'Hardware', 'Design', 'Business', 'Tutorial', 'News'])
    .withMessage('Invalid category')
];

// GET all blogs (public - only published)
router.get('/', async (req, res) => {
  try {
    const { category, tag, limit, published } = req.query;
    let query = {};

    // Only show published blogs for public access
    if (published !== 'false') {
      query.published = true;
    }

    if (category) query.category = category;
    if (tag) query.tags = tag;

    const blogs = await Blog.find(query)
      .sort({ createdAt: -1 })
      .limit(limit ? parseInt(limit) : 0)
      .select('-__v');

    res.json({ success: true, count: blogs.length, data: blogs });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
});

// GET single blog by slug (public)
router.get('/slug/:slug', async (req, res) => {
  try {
    const blog = await Blog.findOne({ slug: req.params.slug, published: true });

    if (!blog) {
      return res.status(404).json({ success: false, message: 'Blog post not found' });
    }

    // Increment views
    blog.views += 1;
    await blog.save();

    res.json({ success: true, data: blog });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
});

// GET single blog by ID (protected - for admin)
router.get('/:id', authenticate, async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({ success: false, message: 'Blog post not found' });
    }

    res.json({ success: true, data: blog });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
});

// CREATE new blog (protected)
router.post('/', authenticate, validateBlog, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    const blog = new Blog(req.body);
    await blog.save();

    res.status(201).json({ success: true, message: 'Blog post created successfully', data: blog });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ success: false, message: 'Blog with this slug already exists' });
    }
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
});

// UPDATE blog (protected)
router.put('/:id', authenticate, validateBlog, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    const blog = await Blog.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!blog) {
      return res.status(404).json({ success: false, message: 'Blog post not found' });
    }

    res.json({ success: true, message: 'Blog post updated successfully', data: blog });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
});

// DELETE blog (protected)
router.delete('/:id', authenticate, async (req, res) => {
  try {
    const blog = await Blog.findByIdAndDelete(req.params.id);

    if (!blog) {
      return res.status(404).json({ success: false, message: 'Blog post not found' });
    }

    res.json({ success: true, message: 'Blog post deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
});

export default router;

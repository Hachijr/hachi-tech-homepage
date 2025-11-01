import express from 'express';
import { authenticate } from '../middleware/auth.js';
import Project from '../models/Project.js';
import Blog from '../models/Blog.js';
import Service from '../models/Service.js';
import Testimonial from '../models/Testimonial.js';
import Contact from '../models/Contact.js';
import Newsletter from '../models/Newsletter.js';

const router = express.Router();

// GET dashboard statistics (protected)
router.get('/dashboard', authenticate, async (req, res) => {
  try {
    const [
      projectCount,
      blogCount,
      publishedBlogCount,
      serviceCount,
      testimonialCount,
      approvedTestimonialCount,
      contactCount,
      newContactCount,
      newsletterCount,
      totalBlogViews
    ] = await Promise.all([
      Project.countDocuments(),
      Blog.countDocuments(),
      Blog.countDocuments({ published: true }),
      Service.countDocuments(),
      Testimonial.countDocuments(),
      Testimonial.countDocuments({ approved: true }),
      Contact.countDocuments(),
      Contact.countDocuments({ status: 'New' }),
      Newsletter.countDocuments({ subscribed: true }),
      Blog.aggregate([{ $group: { _id: null, total: { $sum: '$views' } } }])
    ]);

    // Get recent contacts
    const recentContacts = await Contact.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .select('name email subject status createdAt');

    // Get popular blogs
    const popularBlogs = await Blog.find({ published: true })
      .sort({ views: -1 })
      .limit(5)
      .select('title views createdAt');

    res.json({
      success: true,
      data: {
        stats: {
          projects: projectCount,
          blogs: {
            total: blogCount,
            published: publishedBlogCount,
            totalViews: totalBlogViews[0]?.total || 0
          },
          services: serviceCount,
          testimonials: {
            total: testimonialCount,
            approved: approvedTestimonialCount
          },
          contacts: {
            total: contactCount,
            new: newContactCount
          },
          newsletter: newsletterCount
        },
        recentContacts,
        popularBlogs
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
});

export default router;

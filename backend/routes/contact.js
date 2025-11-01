import express from 'express';
import { body, validationResult } from 'express-validator';
import Contact from '../models/Contact.js';
import Newsletter from '../models/Newsletter.js';
import { authenticate } from '../middleware/auth.js';
import { sendContactNotification, sendContactAutoReply, sendNewsletterWelcome } from '../utils/emailService.js';

const router = express.Router();

// Validation middleware for contact form
const validateContact = [
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('email').isEmail().normalizeEmail().withMessage('Valid email is required'),
  body('subject').trim().notEmpty().withMessage('Subject is required'),
  body('message').trim().notEmpty().withMessage('Message is required')
];

// Validation middleware for newsletter
const validateNewsletter = [
  body('email').isEmail().normalizeEmail().withMessage('Valid email is required')
];

// POST contact form submission (public)
router.post('/', validateContact, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    // Get IP and user agent
    const ipAddress = req.ip || req.connection.remoteAddress;
    const userAgent = req.get('user-agent');

    const contactData = {
      ...req.body,
      ipAddress,
      userAgent
    };

    const contact = new Contact(contactData);
    await contact.save();

    // Send notification emails
    try {
      await sendContactNotification(contactData);
      await sendContactAutoReply(contactData);
    } catch (emailError) {
      console.error('Email sending failed:', emailError);
      // Continue even if email fails
    }

    res.status(201).json({ 
      success: true, 
      message: 'Thank you for contacting us! We will get back to you soon.',
      data: contact 
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
});

// GET all contact messages (protected)
router.get('/', authenticate, async (req, res) => {
  try {
    const { status, limit } = req.query;
    let query = {};

    if (status) query.status = status;

    const contacts = await Contact.find(query)
      .sort({ createdAt: -1 })
      .limit(limit ? parseInt(limit) : 0);

    res.json({ success: true, count: contacts.length, data: contacts });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
});

// GET single contact message (protected)
router.get('/:id', authenticate, async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);

    if (!contact) {
      return res.status(404).json({ success: false, message: 'Contact message not found' });
    }

    // Mark as read
    if (contact.status === 'New') {
      contact.status = 'Read';
      await contact.save();
    }

    res.json({ success: true, data: contact });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
});

// UPDATE contact status (protected)
router.patch('/:id/status', authenticate, async (req, res) => {
  try {
    const { status } = req.body;

    if (!['New', 'Read', 'Responded', 'Archived'].includes(status)) {
      return res.status(400).json({ success: false, message: 'Invalid status' });
    }

    const contact = await Contact.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!contact) {
      return res.status(404).json({ success: false, message: 'Contact message not found' });
    }

    res.json({ success: true, message: 'Status updated successfully', data: contact });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
});

// DELETE contact message (protected)
router.delete('/:id', authenticate, async (req, res) => {
  try {
    const contact = await Contact.findByIdAndDelete(req.params.id);

    if (!contact) {
      return res.status(404).json({ success: false, message: 'Contact message not found' });
    }

    res.json({ success: true, message: 'Contact message deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
});

// POST newsletter subscription (public)
router.post('/newsletter', validateNewsletter, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    const { email, name } = req.body;

    // Check if already subscribed
    let subscriber = await Newsletter.findOne({ email });

    if (subscriber) {
      if (subscriber.subscribed) {
        return res.status(400).json({ success: false, message: 'Email already subscribed' });
      } else {
        // Resubscribe
        subscriber.subscribed = true;
        subscriber.subscribedAt = new Date();
        subscriber.unsubscribedAt = null;
        await subscriber.save();
      }
    } else {
      // New subscriber
      subscriber = new Newsletter({ email, name });
      await subscriber.save();
    }

    // Send welcome email
    try {
      await sendNewsletterWelcome(email, name);
    } catch (emailError) {
      console.error('Newsletter welcome email failed:', emailError);
    }

    res.status(201).json({ 
      success: true, 
      message: 'Successfully subscribed to newsletter!',
      data: subscriber 
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
});

// GET all newsletter subscribers (protected)
router.get('/newsletter/all', authenticate, async (req, res) => {
  try {
    const subscribers = await Newsletter.find({ subscribed: true })
      .sort({ subscribedAt: -1 });

    res.json({ success: true, count: subscribers.length, data: subscribers });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
});

export default router;

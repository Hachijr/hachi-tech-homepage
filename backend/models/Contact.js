import mongoose from 'mongoose';

const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    trim: true,
    lowercase: true,
    match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email']
  },
  phone: {
    type: String,
    trim: true
  },
  subject: {
    type: String,
    required: [true, 'Subject is required'],
    trim: true
  },
  message: {
    type: String,
    required: [true, 'Message is required']
  },
  serviceInterest: {
    type: String,
    enum: ['Hardware Repair', 'Web Development', 'Graphic Design', 'UX/UI Design', 'General Inquiry', 'Other']
  },
  status: {
    type: String,
    enum: ['New', 'Read', 'Responded', 'Archived'],
    default: 'New'
  },
  ipAddress: {
    type: String
  },
  userAgent: {
    type: String
  }
}, {
  timestamps: true
});

// Index for status and date
contactSchema.index({ status: 1, createdAt: -1 });

export default mongoose.model('Contact', contactSchema);

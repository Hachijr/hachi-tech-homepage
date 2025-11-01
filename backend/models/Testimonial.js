import mongoose from 'mongoose';

const testimonialSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Client name is required'],
    trim: true
  },
  position: {
    type: String,
    trim: true
  },
  company: {
    type: String,
    trim: true
  },
  review: {
    type: String,
    required: [true, 'Review text is required']
  },
  rating: {
    type: Number,
    required: [true, 'Rating is required'],
    min: 1,
    max: 5,
    default: 5
  },
  avatar: {
    type: String,
    default: 'https://ui-avatars.com/api/?name=Client&background=007BFF&color=fff'
  },
  serviceUsed: {
    type: String,
    trim: true
  },
  approved: {
    type: Boolean,
    default: false
  },
  featured: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

// Index for approved and featured testimonials
testimonialSchema.index({ approved: -1, featured: -1 });

export default mongoose.model('Testimonial', testimonialSchema);

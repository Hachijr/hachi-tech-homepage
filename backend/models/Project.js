import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Project title is required'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Project description is required']
  },
  imageURL: {
    type: String,
    required: [true, 'Project image is required']
  },
  category: {
    type: String,
    required: [true, 'Project category is required'],
    enum: ['Web Development', 'Mobile App', 'Hardware Repair', 'Graphic Design', 'UX/UI Design', 'Other']
  },
  techStack: [{
    type: String,
    trim: true
  }],
  projectLink: {
    type: String,
    trim: true
  },
  githubLink: {
    type: String,
    trim: true
  },
  featured: {
    type: Boolean,
    default: false
  },
  completionDate: {
    type: Date
  },
  client: {
    type: String,
    trim: true
  },
  status: {
    type: String,
    enum: ['Completed', 'In Progress', 'Planned'],
    default: 'Completed'
  }
}, {
  timestamps: true
});

// Index for faster queries
projectSchema.index({ category: 1, featured: -1 });

export default mongoose.model('Project', projectSchema);

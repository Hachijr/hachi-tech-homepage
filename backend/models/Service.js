import mongoose from 'mongoose';

const serviceSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Service title is required'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Service description is required']
  },
  icon: {
    type: String,
    required: [true, 'Service icon is required']
  },
  image: {
    type: String
  },
  features: [{
    type: String,
    trim: true
  }],
  pricing: {
    startingPrice: {
      type: Number
    },
    currency: {
      type: String,
      default: 'ZMW'
    },
    pricingModel: {
      type: String,
      enum: ['Fixed', 'Hourly', 'Project-based', 'Custom'],
      default: 'Custom'
    }
  },
  bookingAvailable: {
    type: Boolean,
    default: true
  },
  popular: {
    type: Boolean,
    default: false
  },
  order: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

// Sort by order and popularity
serviceSchema.index({ order: 1, popular: -1 });

export default mongoose.model('Service', serviceSchema);

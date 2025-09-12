const mongoose = require('mongoose');

const tourSchema = new mongoose.Schema({
  tour_id: {
    type: Number,
    required: true,
    unique: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  pick_up: {
    type: String,
    default: ''
  },
  meeting_point: {
    type: String,
    default: ''
  },
  drop_off: {
    type: String,
    default: ''
  },
  duration: {
    type: Number,
    required: true
  },
  duration_unit: {
    type: String,
    enum: ['hours', 'days'],
    default: 'days'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Tour', tourSchema);
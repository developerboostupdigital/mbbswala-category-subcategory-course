const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  category_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'courseCategory',
    required: true,
  },
  sub_category_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'courseSubCategory',
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  description: {
    type: String,
  },
  price: {
    type: String,
  },
  status: {
    type: Boolean,
    default: true,
  },
}, { timestamps: true });

module.exports = mongoose.model('course', courseSchema);
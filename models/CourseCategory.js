const mongoose = require('mongoose');

const courseCategorySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  status: {
    type: Boolean,
    default: true,
  },
}, { timestamps: true });

module.exports = mongoose.model('courseCategory', courseCategorySchema);

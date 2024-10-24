const mongoose = require("mongoose");

const courseSubCategorySchema = new mongoose.Schema(
  {
    category_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "courseCategory",
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    status: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("courseSubCategory", courseSubCategorySchema);

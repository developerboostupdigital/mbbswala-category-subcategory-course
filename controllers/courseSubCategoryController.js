const CourseSubCategory = require("../models/CourseSubCategory");

exports.createSubCategory = async (req, res) => {
  try {
    const {category_id, title, status } = req.body;

    const category = new CourseSubCategory({
      category_id,
      title,
      status: status || true,
    });

    const savedCategory = await category.save();
    res.status(201).json(savedCategory);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getAllSubCategories = async (req, res) => {
  try {
    const categories = await CourseSubCategory.find().populate('category_id');
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getSubCategoryById = async (req, res) => {
  try {
    const category = await CourseSubCategory.findById(req.params.id).populate('category_id');
    if (!category) {
      return res.status(404).json({ message: "Sub Category not found" });
    }
    res.json(category);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateSubCategory = async (req, res) => {
  try {
    const {category_id, title, status } = req.body;

    const category = await CourseSubCategory.findById(req.params.id);

    if (!category) {
      return res.status(404).json({ message: "Sub Category not found" });
    }
    category.category_id = category_id || category.category_id;
    category.title = title || category.title;
    category.status = status !== undefined ? status : category.status;

    const updatedCategory = await category.save();
    res.json(updatedCategory);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteSubCategory = async (req, res) => {
  try {
    const category = await CourseSubCategory.findById(req.params.id);
    if (!category) {
      return res.status(404).json({ message: "Sub Category not found" });
    }

    await category.deleteOne();
    res.json({ message: "Sub Category removed" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

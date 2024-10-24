const fs = require('fs');
const path = require('path');
const Course = require('../models/Course');

exports.createCourse = async (req, res) => {
  try {
    const { category_id,sub_category_id, title, description, price, status } = req.body;
    const image = req.file ? req.file.path : null; 

    const course = new Course({
      category_id,
      sub_category_id,
      title,
      image,
      description,
      price,
      status,
    });

    const savedCourse = await course.save();
    res.status(201).json(savedCourse);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getCourses = async (req, res) => {
  try {
    const courses = await Course.find().populate('category_id').populate('sub_category_id');
    res.json(courses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getCourseById = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id).populate('category_id').populate('sub_category_id');
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }
    res.json(course);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateCourse = async (req, res) => {
  try {
    const { category_id, sub_category_id, title, description, price, status } = req.body;
    const newImage = req.file ? req.file.path : null;

    const course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    if (newImage && course.image) {
      const oldImagePath = path.join(__dirname, '..', course.image);
      if (fs.existsSync(oldImagePath)) {
        fs.unlink(oldImagePath, (err) => {
          if (err) {
            console.error('Error deleting old image:', err);
          }
        });
      }
    }

    course.category_id = category_id || course.category_id;
    course.sub_category_id = sub_category_id || course.sub_category_id;
    course.title = title || course.title;
    course.description = description || course.description;
    course.price = price || course.price;

    course.status = status !== undefined ? status : course.status;
    if (newImage) course.image = newImage;

    const updatedCourse = await course.save();
    res.json(updatedCourse);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    if (course.image) {
      const imagePath = path.join(__dirname, '..', course.image);
      if (fs.existsSync(imagePath)) {
        fs.unlink(imagePath, (err) => {
          if (err) {
            console.error('Error deleting image:', err);
          }
        });
      }
    }

    await Course.findByIdAndDelete(req.params.id);
    res.json({ message: 'Course and associated image removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
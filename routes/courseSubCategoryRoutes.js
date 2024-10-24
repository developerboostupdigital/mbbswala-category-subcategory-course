const express = require('express');
const { createSubCategory, getAllSubCategories, getSubCategoryById, updateSubCategory, deleteSubCategory } = require('../controllers/courseSubCategoryController');
const upload = require('../middleware/uploadMiddleware'); 
const router = express.Router();

router.post('/', upload.single('image'), createSubCategory);

router.get('/', getAllSubCategories);

router.get('/:id', getSubCategoryById);

router.put('/:id', upload.single('image'), updateSubCategory);

router.delete('/:id', deleteSubCategory);

module.exports = router;

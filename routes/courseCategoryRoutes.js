const express = require('express');
const { createCategory, getAllCategories, getCategoryById, updateCategory, deleteCategory } = require('../controllers/courseCategoryController');
const upload = require('../middleware/uploadMiddleware'); 
const router = express.Router();

router.post('/', upload.single('image'), createCategory);

router.get('/', getAllCategories);

router.get('/:id', getCategoryById);

router.put('/:id', upload.single('image'), updateCategory);

router.delete('/:id', deleteCategory);

module.exports = router;

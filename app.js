const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

const courseCategoryRoutes = require('./routes/courseCategoryRoutes');
const courseSubCategoryRoutes = require('./routes/courseSubCategoryRoutes');
const courseRoutes = require('./routes/courseRoutes');

const errorHandler = require('./middleware/errorHandler'); 
const cors = require("cors");
const app = express();
dotenv.config(); 

// Connect to the database
connectDB();

app.use(express.json());
app.use(cors());

// Make uploads folder public
app.use('/uploads', express.static('uploads'));


// Use course category routes
app.use('/api/course-categories', courseCategoryRoutes);

// Use course sub category routes
app.use('/api/course-sub-categories', courseSubCategoryRoutes);

// Use course routes
app.use('/api/courses', courseRoutes);


app.use(errorHandler);

// Start server
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));
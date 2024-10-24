const express = require("express");
const router = express.Router();
const upload = require("../middleware/uploadMiddleware");
const {
  createCourse,
  getCourses,
  getCourseById,
  updateCourse,
  deleteCourse,
} = require("../controllers/CourseController");

router.post("/", upload.single("image"), createCourse);
router.get("/", getCourses);
router.get("/:id", getCourseById);
router.put("/:id", upload.single("image"), updateCourse);
router.delete("/:id", deleteCourse);

module.exports = router;

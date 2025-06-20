// [SECTION] Dependencies and Modules
const express = require("express");
const courseController = require("../controllers/course");
const { verify, verifyAdmin } = require('../auth');

// [SECTION] Routing Component
const router = express.Router();

// [SECTION] Activity Solution
// Route for adding a course
router.post("/", verify, verifyAdmin, courseController.addCourse); 

router.get("/all", verify, verifyAdmin, courseController.getAllCourses);

router.get("/", courseController.getAllActive);

// req.params.id is a wildcard - this can store information similar to a variable
// it acts like a variable located in your parameter
// id - 67edfa1f4c76730259da3ec7
router.get("/specific/:id", courseController.getCourse);

// Route for updating a course (Admin)
router.patch("/:courseId", verify, verifyAdmin, courseController.updateCourse);

// Activity: Route to archiving a course (Admin)
router.patch("/:courseId/archive", verify, verifyAdmin, courseController.archiveCourse);

// Activity: Route to activating a course (Admin)
router.patch("/:courseId/activate", verify, verifyAdmin, courseController.activateCourse);

// Route to search for courses by course name
// router.post('/search', courseController.searchCoursesByName);

router.post('/search', courseController.searchCourse);

module.exports = router;
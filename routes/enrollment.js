// [SECTION] Dependencies and Modules
const express = require('express');
const enrollmentController = require('../controllers/enrollment');
const { verify } = require('../auth');

// [SECTION] Router
const router = express.Router();

// router for enrolling to a course
// http://localhost:4000/enrollments/enroll
router.post('/enroll', verify, enrollmentController.enroll);

// Activity: Route to get the user's enrollements array
router.get('/get-enrollments', verify, enrollmentController.getEnrollments);

module.exports = router;
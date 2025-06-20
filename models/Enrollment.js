// [SECTION] Dependencies and Modules
const mongoose = require('mongoose');

// [SECTION] Mongoose Schema
const enrollmentSchema = new mongoose.Schema({
	userId: {
		// type - refers to the data type expected for the userId value
		type: String,
		// required - true - value is needed when creating the document
		// if the userId is not provided, the error message will be shown
		required: [true, 'UserID is Required']
	},
	enrolledCourses: [
		{
			courseId: {
				type: String,
				required: [true, 'CourseID is Required']
			}
		}
	],
	totalPrice: {
		type: Number,
		required: [true, 'Price is Required']
	},
	enrolledOn: {
		type: Date,
		// Date.now property - current time and date upon creation of the document
		default: Date.now
	},
	status: {
		type: String,
		default: 'Enrolled'
	}
});

// [SECTION] Mongoose Model
module.exports = mongoose.model('Enrollment', enrollmentSchema);
const Enrollment = require('../models/Enrollment');
const { errorHandler } = require('../auth');

// controller function for enrolling to a course
module.exports.enroll = (req, res) => {

	// if the user is an admin, the user should not be able to enroll to a course
	if(req.user.isAdmin) {
		return res.status(403).send({ message: 'Admin is forbidden' });
	}

	// if the user is not an admin, we will create a variable called "newEnrollment" which will create an instance of the enrollment document form the Enrollment model
	let newEnrollment = new Enrollment({
		// this will be retrieve from the access token payload
		userId: req.user.id,
		enrolledCourses: req.body.enrolledCourses,
		totalPrice: req.body.totalPrice
	})

	// Using save() method, save the document "newEnrollment" in the "enrollments" collection
	return newEnrollment.save()
	// If the documents is saved successfully, the document will be sent as a response back to the client/postman and saved in the variable "enrollment"
	.then(enrollment => {
		// 201 means created. This means that a resource was created and added into the database
		return res.status(201).send({
            success: true,
            message: 'Enrolled successfully'
        });
	})
	.catch(err => errorHandler(err, req, res));
}

// controller function to get user enrollments
module.exports.getEnrollments = (req, res) => {

	// use the find() method to retrieve ALL documents that contains the same "id" value given in the req.user from the "enrollments" sollection
    return Enrollment.find({ _id : req.user.id})
    // it will return an array of documents and store it in the variable "enrollments"
    // if there is no document found, it will return an empty array and save it in the variable "enrollments"
    .then(enrollments => {

    	// if there are enrolled courses, return the enrollments.
        if(enrollments.length > 0) {
            return res.status(200).send(enrollments);
        }
        
        // if there is no enrolled courses, send a message 'No enrolled courses'.
        return res.status(404).send({
            message: 'No enrolled courses'
        });
    })
    .catch(error => errorHandler(error, req, res));
};
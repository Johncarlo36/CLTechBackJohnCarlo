// [SECTION] Dependencies and Modules
const Course = require("../models/Course");
const { errorHandler } = require('../auth');

// [SECTION] Activity Solution
// controller function for adding a course
/*
    Business Logic: 
        1. Instantiate a new object using the Course model and the request body data
        2. Save the record in the database using the mongoose method "save"
        3. Use the "then" method to send a response back to the client appliction based on the result of the "save" method
*/
module.exports.addCourse = (req, res) => {

    // created a variable named "newCourse" that will store the instance of the Course object
    let newCourse = new Course({
        name : req.body.name,
        description : req.body.description,
        price : req.body.price
    });

    // Using the findOne(), it will check the "courses" collection to retrieve the document with the same "name" value given in the request body
    return Course.findOne({ name: req.body.name })
    // if there is a document with the same "name" value, it will return the document and store it in the variable "existingCourse"
    // if there is no document found in with the same "name" value, it will retun null and save it in the variable "existingCourse"
    .then(existingCourse => {

        // if there is a document found
        if(existingCourse) {

            return res.status(409).send({ message: 'Course already exists'});

        // if there is no document found
        } else {

            // Using save() method, save the document "newCourse" in the "courses" collection
            return newCourse.save()
            // A promise is a "guarantee" that something will happen later.
            // In our code, after saving the document in the database
            // If the documents is saved successfully, the document will be sent as a response back to the client/postman
            .then(result => res.status(201).send({
                success: true,
                message: 'Course added successfully',
                // this is a shorthand, if the proerty and the variable that holds the value is the same, we can write them as one and it will be understood as result: result
                result
            }))
            // If the documents is not saved successfully, it will catch the error and return the message back to the client or postman
            .catch(err => errorHandler(err, req, res));
        }
    })
    .catch(err => errorHandler(err, req, res));
}; 

// controller function to retrieve all courses
module.exports.getAllCourses = (req, res) => {

    // Using the find(), it will retrieve ALL documents in the "courses" collection
    return Course.find({})
    // it will return an array of documents and store it in the variable "result"
    // if there is no document founde, it will return an empty array and save it in the variable "result"
    .then(result => {
        // if the array is not empty
        if(result.length > 0){

            // This provides the client with the requested data in a clear and structured manner
            return res.status(200).send(result);

        // if the array is empty
        } else {
            return res.status(404).send({ message: 'No courses found' });
        }
    })
    .catch(error => errorHandler(error, req, res));
};

// controller function to retrieve all active courses
module.exports.getAllActive = (req, res) => {

    // Using the find(), it will retrieve ALL documents where the "isActive" property is set to true in the "courses" collection
    return Course.find({ isActive: true })
    // if there is a document with the "isActive" property set to true, it will return an array of documents and store it in the variable "result"
    // if there is no document found, it will return an empty array and save it in the variable "result"
    .then(result => {
        // if the array is not empty
        if(result.length > 0){

            return res.status(200).send(result);

        // if the array is empty
        } else {
            return res.status(404).send({ message: 'No active courses found' });
        }
    })
    .catch(error => errorHandler(error, req, res));
};

// controller function to retrieve a specific course
module.exports.getCourse = (req, res) => {

    // Using the findById(), it will retrieve the document with the same "id" value given in the URL parameter in the "courses" collection
    // findById('67edfa1f4c76730259da3ec7')
    return Course.findById(req.params.id)
    // if there is a document with the same "id" value, it will return the document and store it in the variable "course"
    // if there is no document found in with the same "id value, it will retun null and save it in the variable "course"
    .then(course => {
        // if there is a document found
        if(course) {
            return res.status(200).send(course);
        // if there is no document found
        } else {
            return res.status(404).send({ message: 'Course not found' });
        }
    })
    .catch(err => errorHandler(err, req, res));   
};

// controller function to update a specific course
module.exports.updateCourse = (req, res) => {

    // created a variable named "updatedCourse" that will store the updated information of the Course document
    let updatedCourse = {
        name: req.body.name,
        description: req.body.description,
        price: req.body.price
    }

    // Using the findByIdAndUpdate(), it will retrieve the document with the same "id" value given in the URL parameter in the "courses" collection
    // the first parameter should contain the "id" value of the document to be updated and the second pareameter should contain the new values of the document to be updated.
    return Course.findByIdAndUpdate(req.params.courseId, updatedCourse)
    // if there is a document found and it was successfully updated, it will return the document and store it in the variable "course"
    // if there is no document found or it was not successfully updated, it will return null and save it in the variable "course"
    .then(course => {
        if (course) {
            res.status(200).send({ 
                success: true, 
                message: 'Course updated successfully'
            });
        } else {
            res.status(404).send({ message: 'Course not found' });
        }
    })
    .catch(error => errorHandler(error, req, res));
};

// controller function to archive a specific course
module.exports.archiveCourse = (req, res) => {
    // Using the findByIdAndUpdate(), it will retrieve the document with the same "id" value given in the URL parameter in the "courses" collection
    return Course.findById(req.params.courseId)
    // if there is a document found, it will return the document and store it in the variable "course"
    // if there is no document found, it will return null and save it in the variable "course"
    .then(course => {

        if (course) {

            // if the "isActive" property of the course is set to false
            if (!course.isActive) {
                return res.status(200).send({ 
                    message: 'Course already archived',
                    course
                });
            }
            
            // update the "isActive" property of the course document to false
            course.isActive = false;

             // Using save() method, save the updated document in the "courses" collection
            return course.save()
            // If the documents is saved successfully, the document will be sent as a response back to the client/postman and save it in the variable "updatedCourse"
            .then(updatedCourse => {
                return res.status(200).send({ 
                    success: true, 
                    message: 'Course archived successfully'
                });
            })
            .catch(error => errorHandler(error, req, res));

        } else {
            res.status(404).send({ message: 'Course not found' });
        }
    })
    .catch(error => errorHandler(error, req, res));
};

// controller function to activate a specific course
module.exports.activateCourse = (req, res) => {
    // Using the findByIdAndUpdate(), it will retrieve the document with the same "id" value given in the URL parameter in the "courses" collection
    return Course.findById(req.params.courseId)
    // if there is a document found, it will return the document and store it in the variable "course"
    // if there is no document found, it will return null and save it in the variable "course"
    .then(course => {

        if (course) {

            // if the "isActive" property of the course is set to true
            if (course.isActive) {
                return res.status(200).send({ 
                    message: 'Course already activated',
                    course
                });
            }
            
            // update the "isActive" property of the course document to true
            course.isActive = true;

             // Using save() method, save the updated document in the "courses" collection
            return course.save()
            // If the documents is saved successfully, the document will be sent as a response back to the client/postman and save it in the variable "updatedCourse"
            .then(updatedCourse => {
                return res.status(200).send({ 
                    success: true, 
                    message: 'Course activated successfully'
                });
            })
            .catch(error => errorHandler(error, req, res));
            
        } else {
            res.status(404).send({ message: 'Course not found' });
        }
    })
    .catch(error => errorHandler(error, req, res));
};

// Controller action to search for courses by course name
module.exports.searchCoursesByName = async (req, res) => {
  try {
    const { courseName } = req.body;

    // console.log(courseName);

    // Use a regular expression to perform a case-insensitive search
    const courses = await Course.find({
      name: { $regex: courseName, $options: 'i' }
    });

    res.json(courses);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports.searchCourse = async (req, res) => {
    try {
      const { name, minPrice, maxPrice } = req.body;
  
      const query = {};
  
      // Add name filter if provided
      if (name) {
        query.name = { $regex: name, $options: 'i' }; // case-insensitive search
      }
  
      // Add price filter if provided
      if (minPrice !== undefined || maxPrice !== undefined) {
        query.price = {};
        if (minPrice !== undefined) {
          query.price.$gte = minPrice;
        }
        if (maxPrice !== undefined) {
          query.price.$lte = maxPrice;
        }
      }
  
      console.log('Search Query:', query);
  
      const courses = await Course.find(query);
      res.json(courses);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
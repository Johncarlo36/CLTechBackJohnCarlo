// [SECTION] Dependencies and Modules
// use the "require" directive to load jsonwebtoken module/package that will send information between our application in a secure manner.
const jwt = require('jsonwebtoken');
// allows access to the environment variables inside .env file
require('dotenv').config();

// [SECTION] JSON Web Tokens
/*
	- JSON Web Token or JWT is a way of securely passing information from the server to the client or to other parts of a server
	- Information is kept secure through the use of the secret code
	- Only the system that knows the secret code that can decode the encrypted information
	- Imagine JWT as a gift wrapping service that secures the gift with a lock
	- Only the person who knows the secret code can open the lock
	- And if the wrapper has been tampered with, JWT also recognizes this and disregards the gift
	- This ensures that the data is secure from the sender to the receiver
*/

// [SECTION] Token Creation
/*
	Analogy: Pack the gift and provide a lock with the secret code as the key
*/
/*
	user = {
        firstName: "Hillary",
        lastName: "Almonte",
        email: "halmonte@mail.com",
        password: "$2b$12$v1HKMytZxXe0ifk2IagWbudr.3FOH0Zj4IlmSMlRYMWmSfkHS4qwm",
        isAdmin: false,
        mobileNo: "09123456789",
        _id: "67ecab6355c861bb1cd66c74",
        __v: 0
    }
*/
module.exports.createAccessToken = (user) => {

	// It will store the information received from the "user" variable into the "data" variable
	/*
		data = {
			id: "67ecab6355c861bb1cd66c74",
			email: "halmonte@mail.com",
			isAdmin: false
		}
	*/
	const data = {
		id: user._id,
		email: user.email,
		isAdmin: user.isAdmin
	};

	// .sign() method will be used to generate the JSON web token
	// It accepts 3 arguments, the first argument contains the payload which is the information that we will send between applications, the second arguments contains the secret key that is defined by the developer, and the third argument are optional additions in our jwt 
	/* return "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3ZWNhYjYzNTVjODYxYmIxY2Q2NmM3NCIsImVtYWlsIjoiaGFsbW9udGVAbWFpbC5jb20iLCJpc0FkbWluIjpmYWxzZSwiaWF0IjoxNzQzNTcxNjcxfQ.O3zXpX66x3wYCXB9oV4UVRK_0zKvXDsIv-3-cVtFqdw" */
	return jwt.sign(data, process.env.JWT_SECRET_KEY, {});
};

// Token Verification
/*
	verify() will verify the access token given by the user to check if it is legitimate from our application to allow access to our application
*/
// "req" parameter will contain the request object
// "res" parameter will contain the response object
// "next" parameter will be responsible for contniuing unto the next function
module.exports.verify = (req, res, next) => {

	// display the content of the request body authorization
	/* console.log(Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3ZWNhYjYzNTVjODYxYmIxY2Q2NmM3NCIsImVtYWlsIjoiaGFsbW9udGVAbWFpbC5jb20iLCJpc0FkbWluIjpmYWxzZSwiaWF0IjoxNzQzNjQyMzQ0fQ.wmHYFdHVOUYsmKTlOKhgkX8ipTOIs0WJsg6fXAKPu0w) */
	console.log(req.headers.authorization);

	// store the contant of the req.headers.authorization in the "token" variable
	/* token = Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3ZWNhYjYzNTVjODYxYmIxY2Q2NmM3NCIsImVtYWlsIjoiaGFsbW9udGVAbWFpbC5jb20iLCJpc0FkbWluIjpmYWxzZSwiaWF0IjoxNzQzNjQyMzQ0fQ.wmHYFdHVOUYsmKTlOKhgkX8ipTOIs0WJsg6fXAKPu0w */
	let token = req.headers.authorization;

	// if the token is empty or undefined
	if(typeof token === "undefined") {

		return res.status(400).send({ auth: "Failed. No Token" });

	// else, there is a token inside the authorization header
	} else {

		/* console.log(Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3ZWNhYjYzNTVjODYxYmIxY2Q2NmM3NCIsImVtYWlsIjoiaGFsbW9udGVAbWFpbC5jb20iLCJpc0FkbWluIjpmYWxzZSwiaWF0IjoxNzQzNjQyMzQ0fQ.wmHYFdHVOUYsmKTlOKhgkX8ipTOIs0WJsg6fXAKPu0w) */
		console.log(token);
		// reassign the sliced token in the "token" variable
		/* token = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3ZWNhYjYzNTVjODYxYmIxY2Q2NmM3NCIsImVtYWlsIjoiaGFsbW9udGVAbWFpbC5jb20iLCJpc0FkbWluIjpmYWxzZSwiaWF0IjoxNzQzNjQyMzQ0fQ.wmHYFdHVOUYsmKTlOKhgkX8ipTOIs0WJsg6fXAKPu0w */
		token = token.slice(7, token.length);
		/* console.log(eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3ZWNhYjYzNTVjODYxYmIxY2Q2NmM3NCIsImVtYWlsIjoiaGFsbW9udGVAbWFpbC5jb20iLCJpc0FkbWluIjpmYWxzZSwiaWF0IjoxNzQzNjQyMzQ0fQ.wmHYFdHVOUYsmKTlOKhgkX8ipTOIs0WJsg6fXAKPu0w) */
		console.log(token);

		// Token Decryption
		// .verify() method of the JWT module will decrypot the token using the secret key and return the decrypted information in the decodedToken variable
		// different from the previous functions, the err will be stored in the first parameter and the decoded token will be stored in the second parameter
		/*
			decodedToken = {
			  id: '67ecab6355c861bb1cd66c74',
			  email: 'halmonte@mail.com',
			  isAdmin: false,
			  iat: 1743642344
			}
		*/
		jwt.verify(token, process.env.JWT_SECRET_KEY, function(err, decodedToken) {

			// if there was an error encountered
			if(err) {

				// 403 means forbidden. This means that the action that the client is trying to perform is not allowed but it is not related to their credentials
				// Since there is a token, we are expected to already be logged in which means that the error could be an expired token or invalid token 
				return res.status(403).send({
					auth: "Failed",
					message: err.message
				});

			// else, there was no error
			} else {

				console.log('Result from verify method:');
				/* console log({
					  id: '67ecab6355c861bb1cd66c74',
					  email: 'halmonte@mail.com',
					  isAdmin: false,
					  iat: 1743642344
					})
				*/
				console.log(decodedToken);

				// reassigned the decoded token into the property user in the req object
				/*
					req.user = {
					  id: '67ecab6355c861bb1cd66c74',
					  email: 'halmonte@mail.com',
					  isAdmin: false,
					  iat: 1743642344
					}
				*/
				req.user = decodedToken;

				// next() is a expressJS function which will allow the continutaion of the execution
				next();
			}
		})
	}
}

// verifyAdmin() will be used to check is the user is an admin or not
module.exports.verifyAdmin = (req, res, next) => {

	// if the req.user.isAdmin is set to true, we will continue to the next middleware
	if(req.user.isAdmin) {

		next();

	// if the user is not and admin, we will send a message back to postman/client
	} else {

		return res.status(403).send({
			auth: "Failed",
			message: "Action Forbidden"
		})
	}
}

// middleware function to display any error that our controller will receive/catch
// a function will be considered a middleware id it has access to the request and response objects
/*
	The first parameter will contain the error, the second parameter will contain therequest object, the third parameter will contain the response object, and the fourth parasmeter will containe the next method
*/
module.exports.errorHandler = (err, req, res, next) => {
	
	// display/log the complete error in the console/terminal 
	// this is used by the developers for debugging purposes
	console.log(err);

	// if there is a value given in the status property of the "err" object, it will be stored in the "statusCode" variable
	// if there is no value given in the status property of the "err" object, it will store "500" as the status code in the "statusCode" variable
	// 500 means internal server error
	const statusCode = err.status || 500;
	// created a variable that will contain the error message.
	// if there is a value in the "message" property of the "err" object, it will save the message given in the "errorMessage" variable
	// if there is no value given in the "message" property of the "err" object, it will save the message "Internal Server Error" in the "errorMessage" variable
	const errorMessage = err.message || 'Internal Server Error';

	// send a response back to the client containing the HTTP status code and the json response for the message, error code, and details
	// .json() method of the response object sends a json fomat response back to the client
	return res.status(statusCode).json({
		error: {
			message: errorMessage,
			errorCode: err.code || 'SERVER_ERROR',
			details: err.details || null
		}
	})
}
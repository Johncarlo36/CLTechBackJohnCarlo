// [SECTION] Dependencies and Modules
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config(); // Load environment variables early

// [SECTION] Express App Initialization
const app = express();
const PORT = process.env.PORT || 4000;
const MONGODB_STRING = process.env.MONGODB_STRING;

// [SECTION] Validate MongoDB URI
if (!MONGODB_STRING) {
	console.error("❌ ERROR: MONGODB_STRING is undefined. Please check your environment variables.");
	process.exit(1); // Stop app if no DB URI
}

// [SECTION] MongoDB Connection
mongoose.connect(MONGODB_STRING)
	.then(() => console.log('✅ Connected to MongoDB Atlas'))
	.catch((err) => {
		console.error('❌ MongoDB connection error:', err.message);
		process.exit(1);
	});

// [SECTION] CORS Configuration
const corsOptions = {
	origin: [
		'https://cltechjohncarlo.vercel.app', // ✅ Your deployed frontend
		'http://localhost:8000'               // ✅ Local React dev port
	],
	credentials: true,
	optionsSuccessStatus: 200
};

// [SECTION] Middleware Setup
app.use(express.json());
app.use(cors(corsOptions));

// [SECTION] Routes
const userRoute = require('./routes/user');
const courseRoutes = require('./routes/course');
const enrollmentRoutes = require('./routes/enrollment');
const newsRoutes = require('./routes/news');

// [SECTION] Test Root Route
app.get('/', (req, res) => {
	res.send('🚀 CLTech backend is up and running!');
});

// [SECTION] API Routes
app.use('/users', userRoute);
app.use('/courses', courseRoutes);
app.use('/enrollments', enrollmentRoutes);
app.use('/news', newsRoutes);

// [SECTION] Start Server (if not being tested)
if (require.main === module) {
	app.listen(PORT, () => {
		console.log(`🚀 API is running on http://localhost:${PORT}`);
	});
}

// [SECTION] Export App and Mongoose for Testing
module.exports = { app, mongoose };

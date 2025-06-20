// Basic ExpressJS Application

// [SECTION] Dependencies and Modules
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config(); // Load environment variables early

// [SECTION] Routes
const userRoute = require('./routes/user');
const courseRoutes = require('./routes/course');
const enrollmentRoutes = require('./routes/enrollment');
const newsRoutes = require('./routes/news');

// [SECTION] Server Setup
const app = express();
const PORT = process.env.PORT || 4000;
const MONGODB_STRING = process.env.MONGODB_STRING;

// [SECTION] Validate MongoDB URI
if (!MONGODB_STRING) {
	console.error("❌ ERROR: MONGODB_STRING is undefined. Please check your environment variables.");
	process.exit(1);
}

// [SECTION] MongoDB Connection (no deprecated options)
mongoose.connect(MONGODB_STRING)
	.then(() => console.log('✅ Connected to MongoDB Atlas'))
	.catch((err) => {
		console.error('❌ MongoDB connection error:', err.message);
		process.exit(1);
	});

// [SECTION] CORS Options
const corsOptions = {
	origin: ['http://localhost:8000', 'http://localhost:3000'],
	credentials: true,
	optionsSuccessStatus: 200
};

// [SECTION] Middlewares
app.use(express.json());
app.use(cors(corsOptions));

// [SECTION] Root Route - Fixes "Cannot GET /"
app.get('/', (req, res) => {
	res.send('🚀 Server is up and running!');
});

// [SECTION] Backend Routes
app.use('/users', userRoute);
app.use('/courses', courseRoutes);
app.use('/enrollments', enrollmentRoutes);
app.use('/news', newsRoutes);

// [SECTION] Start Server
if (require.main === module) {
	app.listen(PORT, () => {
		console.log(`🚀 API is running at http://localhost:${PORT}`);
	});
}

// [SECTION] Export app for testing or other usage
module.exports = { app, mongoose };

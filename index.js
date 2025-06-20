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

// [SECTION] MongoDB Connection
mongoose.connect(MONGODB_STRING, {
	useNewUrlParser: true,
	useUnifiedTopology: true
})
.then(() => console.log('✅ Connected to MongoDB Atlas'))
.catch((err) => {
	console.error('❌ MongoDB connection error:', err.message);
	process.exit(1); // Exit if DB connection fails
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

// [SECTION] Backend Routes
app.use('/users', userRoute);
app.use('/courses', courseRoutes);
app.use('/enrollments', enrollmentRoutes);
app.use('/news', newsRoutes);

// [SECTION] Start Server
if (require.main === module) {
	app.listen(PORT, () => console.log(`🚀 API is running at http://localhost:${PORT}`));
}

// [SECTION] Export app for testing or other usage
module.exports = { app, mongoose };

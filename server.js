const express = require('express');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');

const connectDB = require('./config/db');
const errorHandler = require('./middleware/errorHandler');
// Load env vars
dotenv.config();

const app = express();

// Body parser
app.use(express.json());

// Cookie Parser
app.use(cookieParser());

// Connect to database
connectDB();

// Route files
const auth = require('./routes/auth.route');
const restaurant = require('./routes/restaurant.route');

// Mount routes
app.use('/api/v1/auth', auth);
app.use('/api/v1/restaurant', restaurant);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`));

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
  console.log(`Error : ${err.message}`);

  // Close server
  server.close(() => process.exit(1));
});

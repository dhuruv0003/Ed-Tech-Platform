require('dotenv').config();
const express = require('express');
const passport = require('passport');
const cors = require('cors');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const errorHandler = require('./middleware/errorMiddleware');

// ✅ Ensure passport strategies are loaded BEFORE routes
require('./config/passport'); 

const app = express();

// ✅ Connect to DB
connectDB();

// ✅ Middlewares
app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true
}));
app.use(express.json());
app.use(passport.initialize());

// ✅ Routes
app.use('/api/auth', authRoutes);

// ✅ Error Handling Middleware
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});

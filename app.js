const express = require('express');
const connectDB = require('./config/db');
const userRoutes = require('./Routes/userRoutes');

const app = express();

// Database connection
connectDB();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// View engine setup
app.set('view engine', 'ejs');           // Set view engine to EJS
app.set('views', './views');             // Set views folder

// User routes
app.use('/', userRoutes);

// Server listen
const PORT = process.env.PORT || 8002;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

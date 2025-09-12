const express = require('express');
const cors = require('cors');
const tourRoutes = require('./routes/tourRoutes');
const errorHandler = require('./utils/errorHandler');
const swaggerDocs = require('./swagger');

const app = express();

// Body parser middleware
app.use(express.json());

// Enable CORS
app.use(cors());

// Mount routes
app.use('/api/tour', tourRoutes);

// Swagger documentation
swaggerDocs(app);

// Error handling middleware
app.use(errorHandler);

module.exports = app;
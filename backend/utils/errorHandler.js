const logger = require('../config/logger');

const errorHandler = (err, req, res, next) => {
  logger.error(`${err.name}: ${err.message}`);
  
  res.status(err.statusCode || 500).json({
    success: false,
    error: err.message || 'Server Error'
  });
};

module.exports = errorHandler;
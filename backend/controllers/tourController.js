const Tour = require('../models/tourModel');
const logger = require('../config/logger');

// @desc    Get all tours
// @route   GET /api/tour
exports.getAllTours = async (req, res) => {
  try {
    const tours = await Tour.find();
    
    logger.info('Fetched all tours successfully');
    
    res.status(200).json({
      success: true,
      count: tours.length,
      data: {
        tour_options: tours
      }
    });
  } catch (error) {
    logger.error(`Error fetching tours: ${error.message}`);
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};

// @desc    Create a new tour
// @route   POST /api/tour
exports.createTour = async (req, res) => {
  try {
    const tour = await Tour.create(req.body);
    
    logger.info(`Tour created successfully: ${tour.title}`);
    
    res.status(201).json({
      success: true,
      message: 'Tour Created Successfully',
      data: tour
    });
  } catch (error) {
    logger.error(`Error creating tour: ${error.message}`);
    
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(val => val.message);
      return res.status(400).json({
        success: false,
        error: messages
      });
    }
    
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};

// @desc    Update a tour
// @route   PUT /api/tour/:id
exports.updateTour = async (req, res) => {
  try {
    let tour = await Tour.findOne({ tour_id: req.params.id });
    
    if (!tour) {
      logger.warn(`Tour not found with ID: ${req.params.id}`);
      return res.status(404).json({
        success: false,
        error: 'Tour not found'
      });
    }
    
    tour = await Tour.findOneAndUpdate(
      { tour_id: req.params.id },
      req.body,
      { new: true, runValidators: true }
    );
    
    logger.info(`Tour updated successfully: ${tour.title}`);
    
    res.status(200).json({
      success: true,
      message: `${tour.title} updated Successfully`,
      data: tour
    });
  } catch (error) {
    logger.error(`Error updating tour: ${error.message}`);
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};

// @desc    Delete a tour
// @route   DELETE /api/tour/:id
exports.deleteTour = async (req, res) => {
  try {
    const tour = await Tour.findOne({ tour_id: req.params.id });
    
    if (!tour) {
      logger.warn(`Tour not found with ID: ${req.params.id}`);
      return res.status(404).json({
        success: false,
        error: 'Tour not found'
      });
    }
    
    await Tour.findOneAndDelete({ tour_id: req.params.id });
    
    logger.info(`Tour deleted successfully: ${tour.title}`);
    
    res.status(200).json({
      success: true,
      message: `${tour.title} deleted Successfully`
    });
  } catch (error) {
    logger.error(`Error deleting tour: ${error.message}`);
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};
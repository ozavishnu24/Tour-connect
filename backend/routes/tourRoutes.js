const express = require('express');
const {
  getAllTours,
  createTour,
  updateTour,
  deleteTour
} = require('../controllers/tourController');

const router = express.Router();

router
  .route('/')
  .get(getAllTours)
  .post(createTour);

router
  .route('/:id')
  .put(updateTour)
  .delete(deleteTour);

module.exports = router;
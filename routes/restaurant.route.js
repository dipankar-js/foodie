const express = require('express');
const {addRestaurant, getRestaurant, getRestaurantById} = require('../controllers/restaurant.controller');
const {protect} = require('../middleware/auth');

const router = express.Router();

// protected routes
// router.use(protect);

router.post('/', addRestaurant);
router.get('/', getRestaurant);
router.get('/:id', getRestaurantById);

module.exports = router;

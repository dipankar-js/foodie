const express = require('express');
const {addCousin, getCousin, getCousinByRestaurantId} = require('../controllers/cousin.controller');
const {protect} = require('../middleware/auth');

const router = express.Router();

// protected routes
router.use(protect);

router.post('/', addCousin);
router.get('/', getCousin);
router.get('/restaurant/:restaurantId', getCousinByRestaurantId);

module.exports = router;

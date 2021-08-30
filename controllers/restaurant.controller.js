const Restaurant = require('../models/Restaurant');
const ErrorResponse = require('../utils/errorResponse');

// @desc   Add a restaurant
// @route  POST /api/v1/restaurant/
// @access Private
exports.addRestaurant = async (req, res, next) => {
  const {name, location, minPrice, photo} = req.body;

  try {
    // Create restaurant
    const restaurant = await Restaurant.create({
      name,
      location,
      minPrice,
      photo,
    });

    res.status(200).json({
      success: true,
      data: restaurant,
    });
  } catch (error) {
    next(error);
  }
};

// @desc   Fetch all restaurant
// @route  GET /api/v1/restaurant/
// @access Private
exports.getRestaurant = async (req, res, next) => {
  try {
    let restaurants;

    // Sorting by price
    if (req.query.sort) {
      restaurants = await Restaurant.find().sort({minPrice: req.query.sort});
    }

    // Search By Name/Location
    if (req.query.searchQuery) {
      let regex = new RegExp(req.query.searchQuery, 'i');
      restaurants = await Restaurant.find({$or: [{name: regex}, {location: regex}]});
    }

    if (!restaurants) {
      restaurants = await Restaurant.find({});
    }

    res.status(200).json({
      success: true,
      data: restaurants,
    });
  } catch (error) {
    next(error);
  }
};

// @desc   Fetch restaurant by ID
// @route  GET /api/v1/restaurant/
// @access Private
exports.getRestaurantById = async (req, res, next) => {
  try {
    const {id} = req.params;
    // Create user
    const restaurant = await Restaurant.findById(id);

    res.status(200).json({
      success: true,
      data: restaurant,
    });
  } catch (error) {
    next(error);
  }
};

const Restaurant = require('../models/Restaurant');
const ErrorResponse = require('../utils/errorResponse');

// @desc   Register user
// @route  POST /api/v1/auth/register
// @access Public
exports.addRestaurant = async (req, res, next) => {
  const {name, location, minPrice} = req.body;

  try {
    // Create user
    const restaurant = await Restaurant.create({
      name,
      location,
      minPrice,
    });

    res.status(200).json({
      success: true,
      data: restaurant,
    });
  } catch (error) {
    next(error);
  }
};

// @desc   Register user
// @route  POST /api/v1/auth/register
// @access Public
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
      restaurants = await Restaurant.find();
    }

    res.status(200).json({
      success: true,
      data: restaurants,
    });
  } catch (error) {
    next(error);
  }
};

// @desc   Register user
// @route  POST /api/v1/auth/register
// @access Public
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

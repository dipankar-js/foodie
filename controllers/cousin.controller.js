const Cousin = require('../models/Cousin');
const ErrorResponse = require('../utils/errorResponse');

// @desc   Create Cousin
// @route  POST /api/v1/cousin
// @access Private
exports.addCousin = async (req, res, next) => {
  const {name, category, type, price, description, restaurant} = req.body;

  try {
    const cousins = await Cousin.create({
      name,
      category,
      type,
      price,
      description,
      restaurant,
    });

    res.status(200).json({
      success: true,
      data: cousins,
    });
  } catch (error) {
    next(error);
  }
};

// @desc   Fetch all cousins
// @route  GET /api/v1/cousin
// @access Private
exports.getCousin = async (req, res, next) => {
  try {
    let cousins;

    // Sorting by price
    if (req.query.sort) {
      cousins = await Cousin.find().sort({price: req.query.sort});
    }

    // Search By Name/Category
    if (req.query.searchQuery) {
      let regex = new RegExp(req.query.searchQuery, 'i');
      cousins = await Cousin.find({$or: [{name: regex}, {category: regex}]});
    }

    if (!cousins) {
      cousins = await Cousin.find().populate('restaurant');
    }

    res.status(200).json({
      success: true,
      data: cousins,
    });
  } catch (error) {
    next(error);
  }
};

// @desc   Fetch cousins by restaurant
// @route  GET /api/v1/cousin/:restaurantId
// @access Private
exports.getCousinByRestaurantId = async (req, res, next) => {
  try {
    const cousins = await Cousin.find({restaurant: req.params.restaurantId});

    res.status(200).json({
      success: true,
      data: cousins,
    });
  } catch (error) {
    next(error);
  }
};

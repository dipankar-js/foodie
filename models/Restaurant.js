const mongoose = require('mongoose');

const RestaurantSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a name'],
  },
  location: {
    type: String,
    required: [true, 'Please add location of the Restaurant'],
  },
  minPrice: {
    type: Number,
    index: true,
    required: [true, 'Please add a minimum price for the Restaurant'],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

RestaurantSchema.index({name: 1, location: 1}, {unique: true});
module.exports = mongoose.model('Restaurant', RestaurantSchema);

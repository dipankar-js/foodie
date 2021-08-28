const mongoose = require('mongoose');

const CousinSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a name'],
  },
  category: {
    type: String,
    enum: ['North Indian', 'South Indian', 'Chinese', 'Italian', 'Fast Food'],
    required: [true, 'Please add a category'],
  },
  type: {
    type: String,
    enum: ['Veg', 'Non Veg'],
    required: [true, 'Please add a type, Veg/Non Veg'],
  },
  price: {
    type: Number,
    required: [true, 'Please add a price'],
  },
  description: {
    type: String,
  },
  restaurant: {
    type: mongoose.Schema.ObjectId,
    ref: 'Restaurant',
    required: true,
    index: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

CousinSchema.index({name: 1, category: 1}, {unique: true});
module.exports = mongoose.model('Cousin', CousinSchema);

const mongoose = require('mongoose');
const { Schema } = mongoose;

const reviewSchema = new Schema({
  rating: {
    type: Number,
    required: [true, 'Review must have a rating'],
  },
  body: {
    type: String,
    required: [true, 'Review must have a body'],
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
});

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;

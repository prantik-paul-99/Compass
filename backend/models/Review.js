const mongoose = require("mongoose");
const { Schema } = mongoose;

const reviewSchema = new Schema({ 

  // string, 22 character unique user id, maps to the user in user.json
  user_id: {  // foreign key
    type : mongoose.Schema.Types.ObjectID,
    ref : 'User',
    required: true,
},

  // string, 22 character business id, maps to business in business.json
  business_id: {  // foreign key
    type : mongoose.Schema.Types.ObjectID,
    ref : 'Business',
    required: true,
},

  // integer, star rating
  stars: { type: Number, default: 0 },

  // string, date formatted YYYY-MM-DD
  creation_date: { type: Date, default: Date.now },

  // string, the review itself
  text: { type: String, required: true },

  // integer, number of useful votes received
  useful_count: { type: Number, default: 0 },

  // integer, number of funny votes received
  not_useful_count: { type: Number, default: 0 },

  //users to like the review
  users_who_like: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],

  //users to dislike the review
  users_who_dislike: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],

  images: {
    type: [String],
  },

});

const Review = mongoose.model("Review", reviewSchema);
module.exports = Review;

const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  user_name: {
    type: String,
    required: true,
    unique: true,
  },

  user_email: {
    type: String,
    required: true,
  },

  password: {
    type: String,
    required: true,
  },

  user_address: {
    type: String,
    default: "Dhaka, Bangladesh",
  },

  date_of_birth: {
    type: String,
    default: "01/01/1990",
  },

  user_occupation: {
    type: String,
    default: "Student",
  },

  // integer, the number of reviews they've written
  review_count: { type: Number, default: 0 },

  // string, when the user joined Yelp, formatted like YYYY-MM-DD
  joined_since: { type: Date, default: Date.now },

  // float, average rating of all reviews
  average_stars: { type: Number, default: 0 },
  profile_image: {
    type: String,
    default:
      "https://media.istockphoto.com/vectors/convenience-store-rgb-color-icon-grocery-shop-exterior-small-business-vector-id1252652997?k=20&m=1252652997&s=612x612&w=0&h=IuUUjBUCa3peH_PYXxOi67xQYTCcRQs1mUFxjy5C5LU=",
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;

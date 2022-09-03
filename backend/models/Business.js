const mongoose = require("mongoose");
const { Schema } = mongoose;

const businessSchema = new Schema({
  business_name: {
    type: String,
    required: true,
  },
  owner_id: {
    // foreign key
    type: mongoose.Schema.Types.ObjectID,
    ref: "User",
    required: true,
  },

  about: {
    type: String,
    default: "",
  },

  contact_no: {
    type: String,
  },

  district: {
    type: String,
    required: true,
  },

  city: {
    type: String,
    required: true,
  },

  address: {
    type: String,
    required: true,
  },

  category: {
    type: String,
    required: true,
    deafult: "",
  },

  tags: {
    type: [String],
    default: ["business"],
  },

  is_open: {
    type: Boolean,
    required: true,
    default: false,
  },

  review_count: {
    type: Number,
    default: 0,
  },

  query_count: {
    type: Number,
    default: 0,
  },

  post_count: {
    type: Number,
    default: 0,
  },

  offer_count: {
    type: Number,
    default: 0,
  },

  average_star_count: {
    type: Number,
    //type: Decimal128,  //dont know if works found in stackoverflow
    default: 0,
  },

  opening_days: {
    type: [String],
    default: [""],
  },

  opening_time: {
    type: String,
    default: "",
  },

  closing_time: {
    type: String,
    default: "",
  },

  images: {
    type: [String],
  },

  profile_image: {
    type: String,
    default:
      "https://media.istockphoto.com/vectors/convenience-store-rgb-color-icon-grocery-shop-exterior-small-business-vector-id1252652997?k=20&m=1252652997&s=612x612&w=0&h=IuUUjBUCa3peH_PYXxOi67xQYTCcRQs1mUFxjy5C5LU=",
  },
  email: {
    type: String,
    default: "",
  },
  
});

const Business = mongoose.model("Business", businessSchema);

module.exports = Business;

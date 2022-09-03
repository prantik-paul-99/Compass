const mongoose = require("mongoose");
const { Schema } = mongoose;

const postSchema = new Schema({
  user_id: {
    // foreign key
    type: mongoose.Schema.Types.ObjectID,
    ref: "User",
    required: true,
  },

  // string, 22 character business id, maps to business in business.json
  business_id: {
    // foreign key
    type: mongoose.Schema.Types.ObjectID,
    ref: "Business",
    required: true,
  },

  // string, date formatted YYYY-MM-DD
  creation_date: { type: Date, default: Date.now },

  // string, the text itself
  text: { type: String, required: true },

  images: {
    type: [String],
  },
});

const Post = mongoose.model("Post", postSchema);
module.exports = Post;

const mongoose = require("mongoose");
const { Schema } = mongoose;

const querySchema = new Schema({
    user_id: {  // foreign key
        type: mongoose.Schema.Types.ObjectID,
        ref: 'User',
        required: true,
    }, 
    
      // string, 22 character business id, maps to business in business.json
    business_id: {  // foreign key
        type: mongoose.Schema.Types.ObjectID,
        ref: 'Business',
        required: true,
    },

    // string, date formatted YYYY-MM-DD
    creation_date: { type: Date, default: Date.now },

    // string, the review itself
    text: { type: String, required: true },

    helpful_count: {
        type: Number,
        default: 0,
    },

    not_helpful_count: {
        type: Number,
        default: 0,
    },

    answers: {
        type: [{
        type: mongoose.Schema.Types.ObjectID,
        ref: 'QueryAnswer',
        }],
        default: []
    },

});

const Query = mongoose.model("Query", querySchema);
module.exports = Query;
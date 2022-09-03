const mongoose = require("mongoose");
const { Schema } = mongoose;

const queryAnswerSchema = new Schema({
    answerer_id: {  // foreign key
        type: mongoose.Schema.Types.ObjectID,
        ref: 'User',
        required: true,
    },
    
    // string, 22 character business id, maps to business in business.json
    query_id: {  // foreign key
        type: mongoose.Schema.Types.ObjectID,
        ref: 'Query',
        required: true,
    },

    // string, date formatted YYYY-MM-DD
    creation_date: { type: Date, default: Date.now },

    // string, the review itself
    text: { type: String, required: true },

});

const QueryAnswer = mongoose.model("QueryAnswer", queryAnswerSchema);
module.exports = QueryAnswer;
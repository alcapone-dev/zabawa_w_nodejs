const e = require('express');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tweetSchema = new Schema({
    content: {
        type: String,
        required: true
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    createdAt: {
        type: Schema.Types.Date,
        required: true
    }
});

const Tweet = mongoose.model('Tweet', tweetSchema);

module.exports = Tweet;
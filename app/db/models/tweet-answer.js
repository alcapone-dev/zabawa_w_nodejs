const e = require('express');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tweetAnswerSchema = new Schema({
    content: {
        type: String,
        required: true
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    toTweet: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Tweet'
    },
    createdAt: {
        type: Schema.Types.Date,
        required: true
    }
});

const TweetAnswer = mongoose.model('TweetAnswer', tweetAnswerSchema);

module.exports = TweetAnswer;
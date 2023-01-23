const e = require('express');
const session = require('express-session');
const Tweet = require('../db/models/tweet');
const TweetAnswer = require('../db/models/tweet-answer');
const UserController = require('./user-controller');


class TweetController {

    async showTweets(req, res) {

        const where = {};
        const query = Tweet.find(where);
        const tweets = await query.populate('createdBy').exec();
        const answerCount = await TweetAnswer.find(where).exec();

        console.log(answerCount)

        res.render('pages/tweets/tweets', {
            tweets,
            answerCount
        });


    }

    async postTweet(req, res) {

        const tweet = new Tweet({
            content: req.body.tweet,
            createdBy: req.session.user._id,
            createdAt: new Date(),
        }); 

        try {
            await tweet.save();
            res.redirect('/tweets');

        } catch (e) {
            console.log(e);
            res.redirect('/tweets');
        }

    }

    async showTweet(req, res) {
        const { _id } = req.params;
        console.log(req.params)
    
        const tweet = await Tweet.findOne({ _id: _id }).populate('createdBy').exec();
        const answer = await TweetAnswer.find({ toTweet: _id }).populate('createdBy').exec();
        console.log(answer)

        res.render('pages/tweets/showTweet', {
            tweet,
            answer
        });

    }

    async postTweetAnswer(req, res) {

        const tweetQuery = await Tweet.findOne({ _id: req.params._id }).exec();
        const toTweet = tweetQuery._id;

        const tweetAnswer = new TweetAnswer({
            content: req.body.answer,
            toTweet: toTweet,
            createdBy: req.session.user._id,
            createdAt: new Date(),
        })
        try {
            await tweetAnswer.save();
            res.redirect('/tweets/' + toTweet);

        } catch (e) {
            console.log(e);
            res.redirect('/tweets/' + toTweet);
        }
    }

}


module.exports = new TweetController();



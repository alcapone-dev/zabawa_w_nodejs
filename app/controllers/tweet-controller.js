const e = require('express');
const session = require('express-session');
const Tweet = require('../db/models/tweet');


class TweetController {

    async showTweets(req, res) {

        const where = {};
        const query = Tweet.find(where);
        const tweets = await query.exec();

        res.render('pages/tweets/tweets', {
            tweets
        });


    }

}


module.exports = new TweetController();



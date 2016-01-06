var Twit = require('twit');
var TwitterBot = require('node-twitterbot').TwitterBot;
var env = require("./env.js")

var Bot = new TwitterBot({
  consumer_key: env.consumer_key,
  consumer_secret: env.consumer_secret,
  access_token: env.access_token,
  access_token_secret: env.access_token_secret
  // consumer_key:         process.env.SWTITLEBOT_CONSUMER_KEY,
  // consumer_secret:      process.env.SWTITLEBOT_CONSUMER_SECRET,
  // access_token:         process.env.SWTITLEBOT_ACCESS_TOKEN,
  // access_token_secret:  process.env.SWTITLEBOT_ACCESS_TOKEN_SECRET
});

Bot.tweet("HELLO I'm lazy")

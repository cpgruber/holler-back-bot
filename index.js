var Twit = require('twit');
// var TwitterBot = require('node-twitterbot').TwitterBot;
var env = require("./env.js")

var Bot = new Twit({
  consumer_key: env.consumer_key,
  consumer_secret: env.consumer_secret,
  access_token: env.access_token,
  access_token_secret: env.access_token_secret
  // consumer_key:         process.env.SWTITLEBOT_CONSUMER_KEY,
  // consumer_secret:      process.env.SWTITLEBOT_CONSUMER_SECRET,
  // access_token:         process.env.SWTITLEBOT_ACCESS_TOKEN,
  // access_token_secret:  process.env.SWTITLEBOT_ACCESS_TOKEN_SECRET
});

function post (content) {
  Bot.post('statuses/update', { status: content }, function(err, data, response) {
  })
}

var stream = Bot.stream('statuses/filter', { track: '@slouchlife' });
stream.on('tweet', function (tweet) {
  console.log(tweet)
  var asker = tweet.user.screen_name;
  var text = tweet.text;
  console.log(asker + " tweeted: " + text);
  var reply = "@"+asker+" hows it?";
  post(reply);
});
// Bot.post('statuses/update', { status: 'hello world (again... so lazy)!' }, function(err, data, response) {
//   console.log(data);
// });

// var listenerFunction = function(tweet) {
//   console.log(tweet)
//   if (something)
//     return true;
//   return false;
// }
//
// Bot.listen("listening", listenerFunction, function(twitter, action, tweet) {
//   console.log(twitter)
//   Bot.now(Bot.tweet("I heard that"));
// });
//
// Bot.tweet("@slouchlife ya boi")

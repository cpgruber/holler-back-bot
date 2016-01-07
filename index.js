var Twit = require('twit');
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

function post (content,reply_id) {
  Bot.post('statuses/update', { status: content, in_reply_to_status_id: reply_id }, function(err, data, response) {
    console.log("tweeted!")
  })
}

function search (hashtag) {
  var sn = hashtag.replace("#","")
  return new Promise(function(resolve, reject){
    Bot.get('statuses/user_timeline', { screen_name: sn, count: 100 }, function(err, data, response) {
      if (!err){
        var tweets = data.filter(function(d){
          return d.text.substring(0,2) !== "RT"
        }).map(function(d){
          return d.text.replace("@","").replace("#","");
        })
        var random = Math.floor(Math.random() * tweets.length);
        var content = tweets[random];
        content.replace("@","")
      }else{
        var content = "I don't know who "+sn+" is, and I'm too lazy to find them."
      }
      resolve(content);
    })
  })
}

var stream = Bot.stream('statuses/filter', { track: '@slouchlife' });
stream.on('tweet', function (tweet) {
  var asker = tweet.user.screen_name;
  var id = tweet.id_str;
  var text = tweet.text;
  var hashtag = tweet.text.split(" ").filter(function(d){return d[0]=="#"})[0];
  search(hashtag).then(function(tweet){
    var modTweet = ("@"+asker+": "+tweet).substring(0,139);
    post(modTweet, id)
  });
});

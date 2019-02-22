console.log("follow & replybot is starting")
var Twit = require('twit');
var config = require('./config');
var T = new Twit(config);
var stream = T.stream('user')
stream.on('follow', followed)
stream.on('tweet', tweetevent)

function tweetevent(event) {
	//var fs = require('fs');
	//var json = JSON.stringify(event, null, 2)
	//fs.writefile("tweet.json", json);
	var replyto = event.in_reply_to_screen_name;
	var text = event.text;
	var from = event.user.screen_name
	var count = from.length + 2
	var searchterm;
	text = text.substring(count, 100);
	console.log(text);
	console.log(replyto + ' ' + from + ' ' + text);
	var array = text.split(" ");
	for (var i = 1; i < array.length; i++) {
		searchterm += " " + array[i];
	}
	if (replyto === 'BelieTijs') {
		if (text == 'what are you?') {
			var newtweet = '@' + from + ' I am aware I am a bot!! #Terminator'
		}
		else if (array[0] == 'search' || array[0] == 'Search') {
			var newtweet = '@' + from + "You have searched for " + searchterm + " \n result: " + searchTweet(searchterm);
		}
		else {
			var newtweet = '@' + from + ' Thank you for tweeting me! #bot'
		}
		MakeTweet(newtweet);
	}
}

function followed(event) {
	var screenname = event.source.screen_name;
	if (screenname !== 'BelieTijs') {
		var name = event.source.name;
		MakeTweet('Automatic message: @' + screenname + ' started following me, thank you!');
	}
}

function MakeTweet(text) {
	var tweet = {
		status: text
	}
	T.post('statuses/update', tweet, postData);

	function postData(err, data, response) {
		if (err) {
			console.log("something went wrong: " + err);
		}
		else {
			console.log("Tweet sent succesfully");
		}
	}
}
searchTweet("elephant");

function searchTweet(searchtext) {
	var params = {
		q: searchtext
		, count: 1
		, count: 1
	};
	T.get('search/tweets', params, gotData)

	function gotData(err, data, response) {
		var tweets = data.statuses;
		for (var i = 0; i < tweets.length; i++) {
			console.log(tweets[i].text);
			return tweets[i].text;
		}
	}
}
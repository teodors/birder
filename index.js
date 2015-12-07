'use strict';


var twitter = require('twitter'),
	async = require('async'),
	validator = require('./lib/validator');


function Birder (options) {
	this.options = options | {};

	this.client = new twitter({
		consumer_key: this.options.consumer_key,
		consumer_secret: this.options.consumer_secret,
		access_token_key: this.options.access_token_key,
		access_token_secret: this.options.access_token_secret
	});		
};


/**
 * Get basic Twitter user data.
 * @param  {String} usernames Unique Twitter usernames.
 * @return {Array}            Return object of Twitter user data for each username.
 */
Birder.prototype.twitter = function (usernames) {
	var self = this,
		users = [],
		tasks = [];

	for (var i = 0; i < usernames.length; i++) {
		tasks.push(function (callback) {
			client.get('users/show', {
				screen_name: usernames[i]
			}, function (error, user, response) {
				users.push(user);

				callback();
			});
		});
	}

	async.parallel(tasks, function(){
		return users;
	});	
}


/**
 * Using neural network checks if user is fake.
 * @param  {Object} users User data
 * @return {Object}       Returns user with real/fake check done.
 */
Birder.prototype.neural = function (users) {
	var self = this,
		fails = 0;

	for (var i = 0; i < users.length; i++) {
		fails = 0;

		users[i].checks = {
			followers: validator.followers(retweet.user),
			verified: validator.verified(retweet.user),
			picture: validator.picture(retweet.user),
			description: validator.description(retweet.user),
			background: validator.background(retweet.user),
			protected: validator.protected(retweet.user),	
			links: validator.links(retweet.user)
		};

		for(var key in users[i].checks) {
			if(users[i].checks[key] == false) fails++;
		}

		// return ratio
		users[i].ratio = Math.round((fails/Object.keys(users[i].checks).length) * 100);
	}

	return users;
}


/**
 * Checks if provided usernames are fake.
 * @param  {Array|String} usernames Unique Twitter usernames.
 * @return {Array} users      		Returns array of user objects.
 */
Birder.prototype.check = function (usernames) {
	var self = this,
		users = [];

	if (typeof usernames === 'string') {
		usernames = [usernames];
	}
        
    users.concat(Birder.twitter(usernames));

	return Birder.neural(users);
}


module.exports = Birder;
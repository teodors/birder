'use strict';


var twitter = require('twitter'),
	async = require('async'),
	validator = require('./lib/validator');


function Birder (options) {
	this.options = options || {};

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
Birder.prototype.twitter = function (usernames, callback) {
	var self = this,
		users = [],
		tasks = [];

	usernames.forEach(function (username) {
		tasks.push(function (callback) {
			self.client.get('users/show', {
				screen_name: username
			}, function (error, user, response) {
				users.push(user);
				callback();
			});
		});
	});

	async.parallel(tasks, function() {
		callback(users);
	});	
}


/**
 * Using neural network checks if user is fake.
 * @param  {Object} users User data
 * @return {Object}       Returns user with real/fake check done.
 */
Birder.prototype.neural = function (users) {
	var self = this,
		tool = new validator; // bad naming 

	for (var i = 0; i < users.length; i++) {
		var user = users[i],
			fails = 0;

		user.checks = {
			followers: tool.followers(user),
			verified: tool.verified(user),
			picture: tool.picture(user),
			description: tool.description(user),
			background: tool.background(user),
			protected: tool.protected(user),	
			links: tool.links(user)
		};

		for(var key in user.checks) {
			if(user.checks[key] == false) fails++;
		}

		// return ratio
		user.ratio = Math.round((fails/Object.keys(user.checks).length) * 100);
	}

	return users;
}


/**
 * Checks if provided usernames are fake.
 * @param  {Array|String} usernames Unique Twitter usernames.
 */
Birder.prototype.check = function (usernames, callback) {
	var self = this,
		users = [];

	if (typeof usernames === 'string') {
		usernames = [usernames];
	}
    
    self.twitter(usernames, function (items) {
    	users = users.concat(items);
    	callback(self.neural(users));
    });
}


module.exports = Birder;
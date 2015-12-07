'use strict';


var moment = require('moment');


function Validator (options) {
	this.options = options | {};
};


/**
 * Check if users first tweet is retweet.
 * @param  {string} username Contains username.
 * @return {boolean} Returns true if users first tweet is retweet.
 */
Validator.prototype.first = function (username) {
}


/**
 * Detects weather a user has profile picture.
 * @param  {object} user Contains object of single user.
 * @return {boolean} Returns true if user has picture.
 */
Validator.prototype.picture = function (user) {
	return !user.default_profile_image;
}


/**
 * Detects weather a user has face in his picture.
 * @param  {object} user Contains object of single user.
 * @return {boolean} Returns true if user has face.
 */
Validator.prototype.face = function (user) {
}


/**
 * Check if user has a description.
 * @param  {object} user Contains object of single user.
 * @return {boolean} Returns true if user has a description.
 */
Validator.prototype.description = function (user) {
	if(user.description.length > 0) return true;
	return false;
}


/**
 * Check if user is protected.
 * @param  {object} user Contains object of single user.
 * @return {boolean} Returns true if user is protected.
 */
Validator.prototype.protected = function (user) {
	return user.protected;
}


/**
 * Check if user has a profile background.
 * @param  {object} user Contains object of single user.
 * @return {boolean} Returns true if user has a profile background.
 */
Validator.prototype.background = function (user) {
	if(user.profile_banner_url != undefined) return true;
	return false;
}


/**
 * Check if user has a links in profile.
 * @param  {object} user Contains object of single user.
 * @return {boolean} Returns true if user has atleast one link. 
 */
Validator.prototype.links = function (user) {
	if(user.entities.url != undefined && user.entities.url.urls.length > 0) return true;
	return false;
}


/**
 * Check if user followers/following ratio.
 * @param  {object} user Contains object of single user.
 * @return {boolean} Returns true if ratio is positive. 
 */
Validator.prototype.followers = function (user) {
	if(user.followers_count / user.friends_count > 1) return true;
	return false;
}


/**
 * Check if user has more original tweets than retweets.
 * @param  {object} user Contians object of single user.
 * @return {boolean} Returns true if he does.
 */
Validator.prototype.tweets = function (user) {
	// seems impossible, since can't get retweet count
}


/**
 * Checks if user tweets all day.
 * @param  {object} user Contins object of a single user.
 * @return {boolean} Returns true if user tweets all day.
 */
Validator.prototype.sleep = function (user) {
}


/**
 * Checks if user is verified.
 * @param  {object} user Contins object of a single user.
 * @return {boolean} Returns true if user tweets all day.
 */
Validator.prototype.verified = function (user) {
	return user.verified;
}


module.exports = Validator;
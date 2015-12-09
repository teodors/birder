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
 * How old is a user compared to total Twitter age.
 * @param  {object} user Contains object of single user.
 * @return {boolean} Returns decimal.
 */
Validator.prototype.age = function (user) {
	var twitterAge = moment.utc(moment(new Date("March 21, 2006")).diff(moment(new Date()), "days")),
		userAge = moment.utc(moment(new Date(user.created_at)).diff(moment(new Date()), "days"))

	return (userAge/twitterAge);
}


/**
 * Detects weather a user has profile picture.
 * @param  {object} user Contains object of single user.
 * @return {boolean} Returns true if user has picture.
 */
Validator.prototype.picture = function (user) {
	return +!user.default_profile_image;
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
	if(user.description.length > 0) return 1;
	return 0;
}


/**
 * Check if user is protected.
 * @param  {object} user Contains object of single user.
 * @return {boolean} Returns true if user is protected.
 */
Validator.prototype.protected = function (user) {
	return +user.protected;
}


/**
 * Check if user has a profile background.
 * @param  {object} user Contains object of single user.
 * @return {boolean} Returns true if user has a profile background.
 */
Validator.prototype.background = function (user) {
	if(user.profile_banner_url != undefined) return 1;
	return 0;
}


/**
 * Check if user has a links in profile.
 * @param  {object} user Contains object of single user.
 * @return {boolean} Returns true if user has atleast one link. 
 */
Validator.prototype.links = function (user) {
	if(user.entities.url != undefined && user.entities.url.urls.length > 0) return 1;
	return 0;
}


/**
 * Check if user followers/following ratio.
 * @param  {object} user Contains object of single user.
 * @return {boolean} Returns true if ratio is positive. 
 */
Validator.prototype.followers = function (user) {
	return (user.followers_count / (user.followers_count + user.friends_count));
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
	return +user.verified;
}


module.exports = Validator;
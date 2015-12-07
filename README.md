### What is this?
This is a Node.js module that checks weather a Twitter user might be a bot. To see what checks are made scroll down.

You can have a look at [Twipio.io](http://twipio.io) to see a running demo.

### Getting strted
No quantum computing here. 
```
$ npm install birder
```

### Usage
Add this module to your app.
```
var birder = require('birder');
```

You will need to provide Twitter credentials for *birder* to be able to make Twitter API calls.
```
var john = new birder({
	consumer_key: 'your consumer key',
	consumer_secret: 'your consumer secret',
	access_token_key: 'your access token key',
	access_token_secret: 'your access token secret'
});
```

Then use **check** function with array of Twitter usernames you wish to check. 
```
john.check(['TeodorsZeltins', 'BarackObama']); // single username string is fine too
```

This should return you an array of Twitter user objects with additional fields `check` and `ratio`.
```
[{
	... // usual Twitter user stuff

	checks: { // contains each check made and pass or fail
		followers: false,
		first: false,
		... // and so forth
	},
	ratio: 0.84 // how likely a user is a bot
}]
```

*Note: user objects are returned in unknown order and some might be missing if such Twitter user does not exist.*


### How checks work?
It makes following checks and returns true or false.

 * **Followers** - is followers/follwing ratio positive.
 * **First** - is the first tweet a retweet.
 * **Picture** - is there a profile picture.
 * **Description** - is there a description.
 * **Protected** -  is content protected.
 * **Verified** - is verified.
 * **Links** - is there any links in user profile.

There are some more checks that are not yet implemented.

 * **Age** - how old is account versus existance of Twitter.
 * **Face** - is user profile picture containing a face.
 * **Tweets** - how many of user tweets are retweets.
 * **Regularity** - how many tweets a user creates per day.
 * **Facebook** - is there a Facebook profile link.
 * **Sleep** - is user tweeting 24/7 or does he sleep.

Then, depending on how many checks are made and how many are passed, you get the **ratio** or how likely it is that a user is bot.

### Disclaimer
Unforunately, there is no simple and solid way of telling if someone is or is not a bot. If one is truly determined to create a undetectable bot he can. 

That being said, most of the bots are not very sophisticated and patterns emerge. This should red flag most bots. Then again, that's like saying police catches most of the criminals.


### Issues
Found a bug or better solution? Please report to the issue section.
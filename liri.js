require("dotenv").config();
const keys = require("./keys.js");
const Twitter = require("twitter");
// const spotify = require("spotify");
const request = require("request");

// const spotify = new Spotify(keys.spotify);
const client = new Twitter(keys.twitter);
const userInput = process.argv.slice(2).join("");

if (userInput === "my-tweets") {myTweets()
} else if (userInput === "spotify-this-song") {spotifyThis()
} else if (userInput === "movie-this") {movieThis()
} else if (userInput === "do-what-it-says") {doWhatItSays()
};


function myTweets() {

const params = { screen_name: "EastPatrick", count: "20" };
client.get('statuses/user_timeline', params, function (error, tweets, response) {
    if (!error) {

        let tweetObjects = JSON.parse(response.body);
        for (let i = 0; i < tweets.length; i++) {
            console.log(tweets[i].text);
        };

    } else {
        console.log(error);
    }
});
};

// const argument = process.argv[2];
// const tweet = process.argv[3];
// // const spotify = process.argv[3];
// // const movie = process.argv[3];
// // const doIt = process.argv[3];

// if (math === "my-tweets") {
//     console.log(tweet)
// } else if (math === "spotify-this-song") {
//     console.log(spotify)
// } else if (math === "spotify-this-song") {
//     console.log(spotify)
// } else if (math === "movie-this") {
//     console.log(movie)
// } else if (math === "do-what-it-says") {
//     console.log(doThis)
// } 
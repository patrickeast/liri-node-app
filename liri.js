require("dotenv").config();
const keys = require("./keys.js");

const request = require("request");
const Twitter = require("twitter");
const Spotify = require('node-spotify-api');
const spotify = new Spotify(keys.spotify);
const client = new Twitter(keys.twitter);
const userInput = process.argv.splice(2).join("");

if (userInput === "my-tweets") {
    myTweets();
} else if (userInput === "spotify-this-song") {
    spotifyThis();
} else if (userInput === "movie-this") {
    movieThis();
} else if (userInput === "do-what-it-says") {
    doWhatItSays();
};

function myTweets() {
    const params = { screen_name: "EastPatrick", count: "20" };
    client.get('statuses/user_timeline', params, function (error, tweets, response) {
        if (!error) {
            let tweetObject = JSON.parse(response.body);
            for (let i = 0; i < tweets.length; i++) {
                console.log(tweets[i].created_at);
                console.log(tweets[i].text);
                console.log("------------------------------");
            };
        } else {
            console.log(error);
        }
    });
};

function spotifyThis() {
    // const spotifyInput = process.argv.splice(3).join("");
    
    spotify.search({ type: 'track', query: "All the Small Things", limit: "1" }, function (err, data) {
        const songId = data.tracks.items[0].id;
        if (err) {
            return console.log('Error occurred: ' + err);
        }
        console.log(data.tracks.items[0].artists[0].name);
        console.log(data.tracks.items[0].name);
        console.log(data.tracks.items[0].preview_url);
        console.log(data.tracks.items[0].album.name);
        console.log(songId);

    });
    // .request('https://api.spotify.com/v1/tracks/' + songId)
    // .then(function (data) {
    //     console.log(data);
    // })
    // .catch(function (err) {
    //     console.error('Error occurred: ' + err);
    // });
};
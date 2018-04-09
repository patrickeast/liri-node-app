require("dotenv").config();
const keys = require("./keys.js");

const request = require("request");
const Twitter = require("twitter");
const Spotify = require('node-spotify-api');
const spotify = new Spotify(keys.spotify);
const client = new Twitter(keys.twitter);
const userInput = process.argv[2];

switch (userInput) {
    case "my-tweets":
        myTweets();
        break;

    case "spotify-this-song":
        if (process.argv[3] === undefined) {
            let songName = "The Sign";
            spotifyThis(songName);
        } else {
            let songName = process.argv.slice(3).join(' ');
            spotifyThis(songName);
        }
        break;

    case "movie-this":
        movieThis();
        break;

    case "do-what-it-says":
        doWhatItSays();
        break;

    default:
}

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

function spotifyThis(songName) {
    spotify.search({
        type: 'track',
        query: songName
    }, function (err, data) {
        if (!err) {
            data.tracks.items.forEach(function (object) {
                console.log("------------------------");
                console.log("Artist Name " + object.album.artists[0].name);
                console.log("Song Name: " + object.name);
                console.log("Preview on Spotify: " + object.preview_url);
                console.log("Album Name: " + object.album.name);
                console.log("------------------------");
            })
        } else {
            return console.log('Error occurred: ' + err);
        }

    })
}
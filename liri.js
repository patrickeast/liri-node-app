require("dotenv").config();
const fs = require("fs");
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
        if (process.argv[3] === undefined) {
            let movieName = "Mr. Nobody";
            movieThis(movieName);
        } else {
            let movieName = process.argv.slice(3).join(' ');
            movieThis(movieName);
        }
        break;

    case "do-what-it-says":
        doWhatItSays();
        break;

    default:
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

function spotifyThis(songName) {
    spotify.search({
        type: 'track',
        query: songName,
        limit: 1
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
};

function movieThis(movieName) {
    const queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";

    request(queryUrl, function (err, response, body) {
        if (!err) {
            let movieObject = JSON.parse(response.body);
            console.log("----------------------------")
            console.log("Title: " + movieObject.Title);
            console.log("Released: " + movieObject.Year);
            console.log("Rating (IMDB): " + movieObject.Ratings[0].Value);
            console.log("Rating (Rotten Tomatoes): " + movieObject.Ratings[1].Value);
            console.log("Country of Origin: " + movieObject.Country);
            console.log("Language: " + movieObject.Language);
            console.log("Plot: " + movieObject.Plot);
            console.log("Actors: " + movieObject.Actors);
            console.log("----------------------------")

        } else {
            console.log(err);
        }
    });
};

function doWhatItSays() {
    fs.readFile("random.txt", "utf8", function (err, data) {
        if (err) {
            return console.log(err)
        }

        const dataArr = data.split(",");
        const userCommand = dataArr[0];
        const userInput = dataArr[1];
        console.log(spotifyThis(dataArr[1]));
        
    })
};
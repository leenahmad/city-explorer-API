"use strict";

const express = require("express");

require("dotenv").config();

const cors = require("cors");

const server = express();

const axios = require('axios');

const PORT = process.env.PORT;

server.use(cors());

// const weather1 = require("./data/weather.json");
// const { request, response } = require("express");



class Date {
  constructor(data) {
    this.date = data.datetime;
    this.description = data.weather.description;
  }
}

class Movie{
  constructor(data){
            
    this.title = data.title;
    this.overview = data.overview;
    this.vote_average = data.vote_average;
    this.vote_count = data.vote_count;
    this.poster_path= data.poster_path;
    this.popularity = data.popularity;
    this.release_date = data.release_date;
  }
}

//Servers
server.get('/' , home);
server.get('/Weather' , getWeather);
server.get('/Movies' , getMovies);
server.get('*' , notFound);

//Functions
function home( req, res) {
  res.status(200).send("home router");
}
function getWeather(request, response) {
  let city = request.query.city;
  console.log(request.query)
  
  let linkWeather = `http://api.weatherbit.io/v2.0/forecast/daily?city=${city}&key=${process.env.WEATHER_API_KEY}`
  console.log(linkWeather);

   axios.get(linkWeather).then(element => {
     let weatherinf = element.data.data.map(info => { return new Date(info)
    })
    response.send(weatherinf);
   })
     .catch(ERROR => {response.send(ERROR)})
 
 
//   let data1 = weather1.find((element) => {
//     if (element.city_name === searchQuert) {
//       return element;
//     }
//   })

//   let array = data1.data.map((value) => {
//     return new Date(value.datetime, value.weather.description);
//   })
// response.send(array)
}

function getMovies(request , response){
  let city = request.query.city;

  let linkMovie = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&query=${city}`

  axios.get(linkMovie).then(element => {
    let movie = element.data.results.map(inf => {
      return new Movie(inf)
    })
    response.send(movie)
  })
  .catch(ERROR => {response.send(ERROR)})

}


function notFound(req, res) {
  res.status(404).send("route is not found");
}

server.listen(PORT, () => {
  console.log(`LISTENING ON PORT ${PORT}`);
});
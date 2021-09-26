"use strict";

const express = require("express");

require("dotenv").config();

const cors = require("cors");

// const axios = require("axios");


const getMovies = require("./modules/movies");
const getWeather = require("./modules/weather");

const axios = require('axios');

const server = express();
const PORT = process.env.PORT;

server.use(cors());


//servers
server.get("/", home);
server.get("/Weather", getWeather);
server.get("/Movies", getMovies);
server.get("*", notFound);


//Functions
function home(req, res) {
  res.status(200).send("home router");
}
function notFound(req, res) {
  res.status(404).send("route is not found");
}
server.listen(PORT, () => {
  console.log(`LISTENING ON PORT ${PORT}`);
});








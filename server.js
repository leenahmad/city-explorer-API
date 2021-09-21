"use strict";

const express = require("express");

require("dotenv").config();

const cors = require("cors");

const server = express();

const weather1 = require("./data/weather.json");
const { request, response } = require("express");

const PORT = process.env.PORT;

server.use(cors());

class Date {
  constructor(date, description) {
    (this.data = date), (this.description = description);
  }
}

server.get("/", (req, res) => {
  res.status(200).send("home router");
})

server.get("/weather", (request, response) => {
  let searchQuert = request.query.searchQuert;

  
  let data1 = weather1.find((element) => {
    if (element.city_name === searchQuert) {
      return element;
    }
  })

  let array = data1.data.map((value) => {
    return new Date(value.datetime, value.weather.description);
  })
response.send(array)
})

server.get("*", (req, res) => {
  res.status(404).send("route is not found");
});

server.listen(PORT, () => {
  console.log(`LISTENING ON PORT ${PORT}`);
});

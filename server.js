'use strict';

const express = require('express');

require('dotenv').config();

const cors = require('cors');

const server = express();

const searchQuery = require('./data/weather.json');
const { request, response } = require('express');

const PORT = process.env.PORT;

server.use(cors());


class Date {
    constructor(date, description){
        this.data = date,
        this.description = description
    }
}


server.get('/',(req,res) => {
    res.status(200).send('home router')
})

server.get('/weather' , (request,response) => {
    let q = request.query.q;
    let location = searchQuery.find(location =>location.city_name==q);
    let weather = [];
    location.data.forEach(i =>{
        weather.push(
            new Date(i.datetime, `with ${i.weather.description}`)
        )
    })
    response.send(weather);
})

server.get('*' , (req,res) => {
    res.status(404).send('route is not found')
})

server.listen(PORT, () => {
    console.log(`LISTENING ON PORT ${PORT}`)
})



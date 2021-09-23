const axios = require('axios');


function getWeather(request, response) {
    let { city }= request.query;
    console.log(request.query)
    
    let linkWeather = `http://api.weatherbit.io/v2.0/forecast/daily?city=${city}&key=${process.env.WEATHER_API_KEY}`
    console.log(linkWeather);
  
     axios.get(linkWeather).then(element => {
       let weatherinf = element.data.data.map(info => { return new Date(info)
      })
      response.send(weatherinf);
     })
       .catch(ERROR => {response.send(ERROR)})
   
    }



class Date {
    constructor(data) {
      this.date = data.datetime;
      this.description = data.weather.description;
    }
  }
  module.exports = getWeather;

const axios = require("axios");

function getWeather(request, response) {
  let { city } = request.query;
  console.log(request.query);

  let linkWeather = `http://api.weatherbit.io/v2.0/forecast/daily?city=${city}&key=${process.env.WEATHER_API_KEY}`;

  if (cacheMemory[city] !== undefined) {
    console.log("the cashe contain data ");
    console.log(cacheMemory);
    response.send(cacheMemory[city]);
  } else {
    console.log("cache memory is empty hit the api");
    try {
      axios.get(linkWeather).then((element) => {
        let weatherinf = element.data.data.map((info) => {
          return new Date(info);
        });
        response.send(weatherinf);
      });
    } catch (error) {
      console.log("error from axios", error);
      response.send(error);
    }
  }
}

class Date {
  constructor(data) {
    this.date = data.datetime;
    this.description = data.weather.description;
  }
}
module.exports = getWeather;

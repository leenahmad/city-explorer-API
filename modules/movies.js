const axios = require('axios');

let cacheMemory = {};
function getMovies(request , response){
  console.log(request.query);
    let { city }= request.query;
  
    let linkMovie = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&query=${city}`
    // let cacheMemory = {};
    if(cacheMemory[city] !== undefined){
      console.log('the cashe contain data')
      console.log(cacheMemory);
      response.send(cacheMemory[city]);
    }else{
      console.log('cache memory is empty hit the api')
      try{
        axios.get(linkMovie).then(element => {
          let movie = element.data.results.map(inf => {
            return new Movie(inf)
          })
          cacheMemory[city] = movie;
          response.send(movie)
        })
      }
        catch (error) {
          console.log('error from axios', error)
          res.send(error)
      }
    }
  
  }


class Movie{
    constructor(data){
              
      this.title = data.title;
      this.overview = data.overview;
      this.vote_average = data.vote_average;
      this.vote_count = data.vote_count;
      this.poster_path= data.poster_path ? 'https://image.tmdb.org/t/p/w500' + data.poster_path: "https://i.ytimg.com/vi/L1tx-wAI6Nw/maxresdefault.jpg";
      this.popularity = data.popularity;
      this.release_date = data.release_date;
    }
  }
  
  module.exports = getMovies;
const axios = require('axios');


function getMovies(request , response){
  console.log(request.query);
    let { city }= request.query;
  
    let linkMovie = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&query=${city}`
  
    axios.get(linkMovie).then(element => {
      let movie = element.data.results.map(inf => {
        return new Movie(inf)
      })
      response.send(movie)
    })
    .catch(ERROR => {response.send(ERROR)})
  
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
  
  module.exports = getMovies;
const API_KEY = process.env.API_KEY;
const Movie = require('../models/moviesModel');
const axios = require('axios');

const addMovieToDB = async (movie_id) => {
  const movie = await axios.get(
    `https://api.themoviedb.org/3/movie/${movie_id}`,
    {
      params: {
        api_key: API_KEY,
      },
    }
  );
  await Movie.create({
    movie,
  });
};

const getMovieDetails = async () => {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/changes?page=1`,
      {
        params: {
          api_key: API_KEY,
        },
      }
    );
    const list = response.data.results;
    const IDs = list.map((el) => {
      return el.id;
    });
    IDs.map((movie_id) => {
      addMovieToDB(movie_id);
    });
  } catch (error) {
    console.log(error);
  }
};

getMovieDetails();

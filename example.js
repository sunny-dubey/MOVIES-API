const axios = require('axios');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });
const API_KEY = process.env.API_KEY;
const fetchMovie = async (movie_id) => {
  const movie = await axios.get(
    `https://api.themoviedb.org/3/movie/${movie_id}`,
    {
      params: {
        api_key: API_KEY,
      },
    }
  );
  console.log(movie.data);
};

//fetchMovie(872585);

const postRating = async (movie_id) => {
  const movie = await axios.post(
    `
  https://api.themoviedb.org/3/movie/${movie_id}/rating`,

    {
      value: 4.5, // Rating value (0.5 to 10.0)
    },

    {
      params: {
        api_key: API_KEY,
        session_id: 'd05c1530114c968897ff9024a277a1a496f15dd4',
      },
    }
  );
  console.log(movie);
};

postRating(496450);

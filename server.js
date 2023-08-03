const express = require('express');
const morgan = require('morgan');
const axios = require('axios');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });

const app = express();

// connecting mongdb with mongoose
const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

mongoose.connect(DB).then((con) => {
  console.log('DB connection successful!');
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});

// middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json());
app.use(express.static(`${__dirname}/public`));

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// 2) store into database and then play with it

const API_KEY = process.env.API_KEY;

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
    const ids = list.map((el) => {
      return el.id;
    });
  } catch (error) {
    console.log(error);
  }
};

// 3) ROUTES

const mongoose = require('mongoose');

const movieSchema = mongoose.Schema({
  original_title: String,
  release_date: String,
});

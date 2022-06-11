const mongoose = require('mongoose');

const MoviesSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true
  },
  movieId: {
    type: String,
    required: true
  },
  playlistname: {
    type: String,
    required: true
  }
});

const Playlist = mongoose.model('Playlist', MoviesSchema);

module.exports = Playlist;
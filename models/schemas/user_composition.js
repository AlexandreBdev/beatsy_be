const mongoose = require('mongoose');
const passwordHash = require('password-hash');
const jwt = require('jwt-simple');
const config = require('../../config/config');

module.exports = {
    name : String,
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },  
    musicCategory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "MusicCategory"
    },
    listen: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Listen"
    },
    exportedPath: String,
    track: String,
    created: {
      type: Date,
      default: Date.now
    }
    };
  
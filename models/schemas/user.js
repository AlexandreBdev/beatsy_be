const mongoose = require('mongoose');
const passwordHash = require('password-hash');
const jwt = require('jwt-simple');
const config = require('../../config/config');

module.exports = {

    // firstName: {
    //   type: String,
    //   required: true
    // },
    // surname: {
    //   type: String,
    //   required: true
    // },
    password: {
      type: String,
      required: true
    },
    email: {
      type: String,
      lowercase: true,
      trim: true,
      unique: true,
      required: true
    },
    username: String,
    composition: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Composition"
    }
    // thumbnail: String,
  };
  
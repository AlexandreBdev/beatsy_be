var mongoose = require("mongoose");
module.exports = {
  name : String,
  user_composition: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User_composition"
  },
  // musicCategory: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: "MusicCategory"
  // },
  // exportedPath: String,
  // track: String,
  created: {
    type: Date,
    default: Date.now
  }
 };
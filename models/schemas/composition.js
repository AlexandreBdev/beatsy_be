var mongoose = require("mongoose");
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
  exportedPath: String,
  created: {
    type: Date,
    default: Date.now
  }
 };
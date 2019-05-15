var mongoose = require("mongoose");
module.exports = {
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  music_compo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Hotel"
  },
  comment: String,
  created: {
    type: Date,
    default: Date.now
  }
};

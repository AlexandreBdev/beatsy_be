var mongoose = require("mongoose");
module.exports = {
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  user_composition: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User_composition"
  },
  comment: String,
  created: {
    type: Date,
    default: Date.now
  }
};

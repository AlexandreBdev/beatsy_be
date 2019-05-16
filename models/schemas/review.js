var mongoose = require("mongoose");
module.exports = {
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  composition: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Composition"
  },
  comment: String,
  created: {
    type: Date,
    default: Date.now
  }
};

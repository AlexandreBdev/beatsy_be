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
  isLike: {
    type: Boolean,
    default: false
  },
  created: {
    type: Date,
    default: Date.now
  }
};

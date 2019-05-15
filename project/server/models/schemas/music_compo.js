var mongoose = require("mongoose");
module.exports = {
    name: String,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  sound_effects: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Sound_effects"
  },
  isShared: {
    type: Boolean,
    default: false
  }, 
  created: {
    type: Date,
    default: Date.now
  }
};

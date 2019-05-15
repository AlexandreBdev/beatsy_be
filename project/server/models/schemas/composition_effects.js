var mongoose = require("mongoose");
module.exports = {
  composition: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Composition"
  },
  effects: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Effects"
  },
  trigger_type: {
    kick, loop, long 
  },
  trigger_start: Number,
  trigger_end: Number,  
  created: {
    type: Date,
    default: Date.now
  }
};

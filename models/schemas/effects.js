var mongoose = require("mongoose");
module.exports = {
  name: String,
  soundPath: String,
  soundCategory: {
    type : mongoose.Schema.Types.ObjectId,
    ref: "SoundCategory"
  },
  musicCategory: {
    type : mongoose.Schema.Types.ObjectId,
    ref: "MusicCategory"
  }
};

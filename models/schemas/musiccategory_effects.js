var mongoose = require("mongoose");
module.exports = {
 effects: [{
   type: mongoose.Schema.Types.ObjectId,
   ref: "Effects"
  }],
  musicCategory: {
    type : mongoose.Schema.Types.ObjectId,
    ref: "MusicCategory"
  }

};

var mongoose = require("mongoose");

var schema = require("./schemas").SoundCategory;

var Schema = new mongoose.Schema(schema);

var Model = mongoose.model("SoundCategory", Schema);

module.exports = Model;

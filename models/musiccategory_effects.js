var mongoose = require("mongoose");

var schema = require("./schemas").MusicCategory_Effects;

var Schema = new mongoose.Schema(schema);

var Model = mongoose.model("MusicCategory_Effects", Schema);

module.exports = Model;
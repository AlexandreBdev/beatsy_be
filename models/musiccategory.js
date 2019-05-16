var mongoose = require("mongoose");

var schema = require("./schemas").MusicCategory;

var Schema = new mongoose.Schema(schema);

var Model = mongoose.model("MusicCategory", Schema);

module.exports = Model;
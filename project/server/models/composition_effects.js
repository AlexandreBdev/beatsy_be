var mongoose = require("mongoose");

var schema = require("./schemas").Composition_Effects;

var Schema = new mongoose.Schema(schema);

var Model = mongoose.model("Composition_Effects", Schema);

module.exports = Model;

var mongoose = require("mongoose");

var schema = require("./schemas").Sound_effects;

var Schema = new mongoose.Schema(schema);

var Model = mongoose.model("Sound_effects", Schema);

module.exports = Model;

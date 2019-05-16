var mongoose = require("mongoose");

var schema = require("./schemas").Effects;

var Schema = new mongoose.Schema(schema);

var Model = mongoose.model("Effects", Schema);

module.exports = Model;

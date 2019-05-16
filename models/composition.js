var mongoose = require("mongoose");

var schema = require("./schemas").Composition;

var Schema = new mongoose.Schema(schema);

var Model = mongoose.model("Composition", Schema);

module.exports = Model;

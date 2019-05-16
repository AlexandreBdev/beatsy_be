var mongoose = require("mongoose");

var schema = require("./schemas").Listen;

var Schema = new mongoose.Schema(schema);

var Model = mongoose.model("Listen", Schema);

module.exports = Model;

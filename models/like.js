var mongoose = require("mongoose");

var schema = require("./schemas").Like;

var Schema = new mongoose.Schema(schema);

var Model = mongoose.model("Like", Schema);

module.exports = Model;

var mongoose = require("mongoose");

var schema = require("./schemas").Review;

var Schema = new mongoose.Schema(schema);

var Model = mongoose.model("Review", Schema);

module.exports = Model;

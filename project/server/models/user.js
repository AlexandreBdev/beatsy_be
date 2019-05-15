var mongoose = require("mongoose");

var schema = require("./schemas").User;

var Schema = new mongoose.Schema(schema);

var Model = mongoose.model("User", Schema);

module.exports = Model;

var mongoose = require("mongoose");

var schema = require("./schemas").User_composition;

var Schema = new mongoose.Schema(schema);

var Model = mongoose.model("User_composition", Schema);

module.exports = Model;

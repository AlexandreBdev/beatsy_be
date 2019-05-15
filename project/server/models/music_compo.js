var mongoose = require("mongoose");

var schema = require("./schemas").Music_compo;

var Schema = new mongoose.Schema(schema);

var Model = mongoose.model("Music_compo", Schema);

module.exports = Model;

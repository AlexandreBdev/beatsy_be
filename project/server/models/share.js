var mongoose = require("mongoose");

var schema = require("./schemas").Share;

var Schema = new mongoose.Schema(schema);

var Model = mongoose.model("Share", Schema);

module.exports = Model;

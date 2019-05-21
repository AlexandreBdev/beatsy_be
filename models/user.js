var mongoose = require("mongoose");
const passwordHash = require('password-hash');
const jwt = require('jwt-simple');
const config = require('../config/config');

var schema = require("./schemas").User;

var Schema = new mongoose.Schema(schema,{timestamps: {createdAt: 'created_at'}});

// Authentification & Token

Schema.methods = {
	authenticate: function (password) {
		return passwordHash.verify(password, this.password);
	},
	getToken: function () {
		return jwt.encode(this, config.secret);
	}
}

// \\Authentification & Token

var Model = mongoose.model("User", Schema);

module.exports = Model;

var express = require("express");
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
var fs = require("fs");
var effectsRoute = require('./routes').effects;
var musiccategoryRoute = require('./routes').musiccategory;
var soundcategoryRoute = require('./routes').soundcategory;

var port = process.env.PORT || 3000;



// Nous connectons l'API à notre base de données
mongoose.connect("mongodb://localhost:27017/beatsy", {
    useCreateIndex: true,
    useNewUrlParser: true
});

// Express configuration
var app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static('public'));

app.use('/api/effects', effectsRoute);
app.use('/api/musiccategory', musiccategoryRoute);
app.use('/api/soundcategory', soundcategoryRoute);



app.listen(port, () => {
    console.log('Server started on port', port);
});
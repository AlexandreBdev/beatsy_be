var express = require("express");
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
var fs = require("fs");
var effectsRoute = require('./routes').effects;
var musiccategoryRoute = require('./routes').musiccategory;
var soundcategoryRoute = require('./routes').soundcategory;
var userRoute = require('./routes').user;
var compositionRoute = require ('./routes').composition;
var reviewRoute = require ('./routes').review;
var likeRoute = require('./routes').like;
var listenRoute = require('./routes').listen;


var cors = require("cors");

var port = process.env.PORT || 3001;



// Nous connectons l'API à notre base de données
mongoose.connect("mongodb://localhost:27017/beatsy", {
    useCreateIndex: true,
    useNewUrlParser: true
});

// Express configuration
var app = express();
app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static('public'));

//Définition des CORS
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});


//Définition du router
app.use('/api/effects', effectsRoute);
app.use('/api/musiccategory', musiccategoryRoute);
app.use('/api/soundcategory', soundcategoryRoute);
app.use('/api/user', userRoute);
app.use('/api/composition', compositionRoute);
app.use('/api/review', reviewRoute);
app.use('/api/like', likeRoute);
app.use('/api/listen', listenRoute);



app.listen(port, () => {
    console.log('Server started on port', port);
});
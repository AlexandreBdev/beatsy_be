var express = require('express');
var route = express.Router();
var ListenModel = require("../models").Listen;
var CompositionModel = require("../models").Composition;



const save = (req, res) => {
  console.log('req.query.user', req.query.user);
  console.log('req.query.composition ', req.query.composition);
  console.log('req.query.listened',req.query.listened);

  var created = new Date();
  console.log('New Date () created', created);


  var listen = new ListenModel({
    user: req.query.user || "",
    composition: req.query.composition || "",
    listened: req.query.listened || "",
    created: created,
  });

  listen.save(function(err, listen) {
    // Gestion des erreurs
    if (err != null) {
      res.json ({
        success : false,
        error: {
          message : err.toString()
        }
      });
      return;
    }
    res.json({
      success: true,
      data: listen
    });
  })
}


const getAll = (req, res) => {
  ListenModel.find({}, (err, listen) =>{
    res.json({
      success: true,
      data: listen
    });
  }).populate('user').populate('composition').exec((err, listen)=>{
    if (err) return console.log(err);
    console.log('The listen is ok');
  });
};


const getById = (req,res) => {
  ListenModel.findOne({_id: req.params.listenId}, (err, listen) =>{
    res.json({
      success: true,
      data: listen
    });
  });
};


const getDelete = (req, res) => {
  ListenModel.deleteOne ({_id: req.params.listenId}, (err, result) =>{
    console.log ("delete result", result);
    res.json({
      success: true,
      data: {
        isDeleted: true
      }
    })
  });
};



// composition

const getCompositionById = (req, res) => {
  console.log('getCompositionById #listen');
  ListenModel.find({ composition: req.params.compositionId }, (err, listen)=>{
    res.json({
      success: true,
      data: listen
    })
  }).populate('user').populate('composition').exec((err, listen)=>{
    if (err) return console.log(err);
    console.log('The listen is ok');
  });  
}



  // API CRUD - USERS
  route.post('/', save);
  route.get('/', getAll);
  route.get('/composition/:compositionId', getCompositionById);

  route.get('/:listenId/', getById);
  route.delete('/:listenId', getDelete);

  module.exports = route;

var express = require('express');
var route = express.Router();
var CompositionModel = require("../models").Composition;



const getAll = (req, res) => {
  CompositionModel.find({}, (err, compositions) => {
    res.json({
      success: true,
      data: compositions
    });
  }).populate({path:'user_composition', populate: [{path: 'user'}, {path: 'musicCategory'}]}).exec((err, composition) => {
    if (err) return console.log(err);
    console.log('The composition is ok')
  });
};



const save = (req, res) => {
  
  // Définition d'une nouvelle composition
  // var track = req.query.track;
  // console.log('track', track);
  // var musicCategory = req.query.musicCategory;
  // console.log('musicCategory', musicCategory);
  // var name = req.query.name;
  // console.log('name', name); 
  // var user = req.query.user;
  // console.log('user', user);
  var user_composition = req.query.user_composition;
  console.log('user', user_composition);
  var created = new Date();
  console.log('New Date () created', created);



  var composition = new CompositionModel({
    user_composition: user_composition,
    // name: req.query.name || "",
    // user: req.query.user || "",
    // musicCategory: req.query.musicCategory || "",
    // exportedPath: req.query.exportedPath || "",
    // track: req.query.track || "",
    created: created,
  });
  // Enregistrement d'une nouvelle composition
  composition.save(function(err, composition){
    // Gestion des erreurs
    if(err != null) {
      res.json({
        success: false,
        error: {
          message: err.toString()
        }
      });
      return;
    }
      // Résultat si la condition est vraie
    res.json({
      success: true,
      data: composition
    });
  });
};


  const getById = (req, res) => {
    CompositionModel.findOne({_id: req.params.compositionId}, (err, composition) => {
      res.json ({
        success: true,
        data: composition
      });
    }).populate({path:'user_composition', populate: [{path: 'user'}, {path: 'musicCategory'}]}).exec((err, composition) => {
      if (err) return console.log(err);
      console.log('The composition by Id is ok')
  });
}




const getByUserId = (req, res) => {
  CompositionModel.find({"user": req.params.userId}, (err, composition) => {
    res.json ({
      success: true,
      data: composition
    });
  }).populate('musicCategory').populate('user').exec((err, composition) => {
    if (err) return console.log(err);
    console.log('The composition is ok')
});
}




  const getUpdate = (req, res) => {
    var name = req.query.name;
    console.log('name', name);
    if(name === Number){
      res.json ({
        success: false,
        error : {
          message: "name is invalid" + name + "or SoundPath"
        }
      });
      return;
    }
    CompositionModel.updateOne({_id: req.params.compositionId}, {name : name}, (err, result) => {
      res.json({
        data: {
          isUpdate : true
        }
      });
    });
  };


  const getDelete = (req, res) => {
    CompositionModel.deleteOne({_id: req.params.compositionId}, (err, result) => {
      console.log("delete result", result);
      res.json({
        success : true,
        data : {
          isDeleted : true
        }
      });
    });
  }




  // API CRUD - COMPOSITIONS
  route.post('/', save);
  route.get('/', getAll);

  route.get('/:compositionId/', getById);
  route.put('/:compositionId/', getUpdate);
  route.delete('/:compositionId/', getDelete);

  route.get('/user/:userId/', getByUserId);
  
  //   // Like for each composition
  // route.post('/:compositionId/like', getLike)
  



  module.exports = route;



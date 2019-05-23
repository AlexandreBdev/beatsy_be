var express = require('express');
var route  = express.Router();
var LikeModel = require("../models").Like


const save = (req, res) => {
  // Definition d'un nouveau like
  console.log("req.body.user", req.body.user);
  console.log("req.body.composition", req.body.composition);
  console.log("req.body.isLike", req.body.isLike);
  var created = new Date();
  console.log('New Date () created', created);

  var like = new LikeModel({
    user: req.body.user || "",
    composition: req.body.composition || "",
    isLike: req.body.isLike || "",
    created: created,
  });

  like.save(function(err, like){
    // Gestion des erreurs
    console.log("error", err)
    if (err != null) {
      res.json({
        success : false,
        error: {
          message : err.toString()
        }
      });
      return;
    }
    // Résultat si la condition est vraie
    console.log("succès")
    res.json({
      success: true,
      data: like
    });
  });
};

const getAll = (req, res) => {
  console.log('getAll Like')
  LikeModel.find({}, (err, like) => {
    res.json({
      success: true,
      data: like
    });
  });
};
    
 
const getById = (req, res) => {
  LikeModel.findOne({ _id: req.params.likeId }, (err, like)=> {
    res.json({
      success: true,
      data: like
    });
  });
};


const getDelete = (req, res) =>{
  LikeModel.deleteOne ({_id: req.params.likeId}, (err, result) => {
    console.log("delete result", result);

    res.json({
      success: true,
      data: {
        isDeleted: true
      }
    });
  });
};






  // API CRUD - USERS
  route.post('/', save);
  route.get('/', getAll);

  route.get('/:likeId/', getById);
  route.delete('/:likeId', getDelete);

  module.exports = route;


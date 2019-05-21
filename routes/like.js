var express = require('express');
var route  = express.Router();
var LikeModel = require("../models").Like


const save = (req, res) => {
  // Definition d'un nouveau like
  var like = new LikeModel({
    user: req.body.user || "",
    composition: req.body.composition || "",
    isLike: req.body.isLike || "",
    created: req.body.created || "",
  });

  like.save(function(err, like){
    // Gestion des erreurs
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
    res.json({
      success: true,
      data: like
    });
  });
};

const getAll = (req, res) => {
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


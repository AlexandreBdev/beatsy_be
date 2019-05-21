var express = require('express');
var route = express.Router();
var ReviewModel = require("../models").Review;



const getAll = (req, res) => {
  console.log('getAll #review')
    ReviewModel.find({}, (err, reviews) => {
    res.json({
      success: true,
      data: reviews
    });
  }).populate('composition').populate('user').exec((err, review) => {
    if (err) return console.log(err);
    console.log('The review')
  });
};



const save = (req, res) => {
  console.log("ok review save")
  // Définition d'une nouvelle review
  console.log('req.body',req.body);
  console.log('req.query.user',req.query.user);
  console.log('req.query.composition', req.query.composition)
  console.log('req.body.comment', req.body.comment);
  var created = new Date();
  console.log('New Date () created', created);
  
  

  var review = new ReviewModel({
    user: req.query.user || "",
    composition: req.query.composition || "",
    comment: req.body.comment || "",
    created: created || "",
  });
  // Enregistrement d'une nouvelle review
  review.save(function(err, review){
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
      data: review
    });
  });
};


  const getById = (req, res) => {
    console.log('getById #review')
    ReviewModel.findOne({_id: req.params.reviewId}, (err, review) => {
      res.json ({
        success: true,
        data: review
      });
    }).populate('composition').populate({path:'user'}).exec((err, review) => {
      if (err) return console.log(err);
      console.log('The review is ok')
  });
}






  const getUpdate = (req, res) => {
    console.log('getUpdate #review')
    var comment = req.query.comment;
    console.log('name', comment);
    if(comment === Number){
      res.json ({
        success: false,
        error : {
          message: "comment is invalid" + comment + "or SoundPath"
        }
      });
      return;
    }
    ReviewModel.updateOne({_id: req.params.reviewId}, {comment : comment}, (err, result) => {
      res.json({
        data: {
          isUpdate : true
        }
      });
    });
  };


  const getDelete = (req, res) => {
    console.log('getDelete #review')
    ReviewModel.deleteOne({_id: req.params.reviewId}, (err, result) => {
      console.log("delete result", result);
      res.json({
        success : true,
        data : {
          isDeleted : true
        }
      });
    });
  }




  // API CRUD - REVIEWS
  route.post('/', save);
  route.get('/', getAll);

  route.get('/:reviewId/', getById);
  route.put('/:reviewId/', getUpdate);
  route.delete('/:reviewId/', getDelete);


  module.exports = route;



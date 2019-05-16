var express = require('express');
var route = express.Router();
var MusicCategoryModel = require("../models").MusicCategory

// Lien ALL
const getAll = (req, res) => {
    MusicCategoryModel.find({}, (err, musiccategories) => {
        res.json({
            success: true,
            data: musiccategories
        });
    });
};
const save = (req, res) => {
    // Définition d'une nouvelle catégorie musicale
    var musiccategory = new MusicCategoryModel({
        name: req.body.name || "",
    });
    // Enregistrement d'une nouvelle catégorie musicale
    musiccategory.save(function(err, musiccategory){
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
        // Résultat si vrai
        res.json({
            succes: true,
            data: musiccategory
        });
    });
}

// Lien par Id
const getById = (req, res) => {
    MusicCategoryModel.findOne({ _id: req.params.musiccategoryId }, (err, musiccategory) => {
        res.json({
            success: true,
            data: musiccategory 
        });
    });
}

const getUpdate = (req, res) => {
    var name = req.query.name;

    if(name === 'green'){
        res.json({
            success: false, 
            error: {
                message: "name is invalid "+name
            }
        });
        return;
    }
    MusicCategoryModel.updateOne({_id: req.params.musiccategoryId}, {name: name}, (err, result) => {
        console.log("update result", result);
        res.json({
            data: {
                isUdapte: true
            }
        });
    });
}


const deleteItem = (req, res) => {
    MusicCategory.deleteOne({_id: req.params.musiccategoryId}, (err, result) => {
        console.log("delete result", result);
        res.json({
            success: true, 
            date: {
                isDeleted: true
            }
        });
    });
}

route.post('/', save);
route.get('/', getAll);

route.get('/:musiccategoryId/', getById);
route.put('/:musiccategoryId/', getUpdate);
route.delete('/:musiccategoryId/', deleteItem);

module.exports = route;
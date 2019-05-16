var express = require('express');
var route = express.Router();
var MusicCategoryModel = require("../models").MusicCategory

const getAll = (req, res) => {};
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

const getUpdate = (req, res) => {}
const getDelete = (req, res) => {}

route.post('/', save);
route.get('/', getAll);
route.put('/', getUpdate);
route.delete('/', getDelete);

module.exports = route;
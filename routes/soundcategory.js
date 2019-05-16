var express = require('express');
var route = express.Router();
var SoundCategoryModel = require("../models").SoundCategory

const getAll = (req, res) => {};
const save = (req, res) => {
    // Définition d'une nouvelle catégorie sonore
    var soundcategory = new SoundCategoryModel({
        name: req.body.name || "",
        color: req.body.color || ""
    });
    // Enregistrement d'une nouvelle catégorie musicale
    soundcategory.save(function(err, soundcategory){
        // Gestion des erreurs
        if(err != null ) {
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
            data: soundcategory
        });
    });
}

const getUpdate = (req, res) => {
    var color = req.query.color

    if(color === 'black'){
        res.json({
            succes: false,
            error: {
                message: "color is invalid "+color
            }
        });
        return;
    }
    SoundCategoryModel.updateOne({_id: req.params.soundcategoryId}, {color: color}, (err, result) => {
        console.log("update result", result);
        res.json({
            data: {
                isUdapte: true
            }
        })
    });
}
const deleteItem = (req, res) => {}

route.post('/', save);
route.get('/', getAll);
route.put('/:soundcategoryId', getUpdate);
route.delete('/', deleteItem);

module.exports = route;
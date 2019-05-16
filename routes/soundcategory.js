var express = require('express');
var route = express.Router();
var SoundCategoryModel = require("../models").SoundCategory

// Lien ALL
const getAll = (req, res) => {
    SoundCategoryModel.find({}, (err, soundcategories) => {
        res.json({
            success: true, 
            data: soundcategories
        })
    });
};

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

// Lien by ID
const getById = (req, res) => {
    SoundCategoryModel.findOne({ _id: req.params.soundcategoryId }, (err, soundcategory) => {
        res.json({
            success: true,
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

const deleteItem = (req, res) => {
    SoundCategoryModel.deleteOne({_id: req.params.soundcategoryId}, (err, result) => {
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

route.get('/:soundcategoryId/', getById);
route.put('/:soundcategoryId/', getUpdate);
route.delete('/:soundcategoryId/', deleteItem);

module.exports = route;
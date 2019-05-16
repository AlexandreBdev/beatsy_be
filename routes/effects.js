var express = require('express');
var route = express.Router();
var EffectModel = require("../models").Effects

const getByMusicCategory = (req, res) => {
    EffectModel.find({}, (err, effects) => {
        res.json({
            success: true,
            data: effects
        });
    }).populate('soundCategory').populate('musicCategory').exec((err, effect) => {
        if(err) return handleError(err);
        console.log('The sound category is', effect.soundCategory)
    });
};

// Lien for ALL
const getAll = (req, res) => {
    EffectModel.find({}, (err, effects) => {
        res.json({
            success: true,
            data: effects
        });
    }).populate('soundCategory').exec((err, effect) => {
        if (err) return handleError(err);
        console.log('The sound category is', effect.soundCategory.name)
    });
};

const save = (req, res) => {
        // Définition d'un nouvel Effet
        var effect = new EffectModel({
            name: req.body.name || "",
            soundPath: req.body.soundPath || "", 
            soundCategory: req.body.soundCategory._id || "",
            musicCategory: req.body.musicCategory || ""
        });
        // Enregistrement d'un nouvel Effet
        effect.save(function(err, effect) {
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
                success: true,
                data: effect
            });
        });
};


// Lien by ID
const getById = (req, res) => {
    EffectModel.findOne({ _id: req.params.effectId }, (err, effect) => {
        res.json({
            success: true,
            data: effect 
        });
    }).populate('soundCategory').exec(function (err, effect) {
        if (err) return handleError(err);
        console.log('The sound category is', effect.soundCategory.name)
    });
}

const getUpdate = (req, res) => {
    var name = req.query.name;

    if(name === 'green'){
        res.json({
            success: false, 
            error: {
                message: "name is invalid "+name+"or SoundPath"
            }
        });
        return;
    }
    EffectModel.updateOne({_id: req.params.effectId}, {name: name}, (err, result) => {
        console.log("update result", result);
        res.json({
            data: {
                isUdapte: true
            }
        });
    });
}
const deleteItem = (req, res) => {
    EffectModel.deleteOne({_id: req.params.effectId}, (err, result) => {
        console.log("delete result", result);
        res.json({
            success: true, 
            date: {
                isDeleted: true
            }
        });
    });
}


// API CRUD - Effects
route.post('/', save);
route.get('/', getAll);

route.get('/:effectId/', getById);
route.put('/:effectId/', getUpdate);
route.delete('/:effectId/', deleteItem);

route.get('/musiccategories/hiphop', getByMusicCategory);


module.exports = route;
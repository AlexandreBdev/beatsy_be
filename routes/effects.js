var express = require('express');
var route = express.Router();
var EffectModel = require("../models").Effects

const getByMusicCategory = (req, res) => {
    res.json({
        success: true, 
        effects : [{
            name: 'beat1',
            soundPath: '/audio/beat1.wav', 
            soundCategory: {
                _id: "",
                name: "kick"
            }, 
            musicCategory: {
                _id: "",
                name: 'hiphop'
            },
        }]
    })
};

const getAll = (req, res) => {
    EffectModel.find({}, (err, effects) => {
        res.json({
            success: true,
            data: effects
        });
    });
};

const getById = (req, res) => {
    EffectModel.findOne({ _id: req.params.effectId }, (err, effect) => {
        res.json({
            success: true,
            data: effect 
        });
    });
}

const save = (req, res) => {
        // Définition d'un nouvel Effet
        var effect = new EffectModel({
            name: req.body.name || "",
            soundPath: req.body.soundPath || "", 
            soundCategory: req.body.soundCategory || "",
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
const getDelete = (req, res) => {
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
route.delete('/:effectId/', getDelete);

route.get('/musiccategories/hiphop', getByMusicCategory);


module.exports = route;
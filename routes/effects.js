var express = require('express');
var route = express.Router();
var EffectModel = require("../models").Effects

const getByMusicCategory = (req, res) => {
    const musicCategory = req.params.musiccategory;
    let musicCategoryId = '';
    console.log("musicCategoryId #1",musicCategoryId)
    const musicCategoryList = [
        {name: "hiphop", id:"5cdc7366081d8d34b0c8255d"},
        {name: "electro", id:"5cde095639c31a103856c413"},
        {name: "funk", id:"5cde097739c31a103856c414"}
    ]
    console.log('musicCategory', musicCategory)
    console.log('musicCategoryList', musicCategoryList)

    for(let i = 0; i<musicCategoryList.length; i++){
        if(musicCategory === musicCategoryList[i].name){
            musicCategoryId = musicCategoryList[i].id;
                console.log("musicCategoryId #2",musicCategoryId, 'name', musicCategoryList[i].name)
                EffectModel.find({musicCategory: musicCategoryId}, (err, effects) => {
                    // console.log('effects', effects);
                    res.json({
                        success: true,
                        data: effects
                    });
                }).populate('soundCategory').populate('musicCategory').exec((err, effect) => {
                    if(err) return console.log(err);
                    console.log('The sound category is', effect[0].soundCategory.name)
                });
        }
    }
};


// Lien for ALL
const getAll = (req, res) => {
    EffectModel.find({}, (err, effects) => {
        res.json({
            success: true,
            data: effects
        });
    }).populate('soundCategory').populate('musicCategory').exec((err, effect) => {
        if (err) return console.log(err);
        console.log('The sound category is')
    });
};

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



// Lien by ID
const getById = (req, res) => {
    EffectModel.findOne({ _id: req.params.effectId }, (err, effect) => {
        res.json({
            success: true,
            data: effect 
        });
    }).populate('soundCategory').exec(function (err, effect) {
        if (err) return err
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

const deleteMany = (req, res) => {
    EffectModel.deleteMany({_id: req.params.musicCategoryId}, (err, result) => {
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
route.delete('/:musicCategoryId/', deleteMany);

route.get('/musiccategories/:musiccategory', getByMusicCategory);

module.exports = route;
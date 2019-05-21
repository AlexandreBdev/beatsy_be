var User = require("./user");
var Review = require("./review");
var Listen = require("./listen");
var Share = require("./share");
var Composition = require("./composition");
var Effects = require("./effects");
var Composition_Effects = require("./composition_effects");
var SoundCategory = require("./soundcategory");
var MusicCategory = require("./musiccategory");
var MusicCategory_Effects = require("./musiccategory_effects");
var Like = require("./like");

module.exports = {
  Review: Review,
  User: User,
  Listen: Listen,
  Share: Share,
  Composition: Composition,
  Effects: Effects,
  Composition_Effects: Composition_Effects,
  SoundCategory: SoundCategory,
  MusicCategory: MusicCategory,
  MusicCategory_Effects : MusicCategory_Effects,
  Like : Like,
};

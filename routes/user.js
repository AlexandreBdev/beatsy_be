var express = require('express');
var route = express.Router();
var UserModel = require("../models").User;
var User_compositionModel = require("../models").User_composition;
var CompositionModel = require("../models").Composition;
var passwordHash = require("password-hash");

const getUser = (req, res) => {
  res.json({
    success: true,
    users : [{
      firstName : 'julie',
      surname: 'stevens',
      password: 'js4856984542',
      email: 'j.stevens@gmail.com',
      username : 'jstevens',
      token: 'null',
      thumbnail: './img/juliestevens.jpg',
      created: {
        type: '13/05/2019',
        default:'16/05/2019',
      },
    }]
  })
}

  const getAll = (req, res) => {
    UserModel.find({}, (err, users) => {
      res.json({
        success: true,
        data: users
      });
    });
  };


const save = (req, res) => {
    // Definition d'un nouvel user

    var created = new Date();
    console.log('New Date () created', created);
  
  var user = new UserModel({
    firstName: req.body.firstName || "",
    surname: req.body.surname || "",
    password: req.body.password || "",
    email: req.body.email || "",
    username: req.body.username || "",
    token: req.body.token || "",
    thumbnail: req.body.thumbnail || "",
    created: created || "",
  });

  // Enregistrement d'un nouvel User
  user.save(function(err, user) {
    // Gestion des erreurs
    if (err != null) {
      res.json({
        success: false,
        error: {
          message : err.toString()
        }
      });
      return;
    }
    // Résultat si la condition est vraie
    res.json({
      success: true,
      data: user
    });
  });
};



const getById = (req, res) => {
  UserModel.findOne({_id: req.params.userId}, (err, user) => {
    res.json ({
      success: true,
      data: user
    });
  });
}



const getUpdate = (req, res) => {
  var firstName = req.query.firstName;

  if (firstName === Number){
    res.json ({
      success: false,
      error: {
        message: "firstName is invalid" + firstName + "or SoundPath"
      }
    });
    return;
  }
  UserModel.updateOne({_id: req.params.userId}, {firstName : firstName}, (err, result) => {
    // console.log("update result", result);
    res.json ({
      data: {
        isUpdate: true
      }
    });
  });
}

  const getDelete = (req, res) => {
    UserModel.deleteOne({_id: req.params.userId}, (err, result)=> {
      console.log("delete result", result);
      res.json({
        success: true,
        data: {
          isDeleted: true
        }
      });
    });
  }

  // GESTION SIGN UP & LOG IN

  const signup = (req, res) => {
    console.log('ROUTE req', req.body)
    // console.log('ROUTE res', res)
    if (!req.body.email || !req.body.password) {
      //Le cas où l'email ou bien le password ne serait pas soumit ou nul
      res.status(400).json({
          "text": "Requête invalide"
      })
  } else {
    var compositionDefaultId = "5ce1a20a5a0ef123a05799c6"
      var user = {
        // firstName: req.body.firstName || "",
        // surname: req.body.surname || "",
        username: req.body.username || "",
        // thumbnail: req.body.thumbnail || "",
        // created: req.body.created || "",
        // composition: compositionDefaultId || "",
        email: req.body.email,
        password: passwordHash.generate(req.body.password)

      }
      // user.push({'token': user.getToken()});

      // var findUser = new Promise(function (resolve, reject) {
        
        // console.log("USER ROUTE resolve", resolve);
        // console.log("USER ROUTE reject", reject);
        
        // UserModel.findOne({
        //       email: user.email
        //   }, function (err, result) {
        //       if (err) {
        //           reject(500);
        //       } else {
        //           if (result) {
        //               reject(204)
        //           } else {
        //               resolve(true)
        //           }
        //       }
        //   })
      // })
      UserModel.findOne({
        email: user.email
    }).then(function () {
          var _u = new UserModel(user);
          console.log('ROUTE findUser new UserModel(user)', user);
          console.log('ROUTE findUser new UserModel(user)', _u)
          // var token = user.getToken()
          // console.log('token', token);
          _u.save(function (err, user) {
            console.log('ROUTE user', user)
            // console.log('_u', _u);
            // var token = user.getToken()
            // console.log('token', token);
            //  _u.push(token);

              if (err) {
                  res.status(500).json({
                      "text": "Erreur interne"
                  })
              } else {
                  res.status(200).json({
                      "text": "Succès",
                      token: user.getToken(),
                      user: user._id,
                      username: user.username
                  })
              }
          })
      }, function (error) {
          switch (error) {
              case 500:
                  res.status(500).json({
                      "text": "Erreur interne"
                  })
                  break;
              case 204:
                  res.status(204).json({
                      "text": "L'adresse email existe déjà"
                  })
                  break;
              default:
                  res.status(500).json({
                      "text": "Erreur interne"
                  })
          }
      })
  }

  }

  const login = (req, res) => {
    console.log("login req")
    console.log("req.body.email", req.body.email);
    console.log("req.body.password", req.body.password);
    if (!req.body.email || !req.body.password) {
      console.log("400: Requête invalide");
      //Le cas où l'email ou bien le password ne serait pas soumit ou nul
      res.status(400).json({
          "text": "Requête invalide"
      })
  } else {
    UserModel.findOne({
          email: req.body.email
      }, function (err, user) {
          if (err) {
            console.log("500: Erreur interne");
              res.status(500).json({
                  "text": "Erreur interne"
              })
          } else if (!user) {
            console.log("401: L'utilisateur n'existe pas");
              res.status(401).json({
                  "text": "L'utilisateur n'existe pas"
              })
          } else {
              if (user.authenticate(req.body.password)) {
                console.log("200: Authentification réussi");
                  res.status(200).json({
                      "token": user.getToken(),
                      "text": "Authentification réussi",
                      user: user._id,
                      username: user.username
                  })
              } else {
                console.log("401: Mot de passe incorrect");
                  res.status(401).json({
                      "text": "Mot de passe incorrect"
                  })
              }
          }
      })
  }
}


const getLogin = (req, res) => {
  console.log("getLogin Request")
  UserModel.find({password: passwordHash.generate(req.body.password)}, (err, users) => {
    console.log("users Login", users);
    res.json({
      success: true,
      data: users
    });
  });
};

const getSignup = (req, res) => {
  console.log("getSignup Request")
  UserModel.find({password: passwordHash.generate(req.body.password)}, (err, users) => {
    console.log("users Signup", users);
    res.json({
      success: true,
      data: users
    });
  });
};

  // Composition by UserId

const getCompositionByUser = (req, res) => {
  var user = req.params.userId;
  console.log('user', user);

  User_compositionModel.find({user: req.params.userId}, (err, user_composition) => {
    res.json({
      success: true,
      data: user_composition
    });
  }).populate('musicCategory').populate('user').exec((err, user_composition) => {
    if (err) return console.log(err);
    console.log('The composition by User is ok')
  });
}

const saveCompositionByUser = (req, res) => {
  // Définition d'une nouvelle composition par User
  var track = req.query.track;
  console.log('track', track);
  var musicCategory = req.query.musicCategory;
  console.log('musicCategory', musicCategory);
  var name = req.query.name;
  console.log('name', name); 
  var user = req.params.userId;
  console.log('user', user);
  console.log('req.query.listen', req.query.listen);
  var created = new Date();
  console.log('New Date () created', created);


  var user_composition = new User_compositionModel({
    name: req.query.name || "",
    user: user || "",
    musicCategory: req.query.musicCategory || "",
    exportedPath: req.query.exportedPath || "",
    track: req.query.track || "",
    listen: req.query.listen,
    created: created,
  });

// Enregistrement d'un nouvel User
user_composition.save(function(err, user_composition) {
  // Gestion des erreurs
  if (err != null) {
    res.json({
      success: false,
      error: {    
        message : err.toString()
      }
    });
    return;
  }
  // ----------------- SAVE in COMPOSITION COLLECTION ---------------------//


  var composition = new CompositionModel({
    user_composition: user_composition._id,
    created: created,
  });
  // Enregistrement d'une nouvelle composition
  composition.save(function(err, compositionDb){
    // Gestion des erreurs
    // if(err != null) {
    //   res.json({
    //     success: false,
    //     error: {
    //       message: err.toString()
    //     }
    //   });
    //   return;
    // }
      // Résultat si la condition est vraie
    res.json({
      success: true,
      data: user_composition
    });
  });


  // ----------------- / SAVE in COMPOSITION COLLECTION ---------------------//

  // Résultat si la condition est vraie
  // console.log('user_composition _id', user_composition._id);
  // res.json({
  //   success: true,
  //   data: user_composition
  // });
});

};


// const getAllCompositions = (req, res) => {
//   console.log('All Compositions are required');

//   User_compositionModel.find({}, (err, user_compositions) => {
//     res.json({
//       success: true,
//       data: user_compositions
//     });
//   }).populate('musicCategory').populate('user').exec((err, user_compositions) => {
//     if (err) return console.log(err);
//     console.log('The compositions are ok')
//   });
// }




const getCompositionByUser_compositionId = (req, res) => {
  User_compositionModel.findOne({_id: req.params.user_compositionId}, {listen:1}, (err, user_composition) => {
    // console.log('data: user_composition', user_composition);
    // console.log('data: user_composition', user_composition.listen)
    
    res.json ({
      success: true,
      data: user_composition
    });
  }).populate;
}


const getUpdateCompositionByUser = (req, res) => {
  console.log('getUpdateCompositionByUser #user_composition for listen')
  console.log('req.params.user_compositionId',req.params.user_compositionId)
  if(typeof listen === "string"){
    res.json ({
      success: false,
      error : {
        message: "plus "+listen+" écoute"
      }
    });
    return;
  }

  User_compositionModel.findOne({_id: req.params.user_compositionId}, {listen:1}, (err, user_composition) => {
    console.log('data: user_composition', user_composition);
    // console.log('data: user_composition', user_composition.listen)

    // if (user_composition.listen === null) {
    //   listen = 1
    // }
    var listen = user_composition.listen;
    var listenCounterUp = listen + 1;
    console.log("listenCounterUp", listenCounterUp);
  
    
  
  User_compositionModel.updateOne({_id: req.params.user_compositionId}, {listen : listenCounterUp}, (err, result) => {
    res.json({
      data: {
        isUpdate : true
      }
      });
    });
  });
};



  // API CRUD - USERS
  // route.post('/', save);
  route.get('/', getAll);

  route.get('/:userId/', getById);
  route.put('/:userId/', getUpdate);
  route.delete('/:userId', getDelete);

  // API SIGN UP & LOG IN

  route.post('/login', login);
  route.post('/signup', signup);

  route.get('/login', getLogin);
  route.get('/signup', getSignup);
  
  // Composition by UserId
  route.get('/:userId/composition/', getCompositionByUser);
  route.post('/:userId/composition/', saveCompositionByUser);
  route.get('/:userId/composition/:user_compositionId', getCompositionByUser_compositionId);
  route.put('/:userId/composition/:user_compositionId', getUpdateCompositionByUser);

  // route.get('/user_compositions', getAllCompositions);



  module.exports = route;
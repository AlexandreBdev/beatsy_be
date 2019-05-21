var express = require('express');
var route = express.Router();
var UserModel = require("../models").User
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
  var user = new UserModel({
    firstName: req.body.firstName || "",
    surname: req.body.surname || "",
    password: req.body.password || "",
    email: req.body.email || "",
    username: req.body.username || "",
    token: req.body.token || "",
    thumbnail: req.body.thumbnail || "",
    created: req.body.created || "",
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
      var user = {
        // firstName: req.body.firstName || "",
        // surname: req.body.surname || "",
        username: req.body.username || "",
        // thumbnail: req.body.thumbnail || "",
        // created: req.body.created || "",
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
                      user: user._id
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
    if (!req.body.email || !req.body.password) {
      //Le cas où l'email ou bien le password ne serait pas soumit ou nul
      res.status(400).json({
          "text": "Requête invalide"
      })
  } else {
    UserModel.findOne({
          email: req.body.email
      }, function (err, user) {
          if (err) {
              res.status(500).json({
                  "text": "Erreur interne"
              })
          } else if (!user) {
              res.status(401).json({
                  "text": "L'utilisateur n'existe pas"
              })
          } else {
              if (user.authenticate(req.body.password)) {
                  res.status(200).json({
                      "token": user.getToken(),
                      "text": "Authentification réussi",
                      user: user._id
                  })
              } else {
                  res.status(401).json({
                      "text": "Mot de passe incorrect"
                  })
              }
          }
      })
  }
}


const getLogin = (req, res) => {
  UserModel.find({password: passwordHash.generate(req.body.password)}, (err, users) => {
    res.json({
      success: true,
      data: users
    });
  });
};

const getSignup = (req, res) => {
  UserModel.find({password: passwordHash.generate(req.body.password)}, (err, users) => {
    res.json({
      success: true,
      data: users
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

  module.exports = route;
let model = require('../models/connexion.js');
let Cryptr = require('cryptr');

  // ////////////////////////////////////////////// CONNEXION
module.exports.Login = function(request, response) {
    response.title = 'Authentification';
    response.render('login', response);
};

module.exports.Deconnexion = function(request, response) {
  var session = request.session;
  session.isConnected = undefined;
  response.render('home', response);
};

module.exports.CheckLogin = function(request, response) {
  response.title = 'Authentification en cours...';
  var login = request.body.login;
  var motDePasse = request.body.motDePasse;
  model.CheckLogin(login, motDePasse, function(err, res) {
    if (err) {
      console.log(err);
      return;
    }
    if (res) {
      let crypt = new Cryptr('MaSuperCléDeChiffrementDeouF');
      console.log(res[0].passwd);
      let decryptedString = crypt.decrypt(res[0].passwd);
      console.log(decryptedString);
      console.log(motDePasse);
      if(motDePasse == decryptedString){
        var session = request.session;
        session.isConnected = true;
        response.redirect("/accueil");
        return;
      }
      else{
        response.fail = "Mot de passe incorrect.";
        response.render('login', response);
        return;
      }
    } else {
      //Login incorrect
      response.fail = "Login incorrect.";
      response.render('login', response);
      return;
    }
  });
}

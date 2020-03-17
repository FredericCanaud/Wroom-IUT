let modelePilote = require('../models/pilote.js');
let modeleEcurie = require('../models/ecurie.js');
let modelePays = require('../models/pays.js');
let async = require('async');

// ///////////////////////// R E P E R T O I R E    D E S    P I L O T E S

module.exports.ListerPilotes = function(request, response){
   response.title = 'Gestion des Pilotes';
    modelePilote.getPilotes( function (err, result) {
       if (err) {
           console.log(err);
           return;
       }
       response.pilotes = result;
       console.log(result);
      response.render('pilotes', response);
   });
}

module.exports.AjouterPilote = function(request, response){
   response.title = 'Ajouter un Pilote';
   async.parallel([
      function(callback){
           modeleEcurie.getNomEcuries(function (err, result) {callback(null,result)});
      },
      function(callback){
          modelePays.getNationalites(function (err, result) {callback(null, result)});
      },
   ],
   function(err, result){
      if (err) {
          console.log(err);
          return;
      }
      response.ecuries = result[0];
      response.nationalites = result[1];
      response.render('ajouterPilote', response);
   });
 }

 module.exports.AjoutPilote = function(request, response) {
   response.title = 'Ajout du pilote en cours...';

   var data = {
     pilnom: request.body.pilnom,
     pilprenom: request.body.pilprenom,
     pildatenais: request.body.pildatenais,
     paynum: request.body.paynum,
     ecunum: request.body.ecunum,
     pilpoints: request.body.pilpoints,
     pilpoids: request.body.pilpoids,
     piltaille: request.body.piltaille,
     piltexte: request.body.piltexte
   }
   console.log(data);
   modelePilote.ajouterPilote(data, function(err, res) {
     if (err) {
       response.fail = "Échec de l'ajout !";
       response.render('ajouterPilote', response);
       console.log(err);
       return;
     }
     else {
         response.redirect("/pilotes");
         console.log("C'est bon !");
         return;
     }
   });
 }

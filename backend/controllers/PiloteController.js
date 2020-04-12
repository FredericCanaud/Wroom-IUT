let modelePilote = require('../models/pilote.js');
let modeleEcurie = require('../models/ecurie.js');
let modelePays = require('../models/pays.js');
let modeleCourse = require('../models/course.js');
let modeleEssais = require('../models/essais.js');
let modelePhoto = require('../models/photo.js');
let modeleSponsorise = require('../models/sponsorise.js');
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
 module.exports.ModifierPilote = function(request, response){
    response.title = 'Modifier un Pilote';
    async.parallel([
       function(callback){
           modeleEcurie.getNomEcuries(function (err, result) {callback(null,result)});
       },
       function(callback){
           modelePays.getNationalites(function (err, result) {callback(null, result)});
       },
       function(callback){
           let pilnum = request.params.num;
           modelePilote.getDetailPilote(pilnum,function(err, result) {callback(null, result)});
       }
    ],
    function(err, result){
       if (err) {
           console.log(err);
           return;
       }
       response.ecuries = result[0];
       response.nationalites = result[1];
       response.pilote = result[2][0];
       console.log(result[2][0]);
       response.render('modifierPilote', response);
    });
  }
  module.exports.ModifPilote = function(request, response) {
    response.title = 'Modification du pilote en cours...';

    var data = {
      pilnum: request.body.pilnum,
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
    modelePilote.modifierPilote(data, function(err, res) {
      if (err) {
        response.fail = "Échec de l'ajout !";
        response.render('modifierPilote', response);
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
  module.exports.SupprimerPilote = function(request, response){
     response.title = "Suppression d'un pilote en cours...";
     let pilnum = request.params.num;
     async.series([
        function(callback){
            modeleCourse.supprimerCourseByPilnum(pilnum, function (err, result) {callback(null, result)});
        },
        function(callback){
            modeleEssais.supprimerEssaisByPilnum(pilnum, function (err, result) {callback(null, result)});
        },
        function(callback){
            modeleSponsorise.supprimerSponsoringByPilnum(pilnum, function (err, result) {callback(null, result)});
        },
        function(callback){
            modelePhoto.supprimerPhotoByPilnum(pilnum, function (err, result) {callback(null,result)});
        },
        function(callback){
            modelePilote.supprimerPilote(pilnum, function (err, result) {callback(null,result)});
        },
     ],
     function(err, result){
        if (err) {
            console.log(err);
            return;
        }
        response.redirect('/pilotes');
     });
   }

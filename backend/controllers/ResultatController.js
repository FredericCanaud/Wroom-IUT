let modeleGrandPrix = require('../models/grandprix.js');
let modeleResultat = require('../models/resultat.js');
let modeleCourse = require('../models/course.js')
let async = require('async');

	// //////////////////////////L I S T E R    GRAND PRIX
module.exports.ListerGrandPrix = function(request, response){
  response.title = 'Liste des résulats des grands prix';
   modeleGrandPrix.getListeGrandPrix( function (err, result) {
       if (err) {
           console.log(err);
           return;
       }
       response.grandprix = result;
       response.render('resultats', response);
   });
}
module.exports.RedirectionSaisieResultat = function(request, response){
    response.title = 'Saisie des résultats';
    request.session.gpnum = request.body.gpnum;
    response.redirect('saisieResultats')
}

module.exports.AffichageSaisieResultat = function(request, response){
  response.title = 'Saisie des résultats';
   let gpnum = request.session.gpnum;
   async.parallel([
		 function(callback){
         modeleResultat.getDetailResultat(gpnum, (function (err, result) {callback(null, result)}));
     },
     function(callback){
         modeleGrandPrix.getPilotesNotInGP(gpnum, (function (err, result) {callback(null, result)}));
     },
   ],
   function(err, result){
      if (err) {
          console.log(err);
          return;
      }
      response.gpnum = gpnum;
			response.resultat = result[0];
      response.pilotesNotInGP = result[1];
      response.nombrePilotesNotInGP = result[0].length+1;
      response.render('saisieResultats', response);
   });
 }
 module.exports.SaisieResultat = function(request, response) {
   response.title = 'Ajout du résultat en cours...';

   var minutes = request.body.minutes;
   var secondes = request.body.secondes;
   var millisecondes = request.body.millisecondes;

   console.log(minutes);
   console.log(secondes);
   console.log(millisecondes);

   if (minutes <= 9){
     var minutes = ("0" + minutes).slice(-2);
   }
   if (secondes <= 9){
     var secondes = ("0" + secondes).slice(-2);
   }
   if (millisecondes <= 9){
     var millisecondes = ("0" + millisecondes).slice(-2);
   }

   var tempscourse = minutes + ":" + secondes + ":" + millisecondes;

   var data = {
     gpnum: request.body.gpnum,
     pilnum: request.body.pilnum,
     tempscourse: tempscourse
   }

   console.log(data);
   modeleCourse.ajouterCourse(data, function(err, res) {
     if (err) {
       response.fail = "Échec de l'ajout !";
       response.render('saisieResultats', response);
       console.log(err);
       return;
     }
     else {
         response.redirect("/resultats");
         console.log("C'est bon !");
         return;
     }
   });
 }

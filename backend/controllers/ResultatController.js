let model = require('../models/resultat.js');
let async = require('async');

	// //////////////////////////L I S T E R    GRAND PRIX
module.exports.ListerResultat = function(request, response){
  response.title = 'Liste des résulats des grands prix';
   model.getListeGrandPrix( function (err, result) {
       if (err) {
           console.log(err);
           return;
       }
       response.listeGrandPrix = result;
       console.log(result);
       response.render('listerResultat', response);
   });
}
module.exports.InfoResultat = function(request, response){
   let data = request.params.num;
   async.parallel([
     function(callback){
         model.getDetailGrandPrix(data, (function (err, result) {callback(null, result)}));
     },
		 function(callback){
         model.getDetailResultat(data, (function (err, result) {callback(null, result)}));
     },
     function(callback){
         model.getListeGrandPrix(function (err, result) {callback(null,result)});
     }
   ],
   function(err, result){
      if (err) {
          console.log(err);
          return;
      }
      response.grandPrix = result[0][0];
			response.resultat = result[1]
      response.listeGrandPrix = result[2];
      console.log(result[0][0]);
      response.title = 'Détail sur le grand prix ' + result[0][0].cirnom;
      response.render('detailGrandPrix', response);
   });
 }

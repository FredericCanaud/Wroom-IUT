let model = require('../models/pilote.js');
let async = require('async');

// ///////////////////////// R E P E R T O I R E    D E S    P I L O T E S

module.exports.Repertoire = 	function(request, response){
   response.title = 'Répertoire des pilotes';
    model.getPiloteNameFirstLetter( function (err, result) {
       if (err) {
           console.log(err);
           return;
       }
       response.listePilotes = result;
       console.log(result);
      response.render('repertoirePilotes', response);
  } );
}

module.exports.RepertoireLettre = function(request, response){
   response.title = 'Répertoire des pilotes';
   let data = request.params.num;
   async.parallel([
      function(callback){
           model.getPiloteNameFirstLetter( function (err, result) {callback(null,result)});
      },
      function(callback){
          model.getNomPilote(data, (function (err, result) {callback(null, result)}));
      }
   ],
   function(err, result){
      if (err) {
          console.log(err);
          return;
      }
      response.listePilotes = result[0];
      response.data = result[1];
      console.log(result[1]);
      response.render('nomPilote', response);
   });
 }
 module.exports.InfoPilote = function(request, response){
    let data = request.params.num;
    async.parallel([
       function(callback){
            model.getDetailPilote(data,function (err, result) {callback(null,result)});
       },
       function(callback){
           model.getSponsorsFromPilote(data, (function (err, result) {callback(null, result)}));
       },
       function(callback){
           model.getPhotosFromPilote(data, (function (err, result) {callback(null, result)}));
       }
    ],
    function(err, result){
       if (err) {
           console.log(err);
           return;
       }
       response.pilote = result[0][0];
       response.sponsors = result[1];
       response.photos = result[2];
       console.log(result[0][0]);
       response.title = 'Détail sur le pilote ' + result[0][0].pilnom;
       response.render('detailPilote', response);
    });
  }

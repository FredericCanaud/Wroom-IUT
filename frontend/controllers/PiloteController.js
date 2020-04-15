let modelePilote = require('../models/pilote.js');
let modeleEcurie = require('../models/ecurie.js')
let async = require('async');

// ///////////////////////// R E P E R T O I R E    D E S    P I L O T E S

module.exports.Repertoire = 	function(request, response){
   response.title = 'Répertoire des pilotes';
    modelePilote.getPiloteNameFirstLetter( function (err, result) {
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
           modelePilote.getPiloteNameFirstLetter( function (err, result) {callback(null,result)});
      },
      function(callback){
          modelePilote.getNomPilote(data, (function (err, result) {callback(null, result)}));
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
    modelePilote.getDetailPilote(data, function (err, result) {
       if (err) {
           console.log(err);
           return;
       }
       response.pilote = result[0];
       console.log(result[0]);
       if(result[0].ecunum){
          modeleEcurie.getNomEcurie(result[0].ecunum, function (err, result) {
            if (err) {
                console.log(err);
                return;
            }
          response.ecurie = result[0];
        });
      }
    });
    async.parallel([
       function(callback){
           modelePilote.getSponsorsFromPilote(data, (function (err, result) {callback(null, result)}));
       },
       function(callback){
           modelePilote.getPhotosFromPilote(data, (function (err, result) {callback(null, result)}));
       }
    ],
    function(err, result){
       if (err) {
           console.log(err);
           return;
       }

       response.sponsors = result[0];
       response.photos = result[1];

       response.render('detailPilote', response);
    });
  }

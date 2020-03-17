let model = require('../models/ecurie.js');
let async = require('async');

   // //////////////////////// L I S T E R  E C U R I E S

module.exports.ListerEcurie = function(request, response){
   response.title = 'Liste des écuries';
    model.getListeEcurie( function (err, result) {
        if (err) {
            // gestion de l'erreur
            console.log(err);
            return;
        }
        response.listeEcurie = result;
        //console.log(result);
response.render('listerEcurie', response);
});
}

module.exports.InfoEcurie = function(request, response){
   let data = request.params.num;
   async.parallel([
     function(callback){
         model.getDetailEcurie(data, (function (err, result) {callback(null, result)}));
     },
      function(callback){
         model.getListeEcurie(function (err, result) {callback(null,result)});
      },
      function(callback){
         model.getVoituresFromEcurie(data, function (err, result) {callback(null,result)});
      },
      function(callback){
         model.getPilotesFromEcurie(data, function (err, result) {callback(null,result)});
      },
   ],
   function(err, result){
      if (err) {
          console.log(err);
          return;
      }
      response.ecurie = result[0][0];
      response.listeEcurie = result[1];
      response.voitures = result[2];
      response.pilotes = result[3];
      console.log(result[0][0]);
      response.title = "Détail sur l'écurie " + result[0][0].ecunom;
      response.render('detailEcurie', response);
   });
 }

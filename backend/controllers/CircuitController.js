let modeleCircuit = require('../models/circuit.js');
let modelePays = require('../models/pays.js');
let async = require('async');
let formidable = require('formidable');
let http = require('http');
let til = require('util');
let fs = require('fs-extra');
let path = require("path");

////////////////////// L I S T E R     C I R C U I T S

module.exports.ListerCircuits = function(request, response){
  response.title = 'Gestion des circuits';
   modeleCircuit.getCircuits( function (err, result) {
       if (err) {
           console.log(err);
           return;
       }
       response.circuits = result;
       console.log(result);
       response.render('circuits', response);
   });
}

module.exports.InfoCircuit = function(request, response){
   let data = request.params.num;
   async.parallel([
     function(callback){
         model.getDetailCircuit(data, (function (err, result) {callback(null, result)}));
     },
      function(callback){
           model.getListeCircuit(function (err, result) {callback(null,result)});
      }
   ],
   function(err, result){
      if (err) {
          console.log(err);
          return;
      }
      response.circuit = result[0][0];
      response.listeCircuit = result[1];
      console.log(result[0][0]);
      response.title = 'Détail sur le circuit ' + result[0][0].cirnom;
      response.render('detailCircuit', response);
   });
 }

 module.exports.AjouterCircuit = function(request, response){
    response.title = 'Ajouter un Circuit';
    modelePays.getNomPays(function (err, result) {
        if (err) {
            console.log(err);
        return;
        }
        response.nomsPays = result;
        response.render('ajouterCircuit', response);
   });
}

 module.exports.AjoutCircuit = function(request, response) {
   response.title = 'Ajout du circuit en cours...';

   if (request.url == '/upload' && request.method.toLowerCase() == 'post') {
         var form = new formidable.IncomingForm();
         form.parse(request, function (err, fields, files) {
             response.writeHead(200, {'content-type': 'text/plain'});
             response.write('received upload:\n\n');
             response.end(util.inspect({fields: fields, files: files}));
         });

         form.on('fileBegin', function(name, file) {
         file.path = path.join(__dirname, '/temp/') + file.name;
                 });
         form.on('progress', function(bytesReceived, bytesExpected) {
         var percent_complete = (bytesReceived / bytesExpected) * 100;
         console.log(percent_complete.toFixed(2));
                 });

         form.on('end', function (fields, files) {
             /* Temporary location of our uploaded file */
             var temp_path = this.openedFiles[0].path;
             /* The file name of the uploaded file */
             var file_name = this.openedFiles[0].name;
             /* Location where we want to copy the uploaded file */
             var new_location = path.join(__dirname, '/upload/');

             fs.copy(temp_path, new_location + file_name, function (err) {
                 if (err) {
                     console.error(err);
                 } else {
                     console.log("success!")
                     fs.unlink(temp_path, function(err) {
                        if (err) {
                            console.error(err);
                            console.log("TROUBLE deletion temp !");
                        } else {
                            console.log("success deletion temp !");
                        }
                     });
                 }
             });
         });

         return;
     }

   var data = {
     cirnom: request.body.cirnom,
     cirlongueur: request.body.cirlongueur,
     paynum: request.body.paynum,
     ciradresseimage: request.body.ciradresseimage,
     cirnbspectateurs: request.body.cirnbspectateurs,
     cirtext: request.body.cirtext
   }

   console.log(data);
   modeleCircuit.ajouterCircuit(data, function(err, res) {
     if (err) {
       response.fail = "Échec de l'ajout !";
       response.render('ajouterCircuit', response);
       console.log(err);
       return;
     }
     else {
         response.redirect("/circuits");
         console.log("C'est bon !");
         return;
     }
   });
 }

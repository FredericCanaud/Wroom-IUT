let modeleCircuit = require('../models/circuit.js');
let modelePays = require('../models/pays.js');
let modeleEssais = require('../models/essais.js');
let modeleCourse = require('../models/course.js');
let modeleGrandPrix = require('../models/grandprix.js');
let async = require('async');
let formidable = require('formidable');
let http = require('http');
let til = require('util');
let fs = require('fs-extra');
let path = require("path");

////////////////////// L I S T E R     C I R C U I T S

module.exports.ListerCircuits = function(request, response) {
    response.title = 'Gestion des circuits';
    modeleCircuit.getCircuits(function(err, result) {
        if (err) {
            console.log(err);
            return;
        }
        response.circuits = result;
        console.log(result);
        response.render('circuits', response);
    });
}

module.exports.InfoCircuit = function(request, response) {
    let data = request.params.num;
    async.parallel([
            function(callback) {
                model.getDetailCircuit(data, (function(err, result) {
                    callback(null, result)
                }));
            },
            function(callback) {
                model.getListeCircuit(function(err, result) {
                    callback(null, result)
                });
            }
        ],
        function(err, result) {
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

module.exports.AjouterCircuit = function(request, response) {
    response.title = 'Ajouter un Circuit';
    modelePays.getNomPays(function(err, result) {
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

    var data = {
        cirnom: request.body.cirnom,
        cirlongueur: request.body.cirlongueur,
        paynum: request.body.paynum,
        ciradresseimage: request.files.ciradresseimage,
        cirnbspectateurs: request.body.cirnbspectateurs,
        cirtext: request.body.cirtext
    }
    data.ciradresseimage.mv("../public/image/circuit/" + data.ciradresseimage.name);

    console.log(data);
    modeleCircuit.ajouterCircuit(data, function(err, res) {
        if (err) {
            response.fail = "Échec de l'ajout !";
            response.render('ajouterCircuit', response);
            console.log(err);
            return;
        } else {
            response.redirect("/circuits");
            console.log("C'est bon !");
            return;
        }
    });
}

module.exports.ModifierCircuit = function(request, response) {
    response.title = 'Modifier un Circuit';
    let cirnum = request.params.num;
    async.parallel([
            function(callback) {
                modeleCircuit.getDetailCircuit(cirnum, function(err, result) {
                    callback(null, result)
                });
            },
            function(callback) {
                modelePays.getNomPays(function(err, result) {
                    callback(null, result)
                });
            }
        ],
        function(err, result) {
            if (err) {
                console.log(err);
                return;
            }
            response.circuit = result[0][0];
            console.log(result[0]);
            response.nomsPays = result[1];
            response.render('modifierCircuit', response);
        });
}
module.exports.ModifCircuit = function(request, response) {
    response.title = 'Modification du circuit en cours...';

    var data = {
        cirnum: request.body.cirnum,
        cirnom: request.body.cirnom,
        cirlongueur: request.body.cirlongueur,
        paynum: request.body.paynum,
        ciradresseimage: request.body.ciradresseimage,
        cirnbspectateurs: request.body.cirnbspectateurs,
        cirtext: request.body.cirtext
    }

    console.log(data);
    modeleCircuit.modifierCircuit(data, function(err, res) {
        if (err) {
            response.fail = "Échec de la modification !";
            response.render('modifierCircuit', response);
            console.log(err);
            return;
        } else {
            response.redirect("/circuits");
            console.log("C'est bon !");
            return;
        }
    });
}
module.exports.SupprimerCircuit = function(request, response) {
    response.title = "Suppression d'un circuit en cours...";
    let cirnum = request.params.num;
    async.series([
            function(callback) {
                modeleEssais.supprimerEssaisByCirnum(cirnum, function(err, result) {
                    callback(null, result)
                });
            },
            function(callback) {
                modeleCourse.supprimerCourseByCirnum(cirnum, function(err, result) {
                    callback(null, result)
                });
            },
            function(callback) {
                modeleGrandPrix.supprimerGrandPrixByCirnum(cirnum, function(err, result) {
                    callback(null, result)
                });
            },
            function(callback) {
                modeleCircuit.supprimerCircuit(cirnum, function(err, result) {
                    callback(null, result)
                });
            },
        ],
        function(err, result) {
            if (err) {
                console.log(err);
                return;
            }
            response.redirect('/circuits');
        });
}

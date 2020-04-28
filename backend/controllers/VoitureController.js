let modeleVoiture = require('../models/voiture.js');
let modeleEcurie = require('../models/ecurie.js');
let modeleTypeVoiture = require('../models/typeVoiture.js');

let async = require('async');

module.exports.ListerVoitures = function(request, response) {
    response.title = 'Gestion des voitures';
    modeleVoiture.getVoitures(function(err, result) {
        if (err) {
            console.log(err);
            return;
        }
        response.voitures = result;
        response.render('voitures', response);
    });
}
module.exports.AjouterVoiture = function(request, response) {
    response.title = 'Ajouter une Voiture';

    async.parallel([
        function(callback) {
            modeleEcurie.getNomEcuries(function(err, result) {
                callback(null, result)
            });
        },
        function(callback) {
            modeleTypeVoiture.getTypesVoiture(function(err, result) {
                callback(null, result)
            });
        },
    ],
    function(err, result) {
        if (err) {
            console.log(err);
            return;
        }
        response.ecuries = result[0];
        response.typesVoiture = result[1];
        response.render('ajouterVoiture', response);
    });
}

module.exports.AjoutVoiture = function(request, response) {
    response.title = 'Ajout du voiture en cours...';

    var data = {
        voinom: request.body.voinom,
        ecunum: request.body.ecunum,
        typnum: request.body.typnum,
        voiadresseimage: request.files.voiadresseimage.name
    }

    request.files.voiadresseimage.mv("../public/image/ecurie/voiture/" + request.files.voiadresseimage.name);

    console.log(data);
    modeleVoiture.ajouterVoiture(data, function(err, res) {
        if (err) {
            response.fail = "Échec de l'ajout !";
            response.render('ajouterVoiture', response);
            console.log(err);
            return;
        } else {
            response.confirmation = "Vous avez bien ajouté la voiture " + data.voinom;
            response.entite = "voitures";
            response.render('confirmation', response);
            return;
        }
    });
}

module.exports.ModifierVoiture = function(request, response) {
    response.title = 'Modifier une Voiture';
    async.parallel([
            function(callback) {
                modeleEcurie.getNomEcuries(function(err, result) {
                    callback(null, result)
                });
            },
            function(callback) {
                modeleTypeVoiture.getTypesVoiture(function(err, result) {
                    callback(null, result)
                });
            },
            function(callback) {
                let voinum = request.params.num;
                modeleVoiture.getDetailVoiture(voinum, function(err, result) {
                    callback(null, result)
                });
            }
        ],
        function(err, result) {
            if (err) {
                console.log(err);
                return;
            }
            response.ecuries = result[0];
            response.typesVoiture = result[1];
            response.voiture = result[2][0];
            console.log(result[2][0]);
            response.render('modifierVoiture', response);
        });
}

module.exports.ModifVoiture = function(request, response) {
    response.title = 'Modification de la voiture en cours...';

    var data = {
        voinum: request.body.voinum,
        voinom: request.body.voinom,
        ecunum: request.body.ecunum,
        typnum: request.body.typnum,
        voiadresseimage: request.files.voiadresseimage.name
    }

    request.files.voiadresseimage.mv("../public/image/ecurie/voiture" + data.voiadresseimage.name);

    console.log(data);
    modeleVoiture.modifierVoiture(data, function(err, res) {
        if (err) {
            response.fail = "Échec de la modification !";
            response.render('modifierVoiture', response);
            console.log(err);
            return;
        } else {
            response.confirmation = "Vous avez bien modifié la voiture " + data.voinom;
            response.entite = "voitures";
            response.render('confirmation', response);
            return;
        }
    });
}
module.exports.SupprimerVoiture = function(request, response) {
    response.title = "Suppression d'une voiture en cours...";
    let voinum = request.params.num;
    modeleVoiture.supprimerVoiture(voinum, function(err, res) {
        if (err) {
            response.fail = "Échec de la suppresion !";
            response.render('voitures', response);
            console.log(err);
            return;
        } else {
            response.confirmation = "Vous avez bien supprimé la voiture !";
            response.entite = "voitures";
            response.render('confirmation', response);
            return;
        }
    });
}

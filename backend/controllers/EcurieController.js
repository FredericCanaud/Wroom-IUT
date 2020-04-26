let async = require('async');

let modelePays = require('../models/pays.js');
let modeleEcurie = require('../models/ecurie.js');
let modeleFournisseurPneu = require('../models/fournisseurPneu.js');
let modeleVoiture = require('../models/voiture.js');
let modeleFinance = require('../models/finance.js');
let modelePilote = require('../models/pilote.js');

// //////////////////////// L I S T E R  E C U R I E S

module.exports.ListerEcurie = function(request, response) {
    response.title = 'Gestion des écuries';
    modeleEcurie.getEcuries(function(err, result) {
        if (err) {
            // gestion de l'erreur
            console.log(err);
            return;
        }
        response.ecuries = result;
        //console.log(result);
        response.render('ecuries', response);
    });
}

module.exports.InfoEcurie = function(request, response) {
    let data = request.params.num;
    async.parallel([
            function(callback) {
                modeleEcurie.getDetailEcurie(data, (function(err, result) {
                    callback(null, result)
                }));
            },
            function(callback) {
                modeleEcurie.getListeEcurie(function(err, result) {
                    callback(null, result)
                });
            },
            function(callback) {
                modeleEcurie.getVoituresFromEcurie(data, function(err, result) {
                    callback(null, result)
                });
            },
            function(callback) {
                modeleEcurie.getPilotesFromEcurie(data, function(err, result) {
                    callback(null, result)
                });
            },
        ],
        function(err, result) {
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
module.exports.AjouterEcurie = function(request, response) {
    response.title = 'Ajouter une Ecurie';

    async.parallel([
            function(callback) {
                modeleFournisseurPneu.getNomFournisseurs(function(err, result) {
                    callback(null, result)
                });
            },
            function(callback) {
                modelePays.getNomPays(function(err, result) {
                    callback(null, result)
                });
            },
        ],
        function(err, result) {
            if (err) {
                console.log(err);
                return;
            }
            response.nomsFournisseurs = result[0];
            response.nomsPays = result[1];
            response.render('ajouterEcurie', response);
        });
}

module.exports.AjoutEcurie = function(request, response) {
    response.title = "Ajout de l'écurie en cours...";

    var data = {
        ecunom: request.body.ecunom,
        ecunomdir: request.body.ecunomdir,
        ecuadrsiege: request.body.ecuadrsiege,
        ecupoints: request.body.ecupoints,
        paynum: request.body.paynum,
        fpnum: request.body.fpnum,
        ecuadresseimage: request.files.ecuadresseimage
    }

    data.ecuadresseimage.mv("../public/image/ecurie/" + data.ecuadresseimage.name);

    modeleEcurie.ajouterEcurie(data, function(err, res) {
        if (err) {
            response.fail = "Échec de l'ajout !";
            response.render('ajouterEcurie', response);
            console.log(err);
            return;
        } else {
            response.confirmation = "Vous avez bien ajouté l'écurie " + data.ecunom;
            response.entite = "ecuries";
            response.render('confirmation', response);
            return;
        }
    });
}


module.exports.ModifierEcurie = function(request, response) {
    response.title = 'Modifier une Ecurie';
    async.parallel([
            function(callback) {
                modeleFournisseurPneu.getNomFournisseurs(function(err, result) {
                    callback(null, result)
                });
            },
            function(callback) {
                modelePays.getNomPays(function(err, result) {
                    callback(null, result)
                });
            },
            function(callback) {
                let ecunum = request.params.num;
                modeleEcurie.getDetailEcurie(ecunum, function(err, result) {
                    callback(null, result)
                });
            }
        ],
        function(err, result) {
            if (err) {
                console.log(err);
                return;
            }
            response.fournisseurs = result[0];
            response.nationalites = result[1];
            response.ecurie = result[2][0];
            console.log(result[2][0]);
            response.render('modifierEcurie', response);
        });
}

module.exports.ModifEcurie = function(request, response) {
    response.title = "Modification de l'écurie en cours...";

    var data = {
        ecunum: request.body.ecunum,
        ecunom: request.body.ecunom,
        ecunomdir: request.body.ecunomdir,
        ecuadrsiege: request.body.ecuadrsiege,
        ecupoints: request.body.ecupoints,
        ecuadresseimage: request.files.ecuadresseimage,
        paynum: request.body.paynum,
        fpnum: request.body.fpnum
    }

    data.ecuadresseimage.mv("../public/image/ecurie/" + data.ecuadresseimage.name);

    console.log(data);
    modeleEcurie.modifierEcurie(data, function(err, res) {
        if (err) {
            response.fail = "Échec de l'ajout !";
            response.render('modifierEcurie', response);
            console.log(err);
            return;
        } else {
            response.confirmation = "Vous avez bien modifié l'écurie " + data.ecunom;
            response.entite = "ecuries";
            response.render('confirmation', response);
            return;
        }
    });
}
module.exports.SupprimerEcurie = function(request, response) {
    response.title = "Suppression d'une écurie en cours...";
    let ecunum = request.params.num;
    async.series([
            function(callback) {
                modeleFinance.supprimerFinancementByEcunum(ecunum, function(err, result) {
                    callback(null, result)
                });
            },
            function(callback) {
                modeleVoiture.updateVoitureSansEcurie(ecunum, function(err, result) {
                    callback(null, result)
                });
            },
            function(callback) {
                modelePilote.updatePiloteSansEcurie(ecunum, function(err, result) {
                    callback(null, result)
                });
            },
            function(callback) {
                modeleEcurie.supprimerEcurie(ecunum, function(err, result) {
                    callback(null, result)
                });
            },
        ],
        function(err, result) {
            if (err) {
                console.log(err);
                return;
            }
            response.confirmation = "Vous avez bien supprimé l'écurie";
            response.entite = "ecuries";
            response.render('confirmation', response);
        });
}

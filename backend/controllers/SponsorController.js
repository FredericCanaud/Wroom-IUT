let modeleSponsor = require('../models/sponsor.js');
let modeleEcurie = require('../models/ecurie.js');
let modeleFinance = require('../models/finance.js');
let modeleSposorise = require('../models/sponsorise.js');

let async = require('async');

// //////////////////////// L I S T E R  E C U R I E S

module.exports.ListerSponsors = function(request, response) {
    response.title = 'Gestion des sponsors';
    modeleSponsor.getSponsors(function(err, result) {
        if (err) {
            // gestion de l'erreur
            console.log(err);
            return;
        }
        response.sponsors = result;
        //console.log(result);
        response.render('sponsors', response);
    });
}
module.exports.AjouterSponsor = function(request, response) {
    response.title = 'Ajouter un Sponsor';
    modeleEcurie.getNomEcuries(function(err, result) {
        if (err) {
            console.log(err);
            return;
        }
        response.ecuries = result;
        console.log(result);
        response.render('ajouterSponsor', response);
    });
}
module.exports.AjoutSponsor = function(request, response) {
    response.title = 'Ajout du sponsor en cours...';

    var data = {
        sponom: request.body.sponom,
        sposectactivite: request.body.sposectactivite
    }
    console.log(data);
    modeleSponsor.ajouterSponsor(data, function(err, result) {
        if (err) {
            response.fail = "Échec de l'ajout !";
            response.render('/ajouterSponsor', response);
            console.log(err);
            return;
        }
        sponum: result.insertId;
        var ecunums = request.body.ecunum;
        for (x in ecunums) {
            var data2 = {
                sponum: result.insertId,
                ecunum: ecunums[x]
            }
            modeleFinance.modifierFinancement(data2, function(err, res) {
                if (err) {
                    response.fail = "Échec de la modification !";
                    response.render('/ajouterSponsor', response);
                    console.log(err);
                    return;
                }
            });
        }

    });

    response.confirmation = "Vous avez bien ajouté le sponsor " + data.sponom;
    response.entite = "sponsors";
    response.render('confirmation', response);
    return;
}
module.exports.ModifierSponsor = function(request, response) {
    response.title = 'Modifier un Sponsor';
    let sponum = request.params.num;
    async.parallel([
            function(callback) {
                modeleSponsor.getDetailSponsor(sponum, function(err, result) {
                    callback(null, result)
                });
            },
            function(callback) {
                modeleEcurie.getEcuriesFromSponsor(sponum, function(err, result) {
                    callback(null, result)
                });
            },
            function(callback) {
                modeleEcurie.getEcuriesNotSponsored(sponum, function(err, result) {
                    callback(null, result)
                });
            }
        ],
        function(err, result) {
            if (err) {
                console.log(err);
                return;
            }
            response.sponsor = result[0][0];
            response.ecuriesSponsorisees = result[1];
            response.ecuriesNonSponsorisees = result[2];
            console.log(response.ecuriesNonSponsorisees);
            response.render('modifierSponsor', response);
        });
}

module.exports.ModifSponsor = function(request, response) {
    response.title = "Modification de l'écurie en cours...";

    var data = {
        sponum: request.body.sponum,
        sponom: request.body.sponom,
        sposectactivite: request.body.sposectactivite
    }
    var ecunumDejaSponso = request.body.ecunumDejaSponso;
    var ecunums = request.body.ecunum;

    for (x in ecunums) {
        if (ecunumDejaSponso.includes(ecunums[x])) {
            var index = ecunumDejaSponso.indexOf(ecunums[x]);
            if (index !== -1) ecunumDejaSponso.splice(index, 1);
        }
    }
    console.log(ecunums);
    if (ecunumDejaSponso) {
        for (x in ecunumDejaSponso) {
            var sponsorASupprimer = {
                sponum: request.body.sponum,
                ecunum: ecunumDejaSponso[x]
            }
            modeleFinance.supprimerFinancement(sponsorASupprimer, function(err, res) {
                if (err) {
                    response.fail = "Échec de la modification !";
                    response.render('modifierSponsor', response);
                    console.log(err);
                    return;
                }
            });
        }
    }
    for (x in ecunums) {
        var data2 = {
            sponum: request.body.sponum,
            ecunum: ecunums[x]
        }
        modeleFinance.modifierFinancement(data2, function(err, res) {
            if (err) {
                response.fail = "Échec de la modification !";
                response.render('modifierSponsor', response);
                console.log(err);
                return;
            }
        });
    }
    modeleSponsor.modifierSponsor(data, function(err, res) {
        if (err) {
            response.fail = "Échec de la modification !";
            response.render('modifierSponsor', response);
            console.log(err);
            return;
        } else {
            response.confirmation = "Vous avez bien modifié le sponsor " + data.sponom;
            response.entite = "sponsors";
            response.render('confirmation', response);
            return;
        }
    });
}

module.exports.SupprimerSponsor = function(request, response) {
    response.title = 'Supprimer un Sponsor';
    let sponum = request.params.num;
    async.series([
            function(callback) {
                modeleFinance.supprimerFinancementBySponum(sponum, function(err, result) {
                    callback(null, result)
                });
            },
            function(callback) {
                modeleSposorise.supprimerSponsoringBySponum(sponum, function(err, result) {
                    callback(null, result)
                });
            },
            function(callback) {
                modeleSponsor.supprimerSponsor(sponum, function(err, result) {
                    callback(null, result)
                });
            },
        ],
        function(err, result) {
            if (err) {
                console.log(err);
                return;
            }
            response.confirmation = "Vous avez bien supprimé le sponsor !";
            response.entite = "sponsors";
            response.render('confirmation', response);
        });
}

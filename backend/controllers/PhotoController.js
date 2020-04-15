let modelePilote = require('../models/pilote.js');
let modelePhoto = require('../models/photo.js');
let async = require('async');

module.exports.ListerPilotes = function(request, response) {
    response.title = 'Photos des pilotes';
    modelePilote.getPilotes(function(err, result) {
        if (err) {
            console.log(err);
            return;
        }
        response.pilotes = result;
        response.render('photos', response);
    });
}

module.exports.RedirectionSaisiePhotos = function(request, response) {
    response.title = 'Saisie des photos';
    request.session.pilnum = request.body.pilnum;
    response.redirect('/saisiePhotos');
}

module.exports.AffichageSaisiePhotos = function(request, response) {
    response.title = 'Saisie des résultats';
    let pilnum = request.session.pilnum;
    modelePhoto.getPhotos(pilnum, function(err, result) {
        if (err) {
            console.log(err);
            return;
        }
        response.pilnum = pilnum;
        response.photos = result;
        response.nombrePhotos = result.length + 1;
        response.render('saisiePhotos', response);
    });
}

module.exports.SaisiePhotos = function(request, response) {
    response.title = 'Ajout de la photo en cours...';

    var data = {
        phonum: request.body.phonum,
        pilnum: request.body.pilnum,
        phosujet: request.body.phosujet,
        phocommentaire: request.body.phocommentaire,
        phoadresse: request.files.phoadresse.name
    }

    request.files.phoadresse.mv("../public/image/pilote/" + data.phoadresse.name);

    console.log(data);
    modelePhoto.ajouterPhoto(data, function(err, res) {
        if (err) {
            response.fail = "Échec de l'ajout !";
            response.render('photos', response);
            console.log(err);
            return;
        } else {
            response.redirect("photos");
            console.log("C'est bon !");
            return;
        }
    });
}
module.exports.SupprimerPhoto = function(request, response) {
    response.title = "Suppression d'une photo en cours...";
    let phonum = request.params.phonum;
    let pilnum = request.params.pilnum;
    modelePhoto.supprimerPhoto(phonum, pilnum, function(err, res) {
        if (err) {
            response.fail = "Échec de la suppresion !";
            response.render('photos', response);
            console.log(err);
            return;
        } else {
            response.redirect("/photos");
            console.log("C'est bon !");
            return;
        }
    });
}

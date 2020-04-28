let db = require('../configDb');

module.exports.getVoitures = function(callback) {
    // connection à la base
    db.getConnection(function(err, connexion) {
        if (!err) {

            let sql = "SELECT voinum, voinom, voiadresseimage FROM voiture";
            connexion.query(sql, callback);
            connexion.release();

        }
    });
};
module.exports.getDetailVoiture = function(voinum, callback) {
    // connection à la base
    db.getConnection(function(err, connexion) {
        if (!err) {

            let sql = "SELECT voinum, voinom, ecunum, typnum, voiadresseimage FROM voiture WHERE voinum = " + voinum;
            connexion.query(sql, callback);
            connexion.release();

        }
    });
};
module.exports.ajouterVoiture = function(data, callback) {
    // connection à la base
    db.getConnection(function(err, connexion) {
        if (!err) {

            let sql = "INSERT INTO voiture SET ?";
            connexion.query(sql, data, callback);
            connexion.release();

        }
    });
};
module.exports.modifierVoiture = function(data, callback) {
    // connection à la base
    db.getConnection(function(err, connexion) {
        if (!err) {

            let sql = "UPDATE voiture SET ? WHERE voinum = " + data.voinum;
            connexion.query(sql, data, callback);
            connexion.release();

        }
    });
};
module.exports.supprimerVoiture = function(voinum, callback) {
    // connection à la base
    db.getConnection(function(err, connexion) {
        if (!err) {

            let sql = "DELETE FROM voiture WHERE voinum = " + voinum;
            connexion.query(sql, callback);
            connexion.release();

        }
    });
};
module.exports.updateVoitureSansEcurie = function(ecunum, callback) {
    // connection à la base
    db.getConnection(function(err, connexion) {
        if (!err) {

            let sql = "UPDATE voiture SET ecunum=NULL WHERE ecunum=" + ecunum;
            connexion.query(sql, callback);
            connexion.release();

        }
    });
};

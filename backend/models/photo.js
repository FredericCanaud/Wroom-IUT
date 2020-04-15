let db = require('../configDb');

module.exports.supprimerPhotoByPilnum = function(pilnum, callback) {
    // connection à la base
    db.getConnection(function(err, connexion) {
        if (!err) {

            let sql = "DELETE FROM photo WHERE pilnum = " + pilnum;
            connexion.query(sql, callback);
            connexion.release();

        }
    });
};
module.exports.getPhotos = function(pilnum, callback) {
    // connection à la base
    db.getConnection(function(err, connexion) {
        if (!err) {

            let sql = "SELECT phonum, phosujet, phoadresse, phocommentaire FROM photo WHERE pilnum = " + pilnum;
            connexion.query(sql, callback);
            connexion.release();

        }
    });
};
module.exports.ajouterPhoto = function(data, callback) {
    // connection à la base
    db.getConnection(function(err, connexion) {
        if (!err) {

            let sql = "INSERT INTO photo SET ?";
            connexion.query(sql, data, callback);
            connexion.release();

        }
    });
};
module.exports.supprimerPhoto = function(phonum, pilnum, callback) {
    // connection à la base
    db.getConnection(function(err, connexion) {
        if (!err) {

            let sql = "DELETE FROM photo WHERE phonum = " + phonum + " AND pilnum = " + pilnum;
            connexion.query(sql, callback);
            connexion.release();
						
        }
    });
};

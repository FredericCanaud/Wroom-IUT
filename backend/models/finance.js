let db = require('../configDb');

module.exports.ajouterFinancement = function(data, callback) {
    // connection à la base
    db.getConnection(function(err, connexion) {
        if (!err) {
					
            let sql = "INSERT INTO finance SET ?"
            connexion.query(sql, data, callback);
            connexion.release();

        }
    });
};
module.exports.modifierFinancement = function(data, callback) {
    // connection à la base
    db.getConnection(function(err, connexion) {
        if (!err) {

            let sql = "INSERT INTO finance VALUES(" + data.ecunum + "," + data.sponum + ") ON DUPLICATE KEY UPDATE sponum= " + data.sponum;
            connexion.query(sql, data, callback);
            connexion.release();

        }
    });
};
module.exports.supprimerFinancement = function(data, callback) {
    // connection à la base
    db.getConnection(function(err, connexion) {
        if (!err) {

            let sql = "DELETE FROM finance WHERE sponum= " + data.sponum + " AND ecunum=" + data.ecunum;
            connexion.query(sql, data, callback);
            connexion.release();

        }
    });
};
module.exports.supprimerFinancementBySponum = function(sponum, callback) {
    // connection à la base
    db.getConnection(function(err, connexion) {
        if (!err) {

            let sql = "DELETE FROM finance WHERE sponum = " + sponum;
            connexion.query(sql, callback);
            connexion.release();

        }
    });
};
module.exports.supprimerFinancementByEcunum = function(ecunum, callback) {
    // connection à la base
    db.getConnection(function(err, connexion) {
        if (!err) {
            let sql = "DELETE FROM finance WHERE ecunum = " + ecunum;
            connexion.query(sql, callback);
            connexion.release();
        }
    });
};

let db = require('../configDb');

module.exports.getListeGrandPrix = function(callback) {
    // connection à la base
    db.getConnection(function(err, connexion) {
        if (!err) {

            let sql = "SELECT gpnum, gpnom FROM grandprix ORDER BY gpnom";
            connexion.query(sql, callback);
            connexion.release();

        }
    });
};
module.exports.getPilotesNotInGP = function(gpnum, callback) {
    // connection à la base
    db.getConnection(function(err, connexion) {
        if (!err) {

            let sql = "SELECT pilnum, pilnom FROM pilote WHERE pilnum NOT IN (SELECT pilnum FROM course c JOIN grandprix g ON g.gpnum=c.gpnum WHERE g.gpnum=" + gpnum + ") ORDER BY pilnom";
            connexion.query(sql, callback);
            connexion.release();

        }
    });
};
module.exports.supprimerGrandPrixByCirnum = function(cirnum, callback) {
    // connection à la base
    db.getConnection(function(err, connexion) {
        if (!err) {

            let sql = "DELETE FROM grandprix WHERE cirnum = " + cirnum;
            connexion.query(sql, callback);
            connexion.release();
						
        }
    });
};

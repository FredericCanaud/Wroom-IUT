let db = require('../configDb');

module.exports.supprimerEssaisByPilnum = function(pilnum, callback) {
    // connection à la base
    db.getConnection(function(err, connexion) {
        if (!err) {

            let sql = "DELETE FROM essais WHERE pilnum = " + pilnum;
            connexion.query(sql, callback);
            connexion.release();
						
        }
    });
};

module.exports.supprimerEssaisByCirnum = function(cirnum, callback) {
    // connection à la base
    db.getConnection(function(err, connexion) {
        if (!err) {

            let sql = "DELETE FROM essais WHERE gpnum IN (SELECT gpnum FROM grandprix WHERE cirnum = " + cirnum + ")";
            connexion.query(sql, callback);
            connexion.release();

        }
    });
};

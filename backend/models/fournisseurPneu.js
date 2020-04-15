let db = require('../configDb');

module.exports.getNomFournisseurs = function(callback) {
    // connection à la base
    db.getConnection(function(err, connexion) {
        if (!err) {

            let sql = "SELECT fpnum, fpnom FROM fourn_pneu ORDER BY fpnom";
            connexion.query(sql, callback);
            connexion.release();
						
        }
    });
};

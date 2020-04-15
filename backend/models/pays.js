let db = require('../configDb');

module.exports.getNationalites = function(callback) {
    // connection à la base
    db.getConnection(function(err, connexion) {
        if (!err) {

            let sql = "SELECT paynum, paynat FROM pays ORDER BY paynat";
            connexion.query(sql, callback);
            connexion.release();

        }
    });
};
module.exports.getNomPays = function(callback) {
    // connection à la base
    db.getConnection(function(err, connexion) {
        if (!err) {

            let sql = "SELECT paynum, paynom FROM pays ORDER BY paynat";
            connexion.query(sql, callback);
            connexion.release();
						
        }
    });
};

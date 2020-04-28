let db = require('../configDb');

module.exports.getTypesVoiture = function(callback) {
    // connection à la base
    db.getConnection(function(err, connexion) {
        if (!err) {

            let sql = "SELECT typnum, typelibelle FROM type_voiture";
            connexion.query(sql, callback);
            connexion.release();

        }
    });
};

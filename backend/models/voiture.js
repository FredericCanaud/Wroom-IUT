let db = require('../configDb');

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

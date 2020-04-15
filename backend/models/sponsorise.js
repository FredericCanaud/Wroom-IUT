let db = require('../configDb');

module.exports.supprimerSponsoringBySponum = function(sponum, callback) {
    // connection à la base
    db.getConnection(function(err, connexion) {
        if (!err) {

            let sql = "DELETE FROM sponsorise WHERE sponum = " + sponum;
            connexion.query(sql, callback);
            connexion.release();

        }
    });
};

module.exports.supprimerSponsoringByPilnum = function(pilnum, callback) {
    // connection à la base
    db.getConnection(function(err, connexion) {
        if (!err) {

            let sql = "DELETE FROM sponsorise WHERE pilnum = " + pilnum;
            connexion.query(sql, callback);
            connexion.release();
						
        }
    });
};

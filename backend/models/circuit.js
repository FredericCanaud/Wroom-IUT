/*
 * config.Db contient les parametres de connection à la base de données
 * il va créer aussi un pool de connexions utilisables
 * sa méthode getConnection permet de se connecter à MySQL
 *
 */
let db = require('../configDb');

/*
 * Récupérer l'intégralité les écuries avec l'adresse de la photo du pays de l'écurie
 * @return Un tableau qui contient le N°, le nom de l'écurie et le nom de la photo du drapeau du pays
 */
module.exports.getCircuits = function(callback) {
    // connection à la base
    db.getConnection(function(err, connexion) {
        if (!err) {

            let sql = "SELECT cirnum, cirnom, cirlongueur, cirnbspectateurs FROM circuit ORDER BY cirnom";
            connexion.query(sql, callback);
            connexion.release();

        }
    });
};
module.exports.getDetailCircuit = function(cirnum, callback) {
    // connection à la base
    db.getConnection(function(err, connexion) {
        if (!err) {

            let sql = "SELECT cir.cirnum, cirnom, cirlongueur, cirnbspectateurs, ciradresseimage, cirtext, paynom FROM circuit cir JOIN pays p ON cir.paynum = p.paynum AND cir.cirnum = " + cirnum;
            connexion.query(sql, callback);
            connexion.release();

        }
    });
};
module.exports.ajouterCircuit = function(data, callback) {
    // connection à la base
    db.getConnection(function(err, connexion) {
        if (!err) {

            let sql = "INSERT INTO circuit SET ?";
            connexion.query(sql, data, callback);
            connexion.release();

        }
    });
};
module.exports.modifierCircuit = function(data, callback) {
    // connection à la base
    db.getConnection(function(err, connexion) {
        if (!err) {

            let sql = "UPDATE circuit SET ? WHERE cirnum=" + data.cirnum;
            connexion.query(sql, data, callback);
            connexion.release();

        }
    });
};
module.exports.supprimerCircuit = function(cirnum, callback) {
    // connection à la base
    db.getConnection(function(err, connexion) {
        if (!err) {

            let sql = "DELETE FROM circuit WHERE cirnum = " + cirnum;
            connexion.query(sql, callback);
            connexion.release();
            
        }
    });
};

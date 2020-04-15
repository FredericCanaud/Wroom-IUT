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
module.exports.getListeGrandPrix = function(callback) {
    // connection à la base
    db.getConnection(function(err, connexion) {
        if (!err) {

            let sql = "SELECT gpnum, payadrdrap, gpnom FROM " +
                "grandprix g INNER JOIN circuit c on c.cirnum = g.cirnum JOIN pays p ";
            sql = sql + "ON p.paynum=c.paynum ORDER BY cirnom";
            connexion.query(sql, callback);
            connexion.release();

        }
    });
};
module.exports.getDetailGrandPrix = function(gpnum, callback) {
    // connection à la base
    db.getConnection(function(err, connexion) {
        if (!err) {

            let sql = "SELECT gpnom, gpdate, gpcommentaire FROM grandprix WHERE gpnum = " + gpnum;
            connexion.query(sql, callback);
            connexion.release();
						
        }
    });
};
module.exports.getDetailResultat = function(gpnum, callback) {
    // connection à la base
    db.getConnection(function(err, connexion) {
        if (!err) {

            let sql = "WITH C AS(SELECT ROW_NUMBER() OVER(ORDER BY tempscourse) AS Place, pilnom, pilprenom, tempscourse FROM pilote p JOIN course c on p.pilnum = c.pilnum JOIN grandprix g on g.gpnum=c.gpnum WHERE c.gpnum = " + gpnum + ")";
            sql = sql + "SELECT Place, pilnom, pilprenom, tempscourse, ptnbpointsplace FROM C JOIN points p ON C.Place = p.ptplace";
            connexion.query(sql, callback);
            connexion.release();

    });
};

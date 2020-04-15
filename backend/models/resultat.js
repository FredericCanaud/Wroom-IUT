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

module.exports.getDetailResultat = function(gpnum, callback) {
    // connection à la base
    db.getConnection(function(err, connexion) {
        if (!err) {

            let sql = "WITH C AS(SELECT ROW_NUMBER() OVER(ORDER BY tempscourse) AS Place, p.pilnum, pilnom, pilprenom, tempscourse FROM pilote p JOIN course c on p.pilnum = c.pilnum JOIN grandprix g on g.gpnum=c.gpnum WHERE c.gpnum = " + gpnum + ")";
            sql = sql + "SELECT Place, pilnum, pilnom, tempscourse, ptnbpointsplace FROM C JOIN points p ON C.Place = p.ptplace";
            connexion.query(sql, callback);
            connexion.release();
						
        }
    });
};

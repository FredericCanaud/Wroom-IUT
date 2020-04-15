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
module.exports.getEcuries = function(callback) {
    // connection à la base
    db.getConnection(function(err, connexion) {
        if (!err) {

            let sql = "SELECT ecunum, ecunom, ecunomdir, ecupoints FROM ecurie ORDER BY ecunom";
            connexion.query(sql, callback);
            connexion.release();
						
        }
    });
};

module.exports.getNomEcuries = function(callback) {
    // connection à la base
    db.getConnection(function(err, connexion) {
        if (!err) {

            let sql = "SELECT ecunum, ecunom FROM ecurie ORDER BY ecunom";
            connexion.query(sql, callback);
            connexion.release();

        }
    });
};

module.exports.getDetailEcurie = function(ecunum, callback) {
    // connection à la base
    db.getConnection(function(err, connexion) {
        if (!err) {

            let sql = "SELECT ecu.ecunum, ecunom, ecunomdir, ecupoints, ecuadrsiege, ecuadresseimage, fpnom, paynom FROM ecurie ecu JOIN fourn_pneu fp ON ecu.fpnum = fp.fpnum JOIN pays p ON ecu.paynum = p.paynum WHERE ecu.ecunum = " + ecunum;
            connexion.query(sql, callback);
            connexion.release();

        }
    });
};

module.exports.getVoituresFromEcurie = function(ecunum, callback) {
    // connection à la base
    db.getConnection(function(err, connexion) {
        if (!err) {

            let sql = "SELECT voinom, voiadresseimage, typelibelle FROM ecurie ecu JOIN voiture voi ON ecu.ecunum = voi.ecunum JOIN type_voiture typ ON voi.typnum=typ.typnum WHERE ecu.ecunum = " + ecunum;
            connexion.query(sql, callback);
            connexion.release();

        }
    });
};

module.exports.getPilotesFromEcurie = function(ecunum, callback) {
    // connection à la base
    db.getConnection(function(err, connexion) {
        if (!err) {

            let sql = "SELECT pilnum, pilnom, pilprenom FROM pilote pil JOIN ecurie ecu ON ecu.ecunum = pil.ecunum WHERE ecu.ecunum = " + ecunum;
            connexion.query(sql, callback);
            connexion.release();

        }
    });
};
module.exports.ajouterEcurie = function(data, callback) {
    // connection à la base
    db.getConnection(function(err, connexion) {
        if (!err) {

            let sql = "INSERT INTO ecurie SET ?";
            connexion.query(sql, data, callback);
            connexion.release();

        }
    });
};
module.exports.modifierEcurie = function(data, callback) {
    // connection à la base
    db.getConnection(function(err, connexion) {
        if (!err) {

            let sql = "UPDATE ecurie SET ? WHERE ecunum=" + data.ecunum;
            connexion.query(sql, data, callback);
            connexion.release();

        }
    });
};
module.exports.getEcuriesFromSponsor = function(sponum, callback) {
    // connection à la base
    db.getConnection(function(err, connexion) {
        if (!err) {

            let sql = "SELECT f.ecunum, ecunom FROM finance f JOIN ecurie e ON e.ecunum = f.ecunum WHERE sponum=" + sponum;
            connexion.query(sql, sponum, callback);
            connexion.release();

        }
    });
};
module.exports.getEcuriesNotSponsored = function(sponum, callback) {
    // connection à la base
    db.getConnection(function(err, connexion) {
        if (!err) {

            let sql = "SELECT DISTINCT f.ecunum, ecunom FROM finance f JOIN ecurie e ON e.ecunum = f.ecunum WHERE f.ecunum NOT IN(SELECT f.ecunum FROM finance f JOIN ecurie e ON e.ecunum = f.ecunum WHERE sponum=" + sponum + ")";
            connexion.query(sql, sponum, callback);
            connexion.release();

        }
    });
};
module.exports.supprimerEcurie = function(ecunum, callback) {
    // connection à la base
    db.getConnection(function(err, connexion) {
        if (!err) {

            let sql = "DELETE FROM ecurie WHERE ecunum = " + ecunum;
            connexion.query(sql, callback);
            connexion.release();

        }
    });
};

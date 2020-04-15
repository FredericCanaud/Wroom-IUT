let db = require('../configDb');

module.exports.supprimerCourseByPilnum = function(pilnum, callback) {
    // connection à la base
    db.getConnection(function(err, connexion) {
        if (!err) {

            let sql = "DELETE FROM course WHERE pilnum = " + pilnum;
            connexion.query(sql, callback);
            connexion.release();

        }
    });
};

module.exports.supprimerCourseByCirnum = function(cirnum, callback) {
    // connection à la base
    db.getConnection(function(err, connexion) {
        if (!err) {

            let sql = "DELETE FROM course WHERE gpnum IN (SELECT gpnum FROM grandprix WHERE cirnum = " + cirnum + ")";
            connexion.query(sql, callback);
            connexion.release();

        }
    });
};
module.exports.ajouterCourse = function(data, callback) {
    // connection à la base
    db.getConnection(function(err, connexion) {
        if (!err) {

            let sql = "INSERT INTO course SET ?";
            connexion.query(sql, data, callback);
            connexion.release();

        }
    });
};
module.exports.supprimerCourse = function(gpnum, pilnum, callback) {
    // connection à la base
    db.getConnection(function(err, connexion) {
        if (!err) {

            let sql = "DELETE FROM course WHERE gpnum = " + gpnum + " AND pilnum = " + pilnum;
            connexion.query(sql, callback);
            connexion.release();
            
        }
    });
};

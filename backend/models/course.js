let db = require('../configDb');

module.exports.supprimerCourseByPilnum = function (pilnum, callback) {
   // connection à la base
	db.getConnection(function(err, connexion){
        if(!err){
        	  // s'il n'y a pas d'erreur de connexion
        	  // execution de la requête SQL
						let sql ="DELETE FROM course WHERE pilnum = " + pilnum;
						//console.log (sql);
            connexion.query(sql, callback);

            // la connexion retourne dans le pool
            connexion.release();
         }
      });
};

module.exports.supprimerCourseByCirnum = function (cirnum, callback) {
   // connection à la base
	db.getConnection(function(err, connexion){
        if(!err){
        	  // s'il n'y a pas d'erreur de connexion
        	  // execution de la requête SQL
						let sql ="DELETE FROM course WHERE gpnum IN (SELECT gpnum FROM grandprix WHERE cirnum = " + cirnum + ")";
						//console.log (sql);
            connexion.query(sql, callback);

            // la connexion retourne dans le pool
            connexion.release();
         }
      });
};
module.exports.ajouterCourse = function (data, callback) {
		 // connection à la base
		 db.getConnection(function(err, connexion){
					if(!err){
								// s'il n'y a pas d'erreur de connexion
								// execution de la requête SQL
								 let sql ="INSERT INTO course SET ?";
													console.log (sql);
							connexion.query(sql, data, callback);

							// la connexion retourne dans le pool
							connexion.release();
					 }
				});
};
module.exports.supprimerCourse = function (gpnum, pilnum, callback) {
   // connection à la base
	db.getConnection(function(err, connexion){
        if(!err){
        	  // s'il n'y a pas d'erreur de connexion
        	  // execution de la requête SQL
						let sql ="DELETE FROM course WHERE gpnum = " + gpnum + " AND pilnum = " + pilnum;
						//console.log (sql);
            connexion.query(sql, callback);

            // la connexion retourne dans le pool
            connexion.release();
         }
      });
};

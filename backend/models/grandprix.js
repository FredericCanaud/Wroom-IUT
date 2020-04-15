let db = require('../configDb');

module.exports.getListeGrandPrix = function (callback) {
   // connection à la base
	db.getConnection(function(err, connexion){
        if(!err){
        	  // s'il n'y a pas d'erreur de connexion
        	  // execution de la requête SQL
						let sql ="SELECT gpnum, gpnom FROM grandprix ORDER BY gpnom";
						//console.log (sql);
            connexion.query(sql, callback);

            // la connexion retourne dans le pool
            connexion.release();
         }
      });
};
module.exports.getPilotesNotInGP = function (gpnum, callback) {
	 // connection à la base
		db.getConnection(function(err, connexion){
				if(!err){
							// s'il n'y a pas d'erreur de connexion
							// execution de la requête SQL
							 let sql ="SELECT pilnum, pilnom FROM pilote WHERE pilnum NOT IN (SELECT pilnum FROM course c JOIN grandprix g ON g.gpnum=c.gpnum WHERE g.gpnum=" + gpnum +") ORDER BY pilnom";
						connexion.query(sql, callback);

						// la connexion retourne dans le pool
						connexion.release();
				 }
			});
 };
module.exports.supprimerGrandPrixByCirnum = function (cirnum, callback) {
   // connection à la base
	db.getConnection(function(err, connexion){
        if(!err){
        	  // s'il n'y a pas d'erreur de connexion
        	  // execution de la requête SQL
						let sql ="DELETE FROM grandprix WHERE cirnum = " + cirnum;
						//console.log (sql);
            connexion.query(sql, callback);

            // la connexion retourne dans le pool
            connexion.release();
         }
      });
};

let db = require('../configDb');

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
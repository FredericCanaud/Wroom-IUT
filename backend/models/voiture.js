let db = require('../configDb');

module.exports.updateVoitureSansEcurie = function (ecunum, callback) {
   // connection à la base
	db.getConnection(function(err, connexion){
        if(!err){
        	  // s'il n'y a pas d'erreur de connexion
        	  // execution de la requête SQL
            let sql ="UPDATE voiture SET ecunum=NULL WHERE ecunum=" + ecunum;
						//console.log (sql);
            connexion.query(sql, callback);

            // la connexion retourne dans le pool
            connexion.release();
         }
      });
};

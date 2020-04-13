let db = require('../configDb');

module.exports.ajouterFinancement = function (data, callback) {
   // connection à la base
	db.getConnection(function(err, connexion){
        if(!err){
        	  // s'il n'y a pas d'erreur de connexion
        	  // execution de la requête SQL
						let sql ="INSERT INTO finance SET ?"
						//console.log (sql);
            connexion.query(sql, data, callback);

            // la connexion retourne dans le pool
            connexion.release();
         }
      });
};
module.exports.modifierFinancement = function (data, callback) {
		 // connection à la base
		 db.getConnection(function(err, connexion){
					if(!err){
								// s'il n'y a pas d'erreur de connexion
								// execution de la requête SQL
						  let sql = "INSERT INTO finance VALUES("+ data.ecunum + "," + data.sponum + ") ON DUPLICATE KEY UPDATE sponum= "+ data.sponum;
							console.log (sql);
							connexion.query(sql, data, callback);
							connexion.release();

					 }
				});
};
module.exports.supprimerFinancement = function (data, callback) {
		 // connection à la base
		 db.getConnection(function(err, connexion){
					if(!err){
								// s'il n'y a pas d'erreur de connexion
								// execution de la requête SQL
						  let sql = "DELETE FROM finance WHERE sponum= "+ data.sponum + " AND ecunum=" + data.ecunum;
							console.log (sql);
							connexion.query(sql, data, callback);
							connexion.release();

					 }
				});
};
module.exports.supprimerFinancementBySponum = function (sponum, callback) {
   // connection à la base
	db.getConnection(function(err, connexion){
        if(!err){
        	  // s'il n'y a pas d'erreur de connexion
        	  // execution de la requête SQL
						let sql ="DELETE FROM finance WHERE sponum = " + sponum;
						//console.log (sql);
            connexion.query(sql, callback);

            // la connexion retourne dans le pool
            connexion.release();
         }
      });
};
module.exports.supprimerFinancementByEcunum = function (ecunum, callback) {
   // connection à la base
	db.getConnection(function(err, connexion){
        if(!err){
        	  // s'il n'y a pas d'erreur de connexion
        	  // execution de la requête SQL
						let sql ="DELETE FROM finance WHERE ecunum = " + ecunum;
						//console.log (sql);
            connexion.query(sql, callback);

            // la connexion retourne dans le pool
            connexion.release();
         }
      });
};

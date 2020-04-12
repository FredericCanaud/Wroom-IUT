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
module.exports.getCircuits = function (callback) {
   // connection à la base
	db.getConnection(function(err, connexion){
        if(!err){
        	  // s'il n'y a pas d'erreur de connexion
        	  // execution de la requête SQL
						let sql ="SELECT cirnum, cirnom, cirlongueur, cirnbspectateurs FROM circuit ORDER BY cirnom";
						//console.log (sql);
            connexion.query(sql, callback);

            // la connexion retourne dans le pool
            connexion.release();
         }
      });
};
module.exports.getDetailCircuit = function (cirnum, callback) {
		// connection à la base
		 db.getConnection(function(err, connexion){
				 if(!err){
							 // s'il n'y a pas d'erreur de connexion
							 // execution de la requête SQL
								let sql ="SELECT cir.cirnum, cirnom, cirlongueur, cirnbspectateurs, ciradresseimage, cirtext, paynom FROM circuit cir JOIN pays p ON cir.paynum = p.paynum AND cir.cirnum = " + cirnum;
												 console.log (sql);
						 connexion.query(sql, callback);

						 // la connexion retourne dans le pool
						 connexion.release();
					}
			 });
 };
 module.exports.ajouterCircuit = function (data, callback) {
			// connection à la base
			db.getConnection(function(err, connexion){
					 if(!err){
								 // s'il n'y a pas d'erreur de connexion
								 // execution de la requête SQL
									let sql ="INSERT INTO circuit SET ?";
													 console.log (sql);
							 connexion.query(sql, data, callback);

							 // la connexion retourne dans le pool
							 connexion.release();
						}
				 });
 };
 module.exports.modifierCircuit = function (data, callback) {
 		 // connection à la base
 		 db.getConnection(function(err, connexion){
 					if(!err){
 								// s'il n'y a pas d'erreur de connexion
 								// execution de la requête SQL
 								 let sql ="UPDATE circuit SET ? WHERE cirnum=" + data.cirnum;
 													console.log (sql);
 							connexion.query(sql, data, callback);

 							// la connexion retourne dans le pool
 							connexion.release();
 					 }
 				});
 };
 module.exports.supprimerCircuit = function (cirnum, callback) {
 	 // connection à la base
 	db.getConnection(function(err, connexion){
 				if(!err){
 						// s'il n'y a pas d'erreur de connexion
 						// execution de la requête SQL
 						let sql ="DELETE FROM circuit WHERE cirnum = " + cirnum;
 						//console.log (sql);
 						connexion.query(sql, callback);

 						// la connexion retourne dans le pool
 						connexion.release();
 				 }
 			});
 };

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
module.exports.getListeEcurie = function (callback) {
   // connection à la base
	db.getConnection(function(err, connexion){
        if(!err){
        	  // s'il n'y a pas d'erreur de connexion
        	  // execution de la requête SQL
						let sql ="SELECT ecunum, payadrdrap, ecunom FROM " +
                            "ecurie e INNER JOIN pays p ";
						sql= sql + "ON p.paynum=e.paynum ORDER BY ecunom";
						//console.log (sql);
            connexion.query(sql, callback);

            // la connexion retourne dans le pool
            connexion.release();
         }
      });
};

module.exports.getDetailEcurie = function (ecunum, callback) {
		// connection à la base
		 db.getConnection(function(err, connexion){
				 if(!err){
							 // s'il n'y a pas d'erreur de connexion
							 // execution de la requête SQL
								let sql ="SELECT ecu.ecunum, ecunom, ecunomdir, ecuadrsiege, ecuadresseimage, fpnom, paynom FROM ecurie ecu JOIN fourn_pneu fp ON ecu.fpnum = fp.fpnum JOIN pays p ON ecu.paynum = p.paynum WHERE ecu.ecunum = " + ecunum;
												 console.log (sql);
						 connexion.query(sql, callback);

						 // la connexion retourne dans le pool
						 connexion.release();
					}
			 });
 };
 module.exports.getNomEcurie = function (ecunum, callback) {
 	 // connection à la base
 		db.getConnection(function(err, connexion){
 				if(!err){
 							// s'il n'y a pas d'erreur de connexion
 							// execution de la requête SQL
 							 let sql ="SELECT ecunom FROM ecurie WHERE ecunum = " + ecunum;
 												console.log (sql);
 						connexion.query(sql, callback);

 						// la connexion retourne dans le pool
 						connexion.release();
 				 }
 			});
  };
module.exports.getVoituresFromEcurie = function (ecunum, callback) {
		// connection à la base
		 db.getConnection(function(err, connexion){
				 if(!err){
							 // s'il n'y a pas d'erreur de connexion
							 // execution de la requête SQL
								let sql ="SELECT voinom, voiadresseimage, typelibelle FROM ecurie ecu JOIN voiture voi ON ecu.ecunum = voi.ecunum JOIN type_voiture typ ON voi.typnum=typ.typnum WHERE ecu.ecunum = " + ecunum;
												 console.log (sql);
						 connexion.query(sql, callback);

						 // la connexion retourne dans le pool
						 connexion.release();
					}
			 });
 };

 module.exports.getPilotesFromEcurie = function (ecunum, callback) {
 		// connection à la base
 		 db.getConnection(function(err, connexion){
 				 if(!err){
 							 // s'il n'y a pas d'erreur de connexion
 							 // execution de la requête SQL
 								let sql ="SELECT pil.pilnum, pilnom, pilprenom, phosujet, phoadresse FROM pilote pil JOIN ecurie ecu ON ecu.ecunum = pil.ecunum JOIN photo pho ON pil.pilnum = pho.pilnum WHERE ecu.ecunum = " + ecunum + " GROUP BY pil.pilnum";
 												 console.log (sql);
 						 connexion.query(sql, callback);

 						 // la connexion retourne dans le pool
 						 connexion.release();
 					}
 			 });
  };

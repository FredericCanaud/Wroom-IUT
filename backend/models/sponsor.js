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
module.exports.getSponsors = function (callback) {
   // connection à la base
	db.getConnection(function(err, connexion){
        if(!err){
        	  // s'il n'y a pas d'erreur de connexion
        	  // execution de la requête SQL
						let sql ="SELECT sponum, sponom, sposectactivite FROM sponsor ORDER BY sponom";
						//console.log (sql);
            connexion.query(sql, callback);

            // la connexion retourne dans le pool
            connexion.release();
         }
      });
};
module.exports.getDetailSponsor = function (sponum, callback) {
   // connection à la base
	db.getConnection(function(err, connexion){
        if(!err){
        	  // s'il n'y a pas d'erreur de connexion
        	  // execution de la requête SQL
						let sql ="SELECT sponum, sponom, sposectactivite FROM sponsor WHERE sponum =" + sponum;
						//console.log (sql);
            connexion.query(sql, callback);

            // la connexion retourne dans le pool
            connexion.release();
         }
      });
};
module.exports.ajouterSponsor = function (data, callback) {
   // connection à la base
	db.getConnection(function(err, connexion){
        if(!err){
        	  // s'il n'y a pas d'erreur de connexion
        	  // execution de la requête SQL
						let sql ="INSERT INTO sponsor SET ?"
						//console.log (sql);
            connexion.query(sql, data, callback);

            // la connexion retourne dans le pool
            connexion.release();
         }
      });
};
module.exports.modifierSponsor = function (data, callback) {
		 // connection à la base
		 db.getConnection(function(err, connexion){
					if(!err){
								// s'il n'y a pas d'erreur de connexion
								// execution de la requête SQL
								 let sql ="UPDATE sponsor SET ? WHERE sponum=" + data.sponum;
													console.log (sql);
							connexion.query(sql, data, callback);

							// la connexion retourne dans le pool
							connexion.release();
					 }
				});
};
module.exports.supprimerSponsor = function (sponum, callback) {
   // connection à la base
	db.getConnection(function(err, connexion){
        if(!err){
        	  // s'il n'y a pas d'erreur de connexion
        	  // execution de la requête SQL
						let sql ="DELETE FROM sponsor WHERE sponum = " + sponum;
						//console.log (sql);
            connexion.query(sql, callback);

            // la connexion retourne dans le pool
            connexion.release();
         }
      });
};

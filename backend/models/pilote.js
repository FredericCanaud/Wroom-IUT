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

module.exports.getPilotes= function (callback) {
    // connection à la base
     db.getConnection(function(err, connexion){
         if(!err){
               // s'il n'y a pas d'erreur de connexion
               // execution de la requête SQL
                let sql ="SELECT pilnum, pilnom, pilprenom, pildatenais FROM pilote ORDER BY pilnom ASC";
                         console.log (sql);
             connexion.query(sql, callback);

             // la connexion retourne dans le pool
             connexion.release();
          }
       });
 };

 module.exports.getNomPilote = function (initial, callback) {
     // connection à la base
      db.getConnection(function(err, connexion){
          if(!err){
                // s'il n'y a pas d'erreur de connexion
                // execution de la requête SQL
                 let sql ="SELECT pil.pilnum, pilnom, phoadresse FROM pilote pil JOIN photo pho ON pil.pilnum = pho.pilnum WHERE phonum = 1 AND pilnom LIKE '" + initial + "%' ORDER BY pilnom asc";
                          console.log (sql);
              connexion.query(sql, callback);

              // la connexion retourne dans le pool
              connexion.release();
           }
        });
  };

  module.exports.getDetailPilote = function (pilnum, callback) {
      // connection à la base
       db.getConnection(function(err, connexion){
           if(!err){
                 // s'il n'y a pas d'erreur de connexion
                 // execution de la requête SQL
                  let sql ="SELECT pil.pilnum, pilnom, pilprenom, pildatenais, pilpoids, pilpoints, piltaille, piltexte, phoadresse, ecunom, paynat FROM pilote pil JOIN photo pho ON pil.pilnum = pho.pilnum JOIN ecurie ecu ON pil.ecunum=ecu.ecunum JOIN pays pay ON pil.paynum=pay.paynum WHERE phonum = 1 AND pil.pilnum = " + pilnum;
                           console.log (sql);
               connexion.query(sql, callback);

               // la connexion retourne dans le pool
               connexion.release();
            }
         });
   };
   module.exports.getSponsorsFromPilote = function (pilnum, callback) {
       // connection à la base
        db.getConnection(function(err, connexion){
            if(!err){
                  // s'il n'y a pas d'erreur de connexion
                  // execution de la requête SQL
                   let sql ="SELECT sponom, sposectactivite FROM pilote pil JOIN sponsorise sp ON pil.pilnum = sp.pilnum JOIN sponsor spo ON sp.sponum=spo.sponum WHERE pil.pilnum = " + pilnum;
                            console.log (sql);
                connexion.query(sql, callback);

                // la connexion retourne dans le pool
                connexion.release();
             }
          });
    };
    module.exports.getPhotosFromPilote = function (pilnum, callback) {
        // connection à la base
         db.getConnection(function(err, connexion){
             if(!err){
                   // s'il n'y a pas d'erreur de connexion
                   // execution de la requête SQL
                    let sql ="SELECT phoadresse, phosujet, phocommentaire FROM pilote pil JOIN photo pho ON pil.pilnum = pho.pilnum WHERE pil.pilnum = " + pilnum;
                             console.log (sql);
                 connexion.query(sql, callback);

                 // la connexion retourne dans le pool
                 connexion.release();
              }
           });
    };
    module.exports.ajouterPilote = function (data, callback) {
         // connection à la base
         db.getConnection(function(err, connexion){
              if(!err){
                    // s'il n'y a pas d'erreur de connexion
                    // execution de la requête SQL
                     let sql ="INSERT INTO pilote SET ?";
                              console.log (sql);
                  connexion.query(sql, data, callback);

                  // la connexion retourne dans le pool
                  connexion.release();
               }
            });
    };
    module.exports.modifierPilote = function (data, callback) {
         // connection à la base
         db.getConnection(function(err, connexion){
              if(!err){
                    // s'il n'y a pas d'erreur de connexion
                    // execution de la requête SQL
                     let sql ="UPDATE pilote SET ? WHERE pilnum=" + data.pilnum;
                              console.log (sql);
                  connexion.query(sql, data, callback);

                  // la connexion retourne dans le pool
                  connexion.release();
               }
            });
    };
    module.exports.supprimerPilote = function (pilnum, callback) {
       // connection à la base
    	db.getConnection(function(err, connexion){
            if(!err){
            	  // s'il n'y a pas d'erreur de connexion
            	  // execution de la requête SQL
    						let sql ="DELETE FROM pilote WHERE pilnum = " + pilnum;
    						//console.log (sql);
                connexion.query(sql, callback);

                // la connexion retourne dans le pool
                connexion.release();
             }
          });
    };

    module.exports.updatePiloteSansEcurie = function (ecunum, callback) {
       // connection à la base
    	db.getConnection(function(err, connexion){
            if(!err){
            	  // s'il n'y a pas d'erreur de connexion
            	  // execution de la requête SQL
                let sql ="UPDATE pilote SET ecunum=NULL WHERE ecunum=" + ecunum;
    						//console.log (sql);
                connexion.query(sql, callback);

                // la connexion retourne dans le pool
                connexion.release();
             }
          });
    };

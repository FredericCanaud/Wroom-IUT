let db = require('../configDb');
let Cryptr = require('cryptr');

module.exports.CheckLogin = function(login, passwd, callback) {
  db.getConnection(function(err, connexion) {
    if (!err) {

      var sql = "SELECT login, passwd FROM login WHERE login = '"+ login + "'";
      //console.log (sql);
      connexion.query(sql, callback);
      connexion.release();
    }
  });
};

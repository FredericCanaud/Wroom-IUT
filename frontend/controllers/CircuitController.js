let model = require('../models/circuit.js');
let async = require('async');

////////////////////// L I S T E R     C I R C U I T S

module.exports.ListerCircuit = function(request, response) {
    response.title = 'Liste des circuits';
    model.getListeCircuit(function(err, result) {
        if (err) {
            console.log(err);
            return;
        }
        response.listeCircuit = result;
        console.log(result);
        response.render('listerCircuit', response);
    });
}
module.exports.InfoCircuit = function(request, response) {
    let data = request.params.num;
    async.parallel([
            function(callback) {
                model.getDetailCircuit(data, (function(err, result) {
                    callback(null, result)
                }));
            },
            function(callback) {
                model.getListeCircuit(function(err, result) {
                    callback(null, result)
                });
            }
        ],
        function(err, result) {
            if (err) {
                console.log(err);
                return;
            }
            response.circuit = result[0][0];
            response.listeCircuit = result[1];
            console.log(result[0][0]);
            response.title = 'Détail sur le circuit ' + result[0][0].cirnom;
            response.render('detailCircuit', response);
        });
}


let HomeController = require('./../controllers/HomeController');
let ResultatController = require('./../controllers/ResultatController');
let EcurieController = require('./../controllers/EcurieController');
let PiloteController = require('./../controllers/PiloteController');
let CircuitController = require('./../controllers/CircuitController');
let ConnexionController = require('./../controllers/ConnexionController');
let SponsorController = require('./../controllers/SponsorController');

// Routes
module.exports = function(app){

// Main Routes

    app.get('/accueil', HomeController.Index);
    app.get('/', HomeController.Index);
// Pilotes
    app.get('/pilotes', PiloteController.ListerPilotes);
    app.get('/ajouterPilote', PiloteController.AjouterPilote);
    app.post('/ajouterPilote', PiloteController.AjoutPilote);
    app.get('/modifierPilote/:num', PiloteController.ModifierPilote);
    app.post('/modifierPilote/:num', PiloteController.ModifPilote);
    app.get('/supprimerPilote/:num', PiloteController.SupprimerPilote);

// Circuits
   app.get('/circuits', CircuitController.ListerCircuits);
   app.get('/ajouterCircuit', CircuitController.AjouterCircuit);
   app.post('/ajouterCircuit', CircuitController.AjoutCircuit);
   app.get('/modifierCircuit/:num', CircuitController.ModifierCircuit);
   app.post('/modifierCircuit/:num', CircuitController.ModifCircuit);
   app.get('/supprimerCircuit/:num', CircuitController.SupprimerCircuit);

// Ecuries
   app.get('/ecuries', EcurieController.ListerEcurie);
   app.get('/ajouterEcurie', EcurieController.AjouterEcurie);
   app.post('/ajouterEcurie', EcurieController.AjoutEcurie);
   app.get('/modifierEcurie/:num', EcurieController.ModifierEcurie);
   app.post('/modifierEcurie/:num', EcurieController.ModifEcurie);
   app.get('/supprimerEcurie/:num', EcurieController.SupprimerEcurie);

 // Résultats
   app.get('/resultats', ResultatController.ListerResultat);
   app.get('/detailGrandPrix/:num', ResultatController.InfoResultat);

 // Sponsors
   app.get('/sponsors', SponsorController.ListerSponsors);
   app.get('/ajouterSponsor', SponsorController.AjouterSponsor);
   app.post('/ajouterSponsor', SponsorController.AjoutSponsor);
   app.get('/modifierSponsor/:num', SponsorController.ModifierSponsor);
   app.post('/modifierSponsor/:num', SponsorController.ModifSponsor);
   app.get('/supprimerSponsor/:num', SponsorController.SupprimerSponsor);

 // Administration
   app.get('/login', ConnexionController.Login);
   app.post('/login', ConnexionController.CheckLogin);
   app.get('/deconnexion', ConnexionController.Deconnexion);

// Tout le reste
app.get('*', HomeController.NotFound);
app.post('*', HomeController.NotFound);

};

/* FONCTION CONTROLE CONNEXION */
function requireAdmin(req, res, next) {
  if (req.session.isConnected == "" || req.session.isConnected == undefined) {
    res.redirect('/login');
    return;
  }
  next();
}

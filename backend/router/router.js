let HomeController = require('./../controllers/HomeController');
let ResultatController = require('./../controllers/ResultatController');
let EcurieController = require('./../controllers/EcurieController');
let PiloteController = require('./../controllers/PiloteController');
let CircuitController = require('./../controllers/CircuitController');
let ConnexionController = require('./../controllers/ConnexionController');
let SponsorController = require('./../controllers/SponsorController');
let PhotoController = require('./../controllers/PhotoController');
let VoitureController = require('./../controllers/VoitureController');

// Routes
module.exports = function(app){

// Main Routes

    app.get('/accueil', requireAdmin, HomeController.Index);
    app.get('/', requireAdmin, HomeController.Index);

// Photos

    app.get('/photos', requireAdmin, PhotoController.ListerPilotes);
    app.post('/photos', requireAdmin, PhotoController.RedirectionSaisiePhotos);
    app.get('/saisiePhotos', requireAdmin, PhotoController.AffichageSaisiePhotos);
    app.post('/saisiePhotos', requireAdmin, PhotoController.SaisiePhotos);
    app.get('/supprimerPhoto/:phonum/:pilnum', requireAdmin, PhotoController.SupprimerPhoto);

// Pilotes
    app.get('/pilotes', requireAdmin, PiloteController.ListerPilotes);
    app.get('/ajouterPilote', requireAdmin, PiloteController.AjouterPilote);
    app.post('/ajouterPilote', requireAdmin, PiloteController.AjoutPilote);
    app.get('/modifierPilote/:num', requireAdmin, PiloteController.ModifierPilote);
    app.post('/modifierPilote/:num', requireAdmin, PiloteController.ModifPilote);
    app.get('/supprimerPilote/:num', requireAdmin, PiloteController.SupprimerPilote);

// Circuits
   app.get('/circuits', requireAdmin, CircuitController.ListerCircuits);
   app.get('/ajouterCircuit', requireAdmin, CircuitController.AjouterCircuit);
   app.post('/ajouterCircuit', requireAdmin, CircuitController.AjoutCircuit);
   app.get('/modifierCircuit/:num', requireAdmin, CircuitController.ModifierCircuit);
   app.post('/modifierCircuit/:num', requireAdmin, CircuitController.ModifCircuit);
   app.get('/supprimerCircuit/:num', requireAdmin, CircuitController.SupprimerCircuit);

// Ecuries
   app.get('/ecuries', requireAdmin, EcurieController.ListerEcurie);
   app.get('/ajouterEcurie', requireAdmin, EcurieController.AjouterEcurie);
   app.post('/ajouterEcurie', requireAdmin, EcurieController.AjoutEcurie);
   app.get('/modifierEcurie/:num', requireAdmin, EcurieController.ModifierEcurie);
   app.post('/modifierEcurie/:num', requireAdmin, EcurieController.ModifEcurie);
   app.get('/supprimerEcurie/:num', requireAdmin, EcurieController.SupprimerEcurie);

// Résultats
   app.get('/resultats', requireAdmin, ResultatController.ListerGrandPrix);
   app.post('/resultats', requireAdmin, ResultatController.RedirectionSaisieResultat);
   app.get('/saisieResultats', requireAdmin, ResultatController.AffichageSaisieResultat);
   app.post('/saisieResultats', requireAdmin, ResultatController.SaisieResultat);
   app.get('/supprimerResultat/:gpnum/:pilnum', requireAdmin, ResultatController.SupprimerResultat);

// Sponsors
   app.get('/sponsors', requireAdmin, SponsorController.ListerSponsors);
   app.get('/ajouterSponsor', requireAdmin, SponsorController.AjouterSponsor);
   app.post('/ajouterSponsor', requireAdmin, SponsorController.AjoutSponsor);
   app.get('/modifierSponsor/:num', requireAdmin, SponsorController.ModifierSponsor);
   app.post('/modifierSponsor/:num', requireAdmin, SponsorController.ModifSponsor);
   app.get('/supprimerSponsor/:num', requireAdmin, SponsorController.SupprimerSponsor);

// Voitures

   app.get('/voitures', requireAdmin, VoitureController.ListerVoitures);
   app.get('/ajouterVoiture', requireAdmin, VoitureController.AjouterVoiture);
   app.post('/ajouterVoiture', requireAdmin, VoitureController.AjoutVoiture);
   app.get('/modifierVoiture/:num', requireAdmin, VoitureController.ModifierVoiture);
   app.post('/modifierVoiture/:num', requireAdmin, VoitureController.ModifVoiture);
   app.get('/supprimerVoiture/:num', requireAdmin, VoitureController.SupprimerVoiture);

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

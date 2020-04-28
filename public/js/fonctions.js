function supprimerSponsor(sponom, sponum) {
    Swal.fire({
        title: "Supprimer le sponsor " + sponom + "?",
        text: "Êtes-vous sûr de vouloir supprimer le sponsor " + sponom + "?",
        icon: "error",
        confirmButtonText: "Supprimer",
        cancelButtonText: "Annuler",
        showCancelButton: true,
    }).then(function(result) {
        if (result.value) {
            window.location = "/supprimerSponsor/" + sponum;
        }
    });
}

function supprimerPilote(pilnom, pilnum) {
    Swal.fire({
        title: "Supprimer le pilote " + pilnom + "?",
        text: "Êtes-vous sûr de vouloir supprimer le pilote " + pilnom + "?",
        icon: "error",
        confirmButtonText: "Supprimer",
        cancelButtonText: "Annuler",
        showCancelButton: true,
    }).then(function(result) {
        if (result.value) {
            window.location = "/supprimerPilote/" + pilnum;
        }
    });
}

function supprimerCircuit(cirnom, cirnum) {
    Swal.fire({
        title: "Supprimer le circuit " + cirnom + "?",
        text: "Êtes-vous sûr de vouloir supprimer le pilote " + cirnom + "? (cela entraînera la suppression des Grand Prix associés !)",
        icon: "error",
        confirmButtonText: "Supprimer",
        cancelButtonText: "Annuler",
        showCancelButton: true,
    }).then(function(result) {
        if (result.value) {
            window.location = "/supprimerCircuit/" + cirnum;
        }
    });
}

function supprimerEcurie(ecunom, ecunum) {
    Swal.fire({
        title: "Supprimer l'écurie " + ecunom + "?",
        text: "Êtes-vous sûr de vouloir supprimer l'écurie' " + ecunom + "?",
        icon: "error",
        confirmButtonText: "Supprimer",
        cancelButtonText: "Annuler",
        showCancelButton: true,
    }).then(function(result) {
        if (result.value) {
            window.location = "/supprimerEcurie/" + ecunum;
        }
    });
}

function supprimerResultat(gpnum, pilnum) {
    Swal.fire({
        title: "Supprimer le résultat ?",
        text: "Êtes-vous sûr de vouloir supprimer le résultat ?",
        icon: "error",
        confirmButtonText: "Supprimer",
        cancelButtonText: "Annuler",
        showCancelButton: true,
    }).then(function(result) {
        if (result.value) {
            window.location = "/supprimerResultat/" + gpnum + "/" + pilnum;
        }
    });
}

function supprimerPhoto(phonum, pilnum) {
    Swal.fire({
        title: "Supprimer la photo ?",
        text: "Êtes-vous sûr de vouloir supprimer la photo ?",
        icon: "error",
        confirmButtonText: "Supprimer",
        cancelButtonText: "Annuler",
        showCancelButton: true,
    }).then(function(result) {
        if (result.value) {
            window.location = "/supprimerPhoto/" + phonum + "/" + pilnum;
        }
    });
}

function supprimerVoiture(voinom, voinum) {
    Swal.fire({
        title: "Supprimer la voiture ?",
        text: "Êtes-vous sûr de vouloir supprimer la voiture " + voinom + " ?",
        icon: "error",
        confirmButtonText: "Supprimer",
        cancelButtonText: "Annuler",
        showCancelButton: true,
    }).then(function(result) {
        if (result.value) {
            window.location = "/supprimerVoiture/" + voinum;
        }
    });
}

// Modèles pour l'appli

// 'Data Access Object' pour les comptes

function CompteDAO(id, num, numAmort, commune) {
    this.id = id;
    this.num = num;
    this.numAmort = numAmort;
    this.commune = commune;
}

CompteDAO.prototype.toString = function() {
    return this.commune + ' - ' + this.num + ' - ' + this.numAmort;
}
// Classe Database

function Database() {
    
    // Fichier contenant la base de données
    this.dbFile = Ti.Filesystem.getFile(Ti.Filesystem.getApplicationDataDirectory(), 'database.db');
    
    // La suite permet de créer/remplir initialement la base de données
    // => si elle existe déjà (le fichier, en tout cas) on peut arrêter là
    if (this.dbFile.exists()) {
        return;
    }
    
    // Lecture des requêtes de création de la base
    // => lecture du fichier 'sql/create_base.sql'
    var stringBuffer = Utils.readFile(Ti.Filesystem.getResourcesDirectory() +
            Ti.Filesystem.getSeparator() + 'sql' + Ti.Filesystem.getSeparator() +
            'create_base.sql', true, /--.*/g);
    
    // Exécution de chaque requête trouvée dans le fichier
    this.db = Ti.Database.openFile(this.dbFile);
    var queryArray = stringBuffer.split(';');
    for (var i = 0; i < queryArray.length; i++) {
        var query = queryArray[i].trim();
        if (query.length !== 0) {
            this.db.execute(query);
        }
    }
    
    // Ajout des données bidon
    // DEBUG ONLY
    stringBuffer = Utils.readFile(Ti.Filesystem.getResourcesDirectory() +
            Ti.Filesystem.getSeparator() + 'sql' + Ti.Filesystem.getSeparator() +
            'dummy_data_for_test.sql', true, /--.*/g);
    this.db = Ti.Database.openFile(this.dbFile);
    var queryArray = stringBuffer.split(';');
    this.db.execute('BEGIN TRANSACTION');
    for (var i = 0; i < queryArray.length; i++) {
        var query = queryArray[i].trim();
        if (query.length !== 0) {
            this.db.execute(query);
        }
    }
    this.db.execute('COMMIT TRANSACTION');
    // END DEBUG ONLY
    
    this.db.close();
}

/* Inserts (return new ID) */

Database.prototype.newCompte = function(num, num_amort, commune) {
    this.db = Ti.Database.openFile(this.dbFile);
    this.db.execute('BEGIN TRANSACTION');
    this.db.execute('INSERT INTO COMPTE (NUMERO, NUMERO_AMORTISSEMENT, NOM_COMMUNE) VALUES (?, ?, ?)',
        num, num_amort, commune
    );
    this.db.execute('COMMIT TRANSACTION');
    var row = this.db.execute('SELECT ID FROM COMPTE WHERE NUMERO = ? AND NOM_COMMUNE = ?',
        num, commune
    );
    if (row.isValidRow()) {
        var lastInsertId = row.fieldByName('ID');
    } else {
        var lastInsertId = -1;
    }
    this.db.close();
    return lastInsertId;
};

/* Getters */

Database.prototype.getListCommunes = function() {
    this.db = Ti.Database.openFile(this.dbFile);
    var communes = [];
    var rows = this.db.execute('SELECT DISTINCT NOM_COMMUNE FROM COMPTE ORDER BY NOM_COMMUNE ASC');
    while (rows.isValidRow()) {
        communes.push(rows.fieldByName('NOM_COMMUNE'));
        rows.next();
    }
    rows.close();
    this.db.close();
    return communes;
};

Database.prototype.getListComptesForAutocomplete = function() {
    this.db = Ti.Database.openFile(this.dbFile);
    var views = [];
    var rows = this.db.execute('SELECT * FROM COMPTE ORDER BY NOM_COMMUNE ASC, NUMERO ASC, NUMERO_AMORTISSEMENT ASC');
    while (rows.isValidRow()) {
        views.push(new CompteDAO(rows.fieldByName('ID'),
                rows.fieldByName('NUMERO'),
                rows.fieldByName('NUMERO_AMORTISSEMENT'),
                rows.fieldByName('NOM_COMMUNE')));
        rows.next();
    }
    rows.close();
    this.db.close();
    return views;
};
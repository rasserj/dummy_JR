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
    var file = Ti.Filesystem.getFileStream(Ti.Filesystem.getResourcesDirectory(),
            'sql' + Ti.Filesystem.getSeparator() + 'create_base.sql');
    file.open(Ti.Filesystem.MODE_READ);
    var byteBuffer;
    var stringBuffer = '';
    while ((byteBuffer = file.readLine()) !== null) {
        // On vire les commentaires et les lignes vides au passage
        var line = byteBuffer.toString().replace(/--.*/g, '').trim();
        if (line.length !== 0) {
            stringBuffer += line;
        }
    }
    file.close();
    
    // Exécution de chaque requête trouvée dans le fichier
    this.db = Ti.Database.openFile(this.dbFile);
    var queryArray = stringBuffer.split(';');
    for (var i = 0; i < queryArray.length; i++) {
        var query = queryArray[i].trim();
        if (query.length !== 0) {
            alert(query);
            this.db.execute(query);
        }
    }
    this.db.close();
}

Database.prototype.open = function() {
    this.db = Ti.Database.openFile(this.dbFile);
};

Database.prototype.close = function() {
    this.db.close();
};
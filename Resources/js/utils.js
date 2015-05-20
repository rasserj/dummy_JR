// Fonctions utiles : regroupées dans la classe 'Utils'

function Utils() {
    
}

// <static>
// Lit un fichier texte intégralement, et renvoie la chaine
// contenant le texte.
//
// path:            chemin vers le fichier
// minify:          vire les lignes vides et compacte tout le texte en une
//                  seule ligne en virant les espaces (trim)
// patternToRemove: une regex qui sera eliminee de chaque ligne lue, i.e. sur
//                  chaque ligne lue, il y a un .replace(patternToRemove, '')
Utils.readFile = function(path, minify, patternToRemove) {
    var file = Ti.Filesystem.getFileStream(path);
    file.open(Ti.Filesystem.MODE_READ);
    var byteBuffer;
    var stringBuffer = '';
    while ((byteBuffer = file.readLine()) !== null) {
        if (patternToRemove !== null) {
            var line = byteBuffer.toString().replace(patternToRemove, '').trim();
        } else {
            var line = byteBuffer.toString().trim();
        }
        if (minify) {
            if (line.length !== 0) {
                stringBuffer += line;
            }
        } else {
            stringBuffer += line + '\n';
        }
    }
    file.close();
    if (minify) {
        return stringBuffer;
    } else {
        // Le dernier charactere est un saut de ligne '\n' en trop,
        // a la fin de la boucle de lecture, donc on le vire ici
        return stringBuffer.substring(0, stringBuffer.length - 1);
    }
};
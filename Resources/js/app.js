$(function() {
    // Creation de la barre de menu
    var menu = Ti.UI.createMenu();
    var fileItem = Ti.UI.createMenuItem("Fichier");
    var exitItem = fileItem.addItem("Quitter", function() {
        if (confirm("Voulez-vous vraiment quitter ?")) {
            Ti.App.exit();
        }
    });
    menu.appendItem(fileItem);
    Ti.UI.setMenu(menu);
    
    // Instance de la base
    var database = new Database();
});
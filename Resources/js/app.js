$(function() {
    
    var database = new Database();
    
    // activation des tooltips (contenu html)
    $(document).tooltip({
        content: function () {
            return $(this).prop('title');
        }
    });
    
    $('#menu-saisie').click(function() {
        $('#display').html(Utils.readFile(Ti.Filesystem.getResourcesDirectory()
                + Ti.Filesystem.getSeparator() + 'saisie.part.html'));
        
        /* select pour le choix du compte (existant) à utiliser */
        $.each(database.getListComptesForAutocomplete(), function(index, value) {
            $('#form-imm-cpte').append('<option value="' + value.id + '">' + value.toString() + '</option>');
        });
        $('#form-imm-cpte').chosen();
        
        /* autocomplete sur le nom des communes (pour aider si réutilisation d'une commune) */
        $('#form-imm-commune').autocomplete({
            source: database.getListCommunes()
        });
        $('input[name=creer-compte]').change(function() {
            var checked_val = $('input[name=creer-compte]:checked').val();
            if (checked_val === 'form-imm-cpte-utiliser') {
                $('#form-imm-cpte').prop('disabled', false).trigger('chosen:updated');
                $('#groupe-creer-cpte div input').prop('disabled', true);
            } else if (checked_val === 'form-imm-cpte-creer') {
                $('#form-imm-cpte').prop('disabled', true).trigger('chosen:updated');
                $('#groupe-creer-cpte div input').prop('disabled', false);
            }
        });
        
        /* changement du titre en fonction de subvention/immobilisation */
        $('#form-imm-type').change(function() {
            if ($(this).val() === 'immo') {
                $('#type-immo-nom').html("l'immobilisation");
            } else {
                $('#type-immo-nom').html("la subvention");
            }
        });
        
        /* traitement du bouton 'valider' */
        $('#saisie-form').submit(function() {
            // si un compte doit être créé, on le créé et on récupère son ID,
            // sinon, on récupère l'ID du compte existant à utiliser
            var idCompte;
            var checked_val = $('input[name=creer-compte]:checked').val();
            if (checked_val === 'form-imm-cpte-creer') {
                idCompte = database.newCompte($('#form-imm-num-cpte').val(), $('#form-imm-num-cpte-amort').val(), $('#form-imm-commune').val());
            } else {
                idCompte = $('#form-imm-cpte').val();
            }
            alert(idCompte);
        });
    });
    
    $('#menu-consultation').click(function() {
        $('#display').html('Consultation...');
    });
    
    $('#menu-quitter').click(function() {
        Ti.App.exit();
    });
    
});
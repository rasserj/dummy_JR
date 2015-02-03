package dummy;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

public class DummyMain {
    
    public static void main(String[] args) {
        System.out.println("Hello");
        try {
            exampleDatabase1();
            exampleDatabase2();
        } catch (SQLException e) {
            System.out.println("Erreur avec la base de données.");
        }
    }
    
    /*
     * Exemple d'utilisation d'une connexion pour un select, avec une requete
     * statique (c'est a dire qu'on peut l'ecrire dans une chaine des le debut,
     * sans avoir besoin d'utiliser de variable java pour ecrire la requete).
     */
    public static void exampleDatabase1() throws SQLException {
        try (Connection connection = Database.getConnection(true);
                Statement stt = connection.createStatement();
                ResultSet res = stt.executeQuery("SELECT * FROM MA_TABLE")) {
            int colonne1 = res.getInt("COLONNE1");
            String colonne2 = res.getString("COLONNE2");
            System.out.println(colonne1 + ", " + colonne2);
        }
    }
    
    /*
     * Exemple d'utilisation d'une connexion pour un select, avec une requete
     * preparee (donc avec des parametres variables).
     */
    public static void exampleDatabase2() throws SQLException {
        try (Connection connection = Database.getConnection(true);
                PreparedStatement ps = connection.prepareStatement("SELECT * FROM MA_TABLE WHERE ID = ? OR NOM = ?")) {
            for (int i = 0; i < 5; i++) {
                ps.setInt(1, 0);
                ps.setString(2, "Bonjour");
                try (ResultSet res = ps.executeQuery()) {
                    int colonne1 = res.getInt("COLONNE1");
                    boolean colonne3 = res.getBoolean("COLONNE3");
                }
            }
        }
    }
    
    /*
     * Exemple d'utilisation avec des requetes qui ne sont pas en auto-commit.
     * Pour des select, on s'en fout, on peut laisser a true.
     * Pour des insertions/suppressions, il y a deux interets majeurs a faire
     * le commit manuellement :
     *     1/ on maintient un etat coherent en cas d'erreur, les donnees seront
     *        supprimees/inserees par paquets et on est sur que s'il y a une
     *        erreur, tout est remis comme c'etait avant le debut
     *     2/ c'est BEAUCOUP plus rapide comme ca, sachant que le cout de
     *        demarrage/cloture d'une transaction est eleve, il vaut mieux
     *        grouper ce qu'on peut dans une meme transaction (donc en gerant
     *        manuellement le commit)
     */
    public static void exampleDatabase3() throws SQLException {
        Connection connection = Database.getConnection(false);
        try {
            try (PreparedStatement stt = connection.prepareStatement("INSERT INTO MA_TABLE (COL1, COL2) VALUES (?, ?)")) {
                for (int i = 0; i < 5; i++) {
                    stt.setInt(1, i);
                    stt.setBoolean(2, i < 3);
                    stt.executeUpdate();
                }
            }
            connection.commit();
        } catch (SQLException e) {
            connection.rollback();
            throw e; // on propage l'exception, apres avoir fait un rollback
        } finally {
            connection.close(); // on doit faire un close, puisque la connection
            // n'a pas ete cree dans un try
        }
    }
}

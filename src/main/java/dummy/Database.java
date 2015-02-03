package dummy;

import java.io.File;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class Database {
    
    public static final String PATH = System.getProperty("user.home") + File.separatorChar + ".dummy" + File.separatorChar;
    public static final String DB_NAME = "data";
    public static final String DB_EXT = ".db";
    public static final String FILE_NAME = PATH + DB_NAME + ".mv" + DB_EXT;
    
    /**
     * Renvoie une connexion vers la base de donnees.
     * Exemple :
     * getConnection(true)  chaque requete sera en autocommit
     * getConnection(false) le commit DOIT etre effectue depuis l'appelant
     * 
     * @param autocommit Indique s'il doit y avoir un commit a chaque requete.
     * @return Connexion vers la base.
     * @throws java.sql.SQLException
     */
    public static Connection getConnection(boolean autocommit) throws SQLException {
        Connection connection = DriverManager.getConnection("jdbc:h2:" + PATH + "data", "sa", "");
        connection.setAutoCommit(autocommit);
        return connection;
    }
}
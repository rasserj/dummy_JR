-- Script pour SQLite3
--
-- Attention, les chaînes "--" et ";" ne sont pas ignorées
-- si elles sont dans une String, donc ne pas les utiliser
-- dans des chaînes (dans des commentaires, c'est bon).
-- C'est à cause de la façon dont on lit le fichier sql
-- (voir le fichier 'utils.js' pour voir pourquoi).

CREATE TABLE COMPTE(
    ID                      INTEGER         PRIMARY KEY, -- auto_increment implicite car SQLite
    NUMERO                  VARCHAR(10)     NOT NULL, -- 10 caracteres max, or
                                                      -- int = 2 ^ 32 ~= 4 millard = 9 chiffres
                                                      -- donc => texte
    NUMERO_AMORTISSEMENT    VARCHAR(10)     NOT NULL, -- idem
    NOM_COMMUNE             VARCHAR(255)    NOT NULL
);

CREATE TABLE IMMOBILISATION(
    ID                      INTEGER         PRIMARY KEY, -- auto_increment implicite car SQLite
    ID_COMPTE               INTEGER         NOT NULL,
    NUMERO_INVENTAIRE       VARCHAR(255)    NOT NULL,
    COMMENTAIRE             VARCHAR(1023)   NOT NULL,
    SUBVENTION              BOOLEAN         NOT NULL,
    FOREIGN KEY (ID_COMPTE) REFERENCES COMPTE(ID)
);

CREATE TABLE AMORTISSEMENT(
    ID_IMMOBILISATION       INT             NOT NULL,
    ANNEE                   INT             NOT NULL,
    MONTANT_FOIS_CENT       INT             NOT NULL, -- argent x 100
    PRIMARY KEY (ID_IMMOBILISATION, ANNEE),
    FOREIGN KEY (ID_IMMOBILISATION) REFERENCES IMMOBILISATION(ID)
);
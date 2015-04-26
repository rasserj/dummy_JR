-- script MySQL

CREATE TABLE COMPTE(
    ID                      INT             NOT NULL,
    NUMERO                  VARCHAR(10)     NOT NULL, -- 10 caracteres max, or
                                                      -- int = 2 ^ 32 ~= 4 millard = 9 chiffres
                                                      -- donc => texte
    NUMERO_AMORTISSEMENT    VARCHAR(10)     NOT NULL, -- idem
    NOM_COMMUNE             VARCHAR(255)    NOT NULL,
    PRIMARY KEY (ID),
    CHECK (NUMERO LIKE '[0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9]'),
    CHECK (NUMERO_AMORTISSEMENT LIKE '[0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9]')
);

CREATE TABLE IMMOBILISATION(
    ID                      INT             NOT NULL,
    ID_COMPTE               INT             NOT NULL,
    NUMERO_INVENTAIRE       VARCHAR(255)    NOT NULL,
    COMMENTAIRE             VARCHAR(1023)   NOT NULL,
    SUBVENTION              BOOLEAN         NOT NULL,
    PRIMARY KEY (ID),
    FOREIGN KEY (ID_COMPTE) REFERENCES COMPTE(ID),
    CHECK (NUM_INVENTAIRE LIKE '[a-zA-Z0-9/.-]+')
);

CREATE TABLE AMORTISSEMENT(
    NUMERO_INVENTAIRE       VARCHAR(255)    NOT NULL,
    ID_COMPTE               INT             NOT NULL,
    MONTANT                 INT             NOT NULL,
    CENTIMES                INT             NOT NULL, -- pour eviter les float (galere en SQL)
    ANNEE                   INT             NOT NULL,
    PRIMARY KEY (NUMERO_INVENTAIRE, ID_COMPTE, ANNEE),
    FOREIGN KEY (ID_COMPTE) REFERENCES COMPTE(ID),
    FOREIGN KEY (NUMERO_INVENTAIRE) REFERENCES IMMOBILISATION(NUMERO_INVENTAIRE)
);
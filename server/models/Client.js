const db = require("../db");

/**
 CREATE TABLE `client` (
	`idClient` INT(10) NOT NULL AUTO_INCREMENT,
	`prenomClient` VARCHAR(50) NULL DEFAULT NULL COLLATE 'latin1_swedish_ci',
	`nomClient` VARCHAR(50) NOT NULL COLLATE 'latin1_swedish_ci',
	`motDePasse` VARCHAR(200) NOT NULL COLLATE 'latin1_swedish_ci',
	`codeGenere` VARCHAR(100) NULL DEFAULT NULL COLLATE 'latin1_swedish_ci',
	`siret` VARCHAR(14) NOT NULL COLLATE 'latin1_swedish_ci',
	`telephone` VARCHAR(13) NOT NULL COLLATE 'latin1_swedish_ci',
	`statutCompte` TINYINT(1) NOT NULL,
	`profilClient` ENUM('Particulier','Professionnel') NOT NULL COLLATE 'latin1_swedish_ci',
	`dateCreation` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
	`email` VARCHAR(200) NOT NULL COLLATE 'latin1_swedish_ci',
	PRIMARY KEY (`idClient`) USING BTREE,
	UNIQUE INDEX `client_AK` (`email`) USING BTREE
)
COLLATE='latin1_swedish_ci'
ENGINE=InnoDB
;

 */

const createClient = (Client, callback) => {
  const queryString =
    `INSERT INTO Client(idClient, prenomClient, nomClient, motDePasse, codeGenere, siret, telephone, statutCompte, profilClient, dateCreation, email) 
    VALUES (NULL, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

  db.query(
    queryString,
    [
      Client.prenomClient,
      Client.nomClient,
      Client.motDePasse,
      Client.codeGenere,
      Client.siret,
      Client.telephone,
      Client.statutCompte, 
      Client.profilClient,
      Client.dateCreation,
      Client.email
    ],
    (err, result) => {
      if (err) { 
        console.log(err);
        callback(err);
      }
      const queryString =
      `INSERT INTO adresse(idAdresse, numeroVoie, nomVoie, codePostale, ville, idClient) 
      VALUES (NULL, ?, ?, ?, ?, ?)`;

      db.query(
        queryString,
        [
          Client.numeroVoie,
          Client.nomVoie,
          Client.codePostale,
          Client.ville,
          (result).insertId,
        ],
        (err, result) => {
          if (err) { 
            console.log(err);
            callback(err);
          }
         
        }
      )
      callback(null, result);
    } 
  );
};

const getClientById = (ClientId, callback) => {
  const queryString = `SELECT A.*, B.* FROM client A, adresse B WHERE A.idClient = B.idClient AND A.idClient = ?`;

  db.query(queryString, ClientId, (err, result) => {
    if (err) {
      console.log(err);
      callback(err);
    }

    const row = (result)[0];
    
    const client = {
      idClient : row.idClient,
      prenomClient : row.prenomClient,
      nomClient : row.nomClient,
      motDePasse : row.motDePasse,
      codeGenere : row.codeGenere,
      siret : row.siret,
      telephone : row.telephone,
      statutCompte : row.statutCompte, 
      profilClient : row.profilClient,
      dateCreation : row.dateCreation,
      email : row.email,
      numeroVoie: row.numeroVoie,
      nomVoie: row.nomVoie,
      codePostale: row.codePostale,
      ville: row.ville
    };
    callback(null, client);
  });
};

const ClientInDatabase = (Client, callback) => {
  const queryString = `SELECT * FROM Client WHERE email = ? AND password = ?`;
  let isClient = false;
  db.query(queryString, [Client.email, Client.password], (err, result) => {
    if (err) {
      console.log(err);
      callback(err);
    }
    const rows = result;
    return callback(rows.length > 0);
  });
};

const getAll = (callback) => {
  const queryString = `SELECT * FROM Client`;

  db.query(queryString, (err, result) => {
    if (err) {
      callback(err);
    }

    const rows = result;
    const Clients = [];

    rows.forEach((row) => {
      const Client = {
        idClient : row.idClient,
        prenomClient : row.prenomClient,
        nomClient : row.nomClient,
        motDePasse : row.motDePasse,
        codeGenere : row.codeGenere,
        siret : row.siret,
        telephone : row.telephone,
        statutCompte : row.statutCompte, 
        profilClient : row.profilClient,
        dateCreation : row.dateCreation,
        email : row.email
      };
      Clients.push(Client);
    });
    callback(null, Clients);
  });
};

const updateClient = (Client, callback) => {
  let queryString = ''
  if (!Client.motDePasse) {
    queryString = `UPDATE Client SET prenomClient=?, nomClient=?, codeGenere=?, siret=?, telephone=?, statutCompte=?, email=? WHERE idClient=?`;
    db.query(
      queryString,
      [
        Client.prenomClient,
        Client.nomClient,
        Client.codeGenere,
        Client.siret,
        Client.telephone,
        Client.statutCompte,
        Client.email,
        Client.idClient
      ],
      (err, result) => {
        if (err) {
          callback(err);
        }
        const queryString =
      `UPDATE adresse SET numeroVoie = ?, nomVoie = ?, codePostale = ?, ville = ? WHERE idClient = ?`;

      db.query(
        queryString,
        [
          Client.numeroVoie,
          Client.nomVoie,
          Client.codePostale,
          Client.ville,
          Client.idClient
        ],
        (err, result) => {
          if (err) { 
            console.log(err);
            callback(err);
          }
         
        }
      )
        callback(null, Client.idClient);
      }
    );
  }
  else {
    queryString = `UPDATE Client SET prenomClient=?, nomClient=?, motDePasse=?, codeGenere=?, siret=?, telephone=?, statutCompte=?, email=? WHERE idClient=?`;
    db.query(
      queryString,
      [
        Client.prenomClient,
        Client.nomClient,
        Client.motDePasse,
        Client.codeGenere,
        Client.siret,
        Client.telephone,
        Client.statutCompte,
        Client.email,
        Client.idClient
      ],
      (err, result) => {
        if (err) {
          callback(err);
        }
        const queryString =
      `UPDATE adresse SET numeroVoie = ?, nomVoie = ?, codePostale = ?, ville = ? WHERE idClient = ?`;

        db.query(
          queryString,
          [
            Client.numeroVoie,
            Client.nomVoie,
            Client.codePostale,
            Client.ville,
            Client.idClient
          ],
          (err, result) => {
            if (err) { 
              console.log(err);
              callback(err);
            }
          
          }
        )
        callback(null, Client.idClient);
      }
    );
  }
  
};

const deleteClient = (ClientId, callback) => {
  const queryString = `DELETE FROM client WHERE idClient = ?`;
  db.query(queryString, [ClientId], (err, result) => {
    if (err) {
      callback(err);
    }
    callback(null);
  });
};

module.exports = { createClient, getClientById, ClientInDatabase, getAll, updateClient, deleteClient }
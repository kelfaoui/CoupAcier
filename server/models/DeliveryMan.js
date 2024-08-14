const db = require("../db");

/**
 	`idLivreur` INT(10) NOT NULL AUTO_INCREMENT,
	`nomLivreur` VARCHAR(100) NOT NULL COLLATE 'latin1_swedish_ci',
	`prenomLivreur` VARCHAR(100) NOT NULL COLLATE 'latin1_swedish_ci',
	`motDePasse` VARCHAR(200) NOT NULL COLLATE 'latin1_swedish_ci',
	`email` VARCHAR(200) NOT NULL COLLATE 'latin1_swedish_ci',
	`idLivraison` INT(10) NOT NULL,
;

 */

const createDeliveryMan = (DeliveryMan, callback) => {
  const queryString =
    `INSERT INTO livreur(idLivreur, nomLivreur, prenomLivreur, motDePasse, email, idLivraison) 
    VALUES (NULL, ?, ?, ?, ?, ?)`;

  db.query(
    queryString,
    [
      DeliveryMan.nomLivreur,
      DeliveryMan.prenomLivreur,
      DeliveryMan.motDePasse,
      DeliveryMan.email,
      DeliveryMan.idLivraison
    ],
    (err, result) => {
      if (err) { 
        console.log(err);
        callback(err);
      }
      const queryString =
      `INSERT INTO adresse(idAdresse, numeroVoie, nomVoie, codePostale, ville, idLivraison) 
      VALUES (NULL, ?, ?, ?, ?, ?)`;

      db.query(
        queryString,
        [
          DeliveryMan.numeroVoie,
          DeliveryMan.nomVoie,
          DeliveryMan.codePostale,
          DeliveryMan.ville,
          DeliveryMan.idLivraison
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

const getDeliveryManById = (DeliveryManId, callback) => {
  const queryString = `SELECT A.*, B.* FROM livreur A, adresse B WHERE A.idLivraison = B.idLivraison AND A.idLivreur = ?`;

  db.query(queryString, DeliveryManId, (err, result) => {
    if (err) {
      console.log(err);
      callback(err);
    }

    const row = (result)[0];

    const livreur = {
      idLivreur : row.idLivreur,
      nomLivreur : row.nomLivreur,
      prenomLivreur : row.prenomLivreur,
      email : row.email,
      idLivraison : row.idLivraison,
      numeroVoie: row.numeroVoie,
      nomVoie: row.nomVoie,
      codePostale: row.codePostale,
      ville: row.ville
    };
    callback(null, livreur);
  });
};

const DeliveryManInDatabase = (DeliveryMan, callback) => {
  const queryString = `SELECT * FROM DeliveryMan WHERE email = ? AND password = ?`;
  let isDeliveryMan = false;
  db.query(queryString, [DeliveryMan.email, DeliveryMan.password], (err, result) => {
    if (err) {
      console.log(err);
      callback(err);
    }
    const rows = result;
    return callback(rows.length > 0);
  });
};

const getAll = (callback) => {
  const queryString = `SELECT * FROM livreur`;

  db.query(queryString, (err, result) => {
    if (err) {
      callback(err);
    }

    const rows = result;
    const DeliveryMans = [];

    rows.forEach((row) => {
      const DeliveryMan = {
        idLivreur : row.idLivreur,
        prenomLivreur : row.prenomLivreur,
        nomLivreur : row.nomLivreur,
        email : row.email,
      };
      DeliveryMans.push(DeliveryMan);
    });
    callback(null, DeliveryMans);
  });
};

const updateDeliveryMan = (DeliveryMan, callback) => {
  let queryString = ''
  if (!DeliveryMan.motDePasse) {
    queryString = `UPDATE livreur SET nomLivreur=?, prenomLivreur=?, email=?, idLivraison=? WHERE idLivreur=?`;
    db.query(
      queryString,
      [
        DeliveryMan.nomLivreur,
        DeliveryMan.prenomLivreur,
        DeliveryMan.email,
        DeliveryMan.idLivraison,
        DeliveryMan.idLivreur
      ],
      (err, result) => {
        if (err) {
          console.log(err)
          callback(err);
        }
        const queryString =
      `UPDATE adresse SET numeroVoie = ?, nomVoie = ?, codePostale = ?, ville = ? WHERE idLivraison = ?`;

      db.query(
        queryString,
        [
          DeliveryMan.numeroVoie,
          DeliveryMan.nomVoie,
          DeliveryMan.codePostale,
          DeliveryMan.ville,
          DeliveryMan.idLivraison
        ],
        (err, result) => {
          if (err) { 
            console.log(err);
            callback(err);
          }
         
        }
      )
        callback(null, DeliveryMan.idLivreur);
      }
    );
  }
  else {
    queryString = `UPDATE livreur SET nomLivreur=?, prenomLivreur=?, motDePasse=?, email=?, idLivraison=? WHERE idLivraison=?`;
    db.query(
      queryString,
      [ 
        DeliveryMan.nomLivreur,
        DeliveryMan.prenomLivreur,
        DeliveryMan.motDePasse,
        DeliveryMan.email,
        DeliveryMan.idLivraison,
        DeliveryMan.idDeliveryMan
      ],
      (err, result) => {
        if (err) {
          callback(err);
          c
        }
        const queryString =
      `UPDATE adresse SET numeroVoie = ?, nomVoie = ?, codePostale = ?, ville = ? WHERE idLivraison = ?`;

        db.query(
          queryString,
          [
            DeliveryMan.numeroVoie,
            DeliveryMan.nomVoie,
            DeliveryMan.codePostale,
            DeliveryMan.ville,
            DeliveryMan.idLivreur
          ],
          (err, result) => {
            if (err) { 
              console.log(err);
              callback(err);
            }
          
          }
        )
        callback(null, DeliveryMan.idLivreur);
      }
    );
  }
  
};

const deleteDeliveryMan = (DeliveryManId, callback) => {
  const queryString = `DELETE FROM livreur WHERE idLivreur = ?`;
  db.query(queryString, [DeliveryManId], (err, result) => {
    if (err) {
      callback(err);
    }
    callback(null);
  });
};

module.exports = { createDeliveryMan, getDeliveryManById, DeliveryManInDatabase, getAll, updateDeliveryMan, deleteDeliveryMan }
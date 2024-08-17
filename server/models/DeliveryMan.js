const db = require("../db");

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
      callback(null, result);
    } 
  );
};

const getDeliveryManById = (DeliveryManId, callback) => {
  const queryString = `SELECT * FROM livreur WHERE idLivreur = ?`;

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
      email : row.email
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
        DeliveryMan.idLivreur
      ],
      (err, result) => {
        if (err) {
          callback(err);
          console.log(err)
        }
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
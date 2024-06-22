const db = require("../db");

/*
`idCommande` INT(10) NOT NULL AUTO_INCREMENT,
`dateCommande` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
`statusCommande` ENUM('En attente','Validé','En Decoupage','Decoupé','En Cours de Livraison','Livré','Non livré') NOT NULL COLLATE 'latin1_swedish_ci',
`devis` TINYINT(1) NOT NULL,
`type` ENUM('Commande','Liste d''envie') NOT NULL COLLATE 'latin1_swedish_ci',
`dateLivraison` DATETIME NULL DEFAULT NULL,
`referenceLivraison` VARCHAR(50) NOT NULL COLLATE 'latin1_swedish_ci',
`ModeReception` ENUM('A LIVRER','A RETIRER') NOT NULL COLLATE 'latin1_swedish_ci',
`reference` VARCHAR(11) NOT NULL COLLATE 'latin1_swedish_ci',
`idClient` INT(10) NOT NULL,
`idLivreur` INT(10) NULL DEFAULT NULL,
`idAdresse` INT(10) NULL DEFAULT NULL,
*/

const createOrder = (Order, callback) => {
  const queryString = `INSERT INTO commande(idCommande, statusCommande, devis, type, dateLivraison, referenceLivraison, ModeReception, reference, idClient, idLivreur, idAdresse) 
    VALUES (NULL, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
  db.query(
    queryString,
    [
      Order.statusCommande,
      Order.devis,
      Order.type,
      Order.dateLivraison,
      Order.referenceLivraison, 
      Order.ModeReception, 
      Order.reference,
      Order.idClient,
      Order.idLivreur,
      Order.idAdresse
    ], 
    (err, result) => {
      if (err) { 
        console.log(err);
        callback(err);
      }
      const insertId = (result).insertId;
      callback(null, insertId);
    }
  );
};

const getOrderById = (OrderId, callback) => {
  const queryString = `SELECT * FROM commande WHERE idCommande = ?`;

  db.query(queryString, OrderId, (err, result) => {
    if (err) {
      console.log(err);
      callback(err);
    }

    const row = (result)[0];
    const Order = {
      idCommande : row.idCommande,
      dateCommande : row.dateCommande,
      statusCommande : row.statusCommande,
      devis : row.devis,
      type : row.type,
      dateLivraison : row.dateLivraison,
      referenceLivraison : row.referenceLivraison,
      reference : row.reference,
      idClient : row.idClient,
      idLivreur : row.idLivreur,
      idClient : row.idClient,
      idLivreur : row.idLivreur
    };
    callback(null, Order);
  });
};

const orderInDatabase = (Order, callback) => {
  const queryString = `SELECT * FROM commande WHERE idCommande = ?`;
  let isOrder = false;
  db.query(queryString, [Order.idEntrepot], (err, result) => {
    if (err) {
      console.log(err);
      callback(err);
    }
    const rows = result;
    return callback(rows.length > 0);
  });
};

const getAll = (callback) => {
  const queryString = `SELECT A.idCommande, A.dateCommande, A.statusCommande, A.devis, A.type, B.nomClient, B.prenomClient FROM commande A, client B WHERE A.idClient = B.idClient`;

  db.query(queryString, (err, result) => {
    if (err) {
      callback(err);
    }

    const rows = result;
    const Orders = [];

    rows.forEach((row) => {
      const Order = {
        idCommande : row.idCommande,
        dateCommande : row.dateCommande,
        statusCommande : row.statusCommande,
        devis : row.devis,
        type : row.type,
        nomClient : row.nomClient,
        prenomClient : row.prenomClient
      };
      Orders.push(Order);
    });
    callback(null, Orders);
  });
};

/*
`idCommande` INT(10) NOT NULL AUTO_INCREMENT,
`dateCommande` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
`statusCommande` ENUM('En attente','Validé','En Decoupage','Decoupé','En Cours de Livraison','Livré','Non livré') NOT NULL COLLATE 'latin1_swedish_ci',
`devis` TINYINT(1) NOT NULL,
`type` ENUM('Commande','Liste d''envie') NOT NULL COLLATE 'latin1_swedish_ci',
`dateLivraison` DATETIME NULL DEFAULT NULL,
`referenceLivraison` VARCHAR(50) NOT NULL COLLATE 'latin1_swedish_ci',
`ModeReception` ENUM('A LIVRER','A RETIRER') NOT NULL COLLATE 'latin1_swedish_ci',
`reference` VARCHAR(11) NOT NULL COLLATE 'latin1_swedish_ci',
`idClient` INT(10) NOT NULL,
`idLivreur` INT(10) NULL DEFAULT NULL,
`idAdresse` INT(10) NULL DEFAULT NULL,
*/

const updateOrder = (Order, callback) => {
  const queryString = `UPDATE commande SET 
                        dateCommande = ?,                                     
                        statusCommande = ?,                                  
                        devis = ?                               
                        type = ?, 
                        dateLivraison = ? 
                        referenceLivraison = ?, 
                        ModeReception = ? 
                        reference = ? 
                        idClient = ?, 
                        idAdresse = ?
                        WHERE idCommande = ?`;

  db.query(
    queryString,
    [
      Order.dateCommande,
      Order.statusCommande,
      Order.devis,
      Order.type,
      Order.dateLivraison,
      Order.referenceLivraison,
      Order.reference,
      Order.idClient,
      Order.idLivreur,
      Order.idClient,
      Order.idLivreur,
      Order.idCommande
    ],
    (err, result) => {
      if (err) {
        callback(err);
      }
      console.log(result)
      callback(null, Order.idCommande);
    }
  );
};

const deleteOrder = (OrderId, callback) => {
  const queryString = `DELETE FROM commande WHERE idCommande = ?`;
  db.query(queryString, [OrderId], (err, result) => {
    if (err) {
      callback(err);
    }
    callback(null);
  });
};

module.exports = { createOrder, getOrderById, orderInDatabase, getAll, updateOrder, deleteOrder }
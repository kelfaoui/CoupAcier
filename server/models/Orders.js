const db = require("../db");

const createOrder = (Order, callback) => {
  const queryString = `INSERT INTO commande(idCommande, dateCommande, reference, adresseLivraison) 
    VALUES (NULL, ?, ?, ?)`;
  
  db.query(
    queryString,
    [
      Order.dateCommande,
      Order.reference,
      Order.adresseLivraison
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
  const queryString = `SELECT * FROM order WHERE idCommande = ?`;

  db.query(queryString, OrderId, (err, result) => {
    if (err) {
      console.log(err);
      callback(err);
    }

    const row = (result)[0];
    const Order = {
        idCommande : row.idCommande,
        dateCommande : row.dateCommande,
        reference : row.reference,
        adresseLivraison : row.adresseLivraison
    };
    callback(null, Order);
  });
};

const orderInDatabase = (Order, callback) => {
  const queryString = `SELECT * FROM entrepot WHERE idCommande = ?`;
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
  const queryString = `SELECT * FROM commande`;

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
        reference : row.reference,
        adresseLivraison : row.adresseLivraison
      };
      Orders.push(Order);
    });
    callback(null, Orders);
  });
};

const updateOrder = (Order, callback) => {
  const queryString = `UPDATE commande SET dateCommande=?, reference=?, adresseLivraison=? WHERE idCommande=?`;

  db.query(
    queryString,
    [
        Order.dateCommande,
        Order.reference,
        Order.adresseLivraison,
        Order.idCommande
    ],
    (err, result) => {
      if (err) {
        callback(err);
      }
      console.log(result)
      callback(null, Order.idOrder);
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
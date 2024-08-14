const db = require("../db");



const createProductOrder = (ProductOrder, callback) => {
  const queryString =
    `INSERT INTO lignecommande(idDecoupage, dimensionCoupe, quantite, ristourne, prixMetre, idProduit, idCommande)
    VALUES (NULL, ?, ?, ?, ?, ?, ?)`;

  db.query(
    queryString,
    [
      ProductOrder.dimensionCoupe,
      ProductOrder.quantite,
      ProductOrder.ristourne,
      ProductOrder.prixMetre,
      ProductOrder.idProduit,
      ProductOrder.idCommande
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


const getProductOrderById = (ProductOrderId, callback) => {
  const queryString = `SELECT * FROM lignecommande WHERE idDecoupage = ?`;

  db.query(queryString, ProductOrderId, (err, result) => {
    if (err) {
      console.log(err);
      callback(err);
    }

    const row = (result)[0];
    const terminal = {
        idDecoupage : row.idDecoupage,
        dimensionCoupe : row.dimensionCoupe,
        quantite : row.quantite,
        prixMetre : row.prixMetre,
        idProduit : row.idProduit,
        idCommande : row.idCommande
    };
    callback(null, terminal);
  });
};

const getOrderItemsByOrderId = (OrderId, callback) => {
  const queryString = `SELECT A.*, B.* FROM lignecommande A, produit B WHERE A.idProduit = B.idProduit AND idCommande = ?`;

  db.query(queryString, OrderId, (err, result) => {
    if (err) {
      console.log(err);
      callback(err);
    }

    const rows = result;
    const ProductOrders = [];

    rows.forEach((row) => {
      const ProductOrder = {
        idDecoupage : row.idDecoupage,
        dimensionCoupe : row.dimensionCoupe,
        quantite : row.quantite,
        prixMetre : row.prixMetre,
        idProduit : row.idProduit,
        idCommande : row.idCommande,
        nomProduit: row.nomProduit
      };
      ProductOrders.push(ProductOrder);
    });
    callback(null, ProductOrders);
  });
};

const getAll = (callback) => {
  const queryString = `SELECT * FROM lignecommande`;

  db.query(queryString, (err, result) => {
    if (err) {
      callback(err);
    }

    const rows = result;
    const ProductOrders = [];

    rows.forEach((row) => {
      const ProductOrder = {
        idDecoupage : row.idDecoupage,
        dimensionCoupe : row.dimensionCoupe,
        quantite : row.quantite,
        prixMetre : row.prixMetre,
        idProduit : row.idProduit,
        idCommande : row.idCommande
      };
      ProductOrders.push(ProductOrder);
    });
    callback(null, ProductOrders);
  });
};


const updateProductOrder = (ProductOrder, callback) => {
  const queryString = `UPDATE lignecommande SET dimensionCoupe=?, quantite=?, ristourne=?, prixMetre=?, idProduit=?, idCommande=?,  
                       WHERE idDecoupage=?`;

  db.query(
    queryString,
    [
      ProductOrder.dimensionCoupe,
      ProductOrder.quantite,
      ProductOrder.ristourne,
      ProductOrder.prixMetre,
      ProductOrder.idProduit,
      ProductOrder.idCommande,
      ProductOrder.idDecoupage
    ],
    (err, result) => {
      if (err) {
        callback(err);
      }
      console.log(result)
      callback(null, ProductOrder.idProduit);
    }
  );
};

const deleteProductOrder = (ProductOrderId, callback) => {
  const queryString = `DELETE FROM lignecommande WHERE idDecoupage = ?`;
  db.query(queryString, [ProductOrderId], (err, result) => {
    if (err) {
      callback(err);
    }
    callback(null);
  });
};

module.exports = { createProductOrder, getProductOrderById, getAll, updateProductOrder, deleteProductOrder, getOrderItemsByOrderId }
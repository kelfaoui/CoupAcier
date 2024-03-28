const db = require("../db");


/*

	`idProduit` INT(10) NOT NULL AUTO_INCREMENT,
	`nomProduit` VARCHAR(100) NOT NULL COLLATE 'utf8mb4_general_ci',
	`prixMetre` FLOAT NULL DEFAULT NULL,
	`description` TEXT NULL DEFAULT NULL COLLATE 'utf8mb4_general_ci',
	`imagePrincipale` TEXT NULL DEFAULT NULL COLLATE 'utf8mb4_general_ci',
	`image1` TEXT NULL DEFAULT NULL COLLATE 'utf8mb4_general_ci',
	`image2` TEXT NULL DEFAULT NULL COLLATE 'utf8mb4_general_ci',
	`hauteur` FLOAT NULL DEFAULT NULL,
	`epaisseur` FLOAT NULL DEFAULT NULL,

*/

const createProduct = (Product, callback) => {
  const queryString =
    `INSERT INTO produit(idProduit, nomProduit, prixMetre, description, imagePrincipale, image1, image2, hauteur, epaisseur)
    VALUES (NULL, ?, ?, ?, ?, ?, ?, ?, ?)`;

  db.query(
    queryString,
    [
      Product.nomProduit,
      Product.prixMetre,
      Product.description,
      Product.imagePrincipale,
      Product.image1,
      Product.image2,
      Product.hauteur,
      Product.epaisseur
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



const getProductById = (ProductId, callback) => {
  const queryString = `SELECT * FROM produit WHERE idProduit = ?`;

  db.query(queryString, ProductId, (err, result) => {
    if (err) {
      console.log(err);
      callback(err);
    }

    const row = (result)[0];
    const terminal = {
        idProduit : row.idProduit,
        nomProduit : row.nomProduit,
        prixMetre : row.prixMetre,
        description : row.description,
        imagePrincipale : row.imagePrincipale,
        image1 : row.image1,
        image2 : row.image2,
        hauteur : row.hauteur,
        epaisseur : row.epaisseur
    };
    callback(null, terminal);
  });
};

const productInDatabase = (Product, callback) => {
  const queryString = `SELECT * FROM produit WHERE nomProduit = ?`;
  let isProduct = false;
  db.query(queryString, [Product.nomProduit, Product.password], (err, result) => {
    if (err) {
      console.log(err);
      callback(err);
    }
    const rows = result;
    return callback(rows.length > 0);
  });
};


const getAll = (callback) => {
  const queryString = `SELECT * FROM produit`;

  db.query(queryString, (err, result) => {
    if (err) {
      callback(err);
    }

    const rows = result;
    const Products = [];

    rows.forEach((row) => {
      const Product = {
        idProduit : row.idProduit,
        nomProduit : row.nomProduit,
        prixMetre : row.prixMetre,
        description : row.description,
        imagePrincipale : row.imagePrincipale,
        image1 : row.image1,
        image2 : row.image2,
        hauteur : row.hauteur,
        epaisseur : row.epaisseur
      };
      Products.push(Product);
    });
    callback(null, Products);
  });
};


const updateProduct = (Product, callback) => {
  const queryString = `UPDATE produit SET nomProduit=?, prixMetre=?, description=?, imagePrincipale=?, image1=?, image2=?,  
                       hauteur=?, epaisseur=? WHERE idProduit=?`;

  db.query(
    queryString,
    [
        Product.nomProduit,
        Product.prixMetre,
        Product.description,
        Product.imagePrincipale,
        Product.image1,
        Product.image2,
        Product.hauteur,
        Product.epaisseur,
        Product.idProduit
    ],
    (err, result) => {
      if (err) {
        callback(err);
      }
      console.log(result)
      callback(null, Product.idProduct);
    }
  );
};

const deleteProduct = (ProductId, callback) => {
  const queryString = `DELETE FROM produit WHERE idProduit = ?`;
  db.query(queryString, [ProductId], (err, result) => {
    if (err) {
      callback(err);
    }
    callback(null);
  });
};

module.exports = { createProduct, getProductById, productInDatabase, getAll, updateProduct, deleteProduct }
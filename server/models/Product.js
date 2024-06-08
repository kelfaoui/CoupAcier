const db = require("../db");


/*

	`idProduit` INT(10) NOT NULL AUTO_INCREMENT,
	`nomProduit` VARCHAR(100) NOT NULL COLLATE 'latin1_swedish_ci',
	`prixMetre` FLOAT NOT NULL,
	`description` TEXT NOT NULL COLLATE 'latin1_swedish_ci',
	`imagePrincipale` TEXT NOT NULL COLLATE 'latin1_swedish_ci',
	`image1` TEXT NULL DEFAULT NULL COLLATE 'latin1_swedish_ci',
	`image2` TEXT NULL DEFAULT NULL COLLATE 'latin1_swedish_ci',
	`hauteur` FLOAT NOT NULL,
	`epaisseur` FLOAT NOT NULL,
	`marge` FLOAT NOT NULL,
	`masseLineaire` FLOAT NOT NULL,
	`tva` FLOAT NOT NULL,
	`referenceProduit` VARCHAR(50) NOT NULL COLLATE 'latin1_swedish_ci',
	`idCategorie` INT(10) NOT NULL,

*/

const createProduct = (Product, callback) => {
  const queryString =
    `INSERT INTO produit(idProduit, nomProduit, prixMetre, description, imagePrincipale, image1, image2, hauteur, epaisseur, marge, masseLineaire, tva, referenceProduit, idCategorie)
    VALUES (NULL, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

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
      Product.marge,
      Product.masseLineaire,
      Product.tva,
      Product.referenceProduit,
      Product.idCategorie
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
        epaisseur : row.epaisseur,
        marge : row.marge,
        masseLineaire : row.masseLineaire,
        tva : row.tva,
        referenceProduit : row.referenceProduit,
        idCategorie: row.idCategorie
    };
    callback(null, terminal);
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
        epaisseur : row.epaisseur,
        marge : row.marge,
        masseLineaire : row.masseLineaire,
        tva : row.tva,
        referenceProduit : row.referenceProduit,
        idCategorie: row.idCategorie
      };
      Products.push(Product);
    });
    callback(null, Products);
  });
};


const updateProduct = (Product, callback) => {
  const queryString = `UPDATE produit SET nomProduit=?, prixMetre=?, description=?, imagePrincipale=?, image1=?, image2=?,  
                       hauteur=?, epaisseur=?, marge=? masseLineaire=?, tva=?, referenceProduit=?, idCategorie=? 
                       WHERE idProduit=?`;

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
      Product.marge,
      Product.masseLineaire,
      Product.tva,
      Product.referenceProduit,
      Product.idCategorie,
      Product.idProduit
    ],
    (err, result) => {
      if (err) {
        callback(err);
      }
      console.log(result)
      callback(null, Product.idProduit);
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

module.exports = { createProduct, getProductById, getAll, updateProduct, deleteProduct }
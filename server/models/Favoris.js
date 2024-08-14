const db = require("../db");

const createFavoris = (Favoris, callback) => {
  const queryString =
    `INSERT INTO favoris(idProduit, idClient) 
    VALUES (?, ?)`;
  
  db.query(
    queryString,
    [
      Favoris.idProduit,
      Favoris.idClient,
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

const getFavorisById = (idClient, callback) => {
  const queryString = `SELECT A.idProduit, A.nomProduit, A.imagePrincipale, B.idClient, B.nomClient FROM produit A, client B, favoris C WHERE A.idProduit = C.idProduit AND B.idClient = C.idClient and C.idClient = ?`;

  db.query(queryString, idClient, (err, result) => {
    if (err) {
      console.log(err);
      callback(err);
    }

    const rows = result;
    const favoris = [];

    rows.forEach((row) => {
      const favori = {
        idProduit : row.idProduit,
        nomProduit: row.nomProduit,
        imagePrincipale: row.imagePrincipale,
        idClient: row.idClient,
        nomClient: row.nomClient
      };
      console.log(favori)
      favoris.push(favori);
    });
    callback(null, favoris);
  });
};

const FavorisInDatabase = (Favoris, callback) => {
  const queryString = `SELECT * FROM categorie WHERE idCategorie = ?`;
  let isFavoris = false;
  db.query(queryString, [Favoris.idCategorie], (err, result) => {
    if (err) {
      console.log(err);
      callback(err);
    }
    const rows = result;
    return callback(rows.length > 0);
  });
};


const getAll = (callback) => {
  const queryString = `SELECT A.idProduit, A.nomProduit, A.imagePrincipale, B.idClient, B.nomClient FROM produit A, client B, favoris C WHERE A.idProduit = C.idProduit AND B.idClient = C.idClient`;

  db.query(queryString, (err, result) => {
    if (err) {
      callback(err);
    }

    const rows = result;
    const favoris = [];

    rows.forEach((row) => {
      const favori = {
        idProduit : row.idProduit,
        nomProduit: row.nomProduit,
        imagePrincipale: row.imagePrincipale,
        idClient: row.idClient,
        nomClient: row.nomClient
      };
      favoris.push(favori);
    });
    callback(null, favoris);
  });
};


const updateFavoris = (Favoris, callback) => {
  const queryString = `UPDATE categorie SET nomCategorie = ? WHERE idCategorie = ?`;

  db.query(
    queryString,
    [
      Favoris.nomCategorie,
      Favoris.idCategorie
    ],
    (err, result) => {
      if (err) {
        callback(err);
      }
      console.log(result)
      callback(null, Favoris.idCategorie);
    }
  );
};

const deleteFavoris = (idProduit, idClient, callback) => {
  const queryString = `DELETE FROM favoris WHERE idProduit = ? and idClient = ?`;
  db.query(queryString, [idProduit, idClient], (err, result) => {
    if (err) {
      callback(err);
    }
    callback(null);
  });
};

module.exports = { createFavoris, getFavorisById, getAll, updateFavoris, deleteFavoris }
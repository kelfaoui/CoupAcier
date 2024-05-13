const db = require("../db");

const createWarhouse = (Warhouse, callback) => {
  const queryString =
    `INSERT INTO entrepot(idEntrepot, villeEntrepot, codePostalEntrepot, voieEntrepot, numeroRueEntrepot) 
    VALUES (NULL, ?, ?, ?, ?)`;
  
  db.query(
    queryString,
    [
      Warhouse.villeEntrepot,
      Warhouse.codePostalEntrepot,
      Warhouse.voieEntrepot,
      Warhouse.numeroRueEntrepot
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

const getWarhouseById = (WarhouseId, callback) => {
  const queryString = `SELECT * FROM entrepot WHERE idEntrepot = ?`;

  db.query(queryString, WarhouseId, (err, result) => {
    if (err) {
      console.log(err);
      callback(err);
    }

    const row = (result)[0];
    const warhouse = {
      idEntrepot : row.idEntrepot,
      villeEntrepot : row.villeEntrepot,
      codePostalEntrepot : row.codePostalEntrepot,
      voieEntrepot : row.voieEntrepot,
      numeroRueEntrepot : row.numeroRueEntrepot
    };
    callback(null, warhouse);
  });
};

const warhouseInDatabase = (Warhouse, callback) => {
  const queryString = `SELECT * FROM entrepot WHERE idEntrepot = ?`;
  let isWarhouse = false;
  db.query(queryString, [Warhouse.idEntrepot], (err, result) => {
    if (err) {
      console.log(err);
      callback(err);
    }
    const rows = result;
    return callback(rows.length > 0);
  });
};


const getAll = (callback) => {
  const queryString = `SELECT * FROM entrepot`;

  db.query(queryString, (err, result) => {
    if (err) {
      callback(err);
    }

    const rows = result;
    const Warhouses = [];

    rows.forEach((row) => {
      const Warhouse = {
        idEntrepot : row.idEntrepot,
        villeEntrepot : row.villeEntrepot,
        codePostaleEntrepot : row.codePostaleEntrepot,
        voieEntrepot : row.voieEntrepot,
        NumeroRueEntrepot : row.NumeroRueEntrepot
      };
      Warhouses.push(Warhouse);
    });
    callback(null, Warhouses);
  });
};


const updateWarhouse = (Warhouse, callback) => {
  const queryString = `UPDATE entrepot SET villeEntrepot=?, codePostalEntrepot=?, voieEntrepot=?, numeroRueEntrepot=? WHERE idEntrepot=?`;

  db.query(
    queryString,
    [
      Warhouse.villeEntrepot,
      Warhouse.codePostalEntrepot,
      Warhouse.voieEntrepot,
      Warhouse.numeroRueEntrepot,
      Warhouse.idEntrepot,
    ],
    (err, result) => {
      if (err) {
        callback(err);
      }
      console.log(result)
      callback(null, Warhouse.idWarhouse);
    }
  );
};

const deleteWarhouse = (WarhouseId, callback) => {
  const queryString = `DELETE FROM entrepot WHERE idEntrepot = ?`;
  db.query(queryString, [WarhouseId], (err, result) => {
    if (err) {
      callback(err);
    }
    callback(null);
  });
};

module.exports = { createWarhouse, getWarhouseById, warhouseInDatabase, getAll, updateWarhouse, deleteWarhouse }
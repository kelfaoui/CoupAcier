const db = require("../db");

const createCut = (Cut, callback) => {
  const queryString = `INSERT INTO decoupagecommande(idDecoupage, dimensionCoupe, quanitite, ristourne, idProduit, idCommande) 
    VALUES(NULL, ?, ?, ?, ?, ?)`;
  
  db.query(
    queryString,
    [
      Cut.dimensionCoupe,
      Cut.quanitite,
      Cut.ristourne,
      Cut.idProduit,
      Cut.idCommande
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

const getCutById = (CutId, callback) => {
  const queryString = `SELECT * FROM decoupagecommande WHERE idDecoupage = ?`;

  db.query(queryString, CutId, (err, result) => {
    if (err) {
      console.log(err);
      callback(err);
    }

    const row = (result)[0];
    const Cut = {
        idDecoupage : row.idDecoupage,
        dimensionCoupe : row.dimensionCoupe,
        quantite : row.quanitite,
        ristourne : row.ristourne,
        idProduit : row.idProduit,
        idCommande : row.idCommande
    };
    callback(null, Cut);
  });
};

const CutInDatabase = (Cut, callback) => {
  const queryString = `SELECT * FROM decoupagecommande WHERE idDecoupage = ?`;
  let isCut = false;
  db.query(queryString, [Cut.idDecoupage], (err, result) => {
    if (err) {
      console.log(err);
      callback(err);
    }
    const rows = result;
    return callback(rows.length > 0);
  });
};

const getAll = (callback) => {
  const queryString = `SELECT * FROM decoupagecommande`;

  db.query(queryString, (err, result) => {
    if (err) {
      callback(err);
    }

    const rows = result;
    const Cuts = [];

    rows.forEach((row) => {
      const Cut = {
        idDecoupage : row.idDecoupage,
        dimensionCoupe : row.dimensionCoupe,
        quantite : row.quanitite,
        idProduit : row.idProduit,
        idCommande : row.idCommande
      };
      Cuts.push(Cut);
    });
    callback(null, Cuts);
  });
};

const updateCut = (Cut, callback) => {
  const queryString = `UPDATE decoupagecommande SET dimensionCoupe=?, quantite=?, idProduit=?, idCommande=? WHERE idDecoupage=?`;

  db.query(
    queryString,
    [
        Cut.dimensionCoupe,
        Cut.quanitite,
        Cut.idProduit,
        Cut.idCommande,
        Cut.idDecoupage
    ],
    (err, result) => {
      if (err) {
        callback(err);
      }
      console.log(result)
      callback(null, Cut.idCut);
    }
  );
};

const deleteCut = (CutId, callback) => {
  const queryString = `DELETE FROM decoupagecommande WHERE idDecoupage = ?`;
  db.query(queryString, [CutId], (err, result) => {
    if (err) {
      callback(err);
    }
    callback(null);
  });
};

module.exports = { createCut, getCutById, CutInDatabase, getAll, updateCut, deleteCut }
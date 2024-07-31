const db = require("../db");

const createProvider = (Provider, callback) => {
  const queryString =
    "INSERT INTO fournisseur(idFournisseur, nomFournisseur, email, telephone) VALUES (NULL, ?, ?, ?)";

  db.query(
    queryString,
    [
      Provider.nomFournisseur,
      Provider.email,
      Provider.telephone
    ],
    (err, result) => {
      if (err) { 
        console.log(err);
        callback(err);
      }
      const queryString =
      `INSERT INTO adresse(idAdresse, numeroVoie, nomVoie, codePostale, ville, idFournisseur) 
      VALUES (NULL, ?, ?, ?, ?, ?)`;

      db.query(
        queryString,
        [
          Provider.numeroVoie,
          Provider.nomVoie,
          Provider.codePostale,
          Provider.ville,
          (result).insertId,
        ],
        (err, result) => {
          if (err) { 
            console.log(err);
            callback(err);
          }
         
        }
      )
      callback(null, (result).insertId);
    }
  );
};

const getProviderById = (ProviderId, callback) => {
  const queryString = `SELECT A.*, B.* FROM fournisseur A, adresse B WHERE A.idFournisseur = B.idFournisseur AND A.idFournisseur = ?`;

  db.query(queryString, ProviderId, (err, result) => {
    if (err) {
      console.log(err);
      callback(err);
    }

    const row = (result)[0];
    const provider = {
        idFournisseur : row.idFournisseur,
        nomFournisseur : row.nomFournisseur,
        email : row.email,
        telephone : row.telephone,
        numeroVoie: row.numeroVoie,
        nomVoie: row.nomVoie,
        codePostale: row.codePostale,
        ville: row.ville
    };
    callback(null, provider);
  });
};

const providerInDatabase = (Provider, callback) => {
  const queryString = `SELECT * FROM fournisseur WHERE email = ?`;
  let isProvider = false;
  db.query(queryString, [Provider.email], (err, result) => {
    if (err) {
      console.log(err);
      callback(err);
    }
    const rows = result;
    return callback(rows.length > 0);
  });
};

const getAll = (callback) => {
  const queryString = `SELECT * FROM fournisseur`;

  db.query(queryString, (err, result) => {
    if (err) {
      callback(err);
    }

    const rows = result;
    const Providers = [];

    rows.forEach((row) => {
      const Provider = {
        idFournisseur : row.idFournisseur,
        nomFournisseur : row.nomFournisseur,
        numeroVoie : row.numeroVoie,
        nomVoie : row.nomVoie,
        codePostal : row.codePostal,
        ville : row.ville,
        email : row.email,
        telephone : row.telephone
      };
      Providers.push(Provider);
    });
    callback(null, Providers);
  });
};

const updateProvider = (Provider, callback) => {
  const queryString = `UPDATE fournisseur SET nomFournisseur=?, email=?, telephone=? WHERE idFournisseur=?`;

  db.query(
    queryString,
    [
        Provider.nomFournisseur,
        Provider.email,
        Provider.telephone,
        Provider.idFournisseur,
    ],
    (err, result) => {
      if (err) {
        callback(err);
        console.log(err)
      }
      const queryString =
      `UPDATE adresse SET numeroVoie = ?, nomVoie = ?, codePostale = ?, ville = ? WHERE idFournisseur = ?`;

      db.query(
        queryString,
        [
          Provider.numeroVoie,
          Provider.nomVoie,
          Provider.codePostale,
          Provider.ville,
          Provider.idFournisseur
        ],
        (err, result) => {
          if (err) { 
            console.log(err);
            callback(err);
          }
         
        }
      )
      callback(null, Provider.idProvider);
    }
  );
};

const deleteProvider = (ProviderId, callback) => {
  const queryString = `DELETE FROM Fournisseur WHERE idFournisseur = ?`;
  db.query(queryString, [ProviderId], (err, result) => {
    if (err) {
      callback(err);
    }
    callback(null);
  });
};

module.exports = { createProvider, getProviderById, providerInDatabase, getAll, updateProvider, deleteProvider }
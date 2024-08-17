const db = require("../db");

/**
	`idLivraison` INT(10) NOT NULL AUTO_INCREMENT,
	`nomSocieteLivraison` VARCHAR(200) NOT NULL COLLATE 'latin1_swedish_ci',
	`siretLivraison` VARCHAR(14) NULL DEFAULT NULL COLLATE 'latin1_swedish_ci',
	`telephone` VARCHAR(13) NOT NULL COLLATE 'latin1_swedish_ci',
	`email` VARCHAR(200) NOT NULL COLLATE 'latin1_swedish_ci',

 */

const createDeliveryCompany = (DeliveryCompany, callback) => {
  const queryString =
    `INSERT INTO societelivraison(idLivraison, nomSocieteLivraison, siretLivraison, telephone, email) 
    VALUES (NULL, ?, ?, ?, ?)`;
  console.log(DeliveryCompany);
  db.query(
    queryString,
    [
      DeliveryCompany.nomSocieteLivraison,
      DeliveryCompany.siretLivraison,
      DeliveryCompany.telephone,
      DeliveryCompany.email
    ],
    (err, result) => {
      if (err) { 
        console.log(err);
        callback(err);
      }
      const queryString =
      `INSERT INTO adresse(idAdresse, numeroVoie, nomVoie, codePostale, ville, idLivraison) 
      VALUES (NULL, ?, ?, ?, ?, ?)`;

      db.query(
        queryString,
        [
          DeliveryCompany.numeroVoie,
          DeliveryCompany.nomVoie,
          DeliveryCompany.codePostale,
          DeliveryCompany.ville,
          (result).insertId,
        ],
        (err, result) => {
          if (err) { 
            console.log(err);
            callback(err);
          }
        }
      )
      callback(null, result);
    }
  );
};

const getDeliveryCompanyById = (DeliveryCompanyId, callback) => {
  const queryString = `SELECT A.*, B.* from societelivraison A, adresse B WHERE A.idLivraison = B.idLivraison AND A.idLivraison = ?`;

  db.query(queryString, DeliveryCompanyId, (err, result) => {
    if (err) {
      console.log(err);
      callback(err);
    }

    const row = (result)[0];
    
    const client = {
      nomSocieteLivraison : row.nomSocieteLivraison,
      siretLivraison : row.siretLivraison,
      telephone : row.telephone,
      email : row.email,
      numeroVoie: row.numeroVoie,
      nomVoie: row.nomVoie,
      codePostale: row.codePostale,
      ville: row.ville,
      idLivraison : row.idLivraison
    };
    callback(null, client);
  });
};

const DeliveryCompanyInDatabase = (DeliveryCompany, callback) => {
  const queryString = `SELECT * FROM DeliveryCompany WHERE email = ? AND password = ?`;
  let isDeliveryCompany = false;
  db.query(queryString, [DeliveryCompany.email, DeliveryCompany.password], (err, result) => {
    if (err) {
      console.log(err);
      callback(err);
    }
    const rows = result;
    return callback(rows.length > 0);
  });
};

const getAll = (callback) => {
  const queryString = `SELECT * FROM societelivraison`;

  db.query(queryString, (err, result) => {
    if (err) {
      callback(err);
    }

    const rows = result;
    const DeliveryCompanys = [];

    //  nomSocieteLivraison, siretLivraison, telephone, telephone
    rows.forEach((row) => {
      const DeliveryCompany = {
        idLivraison : row.idLivraison,
        nomSocieteLivraison : row.nomSocieteLivraison,
        siretLivraison : row.siretLivraison,
        telephone : row.telephone,
        email : row.email,
      };
      DeliveryCompanys.push(DeliveryCompany);
    });
    callback(null, DeliveryCompanys);
  });
};

const updateDeliveryCompany = (DeliveryCompany, callback) => {
  let queryString = ''
  if (!DeliveryCompany.motDePasse) {
    queryString = `UPDATE societelivraison SET nomSocieteLivraison=?, siretLivraison=?, telephone=?, email=? WHERE idLivraison=?`;
    db.query(
      queryString,
      [
        DeliveryCompany.nomSocieteLivraison,
        DeliveryCompany.siretLivraison,
        DeliveryCompany.telephone,
        DeliveryCompany.email,
        DeliveryCompany.idLivraison
      ],
      (err, result) => {
        if (err) {
          callback(err);
          console.log(err)
        }
        const queryString =
        `UPDATE adresse SET numeroVoie = ?, nomVoie = ?, codePostale = ?, ville = ? WHERE idLivraison = ?`;
  
        db.query(
          queryString,
          [
            DeliveryCompany.numeroVoie,
            DeliveryCompany.nomVoie,
            DeliveryCompany.codePostale,
            DeliveryCompany.ville,
            DeliveryCompany.idLivraison
          ],
          (err, result) => {
            if (err) { 
              console.log(err);
              callback(err);
            }
          }
        )
        callback(null, DeliveryCompany.idLivraison);
      }
    );
  }
  else {
    queryString = `UPDATE societelivraison SET prenomDeliveryCompany=?, nomDeliveryCompany=?, motDePasse=?, codeGenere=?, siret=?, telephone=?, statutCompte=?, email=? WHERE idDeliveryCompany=?`;
    db.query(
      queryString,
      [
        DeliveryCompany.prenomDeliveryCompany,
        DeliveryCompany.nomDeliveryCompany,
        DeliveryCompany.motDePasse,
        DeliveryCompany.codeGenere,
        DeliveryCompany.siret,
        DeliveryCompany.telephone,
        DeliveryCompany.statutCompte,
        DeliveryCompany.email,
        DeliveryCompany.idDeliveryCompany
      ],
      (err, result) => {
        if (err) {
          callback(err);
        }
        const queryString =
      `UPDATE adresse SET numeroVoie = ?, nomVoie = ?, codePostale = ?, ville = ? WHERE idDeliveryCompany = ?`;

        db.query(
          queryString,
          [
            DeliveryCompany.numeroVoie,
            DeliveryCompany.nomVoie,
            DeliveryCompany.codePostale,
            DeliveryCompany.ville,
            DeliveryCompany.idDeliveryCompany
          ],
          (err, result) => {
            if (err) { 
              console.log(err);
              callback(err);
            }
          
          }
        )
        callback(null, DeliveryCompany.idDeliveryCompany);
      }
    );
  }
  
};

const deleteDeliveryCompany = (DeliveryCompanyId, callback) => {
  const queryString = `DELETE FROM client WHERE idDeliveryCompany = ?`;
  db.query(queryString, [DeliveryCompanyId], (err, result) => {
    if (err) {
      callback(err);
    }
    callback(null);
  });
};

module.exports = { createDeliveryCompany, getDeliveryCompanyById, DeliveryCompanyInDatabase, getAll, updateDeliveryCompany, deleteDeliveryCompany }
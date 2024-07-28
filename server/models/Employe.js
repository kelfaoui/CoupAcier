const db = require("../db");

const createEmploye = (Employe, callback) => {
  const queryString =
    "INSERT INTO Employe(idEmploye, nomEmploye, prenomEmploye, nomRole, email, motDePasse) VALUES (NULL, ?, ?, ?, ?, ?)";

    console.log(Employe) 
  db.query(
    queryString,
    [
      Employe.nomEmploye,
      Employe.prenomEmploye,
      Employe.nomRole,
      Employe.email,
      Employe.motDePasse
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

const getEmployeById = (EmployeId, callback) => {
  const queryString = `SELECT * FROM Employe WHERE idEmploye = ?`;

  db.query(queryString, EmployeId, (err, result) => {
    if (err) {
      console.log(err);
      callback(err);
    }

    const row = (result)[0];
    const terminal = {
      idEmploye: row.idEmploye,
      nomEmploye: row.nomEmploye,
      prenomEmploye: row.prenomEmploye,
      nomRole: row.nomRole,
      email: row.email,
      motDePasse: row.motDePasse
    };
    callback(null, terminal);
  });
};

const EmployeInDatabase = (Employe, callback) => {
  const queryString = `SELECT * FROM Employe WHERE email = ? AND password = ?`;
  let isEmploye = false;
  db.query(queryString, [Employe.email, Employe.password], (err, result) => {
    if (err) {
      console.log(err);
      callback(err);
    }
    const rows = result;
    return callback(rows.length > 0);
  });
};


const getAll = (callback) => {
  const queryString = `SELECT * FROM Employe`;

  db.query(queryString, (err, result) => {
    if (err) {
      callback(err);
    }

    const rows = result;
    const Employes = [];

    rows.forEach((row) => {
      const Employe = {
        idEmploye: row.idEmploye,
        nomEmploye: row.nomEmploye,
        prenomEmploye: row.prenomEmploye,
        nomRole: row.nomRole,
        email: row.email,
        motDePasse: row.motDePasse
      };
      Employes.push(Employe);
    });
    callback(null, Employes);
  });
};


const updateEmploye = (Employe, callback) => {
  const queryString = `UPDATE Employe SET nomEmploye=?, prenomEmploye=?, email=?, motDePasse=? WHERE idEmploye=?`;

  db.query(
    queryString,
    [
      Employe.nomEmploye,
      Employe.prenomEmploye,
      Employe.email,
      Employe.motDePasse,
      Employe.idEmploye
    ],
    (err, result) => {
      if (err) {
        callback(err);
      }
      console.log(result)
      callback(null, Employe.idEmploye);
    }
  );
};

const deleteEmploye = (EmployeId, callback) => {
  const queryString = `DELETE FROM Employe WHERE idEmploye = ?`;
  db.query(queryString, [EmployeId], (err, result) => {
    if (err) {
      callback(err);
    }
    callback(null);
  });
};

const employeInDatabase = (employe, callback) => {
  const queryString = `SELECT * FROM employe WHERE email = ? AND motDePasse = ?`;
  db.query(queryString, [employe.email, employe.password], (err, result) => {
    if (err) {
      console.log(err);
      callback(err);
    }
    const rows = result;
    
    return callback(rows[0]);
  });
};

module.exports = { createEmploye, getEmployeById, EmployeInDatabase, getAll, updateEmploye, deleteEmploye, employeInDatabase}
const db = require("../db");

const createRole = (Role, callback) => {
  const queryString =
    `INSERT INTO role(idRole, nomRole) 
    VALUES (NULL, ?)`;
  
  db.query(
    queryString,
    [
      Role.nomRole,
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

const getRoleById = (idRole, callback) => {
  const queryString = `SELECT * FROM role WHERE idRole = ?`;

  db.query(queryString, idRole, (err, result) => {
    if (err) {
      console.log(err);
      callback(err);
    }

    const row = (result)[0];
    const Role = {
      idRole : row.idRole,
      nomRole : row.nomRole
    };
    callback(null, Role);
  });
};

const RoleInDatabase = (Role, callback) => {
  const queryString = `SELECT * FROM role WHERE idRole = ?`;
  let isRole = false;
  db.query(queryString, [Role.idRole], (err, result) => {
    if (err) {
      console.log(err);
      callback(err);
    }
    const rows = result;
    return callback(rows.length > 0);
  });
};


const getAll = (callback) => {
  const queryString = `SELECT * FROM role`;

  db.query(queryString, (err, result) => {
    if (err) {
      callback(err);
    }

    const rows = result;
    const roles = [];

    rows.forEach((row) => {
      const Role = {
        idRole : row.idRole,
        nomRole : row.nomRole
      };
      roles.push(Role);
    });
    callback(null, roles);
  });
};


const updateRole = (Role, callback) => {
  const queryString = `UPDATE role SET nomRole = ? WHERE idRole = ?`;

  db.query(
    queryString,
    [
      Role.nomRole
    ],
    (err, result) => {
      if (err) {
        callback(err);
      }
      console.log(result)
      callback(null, Role.idRole);
    }
  );
};

const deleteRole = (RoleId, callback) => {
  const queryString = `DELETE FROM role WHERE idRole = ?`;
  db.query(queryString, [RoleId], (err, result) => {
    if (err) {
      callback(err);
    }
    callback(null);
  });
};

module.exports = { createRole, getRoleById, RoleInDatabase, getAll, updateRole, deleteRole }
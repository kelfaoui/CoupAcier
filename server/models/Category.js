const db = require("../db");

const createCategory = (Category, callback) => {
  const queryString =
    `INSERT INTO categorie(idRole, nomRole) 
    VALUES (NULL, ?)`;
  
  db.query(
    queryString,
    [
      Category.nomRole,
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

const getCategoryById = (idRole, callback) => {
  const queryString = `SELECT * FROM categorie WHERE idRole = ?`;

  db.query(queryString, idRole, (err, result) => {
    if (err) {
      console.log(err);
      callback(err);
    }

    const row = (result)[0];
    const Category = {
      idRole : row.idRole,
      nomRole : row.nomRole
    };
    callback(null, Category);
  });
};

const CategoryInDatabase = (Category, callback) => {
  const queryString = `SELECT * FROM categorie WHERE idRole = ?`;
  let isCategory = false;
  db.query(queryString, [Category.idRole], (err, result) => {
    if (err) {
      console.log(err);
      callback(err);
    }
    const rows = result;
    return callback(rows.length > 0);
  });
};


const getAll = (callback) => {
  const queryString = `SELECT * FROM categorie`;

  db.query(queryString, (err, result) => {
    if (err) {
      callback(err);
    }

    const rows = result;
    const Categories = [];

    rows.forEach((row) => {
      const Category = {
        idRole : row.idRole,
        nomRole : row.nomRole
      };
      Categories.push(Category);
    });
    callback(null, Categories);
  });
};


const updateCategory = (Category, callback) => {
  const queryString = `UPDATE categorie SET nomRole = ? WHERE idRole = ?`;

  db.query(
    queryString,
    [
      Category.nomRole
    ],
    (err, result) => {
      if (err) {
        callback(err);
      }
      console.log(result)
      callback(null, Category.idCategory);
    }
  );
};

const deleteCategory = (CategoryId, callback) => {
  const queryString = `DELETE FROM categorie WHERE idRole = ?`;
  db.query(queryString, [CategoryId], (err, result) => {
    if (err) {
      callback(err);
    }
    callback(null);
  });
};

module.exports = { createCategory, getCategoryById, CategoryInDatabase, getAll, updateCategory, deleteCategory }
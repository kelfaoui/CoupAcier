const db = require("../db");

const createCategory = (Category, callback) => {
  const queryString =
    `INSERT INTO categorie(idCategorie, nomCategorie) 
    VALUES (NULL, ?)`;
  
  db.query(
    queryString,
    [
      Category.nomCategorie,
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

const getCategoryById = (idCategorie, callback) => {
  const queryString = `SELECT * FROM categorie WHERE idCategorie = ?`;

  db.query(queryString, idCategorie, (err, result) => {
    if (err) {
      console.log(err);
      callback(err);
    }

    const row = (result)[0];
    const Category = {
      idCategorie : row.idCategorie,
      nomCategorie : row.nomCategorie
    };
    callback(null, Category);
  });
};

const CategoryInDatabase = (Category, callback) => {
  const queryString = `SELECT * FROM categorie WHERE idCategorie = ?`;
  let isCategory = false;
  db.query(queryString, [Category.idCategorie], (err, result) => {
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
        idCategorie : row.idCategorie,
        nomCategorie : row.nomCategorie
      };
      Categories.push(Category);
    });
    callback(null, Categories);
  });
};


const updateCategory = (Category, callback) => {
  const queryString = `UPDATE categorie SET nomCategorie = ? WHERE idCategorie = ?`;

  db.query(
    queryString,
    [
      Category.nomCategorie
    ],
    (err, result) => {
      if (err) {
        callback(err);
      }
      console.log(result)
      callback(null, Category.idCategorie);
    }
  );
};

const deleteCategory = (CategoryId, callback) => {
  const queryString = `DELETE FROM categorie WHERE idCategorie = ?`;
  db.query(queryString, [CategoryId], (err, result) => {
    if (err) {
      callback(err);
    }
    callback(null);
  });
};

module.exports = { createCategory, getCategoryById, getAll, updateCategory, deleteCategory }
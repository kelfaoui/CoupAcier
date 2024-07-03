const db = require("../db");

const createUser = (user, callback) => {
  const queryString =
    "INSERT INTO user(user_id, first_name, last_name, email, phone_number, password) VALUES (?, ?, ?, ?, ?, ?)";

  db.query(
    queryString,
    [
      user.user_id,
      user.first_name,
      user.last_name,
      user.email,
      user.phone_number,
      user.password,
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

const getUserById = (userId, callback) => {
  const queryString = `SELECT * FROM user WHERE user_id = ?`;

  db.query(queryString, userId, (err, result) => {
    if (err) {
      console.log(err);
      callback(err);
    }

    const row = (result)[0];
    const terminal = {
      user_id: row.user_id,
      first_name: row.first_name,
      last_name: row.last_name,
      email: row.email,
      phone_number: row.phone_number,
      password: row.password,
    };
    callback(null, terminal);
  });
};

const userInDatabase = (user, callback) => {
  const queryString = `SELECT * FROM client WHERE email = ? AND motDePasse = ?`;
  db.query(queryString, [user.email, user.password], (err, result) => {
    if (err) {
      console.log(err);
      callback(err);
    }
    const rows = result;
    return callback(rows.length > 0);
  });
};


const getAll = (callback) => {
  const queryString = `SELECT * FROM user`;

  db.query(queryString, (err, result) => {
    if (err) {
      callback(err);
    }

    const rows = result;
    const users = [];

    rows.forEach((row) => {
      const user = {
        user_id: row.user_id,
        first_name: row.first_name,
        last_name: row.last_name,
        email: row.email,
        phone_number: row.phone_number,
        password: row.password,
      };
      users.push(user);
    });
    callback(null, users);
  });
};


const updateUser = (user, callback) => {
  const queryString = `UPDATE user SET first_name=?, last_name=?, email=?, phone_number=?, password=? WHERE user_id=?`;

  db.query(
    queryString,
    [
      user.first_name,
      user.last_name,
      user.email,
      user.phone_number,
      user.password,
      user.user_id,
    ],
    (err, result) => {
      if (err) {
        callback(err);
      }
      callback(null);
    }
  );
};

const deleteUser = (userId, callback) => {
  const queryString = `DELETE FROM user WHERE user_id = ?`;
  db.query(queryString, [userId], (err, result) => {
    if (err) {
      callback(err);
    }
    callback(null);
  });
};

module.exports = { createUser, getUserById, userInDatabase, getAll, updateUser, deleteUser }
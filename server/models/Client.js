const db = require("../db");

const createClient = (Client, callback) => {
  const queryString =
    "INSERT INTO Client(idClient, prenomClient, nomClient, email, motDePasse, numeroVoie, nomVoie, codePostal, ville, telephone, statusCompte, codeGenere, profilClient, siret) VALUES (NULL, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

  db.query(
    queryString,
    [
      Client.prenomClient,
      Client.nomClient,
      Client.email,
      Client.motDePasse,
      Client.numeroVoie,
      Client.nomVoie,
      Client.codePostal,
      Client.ville,
      Client.telephone,
      Client.statusCompte,
      Client.codeGenere,
      Client.profilClient,
      Client.siret
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

const getClientById = (ClientId, callback) => {
  const queryString = `SELECT * FROM Client WHERE idClient = ?`;

  db.query(queryString, ClientId, (err, result) => {
    if (err) {
      console.log(err);
      callback(err);
    }

    const row = (result)[0];
    const terminal = {
      idClient: row.idClient,
      nomClient: row.nomClient,
      prenomClient: row.prenomClient,
      email: row.email,
      motDePasse: row.motDePasse
    };
    callback(null, terminal);
  });
};

const ClientInDatabase = (Client, callback) => {
  const queryString = `SELECT * FROM Client WHERE email = ? AND password = ?`;
  let isClient = false;
  db.query(queryString, [Client.email, Client.password], (err, result) => {
    if (err) {
      console.log(err);
      callback(err);
    }
    const rows = result;
    return callback(rows.length > 0);
  });
};

const getAll = (callback) => {
  const queryString = `SELECT * FROM Client`;

  db.query(queryString, (err, result) => {
    if (err) {
      callback(err);
    }

    const rows = result;
    const Clients = [];

    rows.forEach((row) => {
      const Client = {
        idClient: row.idClient,
        nomClient: row.nomClient,
        prenomClient: row.prenomClient,
        email: row.email,
        telephone: row.telephone,
        motDePasse: row.motDePasse
      };
      Clients.push(Client);
    });
    callback(null, Clients);
  });
};

const updateClient = (Client, callback) => {
  const queryString = `UPDATE Client SET nomClient=?, prenomClient=?, email=?, motDePasse=?, numeroVoie=?, 
  nomVoie=?, codePostal=?, ville=?, telephone=?, statusCompte=?, codeGenere=?, profilClient=?, siret=? WHERE idClient=?`;

  db.query(
    queryString,
    [
        Client.nomClient,
        Client.prenomClient,
        Client.email,
        Client.motDePasse,
        Client.numeroVoie,
        Client.nomVoie,
        Client.codePostal,
        Client.ville,
        Client.telephone,
        Client.statusCompte,
        Client.codeGenere,
        Client.profilClient,
        Client.siret,
        Client.idClient
    ],
    (err, result) => {
      if (err) {
        callback(err);
      }
      console.log(result)
      callback(null, Client.idClient);
    }
  );
};

const deleteClient = (ClientId, callback) => {
  const queryString = `DELETE FROM client WHERE idClient = ?`;
  db.query(queryString, [ClientId], (err, result) => {
    if (err) {
      callback(err);
    }
    callback(null);
  });
};

module.exports = { createClient, getClientById, ClientInDatabase, getAll, updateClient, deleteClient }
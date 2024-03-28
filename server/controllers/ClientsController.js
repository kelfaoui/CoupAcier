const clientModel = require("../models/Client");

const getAll = async (req, res) => {
  clientModel.getAll((err, Clients) => {
    if (err) {
      return res.status(500).json({"errorMessage": err.message});
    }
    res.status(200).json({"data": Clients});
  });
};

const createClient = async (req, res) => {
  const newClient = req.body;
  clientModel.createClient(newClient, (err, idClient) => {
    if (err) {
      return res.status(500).json({"message": err.message});
    }
    res.status(200).json({"idClient": idClient});
  });
};

const getClientById = async (req, res) => {
  const idClient = Number(req.params.id);
  clientModel.getClientById(idClient, (err, terminal) => {
    if (err) {
      return res.status(500).json({"message": err.message});
    }
    res.status(200).json({"data": idClient});
  })
};

const updateClient = async (req, res) => {
  const Client = req.body;
  clientModel.updateClient(Client, (err) => {
    if (err) {
      return res.status(500).json({"message": err.message});
    }
    res.status(200).send({"message": Client.idClient});
  })
};

const deleteClient = async (req, res) => {
  clientModel.deleteClient(Number(req.params.id), (err) => {
    if (err) {
      return res.status(500).json({"message": err.message});
    }
    res.status(200).send({"message": req.params.id});
  })
};

const login = async (req, res) => {
  
};

module.exports = { getAll, createClient, getClientById, updateClient, deleteClient, login }
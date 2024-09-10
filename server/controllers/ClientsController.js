const clientModel = require("../models/Client");

// Récupère tous les clients de la base de données
const getAll = async (req, res) => {
  clientModel.getAll((err, Clients) => {
    if (err) {
            // Si une erreur survient, renvoie une réponse avec un statut 500 et un message d'erreur
      return res.status(500).json({"errorMessage": err.message});
    }
        // Si tout fonctionne bien, renvoie les clients avec un statut 200
    res.status(200).json({"data": Clients});
  });
};

// Crée un nouveau client dans la base de données
const createClient = async (req, res) => {
  const newClient = req.body;
 //Appel à clientModel.createClient pour ajouter un client.
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
    res.status(200).json({"data": terminal});
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
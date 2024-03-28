const providerModel = require("../models/Provider");

const getAll = async (req, res) => {
  providerModel.getAll((err, Providers) => {
    if (err) {
      return res.status(500).json({"errorMessage": err.message});
    }
    res.status(200).json({"data": Providers});
  });
};

const createProvider = async (req, res) => {
  const newProvider = req.body;
  providerModel.createProvider(newProvider, (err, idProvider) => {
    if (err) {
      return res.status(500).json({"message": err.message});
    }
    res.status(200).json({"idProvider": idProvider});
  });
};

const getProviderById = async (req, res) => {
  const idProvider = Number(req.params.id);
  providerModel.getProviderById(idProvider, (err, terminal) => {
    if (err) {
      return res.status(500).json({"message": err.message});
    }
    res.status(200).json({"data": idProvider});
  })
};

const updateProvider = async (req, res) => {
  const Provider = req.body;
  providerModel.updateProvider(Provider, (err) => {
    if (err) {
      return res.status(500).json({"message": err.message});
    }
    res.status(200).send({"message": Provider.idFournisseur});
  })
};

const deleteProvider = async (req, res) => {
  providerModel.deleteProvider(Number(req.params.id), (err) => {
    if (err) {
      return res.status(500).json({"message": err.message});
    }
    res.status(200).send({"message": req.params.id});
  })
};

const login = async (req, res) => {
  
};

module.exports = { getAll, createProvider, getProviderById, updateProvider, deleteProvider, login }
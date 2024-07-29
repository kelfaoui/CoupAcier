const warhouseModel = require("../models/Warhouse");

const getAll = async (req, res) => {
  warhouseModel.getAll((err, Warhouses) => {
    if (err) {
      return res.status(500).json({"errorMessage": err.message});
    }
    res.status(200).json({"data": Warhouses});
  });
};

const createWarhouse = async (req, res) => {
  const newWarhouse = req.body;
  warhouseModel.createWarhouse(newWarhouse, (err, idWarhouse) => {
    if (err) {
      return res.status(500).json({"message": err.message});
    }

    res.status(200).json({"idWarhouse": idWarhouse});
  });
};

const getWarhouseById = async (req, res) => {
  const idWarhouse = Number(req.params.id);
  warhouseModel.getWarhouseById(idWarhouse, (err, warhouse) => {
    if (err) {
      return res.status(500).json({"message": err.message});
    }
    res.status(200).json({"data": warhouse});
  })
};

const updateWarhouse = async (req, res) => {
  const Warhouse = req.body;
  warhouseModel.updateWarhouse(Warhouse, (err) => {
    if (err) {
      return res.status(500).json({"message": err.message});
    }
    res.status(200).send({"message": Warhouse.idWarhouse});
  })
};

const deleteWarhouse = async (req, res) => {
  warhouseModel.deleteWarhouse(Number(req.params.id), (err) => {
    if (err) {
      return res.status(500).json({"message": err.message});
    }
    res.status(200).send({"message": req.params.id});
  })
};

const login = async (req, res) => {
  
};

module.exports = { getAll, createWarhouse, getWarhouseById, updateWarhouse, deleteWarhouse, login }
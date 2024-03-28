const cutsModel = require("../models/Cuts");

const getAll = async (req, res) => {
  cutsModel.getAll((err, cuts) => {
    if (err) {
      return res.status(500).json({"errorMessage": err.message});
    }
    res.status(200).json({"data": cuts});
  });
};

const createCut = async (req, res) => {
  const newCut = req.body;
  cutsModel.createCut(newCut, (err, idCut) => {
    if (err) {
      return res.status(500).json({"message": err.message});
    }
    res.status(200).json({"idDecoupage": idCut});
  });
};

const getCutById = async (req, res) => {
  const idCut = Number(req.params.id);
  cutsModel.getCutById(idCut, (err, terminal) => {
    if (err) {
      return res.status(500).json({"message": err.message});
    }
    res.status(200).json({"data": idCut});
  })
};

const updateCut = async (req, res) => {
  const Cut = req.body;
  cutsModel.updateCut(Cut, (err) => {
    if (err) {
      return res.status(500).json({"message": err.message});
    }
    res.status(200).send({"message": Cut.idCut});
  })
};

const deleteCut = async (req, res) => {
  cutsModel.deleteCut(Number(req.params.id), (err) => {
    if (err) {
      return res.status(500).json({"message": err.message});
    }
    res.status(200).send({"message": req.params.id});
  })
};

const login = async (req, res) => {
  
};

module.exports = { getAll, createCut, getCutById, updateCut, deleteCut, login }
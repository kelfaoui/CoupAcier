const favorisModel = require("../models/Favoris");

const getAll = async (req, res) => {
  favorisModel.getAll((err, categorys) => {
    if (err) {
      return res.status(500).json({"errorMessage": err.message});
    }
    res.status(200).json({"data": categorys});
  });
};

const getClientFavoris = async (req, res) => {
  const idClient = Number(req.params.id);
  favorisModel.getAll((err, categorys) => {
    if (err) {
      return res.status(500).json({"errorMessage": err.message});
    }
    res.status(200).json({"data": categorys});
  });
};
const createFavoris = async (req, res) => {
  const newFavoris = req.body;
  favorisModel.createFavoris(newFavoris, (err, idcategory) => {
    if (err) {
      return res.status(500).json({"message": err.message});
    }

    res.status(200).json({"idcategory": idcategory});
  });
};

const getFavorisById = async (req, res) => {
  const idcategory = Number(req.params.id);
  favorisModel.getFavorisById(idcategory, (err, favoris) => {
    if (err) {
      return res.status(500).json({"message": err.message});
    }
    res.status(200).json({"data": favoris});
  })
};

const updateFavoris = async (req, res) => {
  const category = req.body;
  favorisModel.updateFavoris(category, (err) => {
    if (err) {
      return res.status(500).json({"message": err.message});
    }
    res.status(200).send({"message": category.idcategory});
  })
};

const deleteFavoris = async (req, res) => {
  favorisModel.deleteFavoris(Number(req.params.idProduit), Number(req.params.idClient), (err) => {
    if (err) {
      return res.status(500).json({"message": err.message});
    }
    res.status(200).send({"message": req.params.idProduit});
  })
};

const login = async (req, res) => {
  
};

module.exports = { getAll, createFavoris, getFavorisById, updateFavoris, deleteFavoris, login }
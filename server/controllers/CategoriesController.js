const categoryModel = require("../models/Category");

const getAll = async (req, res) => {
  categoryModel.getAll((err, categorys) => {
    if (err) {
      return res.status(500).json({"errorMessage": err.message});
    }
    res.status(200).json({"data": categorys});
  });
};

const createCategory = async (req, res) => {
  const newcategory = req.body;
  categoryModel.createCategory(newcategory, (err, idcategory) => {
    if (err) {
      return res.status(500).json({"message": err.message});
    }

    res.status(200).json({"idcategory": idcategory});
  });
};

const getCategoryById = async (req, res) => {
  const idcategory = Number(req.params.id);
  categoryModel.getCategoryById(idcategory, (err, terminal) => {
    if (err) {
      return res.status(500).json({"message": err.message});
    }
    res.status(200).json({"data": idcategory});
  })
};

const updateCategory = async (req, res) => {
  const category = req.body;
  categoryModel.updateCategory(category, (err) => {
    if (err) {
      return res.status(500).json({"message": err.message});
    }
    res.status(200).send({"message": category.idcategory});
  })
};

const deleteCategory = async (req, res) => {
  categoryModel.deleteCategory(Number(req.params.id), (err) => {
    if (err) {
      return res.status(500).json({"message": err.message});
    }
    res.status(200).send({"message": req.params.id});
  })
};

const login = async (req, res) => {
  
};

module.exports = { getAll, createCategory, getCategoryById, updateCategory, deleteCategory, login }
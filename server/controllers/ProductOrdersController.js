const productOrdersModel = require("../models/ProductOrders");

const getAll = async (req, res) => {
  productOrdersModel.getAll((err, ProductOrders) => {
    if (err) {
      return res.status(500).json({"errorMessage": err.message});
    }
    res.status(200).json({"data": ProductOrders});
  });
};

const createProductOrder = async (req, res) => {
  const newProductOrder = req.body;
  productOrdersModel.createProductOrder(newProductOrder, (err, idProductOrder) => {
    if (err) {
      return res.status(500).json({"message": err.message});
    }
    res.status(200).json({"idProductOrder": idProductOrder});
  });
};

const getProductOrderById = async (req, res) => {
  const idProductOrder = Number(req.params.id);
  productOrdersModel.getProductOrderById(idProductOrder, (err, terminal) => {
    if (err) {
      return res.status(500).json({"message": err.message});
    }
    res.status(200).json({"data": idProductOrder});
  })
};

const updateProductOrder = async (req, res) => {
  const ProductOrder = req.body;
  productOrdersModel.updateProductOrder(ProductOrder, (err) => {
    if (err) {
      return res.status(500).json({"message": err.message});
    }
    res.status(200).send({"message": ProductOrder.idProductOrder});
  })
};

const deleteProductOrder = async (req, res) => {
  productOrdersModel.deleteProductOrder(Number(req.params.id), (err) => {
    if (err) {
      return res.status(500).json({"message": err.message});
    }
    res.status(200).send({"message": req.params.id});
  })
};

const login = async (req, res) => {
  
};

module.exports = { getAll, createProductOrder, getProductOrderById, updateProductOrder, deleteProductOrder, login }
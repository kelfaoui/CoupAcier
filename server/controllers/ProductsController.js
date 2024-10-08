const productModel = require("../models/Product");

const getAll = async (req, res) => {
  productModel.getAll((err, Products) => {
    if (err) {
      return res.status(500).json({"errorMessage": err.message});
    }
    res.status(200).json({"data": Products});
  });
};

const createProduct = async (req, res) => {
  const newProduct = req.body;
  newProduct.imagePrincipale = req.files.imagePrincipale[0].originalname
  newProduct.image1 = req.files.image1[0].originalname
  newProduct.image2 = req.files.image2[0].originalname
  productModel.createProduct(newProduct, (err, idProduct) => {
    if (err) {
      return res.status(500).json({"message": err.message});
    }
    res.status(200).json({"idProduct": idProduct});
  });
};

const getProductById = async (req, res) => {
  const idProduct = Number(req.params.id);
  productModel.getProductById(idProduct, (err, product) => {
    if (err) {
      return res.status(500).json({"message": err.message});
    }
    res.status(200).json({"data": product});
  })
};

const updateProduct = async (req, res) => {
  const Product = req.body;
  productModel.updateProduct(Product, (err) => {
    if (err) {
      return res.status(500).json({"message": err.message});
    }
    res.status(200).send({"message": Product.idProduct});
  })
};

const deleteProduct = async (req, res) => {
  productModel.deleteProduct(Number(req.params.id), (err) => {
    if (err) {
      return res.status(500).json({"message": err.message});
    }
    res.status(200).send({"message": req.params.id});
  })
};

const login = async (req, res) => {
  
};

module.exports = { getAll, createProduct, getProductById, updateProduct, deleteProduct, login }
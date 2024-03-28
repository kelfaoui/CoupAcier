const express = require('express')
const ProductsRouter = express.Router()
const ProductsController = require('../controllers/ProductsController')

ProductsRouter.get("/", ProductsController.getAll);
ProductsRouter.get("/:id", ProductsController.getProductById);
ProductsRouter.post("/", ProductsController.createProduct);
ProductsRouter.put("/", ProductsController.updateProduct);
ProductsRouter.delete("/:id", ProductsController.deleteProduct);

// Exporter le module
module.exports = ProductsRouter   


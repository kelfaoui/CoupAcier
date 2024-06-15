const express = require('express')
const ProductOrdersRouter = express.Router()
const ProductOrdersController = require('../controllers/ProductOrdersController')

ProductOrdersRouter.get("/", ProductOrdersController.getAll);
ProductOrdersRouter.get("/:id", ProductOrdersController.getProductOrderById);
ProductOrdersRouter.post("/", ProductOrdersController.createProductOrder);
ProductOrdersRouter.put("/", ProductOrdersController.updateProductOrder);
ProductOrdersRouter.delete("/:id", ProductOrdersController.deleteProductOrder);

// Exporter le module
module.exports = ProductOrdersRouter   

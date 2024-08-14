const express = require('express')
const DeliveryCompanyRouter = express.Router()
const DeliveryCompanyController = require('../controllers/DeliveryCompanyController')


DeliveryCompanyRouter.get("/", DeliveryCompanyController.getAll);
DeliveryCompanyRouter.get("/:id", DeliveryCompanyController.getDeliveryCompanyById);
DeliveryCompanyRouter.post("/", DeliveryCompanyController.createDeliveryCompany);
DeliveryCompanyRouter.put("/", DeliveryCompanyController.updateDeliveryCompany);
DeliveryCompanyRouter.delete("/:id", DeliveryCompanyController.deleteDeliveryCompany);

// Exporter le module
module.exports = DeliveryCompanyRouter   
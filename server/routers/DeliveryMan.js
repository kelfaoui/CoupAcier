const express = require('express')
const DeliveryManRouter = express.Router()
const DeliveryManController = require('../controllers/DeliveryManController')

DeliveryManRouter.get("/", DeliveryManController.getAll);
DeliveryManRouter.get("/:id", DeliveryManController.getDeliveryManById);
DeliveryManRouter.post("/", DeliveryManController.createDeliveryMan);
DeliveryManRouter.put("/", DeliveryManController.updateDeliveryMan);
DeliveryManRouter.delete("/:id", DeliveryManController.deleteDeliveryMan);

// Exporter le module
module.exports = DeliveryManRouter   
const express = require('express')
const OrdersRouter = express.Router()
const OrdersController = require('../controllers/OrdersController')

OrdersRouter.get("/", OrdersController.getAll);
OrdersRouter.get("/client-orders/:idClient", OrdersController.getClientOrders);
OrdersRouter.get("/:id", OrdersController.getOrderById);
OrdersRouter.post("/", OrdersController.createOrder);
OrdersRouter.put("/", OrdersController.updateOrder);
OrdersRouter.delete("/:id", OrdersController.deleteOrder);

// Exporter le module
module.exports = OrdersRouter   

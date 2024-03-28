const express = require('express')
const ClientsRouter = express.Router()
const ClientsController = require('../controllers/ClientsController')

ClientsRouter.get("/", ClientsController.getAll);
ClientsRouter.get("/:id", ClientsController.getClientById);
ClientsRouter.post("/", ClientsController.createClient);
ClientsRouter.put("/", ClientsController.updateClient);
ClientsRouter.delete("/:id", ClientsController.deleteClient);

// Exporter le module
module.exports = ClientsRouter   


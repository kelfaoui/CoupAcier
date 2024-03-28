const express = require('express')
const ProvidersRouter = express.Router()
const ProvidersController = require('../controllers/ProvidersController')

ProvidersRouter.get("/", ProvidersController.getAll);
ProvidersRouter.get("/:id", ProvidersController.getProviderById);
ProvidersRouter.post("/", ProvidersController.createProvider);
ProvidersRouter.put("/", ProvidersController.updateProvider);
ProvidersRouter.delete("/:id", ProvidersController.deleteProvider);

// Exporter le module
module.exports = ProvidersRouter   

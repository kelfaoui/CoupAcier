const express = require('express')
const WarhousesRouter = express.Router()
const WarhousesController = require('../controllers/WarhousesController')

WarhousesRouter.get("/", WarhousesController.getAll);
WarhousesRouter.get("/:id", WarhousesController.getWarhouseById);
WarhousesRouter.post("/", WarhousesController.createWarhouse);
WarhousesRouter.put("/", WarhousesController.updateWarhouse);
WarhousesRouter.delete("/:id", WarhousesController.deleteWarhouse);

// Exporter le module
module.exports = WarhousesRouter   


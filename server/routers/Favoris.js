const express = require('express')
const FavorisRouter = express.Router()
const FavorisController = require('../controllers/FavorisController')

FavorisRouter.get("/", FavorisController.getAll);
FavorisRouter.get("/:id", FavorisController.getFavorisById);
FavorisRouter.post("/", FavorisController.createFavoris);
FavorisRouter.put("/", FavorisController.updateFavoris);
FavorisRouter.delete("/:idProduit/:idClient", FavorisController.deleteFavoris);

// Exporter le module
module.exports = FavorisRouter   


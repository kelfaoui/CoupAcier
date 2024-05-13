const express = require('express')
const CategoriesRouter = express.Router()
const CategoriesController = require('../controllers/CategoriesController')

CategoriesRouter.get("/", CategoriesController.getAll);
CategoriesRouter.get("/:id", CategoriesController.getCategoryById);
CategoriesRouter.post("/", CategoriesController.createCategory);
CategoriesRouter.put("/", CategoriesController.updateCategory);
CategoriesRouter.delete("/:id", CategoriesController.deleteCategory);

// Exporter le module
module.exports = CategoriesRouter   


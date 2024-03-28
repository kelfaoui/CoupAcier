const express = require('express')
const EmployesRouter = express.Router()
const EmployesController = require('../controllers/EmployesController')

EmployesRouter.get("/", EmployesController.getAll);
EmployesRouter.get("/:id", EmployesController.getEmployeById);
EmployesRouter.post("/", EmployesController.createEmploye);
EmployesRouter.put("/", EmployesController.updateEmploye);
EmployesRouter.delete("/:id", EmployesController.deleteEmploye);

// Exporter le module
module.exports = EmployesRouter   


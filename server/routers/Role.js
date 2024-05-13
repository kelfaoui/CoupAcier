const express = require('express')
const RolesRouter = express.Router()
const RolesController = require('../controllers/RolesController')

RolesRouter.get("/", RolesController.getAll);
RolesRouter.get("/:id", RolesController.getRoleById);
RolesRouter.post("/", RolesController.createRole);
RolesRouter.put("/", RolesController.updateRole);
RolesRouter.delete("/:id", RolesController.deleteRole);

// Exporter le module
module.exports = RolesRouter   


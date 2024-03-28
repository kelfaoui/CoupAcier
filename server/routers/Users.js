const express = require('express')
const UsersRouter = express.Router()
const UsersController = require('../controllers/UsersController')

UsersRouter.get("/", UsersController.getAll);
UsersRouter.get("/:id", UsersController.getUserById);
UsersRouter.post("/", UsersController.createUser);

// Exporter le module
module.exports = UsersRouter   


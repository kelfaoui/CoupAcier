const roleModel = require("../models/Role");

const getAll = async (req, res) => {
  roleModel.getAll((err, Roles) => {
    if (err) {
      return res.status(500).json({"errorMessage": err.message});
    }
    res.status(200).json({"data": Roles});
  });
};

const createRole = async (req, res) => {
  const newRole = req.body;
  roleModel.createRole(newRole, (err, idRole) => {
    if (err) {
      return res.status(500).json({"message": err.message});
    }

    res.status(200).json({"idRole": idRole});
  });
};

const getRoleById = async (req, res) => {
  const idRole = Number(req.params.id);
  roleModel.getRoleById(idRole, (err, terminal) => {
    if (err) {
      return res.status(500).json({"message": err.message});
    }
    res.status(200).json({"data": idRole});
  })
};

const updateRole = async (req, res) => {
  const Role = req.body;
  roleModel.updateRole(Role, (err) => {
    if (err) {
      return res.status(500).json({"message": err.message});
    }
    res.status(200).send({"message": Role.idRole});
  })
};

const deleteRole = async (req, res) => {
  roleModel.deleteRole(Number(req.params.id), (err) => {
    if (err) {
      return res.status(500).json({"message": err.message});
    }
    res.status(200).send({"message": req.params.id});
  })
};

const login = async (req, res) => {
  
};

module.exports = { getAll, createRole, getRoleById, updateRole, deleteRole, login }
const employeModel = require("../models/Employe");

const getAll = async (req, res) => {
  employeModel.getAll((err, employes) => {
    if (err) {
      return res.status(500).json({"errorMessage": err.message});
    }
    res.status(200).json({"data": employes});
  });
};

const createEmploye = async (req, res) => {
  const newEmploye = req.body;
  employeModel.createEmploye(newEmploye, (err, idEmploye) => {
    if (err) {
      return res.status(500).json({"message": err.message});
    }

    res.status(200).json({"idEmploye": idEmploye});
  });
};

const getEmployeById = async (req, res) => {
  const idEmploye = Number(req.params.id);
  employeModel.getEmployeById(idEmploye, (err, employe) => {
    if (err) {
      return res.status(500).json({"message": err.message});
    }
    res.status(200).json({"data": employe});
  })
};

const updateEmploye = async (req, res) => {
  const Employe = req.body;
  employeModel.updateEmploye(Employe, (err) => {
    if (err) {
      return res.status(500).json({"message": err.message});
    }
    res.status(200).send({"message": Employe});
  })
};

const deleteEmploye = async (req, res) => {
  employeModel.deleteEmploye(Number(req.params.id), (err) => {
    if (err) {
      return res.status(500).json({"message": err.message});
    }
    res.status(200).send({"message": req.params.id});
  })
};

const login = async (req, res) => {
  
};

module.exports = { getAll, createEmploye, getEmployeById, updateEmploye, deleteEmploye, login }
const userModel = require("../models/User");

const getAll = async (req, res) => {
  userModel.getAll((err, Ingredients) => {
    if (err) {
      return res.status(500).json({"errorMessage": err.message});
    }
    res.status(200).json({"data": Ingredients});
  });
};


const createUser = async (req, res) => {
  const newUser = req.body;
  userModel.createUser(newUser, (err, terminalId) => {
    if (err) {
      return res.status(500).json({"message": err.message});
    }

    res.status(200).json({"terminalId": terminalId});
  });
};


const getUserById = async (req, res) => {
  const terminalId = Number(req.params.id);
  userModel.getUserById(terminalId, (err, terminal) => {
    if (err) {
      return res.status(500).json({"message": err.message});
    }
    res.status(200).json({"data": terminal});
  })
};

const updateUser = async (req, res) => {
  const user = req.body;
  userModel.updateUser(user, (err) => {
    if (err) {
      return res.status(500).json({"message": err.message});
    }
    res.status(200).send();
  })
};


const deleteUser = async (req, res) => {
  userModel.deleteUser(Number(req.params.id), (err) => {
    if (err) {
      return res.status(500).json({"message": err.message});
    }
    res.status(200).send();
  })
};

const login = async (req, res) => {
  
};

module.exports = { getAll, createUser, getUserById, updateUser, deleteUser, login }
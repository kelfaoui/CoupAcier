const deliveryManModel = require("../models/DeliveryMan");

const getAll = async (req, res) => {
  deliveryManModel.getAll((err, DeliveryMans) => {
    if (err) {
      return res.status(500).json({"errorMessage": err.message});
    }
    res.status(200).json({"data": DeliveryMans});
  });
};

const createDeliveryMan = async (req, res) => {
  const newDeliveryMan = req.body;
  deliveryManModel.createDeliveryMan(newDeliveryMan, (err, idDeliveryMan) => {
    if (err) {
      return res.status(500).json({"message": err.message});
    }
    res.status(200).json({"idDeliveryMan": idDeliveryMan});
  });
};

const getDeliveryManById = async (req, res) => {
  const idDeliveryMan = Number(req.params.id);
  deliveryManModel.getDeliveryManById(idDeliveryMan, (err, terminal) => {
    if (err) {
      return res.status(500).json({"message": err.message});
    }
    res.status(200).json({"data": terminal});
  })
};

const updateDeliveryMan = async (req, res) => {
  const DeliveryMan = req.body;
  deliveryManModel.updateDeliveryMan(DeliveryMan, (err) => {
    if (err) {
      return res.status(500).json({"message": err.message});
    }
    res.status(200).send({"message": DeliveryMan.idDeliveryMan});
  })
};

const deleteDeliveryMan = async (req, res) => {
  deliveryManModel.deleteDeliveryMan(Number(req.params.id), (err) => {
    if (err) {
      return res.status(500).json({"message": err.message});
    }
    res.status(200).send({"message": req.params.id});
  })
};

const login = async (req, res) => {
  
};

module.exports = { getAll, createDeliveryMan, getDeliveryManById, updateDeliveryMan, deleteDeliveryMan, login }
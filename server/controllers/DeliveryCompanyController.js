const deliveryCompanyModel = require("../models/DeliveryCompany");

const getAll = async (req, res) => {
  deliveryCompanyModel.getAll((err, DeliveryCompanys) => {
    if (err) {
      return res.status(500).json({"errorMessage": err.message});
    }
    res.status(200).json({"data": DeliveryCompanys});
  });
};

const createDeliveryCompany = async (req, res) => {
  const newDeliveryCompany = req.body;
  console.log(newDeliveryCompany)
  deliveryCompanyModel.createDeliveryCompany(newDeliveryCompany, (err, idDeliveryCompany) => {
    if (err) {
      return res.status(500).json({"message": err.message});
    }
    res.status(200).json({"idDeliveryCompany": idDeliveryCompany});
  });
};

const getDeliveryCompanyById = async (req, res) => {
  const idDeliveryCompany = Number(req.params.id);
  deliveryCompanyModel.getDeliveryCompanyById(idDeliveryCompany, (err, terminal) => {
    if (err) {
      return res.status(500).json({"message": err.message});
    }
    res.status(200).json({"data": terminal});
  })
};

const updateDeliveryCompany = async (req, res) => {
  const DeliveryCompany = req.body;
  deliveryCompanyModel.updateDeliveryCompany(DeliveryCompany, (err) => {
    if (err) {
      return res.status(500).json({"message": err.message});
    }
    res.status(200).send({"message": DeliveryCompany.idDeliveryCompany});
  })
};

const deleteDeliveryCompany = async (req, res) => {
  deliveryCompanyModel.deleteDeliveryCompany(Number(req.params.id), (err) => {
    if (err) {
      return res.status(500).json({"message": err.message});
    }
    res.status(200).send({"message": req.params.id});
  })
};

const login = async (req, res) => {
  
};

module.exports = { getAll, createDeliveryCompany, getDeliveryCompanyById, updateDeliveryCompany, deleteDeliveryCompany, login }
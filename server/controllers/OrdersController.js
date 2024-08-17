const ordersModel = require("../models/Orders");

const getAll = async (req, res) => {
  ordersModel.getAll((err, Orders) => {
    if (err) {
      return res.status(500).json({"errorMessage": err.message});
    }
    res.status(200).json({"data": Orders});
  });
};

const getAllQuots = async (req, res) => {
  ordersModel.getAllQuots((err, Orders) => {
    if (err) {
      return res.status(500).json({"errorMessage": err.message});
    }
    res.status(200).json({"data": Orders});
  });
};



const getClientOrders = async (req, res) => {
  const idClient = Number(req.params.idClient);
  ordersModel.getClientOrders(idClient, (err, Orders) => {
    if (err) {
      return res.status(500).json({"errorMessage": err.message});
    }
    res.status(200).json({"data": Orders});
  });
};


const createOrder = async (req, res) => {
  const newOrder = req.body;
  ordersModel.createOrder(newOrder, (err, idOrder) => {
    if (err) {
      return res.status(500).json({"message": err.message});
    }
    res.status(200).json({"idCommande": idOrder});
  });
};

const getOrderById = async (req, res) => {
  const idOrder = Number(req.params.id);
  ordersModel.getOrderById(idOrder, (err, order) => {
    if (err) {
      return res.status(500).json({"message": err.message});
    }
    res.status(200).json({"data": order});
  })
};

const updateOrder = async (req, res) => {
  const Order = req.body;
  ordersModel.updateOrder(Order, (err) => {
    if (err) {
      return res.status(500).json({"message": err.message});
    }
    res.status(200).send({"message": Order.idOrder});
  })
};

const deleteOrder = async (req, res) => {
  ordersModel.deleteOrder(Number(req.params.id), (err) => {
    if (err) {
      return res.status(500).json({"message": err.message});
    }
    res.status(200).send({"message": req.params.id});
  })
};

const login = async (req, res) => {
  
};

module.exports = { getAll, getClientOrders, createOrder, getOrderById, updateOrder, deleteOrder, login, getAllQuots }
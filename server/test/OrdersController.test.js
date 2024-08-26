const chai = require('chai');
const sinon = require('sinon');
const expect = chai.expect;
const ordersModel = require('../models/Orders');
const ordersController = require('../controllers/OrdersController');

describe('Orders Controller', () => {
  describe('getAll', () => {
    it('devrait retourner toutes les commandes', (done) => {
      const req = {};
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub()
      };

      const orders = [{ id: 1, name: 'Order1' }, { id: 2, name: 'Order2' }];
      sinon.stub(ordersModel, 'getAll').yields(null, orders);

      ordersController.getAll(req, res);

      expect(res.status.calledWith(200)).to.be.true;
      expect(res.json.calledWith({ data: orders })).to.be.true;
      ordersModel.getAll.restore();
      done();
    });

    it('devrait gérer les erreurs', (done) => {
      const req = {};
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub()
      };

      const error = new Error('Quelque chose a mal tourné');
      sinon.stub(ordersModel, 'getAll').yields(error, null);

      ordersController.getAll(req, res);

      expect(res.status.calledWith(500)).to.be.true;
      expect(res.json.calledWith({ errorMessage: error.message })).to.be.true;
      ordersModel.getAll.restore();
      done();
    });
  });

  describe('getAllQuots', () => {
    it('devrait retourner toutes les devis', (done) => {
      const req = {};
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub()
      };

      const orders = [{ id: 1, name: 'Order1' }, { id: 2, name: 'Order2' }];
      sinon.stub(ordersModel, 'getAllQuots').yields(null, orders);

      ordersController.getAllQuots(req, res);

      expect(res.status.calledWith(200)).to.be.true;
      expect(res.json.calledWith({ data: orders })).to.be.true;
      ordersModel.getAllQuots.restore();
      done();
    });

    it('devrait gérer les erreurs', (done) => {
      const req = {};
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub()
      };

      const error = new Error('Quelque chose a mal tourné');
      sinon.stub(ordersModel, 'getAllQuots').yields(error, null);

      ordersController.getAllQuots(req, res);

      expect(res.status.calledWith(500)).to.be.true;
      expect(res.json.calledWith({ errorMessage: error.message })).to.be.true;
      ordersModel.getAllQuots.restore();
      done();
    });
  });

  describe('getClientOrders', () => {
    it('devrait retourner les commandes d\'un client par id', (done) => {
      const req = { params: { idClient: 1 } };
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub()
      };

      const orders = [{ id: 1, name: 'Order1' }];
      sinon.stub(ordersModel, 'getClientOrders').yields(null, orders);

      ordersController.getClientOrders(req, res);

      expect(res.status.calledWith(200)).to.be.true;
      expect(res.json.calledWith({ data: orders })).to.be.true;
      ordersModel.getClientOrders.restore();
      done();
    });

    it('devrait gérer les erreurs', (done) => {
      const req = { params: { idClient: 1 } };
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub()
      };

      const error = new Error('Quelque chose a mal tourné');
      sinon.stub(ordersModel, 'getClientOrders').yields(error, null);

      ordersController.getClientOrders(req, res);

      expect(res.status.calledWith(500)).to.be.true;
      expect(res.json.calledWith({ errorMessage: error.message })).to.be.true;
      ordersModel.getClientOrders.restore();
      done();
    });
  });

  describe('createOrder', () => {
    it('devrait créer une nouvelle commande', (done) => {
      const req = { body: { name: 'Nouvelle Commande' } };
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub()
      };

      const idOrder = 1;
      sinon.stub(ordersModel, 'createOrder').yields(null, idOrder);

      ordersController.createOrder(req, res);

      expect(res.status.calledWith(200)).to.be.true;
      expect(res.json.calledWith({ idCommande: idOrder })).to.be.true;
      ordersModel.createOrder.restore();
      done();
    });

    it('devrait gérer les erreurs', (done) => {
      const req = { body: { name: 'Nouvelle Commande' } };
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub()
      };

      const error = new Error('Quelque chose a mal tourné');
      sinon.stub(ordersModel, 'createOrder').yields(error, null);

      ordersController.createOrder(req, res);

      expect(res.status.calledWith(500)).to.be.true;
      expect(res.json.calledWith({ message: error.message })).to.be.true;
      ordersModel.createOrder.restore();
      done();
    });
  });

  describe('getOrderById', () => {
    it('devrait retourner une commande par id', (done) => {
      const req = { params: { id: 1 } };
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub()
      };

      const order = { id: 1, name: 'Order1' };
      sinon.stub(ordersModel, 'getOrderById').yields(null, order);

      ordersController.getOrderById(req, res);

      expect(res.status.calledWith(200)).to.be.true;
      expect(res.json.calledWith({ data: order })).to.be.true;
      ordersModel.getOrderById.restore();
      done();
    });

    it('devrait gérer les erreurs', (done) => {
      const req = { params: { id: 1 } };
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub()
      };

      const error = new Error('Quelque chose a mal tourné');
      sinon.stub(ordersModel, 'getOrderById').yields(error, null);

      ordersController.getOrderById(req, res);

      expect(res.status.calledWith(500)).to.be.true;
      expect(res.json.calledWith({ message: error.message })).to.be.true;
      ordersModel.getOrderById.restore();
      done();
    });
  });

  describe('updateOrder', () => {
    it('devrait mettre à jour une commande', (done) => {
      const req = { body: { idOrder: 1, name: 'Commande Mise à Jour' } };
      const res = {
        status: sinon.stub().returnsThis(),
        send: sinon.stub()
      };

      sinon.stub(ordersModel, 'updateOrder').yields(null);

      ordersController.updateOrder(req, res);

      expect(res.status.calledWith(200)).to.be.true;
      expect(res.send.calledWith({ message: req.body.idOrder })).to.be.true;
      ordersModel.updateOrder.restore();
      done();
    });

    it('devrait gérer les erreurs', (done) => {
      const req = { body: { idOrder: 1, name: 'Commande Mise à Jour' } };
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub()
      };

      const error = new Error('Quelque chose a mal tourné');
      sinon.stub(ordersModel, 'updateOrder').yields(error);

      ordersController.updateOrder(req, res);

      expect(res.status.calledWith(500)).to.be.true;
      expect(res.json.calledWith({ message: error.message })).to.be.true;
      ordersModel.updateOrder.restore();
      done();
    });
  });

  describe('deleteOrder', () => {
    it('devrait supprimer une commande', (done) => {
      const req = { params: { id: 1 } };
      const res = {
        status: sinon.stub().returnsThis(),
        send: sinon.stub()
      };

      sinon.stub(ordersModel, 'deleteOrder').yields(null);

      ordersController.deleteOrder(req, res);

      expect(res.status.calledWith(200)).to.be.true;
      expect(res.send.calledWith({ message: req.params.id })).to.be.true;
      ordersModel.deleteOrder.restore();
      done();
    });

  })});
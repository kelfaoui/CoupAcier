const chai = require('chai');
const sinon = require('sinon');
const expect = chai.expect;
const clientModel = require('../models/Client');
const ClientsController = require('../controllers/ClientsController');

describe('Client Controller', () => {
  describe('getAll', () => {
    it('Doit retourner tous les clients', (done) => {
      const req = {};
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub()
      };

      const clients = [{ id: 1, name: 'Client1' }, { id: 2, name: 'Client2' }];
      sinon.stub(clientModel, 'getAll').yields(null, clients);

      ClientsController.getAll(req, res);

      expect(res.status.calledWith(200)).to.be.true;
      expect(res.json.calledWith({ data: clients })).to.be.true;
      clientModel.getAll.restore();
      done();
    });

    it('Doit gérer les erreurs', (done) => {
      const req = {};
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub()
      };

      const error = new Error('Un erreur s\'est produite');
      sinon.stub(clientModel, 'getAll').yields(error, null);

      ClientsController.getAll(req, res);

      expect(res.status.calledWith(500)).to.be.true;
      expect(res.json.calledWith({ errorMessage: error.message })).to.be.true;
      clientModel.getAll.restore();
      done();
    });
  });

  describe('createClient', () => {
    it('Doit créer un nouveau client', (done) => {
      const req = { body: { name: 'Nouveau client' } };
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub()
      };

      const idClient = 1;
      sinon.stub(clientModel, 'createClient').yields(null, idClient);

      ClientsController.createClient(req, res);

      expect(res.status.calledWith(200)).to.be.true;
      expect(res.json.calledWith({ idClient })).to.be.true;
      clientModel.createClient.restore();
      done();
    });

    it('Doit gérer les erreurs', (done) => {
      const req = { body: { name: 'Nouveau Client' } };
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub()
      };

      const error = new Error('Une erreur s\'est produite');
      sinon.stub(clientModel, 'createClient').yields(error, null);

      ClientsController.createClient(req, res);

      expect(res.status.calledWith(500)).to.be.true;
      expect(res.json.calledWith({ message: error.message })).to.be.true;
      clientModel.createClient.restore();
      done();
    });
  });

  describe('getClientById', () => {
    it('Doit retourner un client avec un id', (done) => {
      const req = { params: { id: 1 } };
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub()
      };

      const client = { id: 1, name: 'Client1' };
      sinon.stub(clientModel, 'getClientById').yields(null, client);

      ClientsController.getClientById(req, res);

      expect(res.status.calledWith(200)).to.be.true;
      expect(res.json.calledWith({ data: client })).to.be.true;
      clientModel.getClientById.restore();
      done();
    });

    it('Doit gérer les erreurs', (done) => {
      const req = { params: { id: 1 } };
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub()
      };

      const error = new Error('Une erreur s\'est produite');
      sinon.stub(clientModel, 'getClientById').yields(error, null);

      ClientsController.getClientById(req, res);

      expect(res.status.calledWith(500)).to.be.true;
      expect(res.json.calledWith({ message: error.message })).to.be.true;
      clientModel.getClientById.restore();
      done();
    });
  });

  describe('updateClient', () => {
    it('Dooit mettre à jour un client', (done) => {
      const req = { body: { idClient: 1, name: 'Client mis à jour' } };
      const res = {
        status: sinon.stub().returnsThis(),
        send: sinon.stub()
      };

      sinon.stub(clientModel, 'updateClient').yields(null);

      ClientsController.updateClient(req, res);

      expect(res.status.calledWith(200)).to.be.true;
      expect(res.send.calledWith({ message: req.body.idClient })).to.be.true;
      clientModel.updateClient.restore();
      done();
    });

    it('Doit gérer les erreurs', (done) => {
      const req = { body: { idClient: 1, name: 'Client mis à jour' } };
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub()
      };

      const error = new Error('Une erreur s\est produit');
      sinon.stub(clientModel, 'updateClient').yields(error);

      ClientsController.updateClient(req, res);

      expect(res.status.calledWith(500)).to.be.true;
      expect(res.json.calledWith({ message: error.message })).to.be.true;
      clientModel.updateClient.restore();
      done();
    });
  });

  describe('deleteClient', () => {
    it('Doit supprimer un client', (done) => {
      const req = { params: { id: 1 } };
      const res = {
        status: sinon.stub().returnsThis(),
        send: sinon.stub()
      };

      sinon.stub(clientModel, 'deleteClient').yields(null);

      ClientsController.deleteClient(req, res);

      expect(res.status.calledWith(200)).to.be.true;
      expect(res.send.calledWith({ message: req.params.id })).to.be.true;
      clientModel.deleteClient.restore();
      done();
    });

    it('Doit gérer les erreurs', (done) => {
      const req = { params: { id: 1 } };
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub()
      };

      const error = new Error('Une erreur s\'est produit');
      sinon.stub(clientModel, 'deleteClient').yields(error);

      ClientsController.deleteClient(req, res);

      expect(res.status.calledWith(500)).to.be.true;
      expect(res.json.calledWith({ message: error.message })).to.be.true;
      clientModel.deleteClient.restore();
      done();
    });
  });
});
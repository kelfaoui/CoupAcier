const chai = require('chai');
const sinon = require('sinon');
const expect = chai.expect;
const employeModel = require('../models/Employe');
const employeController = require('../controllers/EmployesController');

describe('Employe Controller', () => {
  describe('getAll', () => {
    it('devrait retourner tous les employés', (done) => {
      const req = {};
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub()
      };

      const employes = [{ id: 1, name: 'Employe1' }, { id: 2, name: 'Employe2' }];
      sinon.stub(employeModel, 'getAll').yields(null, employes);

      employeController.getAll(req, res);

      expect(res.status.calledWith(200)).to.be.true;
      expect(res.json.calledWith({ data: employes })).to.be.true;
      employeModel.getAll.restore();
      done();
    });

    it('devrait gérer les erreurs', (done) => {
      const req = {};
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub()
      };

      const error = new Error('Quelque chose a mal tourné');
      sinon.stub(employeModel, 'getAll').yields(error, null);

      employeController.getAll(req, res);

      expect(res.status.calledWith(500)).to.be.true;
      expect(res.json.calledWith({ errorMessage: error.message })).to.be.true;
      employeModel.getAll.restore();
      done();
    });
  });

  describe('createEmploye', () => {
    it('devrait créer un nouvel employé', (done) => {
      const req = { body: { name: 'Nouvel Employé' } };
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub()
      };

      const idEmploye = 1;
      sinon.stub(employeModel, 'createEmploye').yields(null, idEmploye);

      employeController.createEmploye(req, res);

      expect(res.status.calledWith(200)).to.be.true;
      expect(res.json.calledWith({ idEmploye: idEmploye })).to.be.true;
      employeModel.createEmploye.restore();
      done();
    });

    it('devrait gérer les erreurs', (done) => {
      const req = { body: { name: 'Nouvel Employé' } };
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub()
      };

      const error = new Error('Quelque chose a mal tourné');
      sinon.stub(employeModel, 'createEmploye').yields(error, null);

      employeController.createEmploye(req, res);

      expect(res.status.calledWith(500)).to.be.true;
      expect(res.json.calledWith({ message: error.message })).to.be.true;
      employeModel.createEmploye.restore();
      done();
    });
  });

  describe('getEmployeById', () => {
    it('devrait retourner un employé par id', (done) => {
      const req = { params: { id: 1 } };
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub()
      };

      const employe = { id: 1, name: 'Employe1' };
      sinon.stub(employeModel, 'getEmployeById').yields(null, employe);

      employeController.getEmployeById(req, res);

      expect(res.status.calledWith(200)).to.be.true;
      expect(res.json.calledWith({ data: employe })).to.be.true;
      employeModel.getEmployeById.restore();
      done();
    });

    it('devrait gérer les erreurs', (done) => {
      const req = { params: { id: 1 } };
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub()
      };

      const error = new Error('Quelque chose a mal tourné');
      sinon.stub(employeModel, 'getEmployeById').yields(error, null);

      employeController.getEmployeById(req, res);

      expect(res.status.calledWith(500)).to.be.true;
      expect(res.json.calledWith({ message: error.message })).to.be.true;
      employeModel.getEmployeById.restore();
      done();
    });
  });

 

  describe('deleteEmploye', () => {
    it('devrait supprimer un employé', (done) => {
      const req = { params: { id: 1 } };
      const res = {
        status: sinon.stub().returnsThis(),
        send: sinon.stub()
      };

      sinon.stub(employeModel, 'deleteEmploye').yields(null);

      employeController.deleteEmploye(req, res);

      expect(res.status.calledWith(200)).to.be.true;
      expect(res.send.calledWith({ message: req.params.id })).to.be.true;
      employeModel.deleteEmploye.restore();
      done();
    });

    it('devrait gérer les erreurs', (done) => {
      const req = { params: { id: 1 } };
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub()
      };

      const error = new Error('Quelque chose a mal tourné');
      sinon.stub(employeModel, 'deleteEmploye').yields(error);

      employeController.deleteEmploye(req, res);

      expect(res.status.calledWith(500)).to.be.true;
      expect(res.json.calledWith({ message: error.message })).to.be.true;
      employeModel.deleteEmploye.restore();
      done();
    });
  });
});
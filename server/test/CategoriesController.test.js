const chai = require('chai');
const sinon = require('sinon');
const expect = chai.expect;
const categoryModel = require('../models/Category');
const categoryController = require('../controllers/CategoriesController');

describe('Category Controller', () => {
  describe('getAll', () => {
    it('devrait retourner toutes les catégories', (done) => {
      const req = {};
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub()
      };

      const categories = [{ id: 1, name: 'Category1' }, { id: 2, name: 'Category2' }];
      sinon.stub(categoryModel, 'getAll').yields(null, categories);

      categoryController.getAll(req, res);

      expect(res.status.calledWith(200)).to.be.true;
      expect(res.json.calledWith({ data: categories })).to.be.true;
      categoryModel.getAll.restore();
      done();
    });

    it('devrait gérer les erreurs', (done) => {
      const req = {};
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub()
      };

      const error = new Error('Quelque chose a mal tourné');
      sinon.stub(categoryModel, 'getAll').yields(error, null);

      categoryController.getAll(req, res);

      expect(res.status.calledWith(500)).to.be.true;
      expect(res.json.calledWith({ errorMessage: error.message })).to.be.true;
      categoryModel.getAll.restore();
      done();
    });
  });

  describe('createCategory', () => {
    it('devrait créer une nouvelle catégorie', (done) => {
      const req = { body: { name: 'Nouvelle Catégorie' } };
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub()
      };

      const idCategory = 1;
      sinon.stub(categoryModel, 'createCategory').yields(null, idCategory);

      categoryController.createCategory(req, res);

      expect(res.status.calledWith(200)).to.be.true;
      expect(res.json.calledWith({ idcategory: idCategory })).to.be.true;
      categoryModel.createCategory.restore();
      done();
    });

    it('devrait gérer les erreurs', (done) => {
      const req = { body: { name: 'Nouvelle Catégorie' } };
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub()
      };

      const error = new Error('Quelque chose a mal tourné');
      sinon.stub(categoryModel, 'createCategory').yields(error, null);

      categoryController.createCategory(req, res);

      expect(res.status.calledWith(500)).to.be.true;
      expect(res.json.calledWith({ message: error.message })).to.be.true;
      categoryModel.createCategory.restore();
      done();
    });
  });

  describe('getCategoryById', () => {
    it('devrait retourner une catégorie par id', (done) => {
      const req = { params: { id: 1 } };
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub()
      };

      const category = { id: 1, name: 'Category1' };
      sinon.stub(categoryModel, 'getCategoryById').yields(null, category);

      categoryController.getCategoryById(req, res);

      expect(res.status.calledWith(200)).to.be.true;
      expect(res.json.calledWith({ data: category })).to.be.true;
      categoryModel.getCategoryById.restore();
      done();
    });

    it('devrait gérer les erreurs', (done) => {
      const req = { params: { id: 1 } };
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub()
      };

      const error = new Error('Quelque chose a mal tourné');
      sinon.stub(categoryModel, 'getCategoryById').yields(error, null);

      categoryController.getCategoryById(req, res);

      expect(res.status.calledWith(500)).to.be.true;
      expect(res.json.calledWith({ message: error.message })).to.be.true;
      categoryModel.getCategoryById.restore();
      done();
    });
  });

  describe('updateCategory', () => {
    it('devrait mettre à jour une catégorie', (done) => {
      const req = { body: { idcategory: 1, name: 'Catégorie Mise à Jour' } };
      const res = {
        status: sinon.stub().returnsThis(),
        send: sinon.stub()
      };

      sinon.stub(categoryModel, 'updateCategory').yields(null);

      categoryController.updateCategory(req, res);

      expect(res.status.calledWith(200)).to.be.true;
      expect(res.send.calledWith({ message: req.body.idcategory })).to.be.true;
      categoryModel.updateCategory.restore();
      done();
    });

    it('devrait gérer les erreurs', (done) => {
      const req = { body: { idcategory: 1, name: 'Catégorie Mise à Jour' } };
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub()
      };

      const error = new Error('Quelque chose a mal tourné');
      sinon.stub(categoryModel, 'updateCategory').yields(error);

      categoryController.updateCategory(req, res);

      expect(res.status.calledWith(500)).to.be.true;
      expect(res.json.calledWith({ message: error.message })).to.be.true;
      categoryModel.updateCategory.restore();
      done();
    });
  });

  describe('deleteCategory', () => {
    it('devrait supprimer une catégorie', (done) => {
      const req = { params: { id: 1 } };
      const res = {
        status: sinon.stub().returnsThis(),
        send: sinon.stub()
      };

      sinon.stub(categoryModel, 'deleteCategory').yields(null);

      categoryController.deleteCategory(req, res);

      expect(res.status.calledWith(200)).to.be.true;
      expect(res.send.calledWith({ message: req.params.id })).to.be.true;
      categoryModel.deleteCategory.restore();
      done();
    });

    it('devrait gérer les erreurs', (done) => {
      const req = { params: { id: 1 } };
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub()
      };

      const error = new Error('Quelque chose a mal tourné');
      sinon.stub(categoryModel, 'deleteCategory').yields(error);

      categoryController.deleteCategory(req, res);

      expect(res.status.calledWith(500)).to.be.true;
      expect(res.json.calledWith({ message: error.message })).to.be.true;
      categoryModel.deleteCategory.restore();
      done();
    });
  });
});
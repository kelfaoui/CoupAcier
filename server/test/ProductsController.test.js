
const chai = require('chai');
const sinon = require('sinon');
const expect = chai.expect;
const productModel = require('../models/Product');
const productController = require('../controllers/ProductsController');

describe('Product Controller', () => {
  describe('getAll', () => {
    it('devrait retourner tous les produits', (done) => {
      const req = {};
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub()
      };

      const products = [{ id: 1, name: 'Product1' }, { id: 2, name: 'Product2' }];
      sinon.stub(productModel, 'getAll').yields(null, products);

      productController.getAll(req, res);

      expect(res.status.calledWith(200)).to.be.true;
      expect(res.json.calledWith({ data: products })).to.be.true;
      productModel.getAll.restore();
      done();
    });

    it('devrait gérer les erreurs', (done) => {
      const req = {};
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub()
      };

      const error = new Error('Quelque chose a mal tourné');
      sinon.stub(productModel, 'getAll').yields(error, null);

      productController.getAll(req, res);

      expect(res.status.calledWith(500)).to.be.true;
      expect(res.json.calledWith({ errorMessage: error.message })).to.be.true;
      productModel.getAll.restore();
      done();
    });
  });

  describe('createProduct', () => {
    it('devrait créer un nouveau produit', (done) => {
      const req = { body: { name: 'Nouveau Produit' }, files: { imagePrincipale: [{ originalname: 'image1.jpg' }], image1: [{ originalname: 'image2.jpg' }], image2: [{ originalname: 'image3.jpg' }] } };
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub()
      };

      const idProduct = 1;
      sinon.stub(productModel, 'createProduct').yields(null, idProduct);

      productController.createProduct(req, res);

      expect(res.status.calledWith(200)).to.be.true;
      expect(res.json.calledWith({ idProduct })).to.be.true;
      productModel.createProduct.restore();
      done();
    });

    it('devrait gérer les erreurs', (done) => {
      const req = { body: { name: 'Nouveau Produit' }, files: { imagePrincipale: [{ originalname: 'image1.jpg' }], image1: [{ originalname: 'image2.jpg' }], image2: [{ originalname: 'image3.jpg' }] } };
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub()
      };

      const error = new Error('Quelque chose a mal tourné');
      sinon.stub(productModel, 'createProduct').yields(error, null);

      productController.createProduct(req, res);

      expect(res.status.calledWith(500)).to.be.true;
      expect(res.json.calledWith({ message: error.message })).to.be.true;
      productModel.createProduct.restore();
      done();
    });
  });

  describe('getProductById', () => {
    it('devrait retourner un produit par id', (done) => {
      const req = { params: { id: 1 } };
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub()
      };

      const product = { id: 1, name: 'Product1' };
      sinon.stub(productModel, 'getProductById').yields(null, product);

      productController.getProductById(req, res);

      expect(res.status.calledWith(200)).to.be.true;
      expect(res.json.calledWith({ data: product })).to.be.true;
      productModel.getProductById.restore();
      done();
    });

    it('devrait gérer les erreurs', (done) => {
      const req = { params: { id: 1 } };
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub()
      };

      const error = new Error('Quelque chose a mal tourné');
      sinon.stub(productModel, 'getProductById').yields(error, null);

      productController.getProductById(req, res);

      expect(res.status.calledWith(500)).to.be.true;
      expect(res.json.calledWith({ message: error.message })).to.be.true;
      productModel.getProductById.restore();
      done();
    });
  });

  describe('updateProduct', () => {
    it('devrait mettre à jour un produit', (done) => {
      const req = { body: { idProduct: 1, name: 'Produit Mis à Jour' } };
      const res = {
        status: sinon.stub().returnsThis(),
        send: sinon.stub()
      };

      sinon.stub(productModel, 'updateProduct').yields(null);

      productController.updateProduct(req, res);

      expect(res.status.calledWith(200)).to.be.true;
      expect(res.send.calledWith({ message: req.body.idProduct })).to.be.true;
      productModel.updateProduct.restore();
      done();
    });

    it('devrait gérer les erreurs', (done) => {
      const req = { body: { idProduct: 1, name: 'Produit Mis à Jour' } };
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub()
      };

      const error = new Error('Quelque chose a mal tourné');
      sinon.stub(productModel, 'updateProduct').yields(error);

      productController.updateProduct(req, res);

      expect(res.status.calledWith(500)).to.be.true;
      expect(res.json.calledWith({ message: error.message })).to.be.true;
      productModel.updateProduct.restore();
      done();
    });
  });

  describe('deleteProduct', () => {
    it('devrait supprimer un produit', (done) => {
      const req = { params: { id: 1 } };
      const res = {
        status: sinon.stub().returnsThis(),
        send: sinon.stub()
      };

      sinon.stub(productModel, 'deleteProduct').yields(null);

      productController.deleteProduct(req, res);

      expect(res.status.calledWith(200)).to.be.true;
      expect(res.send.calledWith({ message: req.params.id })).to.be.true;
      productModel.deleteProduct.restore();
      done();
    });

    it('devrait gérer les erreurs', (done) => {
      const req = { params: { id: 1 } };
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub()
      };

      const error = new Error('Quelque chose a mal tourné');
      sinon.stub(productModel, 'deleteProduct').yields(error);

      productController.deleteProduct(req, res);

      expect(res.status.calledWith(500)).to.be.true;
      expect(res.json.calledWith({ message: error.message })).to.be.true;
      productModel.deleteProduct.restore();
      done();
    });
  });
});

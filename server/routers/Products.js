const express = require('express')
const ProductsRouter = express.Router()
const ProductsController = require('../controllers/ProductsController')

const multer = require('multer');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/'); 
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname); 
  },
}); 

const upload = multer({ storage: storage });
const imagePrincipale = upload.fields(
    [
        {
            name:'imagePrincipale',
            maxCount:1
        },
        {
            name: 'image1', maxCount: 1
        },
        {
            name: 'image2', maxCount: 1 
        }
    ]  
) 

ProductsRouter.get("/", ProductsController.getAll);
ProductsRouter.get("/:id", ProductsController.getProductById);
ProductsRouter.post("/", imagePrincipale, ProductsController.createProduct);
ProductsRouter.put("/", ProductsController.updateProduct);
ProductsRouter.delete("/:id", ProductsController.deleteProduct);

// Exporter le module
module.exports = ProductsRouter   


const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");

router.get('/allProducts',productController.getAllProducts);

router.get('/products/:productId',productController.getProductDetails);

module.exports = router;

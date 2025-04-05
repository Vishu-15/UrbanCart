const express = require("express");
const router = express.Router(); 
const isAuthenticated = require("../middleware/auth");
const orderController = require('../controllers/orderController');



router.post('/createOrder',
  isAuthenticated,
  orderController.createOrder
);

router.get('/verifyPayment',
  isAuthenticated,
  orderController.verifyPayment
);

router.get("/allOrders",
  isAuthenticated,
  orderController.getAllOrders
);



module.exports = router;

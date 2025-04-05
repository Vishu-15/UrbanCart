const express = require("express");
const router = express.Router();
const passport = require('passport');
const isAuthenticated = require("../middleware/auth");
const userController = require("../controllers/userController");


router.get('/allUsers',
  isAuthenticated,
  userController.getAllUsers,
);

router.put(
  '/editUser',
  isAuthenticated,
  userController.editUserDetails,  
);

router.get('/getUser',
  isAuthenticated,
  userController.getCurrentUser,
)

router.get('/addToCart',
  isAuthenticated,
  userController.addToCart,
)

router.get('/removeFromCart', 
  isAuthenticated,
  userController.removeFromCart,
);


router.get('/updateWishlist',
  isAuthenticated,
  userController.updateWishlist,
);

router.post('/signup',
  userController.signup,
);

router.post('/login',
  passport.authenticate('local',{ failureMessage: true }), 
  userController.login,
);

router.get("/logout",
  isAuthenticated,
  userController.logout,
);

module.exports = router;

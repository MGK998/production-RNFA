const express = require("express");
const {
  registerController,
  loginController,
  updateUserController,
  requireSignIn,
} = require("../controllers/userController");

//router objext

const router = express.Router();

//ROUTES
//REGISTER || POST
router.post("/register", registerController);

//LOGIN || POST
router.post("/login", loginController);

//UPDATE || PUT
router.put("/update-user", requireSignIn, updateUserController);

//export
module.exports = router;

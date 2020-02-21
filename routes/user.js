const express = require("express");
const router = express.Router();
const userController = require("../controller/user-controller");
const middleware = require("../middleware/Auth");
const validators = require("../validators/req-validator")
const passport = require('passport');
require('../passport-config/passport')(passport);

router.post("/register", validators.userCreationValidator, userController.userRegister);
router.post("/login", validators.userCreationValidator, userController.userLogin);
router.get("/get/:id",passport.authenticate('jwt', { session : false }), userController.userProfile);
router.delete("/delete", middleware.Auth, userController.userDelete);
router.get("/list/:page", userController.userProfiles);
router.post("/address", validators.userAddressValidator, middleware.Auth, userController.userAddres);

module.exports = router;

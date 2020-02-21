const express = require("express");
const router = express.Router();
const userController = require("../controller/user-controller");
const middleware = require("../middleware/Auth");
const validators = require("../validators/req-validator")

router.post("/register", validators.userCreationValidator, userController.userRegister);
router.post("/login", validators.userCreationValidator, userController.userLogin);
router.get("/get/:id", middleware.Auth, userController.userProfile);
router.delete("/delete", middleware.Auth, userController.userDelete);
router.get("/list/:page", userController.userProfiles);
router.post("/address", middleware.Auth, userController.userAddres);

module.exports = router;

const express = require("express");
const router = express.Router();
const user_registerController = require("../controller/user-register");
const user_loginController = require("../controller/user-login");
const user_profileController = require("../controller/user-profile");
const middleware = require("../middleware/Auth");

router.post("/register", user_registerController.userRegister);
router.post("/login", user_loginController.userLogin);
router.get("/get/:id", middleware.Auth, user_profileController.userProfile);
router.delete("/delete", middleware.Auth, user_profileController.userDelete);
router.get("/list/:page", user_profileController.userProfiles);
router.post("/address", middleware.Auth, user_profileController.userAddres);

module.exports = router;

const express = require('express');
const router = express.Router();
const userController = require('../controller/user-register')


/* GET users listing. */
router.post('/register', userController.userRegister);

module.exports = router;

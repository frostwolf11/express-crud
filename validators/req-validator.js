const {check} = require('express-validator')

const userCreationValidator = [
    check('email','email must not be empty').not().isEmpty(),
    check('username','username must not be empty').not().isEmpty()
]

module.exports = {userCreationValidator}
const { check } = require('express-validator');

module.exports = () => {
   return [
      check('email', 'Please include a valid email.').isEmail(),
      check('password', 'Password is required').not().isEmpty()
   ]
}
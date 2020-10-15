const { check } = require('express-validator');

module.exports = () => {
   return [
      check('status', 'Status is required.').not().isEmpty(),
      check('skills', 'Skills are required.').not().isEmpty()
   ];
}
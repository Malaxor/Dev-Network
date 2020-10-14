const { check } = require('express-validator');

module.exports = () => {
   return [
      check('content', 'Content is required.').not().isEmpty() 
   ];
}
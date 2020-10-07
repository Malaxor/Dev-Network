const { check } = require('express-validator');

module.exports = () => {
   return [
      check('school', 'School is required.')
      .not()
      .isEmpty(),

      check('degree', 'Degree is required.')
      .not()
      .isEmpty(),
      
      check('fieldOfStudy', 'Field of study is required.')
      .not()
      .isEmpty(),

      check('from', 'From date is required.')
      .not()
      .isEmpty()
   ]
}
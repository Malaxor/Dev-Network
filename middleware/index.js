const validateUser = require('./validateUser');
const validateLogin = require('./validateLogin');
const validateProfile = require('./validateProfile');
const validateExperience = require('./validateExperience');
const validateEducation = require('./validateEducation');
const validatePost = require('./validatePost');
const validateComment = require('./validatePost');

module.exports = {
   validateUser,
   validateLogin,
   validateProfile,
   validateEducation,
   validateExperience,
   validatePost,
   validateComment
};

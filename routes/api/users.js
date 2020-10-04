const express = require('express');
const router = express.Router();
const { validationResult } = require('express-validator');
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');

const User = require('../../models/User');
const checkUser = require('../../middleware/checkUser');

// @route POST api/user
// &desc Register User 
// &access Public
router.post('/', checkUser(), async (req, res) => {
   const errors = validationResult(req); // returns an array of objects
   !errors.isEmpty() && res.status(400).json({ errors: errors.array() });

   const { name, email, password } = req.body;
   
   try {
      const user = await User.findOne({ email });

      if(user) {
         return res.status(400).json({ errors: [{ msg: 'User exists.' }] });
      }
      // Create user's avatar
      const avatar = gravatar.url(email, { 
         s: '200',
         r: 'PG',
         d: 'MM'
      });
      // Instantiate new user
      const newUser = new User({ 
         name,
         email,
         password,
         avatar
      });
      // Encrypt password
      const salt = await bcrypt.genSalt(10);
      newUser.password = await bcrypt.hash(password, salt);
      
      await newUser.save();
      // json webtoken
      const payload = {
         user: {
            id: newUser.id
         }
      };
      // receive token with user.id payload
      jwt.sign(payload, config.get('jwtSecret'), { expiresIn: 360000 }, (err, token) => {
         if(err) throw err;
         res.json({ token });
      });
   }
   catch(err) {
      console.error(err);
      res.status(500).send('Server error');
   }
});
module.exports = router;
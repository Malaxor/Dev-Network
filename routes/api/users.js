const express = require('express');
const router = express.Router();
const { validationResult } = require('express-validator');
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const User = require('../../models/User');
const checkUser = require('../../middleware/checkUser');

// Register User 
router.post(
   '/', checkUser('name', 'email', 'password'), async (req, res) => {
   const errors = validationResult(req); // returns an array of objects
   !errors.isEmpty() && res.status(400).json({ errors: errors.array() });

   const { name, email, password } = req.body;
   
   try {
      // Check if user exists 
      const user = await User.findOne({ email });

      if(user) {
         return res.status(400).json({ errors: [{ msg: 'User exists!' }] });
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
      res.send('User registered!');
   }
   catch(err) {
      console.error(err);
      res.status(500).send('Server error');
   }
});
module.exports = router;
const express = require('express');
const router = express.Router();
const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { validateLogin } = require('../../middleware');
const auth = require('../../middleware/auth');
const User = require('../../models/User');

// @route GET /api/auth
// &desc load user
// &access private
router.get('/', auth, async (req, res) => {
   try {
      const user = await User.findById(req.user.id).select('-password');
      res.json(user);
   }
   catch(err) {
      console.error(err.message);
      res.status(500).send('Server error');
   }
});
// &route POST /api/auth
// &desc authenticate user and get token (log in)
// &access public
router.post('/', validateLogin(), async (req, res) => {
   const errors = validationResult(req); // returns an array of objects
   if(!errors.isEmpty()) { 
      return res.status(400).json({ errors: errors.array() });
   }   
   const { email, password } = req.body;
      
   try {
      const user = await User.findOne({ email });
      if(!user) {
         return res.status(400).json({ errors: [{ msg: 'Invalid credentials' }] });
      }
      const isMatch = await bcrypt.compare(password, user.password);
      if(!isMatch) {
         return res.status(400).json({ errors: [{ msg: 'Invalid credentials' }] });
      }
      // future webtoken
      const payload = {
         user: {
            id: user.id
         }
      };
      // receive token with user.id payload and send token 
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
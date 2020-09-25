const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');
const Profile = require('../../models/Profile');
const User = require('../../models/User');

// @route GET api/profile/me
// &desc Get current user's profile
// &access Private
router.get('/me', auth, async (req, res) => { 
   try {
      const profile = await Profile.findOne({ user: req.user.id }).populate('User', ['name', 'avatar']);

      if(!profile) {
         return res.status(400).json({ msg: 'There no profile for this user.' });
      }
      res.json(profile);
   }
   catch(err) {
      console.error(err.message);
      res.status(500).send('Server error');
   }
});
// @route POST api/profile
// &desc Create or update user profile
// &access Private
router.post('/', 
[
   auth,
   [
      check('status', 'Status is required.').not().isEmpty(),
      check('skills', 'Skills are required.').not().isEmpty()
   ]
], 
async(req, res) => {
   const errors = validationResult(req);
   if(!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
   }
   const { youtube, twitter, facebook, linkedin, instagram } = req.body.social;
   const profileFields = {
      ...req.body,
      user: req.user.id,
      skills: req.body.skills.split(',').map(skill => skill.trim()), // remove white space from both sides of the string
      social: { youtube, twitter, facebook, linkedin, instagram }
   };

   try {
      let profile = await Profile.findOne({ user: req.user.id });
      // update profile
      if(profile) {
         profile = await Profile.findOneAndUpdate(
            { user: req.user.id }, 
            { $set: profileFields },
            { new: true }
         );
         return res.json(profile);
      }
      // create profile
      const newProfile = new Profile(profileFields);
      await newProfile.save();
      res.json(newProfile);
   }
   catch(err) {
      console.error(err);
      res.status(500).send('Server Error');
   }
});
module.exports = router;
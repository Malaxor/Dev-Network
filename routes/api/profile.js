const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const { validateExperience, validateEducation } = require('../../middleware');
const auth = require('../../middleware/auth');
const Profile = require('../../models/Profile');
const User = require('../../models/User');

// @route GET /api/profile/me
// &desc Get logged in user's profile
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
// @route POST /api/profile
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
async (req, res) => {
   const errors = validationResult(req);
   if(!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
   }
   const profileFields = {
      ...req.body,
      user: req.user.id,
      skills: req.body.skills.split(',').map(skill => skill.trim()),
      social: { ...req.body.social }
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
// @route PUT /api/profile/experience
// &desc Add work experience to profile
// &access Private
router.put('/experience', auth, validateExperience(), async (req, res) => {
   const errors = validationResult(req);
   if(!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
   }
   const exp = { ...req.body };

   try {
      const profile = await Profile.findOne({ user: req.user.id });
      profile.experience.unshift(exp);
      await profile.save();
      res.json(profile);
   }
   catch(err) {
      console.error(err);
      res.status(500).send('Server Error');
   }
});
// @route DELETE /api/profile/experience/:exp_id
// &desc Delete profile experience
// &access Public
router.delete('/experience/:exp_id', auth, async (req, res) => {
   try {
      const profile = await Profile.findOne({ user: req.user.id });
      profile.experience = profile.experience.filter(exp => exp.id !== req.params.exp_id); 
      await profile.save();
      res.json(profile);
   }
   catch(err) {
      console.error(err.message);
      res.status(500).send('Server Error');
   }
});
// @route PUT api/profile/education
// &desc Add work experience to profile
// &access Private
router.put('/education', auth, validateEducation(), async (req, res) => {
   const errors = validationResult(req);
   if(!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
   }
   const edu = { ...req.body };

   try {
      const profile = await Profile.findOne({ user: req.user.id });
      profile.education.unshift(edu);
      await profile.save();
      res.json(profile);
   }
   catch(err) {
      console.error(err);
      res.status(500).send('Server Error');
   }
});
// @route DELETE api/profile/experience/:exp_id
// &desc Delete profile experience
// &access Public
router.delete('/education/:edu_id', auth, async (req, res) => {
   try {
      const profile = await Profile.findOne({ user: req.user.id });
      profile.education = profile.education.filter(edu => edu.id !== req.params.edu_id); 
      await profile.save();
      res.json(profile);
   }
   catch(err) {
      console.error(err.message);
      res.status(500).send('Server Error');
   }
});
// @route GET /api/profile
// &desc Get all profiles
// &access Public
router.get('/', async (req, res) => {
   try {
      const profiles = await Profile.find().populate('user', ['name', 'avatar']);
      res.json(profiles);
   }
   catch(err) {
      console.error(err.message);
      res.status(500).send('Server Error');
   }
});
// @route GET /api/profile/user/:user_id
// &desc Get user profile by id
// &access Public
router.get('/user/:user_id', async (req, res) => {
   try {
      const profile = await Profile.findOne({ user: req.params.user_id }).populate('user', ['name', 'avatar']);

      if(!profile) {
         return res.status(400).json({ msg: 'Profile not found' });
      }
      res.json(profile);
   }
   catch(err) {
      console.error(err.message);
      if(err.kind === 'ObjectId') {
         return res.status(400).json({ msg: 'Profile not found' });
      }
      res.status(500).send('Server Error');
   }
});
// @route DELETE /api/profile/user
// &desc delete profile and user 
// &access Private
router.delete('/', auth, async (req, res) => {
   try {
      await Profile.findOneAndDelete({ user: req.user.id });
      await User.findOneAndDelete({ _id: req.user.id });
      return res.json({ msg: 'User deleted' });
   }
   catch(err) {
      console.error(err.message);
      if(err.kind === 'ObjectId') {
         return res.status(400).json({ msg: 'Profile not found' });
      }
      res.status(500).send('Server Error');
   }
});
module.exports = router;
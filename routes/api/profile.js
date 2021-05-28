const express = require('express');
const router = express.Router();
const { validationResult } = require('express-validator');
const normalize = require('normalize-url');
const { validateExperience, validateEducation, validateProfile } = require('../../middleware');
const auth = require('../../middleware/auth');
const Profile = require('../../models/Profile');
const User = require('../../models/User');
const Post = require('../../models/Post');

// @route POST /api/profile
// &desc create or update user profile
// &access Private
router.post('/', [ auth, validateProfile() ], async (req, res) => {
   const errors = validationResult(req);
   if(!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
   }
   const { website, skills, twitter, facebook, instagram, youtube, linkedin, ...rest } = req.body;

   const profileFields = {
      user: req.user.id,
      skills: skills.split(',').map(skill => skill.trim()),
      website: website ? normalize(website, { forceHttps: true }) : '',
      ...rest
   };
   const socialFields = { youtube, twitter, facebook, instagram, linkedin };

   for(const [key, value] of Object.entries(socialFields)) {
      if(value) {
         socialFields[key] = normalize(value, { forceHttps: true });
      }
   }
   profileFields.social = socialFields;
   
   try { // upsert creates a new profile if one is not found
      let profile = await Profile.findOneAndUpdate(
         { user: req.user.id }, 
         { $set: profileFields },
         { new: true, upsert: true, setDefaultsOnInsert: true }
      );
      return res.json(profile);
   }
   catch(err) {
      console.error(err.message);
      res.status(500).send('Server Error');
   }
});
// @route PUT /api/profile/experience
// &desc Add experience to profile
// &access Private
router.put('/experience', [ auth, validateExperience() ], async (req, res) => {
   const errors = validationResult(req);
   if(!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
   }

   try {
      const profile = await Profile.findOne({ user: req.user.id });
      profile.experience.unshift(req.body);
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
      profile.experience = profile.experience.filter(exp => exp.id.toString() !== req.params.exp_id); 
      await profile.save();
      res.json(profile);
   }
   catch(err) {
      console.error(err.message);
      res.status(500).send('Server Error');
   }
});
// @route PUT api/profile/education
// &desc Add education to profile
// &access Private
router.put('/education', [ auth, validateEducation() ], async (req, res) => {
   const errors = validationResult(req);
   if(!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
   }

   try {
      const profile = await Profile.findOne({ user: req.user.id });
      profile.education.unshift(req.body);
      await profile.save();
      res.json(profile);
   }
   catch(err) {
      console.error(err);
      res.status(500).send('Server Error');
   }
});
// @route DELETE api/profile/experience/:exp_id
// &desc Delete profile education
// &access Public
router.delete('/education/:edu_id', auth, async (req, res) => {
   try {
      const profile = await Profile.findOne({ user: req.user.id });
      profile.education = profile.education.filter(edu => edu.id.toString() !== req.params.edu_id); 
      await profile.save();
      res.json(profile);
   }
   catch(err) {
      console.error(err.message);
      res.status(500).send('Server Error');
   }
});
// @route GET /api/profile/me
// &desc Get logged in user's profile
// &access Private
router.get('/me', auth, async (req, res) => { 
   try {
      const profile = await Profile.findOne({ user: req.user.id }).populate('user', ['name', 'avatar']);

      if(!profile) {
         return res.status(400).json({ msg: "You don't have a profile." });
      }
      res.json(profile);
   }
   catch(err) {
      console.error(err.message);
      res.status(500).send('Server error');
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
      res.status(500).send('Server Error');
   }
});
// @route DELETE /api/profile
// &desc Delete profile and user 
// &access Private
router.delete('/', auth, async (req, res) => {
   try {
      await Post.deleteMany({ user: req.user.id });
      await Profile.findOneAndDelete({ user: req.user.id });
      await User.findOneAndDelete({ _id: req.user.id });
      return res.json({ msg: 'User deleted' });
   }
   catch(err) {
      console.error(err.message);
      res.status(500).send('Server Error');
   }
});
module.exports = router;
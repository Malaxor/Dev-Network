const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');
const Post = require('../../models/Post');
const Profile = require('../../models/Profile');
const User = require('../../models/User');

// @route POST /api/posts
// @desc Create a post
// @access Private
router.post('/', 
   [
      auth,
      [
         check('content', 'Content is required.').not().isEmpty() 
      ]
   ], 
   async (req, res) => {
      const errors = validationResult(req);
      if(!errors.isEmpty()) {
         res.status(400).send({ errors: errors.array() });
      }

      try {
         const user = await User.findById(req.user.id).select('-password');
         const newPost = new Post ({
            content: req.body.content,
            name: user.name,
            avatar: user.avatar,
            user: req.user.id
         });
         const post = await newPost.save();
         res.json(post);
      }
      catch(err) {
         console.error(err.messag);
         res.status(500).send('Server error!');
      }
   }
);
module.exports = router;
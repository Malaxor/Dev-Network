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
         const user = await User.findById(req.user.id).select('-password -email');
         console.log(user);
         const newPost = new Post ({
            content: req.body.content,
            author: user.name,
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
// @route GET /api/posts
// @desc Get all posts
// @access Private
router.get('/', auth, async (req, res) => {
   try {
      const posts = await Post.find().sort({ date: -1 });
      res.json(posts);
   }
   catch(error) {
      res.status(500).send('Server error!');
   }
});
// @route GET /api/posts/:id
// @desc Get post by id
// @access Private
router.get('/:id', auth, async (req, res) => {
   try {
      const post = await Post.findById(req.params.id);
      if(!post) {
         return res.status(404).json({ msg: 'Post not found...' });
      }
      res.json(post);
   }
   catch(error) {
      if(err.kind === 'ObjectId') {
         return res.status(400).json({ msg: 'Post not found...' });
      }
      res.status(500).send('Server error!');
   }
});
// @route DELETE /api/posts/:id
// @desc Delete a post by id
// @access Private
router.delete('/:id', auth, async (req, res) => {
   try {
      const post = await Post.findById(req.params.id);
      if(!post) {
         return res.status(404).json({ msg: 'Post not found...' });
      }
      // the user deleting the post must be the user who owns the post
      if(!post.user.equals(req.user.id)) {
         return res.status(401).json({ msg: 'User not authorized.' });
      }
      await post.remove();
   }
   catch(error) {
      if(err.kind === 'ObjectId') {
         return res.status(400).json({ msg: 'Post not found...' });
      }
      res.status(500).send('Server error!');
   }
});
module.exports = router;
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const { validationResult } = require('express-validator');
const auth = require('../../middleware/auth');
const { validatePost, validateComment } = require('../../middleware');
const Post = require('../../models/Post');
const User = require('../../models/User');

// @route POST /api/posts
// @desc Create a post
// @access Private
router.post('/', [ auth, validatePost() ], async (req, res) => {
   const errors = validationResult(req);
   if(!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
   }

   try {
      const user = await User.findById(req.user.id).select('-password -email');
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
      res.status(500).send('Server error');
   }
});
// @route GET /api/posts
// @desc Get all posts
// @access Private
router.get('/', auth, async (req, res) => {
   try {
      const posts = await Post.find().sort({ date: -1 });
      res.json(posts);
   }
   catch(error) {
      res.status(500).send('Server error');
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
      if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
         return res.status(400).json({ msg: 'Post not found...' });
      }
      res.status(500).send('Server error.');
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
      if(post.user.toString() !== req.user.id) {
         return res.status(401).json({ msg: 'User not authorized.' });
      }
      await post.remove();
      res.json({ msg: 'Post removed.' });
   }
   catch(error) {
      if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
         return res.status(400).json({ msg: 'Invalid ID.' });
      }   
      res.status(500).send('Server error.');
   }
});
// @route PUT /api/posts/like/:post_id
// @desc Like a post
// @access Private
router.put('/like/:post_id', auth, async (req, res) => {
   try {
      const post = await Post.findById(req.params.post_id);
      if(post.likes.filter(like => like.user.toString() === req.user.id).length === 1) {
         return res.status(400).json({ msg: "You can only like a post once." });
      }
      post.likes.push({ user: req.user.id });
      await post.save();
      res.send(post.likes);
   }
   catch(err) {
      console.log(err.message);
      res.status(500).send('Server error.');
   }
});
// @route PUT /api/posts/like/:post_id
// @desc Unlike a post
// @access Private
router.put('/unlike/:post_id', auth, async (req, res) => {
   try {
      const post = await Post.findById(req.params.post_id);
      if(post.likes.filter(like => like.user.toString() === req.user.id).length === 0) {
         return res.status(400).json({ msg: "You have not liked this post." });
      }
      post.likes = post.likes.filter(like => like.user.toString() !== req.user.id);
      await post.save();
      res.send(post.likes);
   }
   catch(err) {
      console.log(err.message);
      res.status(500).send('Server error.');
   }
});
// @route POST /api/posts/comment/:post_id
// @desc Comment on a post
// @access Private
router.post('/comment/:post_id', [ auth, validateComment() ], async (req, res) => {
   const errors = validationResult(req);
   if(!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
   }

   try {
      const user = await User.findById(req.user.id).select('-password -email');
      const post = await Post.findById(req.params.post_id);
      const newComment =  {
         user: req.user.id,
         author: user.name,
         content: req.body.content,
         avatar: user.avatar,
      };
      post.comments.unshift(newComment);
      await post.save();
      res.json(post.comments);
   }
   catch(err) {
      console.error(err.messag);
      res.status(500).send('Server error');
   }
});
// @route DELETE /api/posts/:post_id/comment/:comment_id
// @desc Delete comment on a post
// @access Private
router.delete('/:post_id/comment/:comment_id', auth, async (req, res) => {
   try {
      const post = await Post.findById(req.params.post_id);
      const comment = post.comments.find(comment => comment.id.toString() === req.params.comment_id);
      // does comment exist?
      if(!comment) {
         return res.status(404).json({ msg: "Comment doesn't exist" });
      }
      // if the comment doesn't belong to the logged in user
      if(comment.user.toString() !== req.user.id) {
         return res.status(401).json({ msg: 'User not authorized' });
      }
      post.comments = post.comments.filter(comment => comment.id.toString() !== req.params.comment_id);
      await post.save();
      res.json(post.comments);
   }
   catch(err) {
      console.error(err);
      res.status(500).send('Server error');
   }
});
module.exports = router;
const express = require('express');
const { body, param, validationResult } = require('express-validator');
const Post = require('../models/post');
const router = express.Router();
const mongoose = require('mongoose');

// GET /api/posts
router.get('/', async (req, res, next) => {
  try {
    const posts = await Post.find().populate('categories');
    res.json(posts);
  } catch (err) { next(err); }
});

// GET /api/posts/:id
router.get('/:id',
  param('id').isMongoId(),
  async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

      const post = await Post.findById(req.params.id).populate('categories');
      if (!post) return res.status(404).json({ message: 'Post not found' });
      res.json(post);
    } catch (err) { next(err); }
  });

// POST /api/posts
router.post('/',
  body('title').isLength({ min: 3 }),
  body('content').isLength({ min: 10 }),
  async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

      const { title, content, categories = [], author, published } = req.body;
      const slug = title.toLowerCase().replace(/\s+/g, '-').slice(0, 200);
      const post = new Post({ title, slug, content, categories, author, published });
      await post.save();
      res.status(201).json(post);
    } catch (err) { next(err); }
  });

// PUT /api/posts/:id
router.put('/:id',
  param('id').isMongoId(),
  body('title').optional().isLength({ min: 3 }),
  body('content').optional().isLength({ min: 10 }),
  async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

      const post = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!post) return res.status(404).json({ message: 'Post not found' });
      res.json(post);
    } catch (err) { next(err); }
  });

// DELETE /api/posts/:id
router.delete('/:id', param('id').isMongoId(), async (req, res, next) => {
  try {
    await Post.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted' });
  } catch (err) { next(err); }
});

module.exports = router;


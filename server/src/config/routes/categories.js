const express = require('express');
const { body } = require('express-validator');
const Category = require('../models/category');
const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (err) { next(err); }
});

router.post('/', body('name').isLength({ min: 2 }), async (req, res, next) => {
  try {
    const { name } = req.body;
    const slug = name.toLowerCase().replace(/\s+/g, '-');
    const cat = new Category({ name, slug });
    await cat.save();
    res.status(201).json(cat);
  } catch (err) { next(err); }
});

module.exports = router;

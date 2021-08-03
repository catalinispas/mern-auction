const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');

// Item Model

const Item = require('../../models/Item');

// @route   Get api/items
// @desc    Get All Items
// @access  Public
router.get('/', (req, res) => {
  Item.find()
    .sort({ date: -1 })
    .then((item) => res.json(item));
});

// @route   POST api/items
// @desc    Create a Item
// @access  Public
router.post('/', auth, (req, res) => {
  const newItem = new Item({
    title: req.body.title,
    description: req.body.description,
    author: req.user.id,
  });
  console.log(
    `Adding new item with $title: ${req.body.title} and $description: ${req.body.description}`
  );
  newItem.save().then((item) => res.json(item));
});

module.exports = router;

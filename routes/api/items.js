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

// @route   GET api/items/:id
// @desc    Gets one item by id
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    return res.json(item);
  } catch (err) {
    console.log(err);
    return res.status(404).json({ msg: 'Item not found' });
  }
});

// @route   GET api/items/:id/bid
// @desc    Places a bid on a item by id
// @access  Private
router.post('/:id/bid', auth, async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    const newBid = {
      userId: req.user.id,
      amount: req.amount,
    };
    item.bids.push(newBid);
    return res.json(item);
  } catch (err) {
    console.log(err);
    return res.status(404).json({ msg: 'Item not found' });
  }
});

module.exports = router;

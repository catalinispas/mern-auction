const { query } = require('express');
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
  var newDate = new Date(Date.now() + req.body.duration * 60000);
  console.log(new Date(Date.now()), newDate);

  const newItem = new Item({
    title: req.body.title,
    description: req.body.description,
    author: req.user.id,
    endDate: newDate,
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

    // Check if bidding has ended
    if (item.endDate.getTime() < Date.now()) {
      return res.status(400).json({ msg: 'Bidding time is over!' });
    }

    const newBid = {
      userId: req.user.id,
      amount: req.body.amount,
      name: req.user.name,
    };
    console.log(
      `userID is "${newBid.userId}", item.maxBid is "${item.maxBid}" and newBid.amount is"${newBid.amount}"`
    );

    // Check if bidding is possible
    if (item.maxBid < newBid.amount) {
      item.maxBid = newBid.amount;
      item.maxBidUser = newBid.userId;

      item.bids = [newBid, ...item.bids];

      await item.save();

      return res.json(item);
    } else {
      return res.status(400).json({ msg: 'Bidding amount is too low' });
    }
  } catch (err) {
    console.log(err);
    return res.status(404).json({ msg: 'Item not found' });
  }
});

module.exports = router;

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const ItemSchema = new Schema({
  title: {
    type: 'String',
    required: true,
  },
  description: {
    type: 'String',
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  endDate: {
    type: Date,
    default: new Date(Date.now() + 5 * 60000),
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  bids: [
    {
      amount: {
        type: String,
        required: true,
      },
      date: {
        type: Date,
        default: Date.now,
      },
      userId: {
        type: String,
        required: true,
      },
    },
  ],
});

module.exports = Item = mongoose.model('Item', ItemSchema);

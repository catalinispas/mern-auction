const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const QuestionSchema = new Schema({
  text: {
    type: 'String',
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  responses: [
    {
      text: {
        type: String,
        required: true,
      },
      date: {
        type: Date,
        default: Date.now,
      },
      votes: {
        type: Number,
        default: 0,
      },
    },
  ],
});

module.exports = Question = mongoose.model('Question', QuestionSchema);

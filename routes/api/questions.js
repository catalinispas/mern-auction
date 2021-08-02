const express = require('express');
const router = express.Router();

// Question Model

const Question = require('../../models/Question');

// @route   Get api/questions
// @desc    Get All Questions
// @access  Public
router.get('/', (req, res) => {
  Question.find()
    .sort({ date: -1 })
    .then(question => res.json(question));
});

// @route   GET api/questions/:id
// @desc    Gets one question by id
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const question = await Question.findById(req.params.id);
    return res.json(question);
  } catch (error) {
    return res.status(404).json({ msg: 'Invalid id' });
  }
});

// @route   POST api/questions
// @desc    Create a Question
// @access  Public
router.post('/', (req, res) => {
  const newQuestion = new Question({
    text: req.body.text,
  });

  newQuestion.save().then(question => res.json(question));
});

// @route   POST api/questions/:id/responses
// @desc    Create a response to a question
// @access  Public
router.post('/:id/responses', async (req, res) => {
  try {
    const question = await Question.findById(req.params.id);

    const newResponse = {
      text: req.body.text,
    };

    question.responses.push(newResponse);

    await question.save();

    return res.json(question);
  } catch (error) {
    return res.status(404).json({ msg: 'Invalid id' });
  }
});

// @route   POST api/questions/:id/responses/:responseId/vote
// @desc    Votes on a response asociated with a question
// @access  Public
router.post('/:id/responses/:responseId/vote', async (req, res) => {
  try {
    const question = await Question.findById(req.params.id);
    const response = question.responses.find(r => {
      return r._id == req.params.responseId;
    });

    if (!response) {
      return res.status(404).json({ msg: 'Invalid response id' });
    }

    response.votes++;

    await question.save();

    return res.json(response);
  } catch (error) {
    console.log(error);
    return res.status(404).json({ msg: 'Invalid question id' });
  }
});

module.exports = router;

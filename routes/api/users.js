const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');

// User Model

const User = require('../../models/User');

// @route   POST api/users
// @desc    Register new user
// @access  Public
router.post('/', (req, res) => {
  const { name, email, password } = req.body;

  // Validation
  if (!name || !email || !password) {
    return res.status(400).json({ msg: 'Please add all fields' });
  }

  // Check if duplicate
  User.findOne({ email }).then((user) => {
    if (user) return res.status(400).json({ msg: 'User already registered' });

    const newUser = new User({
      name,
      email,
      password,
    });

    // Create salt & hashed password
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        if (err) throw err;
        newUser.password = hash;
        newUser.save().then((user) => {
          // Generate token
          jwt.sign(
            { id: user.id, name: user.name },
            config.get('jwtSecret'),
            // Set how much the user stays logged-in
            { expiresIn: 30000 },
            (err, token) => {
              if (err) throw err;
              console.log(`User: ${user.email} created`);
              res.json({
                token,
                user: {
                  // Don't return password
                  id: user.id,
                  name: user.name,
                  email: user.email,
                },
              });
            }
          );
        });
      });
    });
  });
});

// @route   POST api/users
// @desc    Register new user
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    return res.json(user);
  } catch (err) {
    console.log(err);
    return res.status(404).json({ msg: 'User not found' });
  }
});

module.exports = router;

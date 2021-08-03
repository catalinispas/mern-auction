const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');

// User Model

const User = require('../../models/User');

// @route   POST api/auth
// @desc    Authenticate User
// @access  Public
router.post('/', (req, res) => {
  const { email, password } = req.body;

  // Validation
  if (!email || !password) {
    return res.status(400).json({ msg: 'Please add all fields' });
  }

  // Check if duplicate
  User.findOne({ email }).then((user) => {
    if (!user) return res.status(400).json({ msg: 'Credentials Invalid' });

    // Validate password
    bcrypt.compare(password, user.password).then((isMatching) => {
      if (!isMatching)
        return res.status(400).json({ msg: 'Credentials Invalid' });
      jwt.sign(
        { id: user.id },
        config.get('jwtSecret'),
        // Set how much the user stays logged-in
        { expiresIn: 30000 },
        (err, token) => {
          if (err) throw err;
          console.log(`User: ${user.email} authenticated`);
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

module.exports = router;

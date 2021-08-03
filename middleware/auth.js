const config = require('config');
const jwt = require('jsonwebtoken');

function auth(req, res, next) {
  const token = req.header('x-auth-token');

  // Check token
  if (!token) {
    console.log(`Unauthorized request`);
    res.status(401).json({ msg: 'Unauthorized' });
  }

  try {
    // Check token
    const decoded = jwt.verify(token, config.get('jwtSecret'));

    // Add user from payload
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ msg: 'Invalid token' });
  }
}

module.exports = auth;

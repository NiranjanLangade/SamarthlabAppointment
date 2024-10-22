// backend/routes/adminRoutes.js
const express = require('express');
const router = express.Router();

const adminCredentials = {
  username: 'admin',
  password: 'password123',
};

// POST: Admin login
router.post('/login', (req, res) => {
  const { username, password } = req.body;

  if (username === adminCredentials.username && password === adminCredentials.password) {
    res.status(200).json({ message: 'Login successful', loggedIn: true });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
});

module.exports = router;

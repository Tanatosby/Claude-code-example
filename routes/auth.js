const express = require('express');
const bcrypt = require('bcryptjs');
const router = express.Router();

// Demo credentials (hashed at startup)
const USERS = {
  admin: bcrypt.hashSync('admin123', 10),
  operador: bcrypt.hashSync('op2024', 10),
};

// GET /login
router.get('/login', (req, res) => {
  if (req.session.user) return res.redirect('/dashboard');
  res.sendFile('login.html', { root: './public' });
});

// POST /login
router.post('/login', (req, res) => {
  const { username, password } = req.body;
  const hash = USERS[username];

  if (!hash || !bcrypt.compareSync(password, hash)) {
    return res.redirect('/login?error=1');
  }

  req.session.user = { username };
  res.redirect('/dashboard');
});

// POST /logout
router.post('/logout', (req, res) => {
  req.session.destroy(() => res.redirect('/login'));
});

module.exports = router;

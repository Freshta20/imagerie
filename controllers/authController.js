// ======== IMPORTS
const express = require('express');
const router = express.Router();

// ======== MODELS
const db = require('../models');

// ======== ROUTES
// GET register new User
router.get('/register', (req, res) => {
  res.render('auth/register', {
    title: 'Registration',
  });
});

// POST create new User
router.post('/register', async (req, res) => {
  console.log('user body: ', req.body);
  try {
  // check if user already exists in db
    const user = await db.User.findOne({username: req.body.username});
    if (user) {
      // user comes back as truthy, account exists
      // TODO: redirect to login with error message
      return res.send('Account already exists, please login');
    }
    // TODO: hash password
    const userData = {
      username: req.body.username,
      email: req.body.email,
    };
    // else, create user in database
    const newUser = await db.User.create(userData);
    // then, redirect to login page
    res.redirect('/auth/login');
  } catch (err) {
    res.send(err);
  }
});

// GET new login
router.get('/login', (req, res) => {
  res.render('auth/login', {
    title: 'Login',
  });
});

// POST create new session

// GET logout destroy session



// ======== EXPORTS
module.exports = router;
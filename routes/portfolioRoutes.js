const express = require('express');
const authenticateToken = require('../middlewares/authenticateToken');
const Portfolio = require('../models/Portfolio');

const router = express.Router();

router.get('/', authenticateToken, async (req, res) => {
  try {
    const portfolios= await Portfolio.find({ userId: req.user.userId });
    res.json(portfolios);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/', authenticateToken, async (req, res) => {
  try {
    const { about, education, certifications, experience } = req.body;
    const portfolio = new Portfolio({ about, education, certifications, experience, userId: req.user.userId });
    await portfolio.save();
    res.status(201).json(portfolio);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
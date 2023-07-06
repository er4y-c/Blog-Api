const Portfolio = require('../models/Portfolio');

const getPortfolio = async (req, res) => {
    try {
      const portfolios= await Portfolio.find({ userId: req.user.userId });
      res.json(portfolios);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
};

const createPortfolio = async (req, res) => {
    try {
      const { about, education, certifications, experience } = req.body;
      const portfolio = new Portfolio({ about, education, certifications, experience, userId: req.user.userId });
      await portfolio.save();
      res.status(201).json(portfolio);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
};

module.exports = { getPortfolio, createPortfolio };
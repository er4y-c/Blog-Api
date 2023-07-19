const Portfolio = require('../models/Portfolio');
const User = require('../models/User');

//@desc Get user's portfolio
//@route GET /api/portfolios
//@access public
const getPortfolio = async (req, res) => {
    try {
      const { username } = req.query;
      if (!username) {
        return res.status(400).json({ error: "Username query parameter is missing." });
      }

      const user = await User.findOne({ username: username });
      if (!user) {
        return res.status(404).json({ error: `User(${username}) not found` });
      }
      const portfolios= await Portfolio.findOne({ __v: user.__v });
      res.json(portfolios);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
};


//@desc Create personal portfolio
//@route POST /api/portfolios
//@access private
const createPortfolio = async (req, res) => {
    try {
      const { overview, services, experiences, technologies, education, certifications, projects } = req.body;
      const portfolio = new Portfolio({
        overview,
        services,
        experiences,
        technologies,
        education,
        certifications,
        projects,
        userId: req.user.userId
      });
      await portfolio.save();
      res.status(201).json(portfolio);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
};

module.exports = { getPortfolio, createPortfolio };
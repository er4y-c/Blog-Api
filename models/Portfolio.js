const mongoose = require('mongoose');

const PortfolioSchema = new mongoose.Schema({
  about: String,
  education: String,
  certifications: String,
  experience: String,
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
});

const Portfolio = mongoose.model('Portfolio', PortfolioSchema);

module.exports = Portfolio;
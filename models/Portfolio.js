const mongoose = require('mongoose');

const PortfolioSchema = new mongoose.Schema({
  about: String,
  education: [{
    school: String,
    degree: String,
    description: String,
    startDate: Date,
    endDate: Date,
  }],
  certifications: [{
    title: String,
    description: String,
    date: Date,
  }],
  experiences: [{
    company: String,
    position: String,
    description: String,
    type: String,
    startDate: Date,
    endDate: Date,
  }],
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
});

const Portfolio = mongoose.model('Portfolio', PortfolioSchema);

module.exports = Portfolio;
const mongoose = require('mongoose');

const PortfolioSchema = new mongoose.Schema({
  overview: String,
  services: [{
    title: String,
    icon: String,
  }],
  experiences: [{
    companyName: String,
    companyIcon: String,
    position: String,
    description: String,
    startDate: Date,
    endDate: Date,
    isCurrent: Boolean,
  }],
  technologies: [{
    icon: String,
    name: String,
  }],
  education: [{
    school: String,
    branch: String,
    icon: String,
    degree: String,
    gpa: String,
    description: String,
    startDate: Date,
    endDate: Date,
    isCurrent: Boolean
  }],
  certifications: [{
    title: String,
    icon: String,
    description: String,
    date: Date,
  }],
  projects: [{
    title: String,
    description: String,
    link: String,
    tags: [String],
  }],
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
});

const Portfolio = mongoose.model('Portfolio', PortfolioSchema);

module.exports = Portfolio;
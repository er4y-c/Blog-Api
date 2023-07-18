const mongoose = require('mongoose');

const PortfolioSchema = new mongoose.Schema({
  overview: String,
  services: [{
    id: Number,
    title: String,
    icon: String,
  }],
  experiences: [{
    id: Number,
    companyName: String,
    companyIcon: String,
    position: String,
    description: String,
    startDate: Date,
    endDate: Date,
    isCurrent: Boolean,
  }],
  technologies: [{
    id: Number,
    icon: String,
    name: String,
  }],
  education: [{
    id: Number,
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
    id: Number,
    title: String,
    icon: String,
    description: String,
    date: Date,
  }],
  projects: [{
    id: Number,
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
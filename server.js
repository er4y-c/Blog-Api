const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const blogRoutes = require('./routes/blogRoutes');
const portfolioRoutes = require('./routes/portfolioRoutes');

const app = express();
app.use(express.json());
const port = 8000;

mongoose.connect('mongodb://localhost:27017/blog-db', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use('/api/auth', authRoutes);
app.use('/api/blogs', blogRoutes);
app.use('/api/portfolios', portfolioRoutes);

app.listen(port, () => {
  console.log(`Server working on ${port}`);
});
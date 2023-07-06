const mongoose = require('mongoose');

const BlogSchema = new mongoose.Schema({
  title: String,
  keys: [String],
  content: String,
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
});

const Blog = mongoose.model('Blog', BlogSchema);

module.exports = Blog;
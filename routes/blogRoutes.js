const express = require('express');
const authenticateToken = require('../middlewares/authenticateToken');
const Blog = require('../models/Blog');

const router = express.Router();

router.get('/', authenticateToken, async (req, res) => {
  try {
    const blogs = await Blog.find({ userId: req.user.userId });
    res.json(blogs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/', authenticateToken, async (req, res) => {
  try {
    const { title, keys, content } = req.body;
    const blog = new Blog({ title, keys, content, userId: req.user.userId });
    await blog.save();
    res.status(201).json(blog);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
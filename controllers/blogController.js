const Blog = require('../models/Blog');

const getAllBlogs = async (req, res) => {
    try {
      const blogs = await Blog.find({ userId: req.user.userId });
      res.status(200).json(blogs);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
};

const createBlog = async (req, res) => {
    try {
      const { title, keys, content } = req.body;
      const blog = new Blog({ title, keys, content, userId: req.user.userId });
      await blog.save();
      res.status(201).json(blog);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
};

module.exports = { getAllBlogs, createBlog };
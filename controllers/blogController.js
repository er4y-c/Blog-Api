const Blog = require('../models/Blog');

//@desc Get all blogs of User
//@route POST /api/blogs/
//@access private
const getAllBlogs = async (req, res) => {
    try {
      const blogs = await Blog.find({ userId: req.user.userId });
      res.status(200).json(blogs);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
};

//@desc Create new blog
//@route POST /api/blogs/create
//@access private
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
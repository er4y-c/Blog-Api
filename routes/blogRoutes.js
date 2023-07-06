const express = require('express');
const authenticateToken = require('../middlewares/authenticateToken');
const blogController = require('../controllers/blogController');
const router = express.Router();

router.get('/', authenticateToken, blogController.getAllBlogs);

router.post('/', authenticateToken, blogController.createBlog);

module.exports = router;
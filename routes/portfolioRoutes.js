const express = require('express');
const authenticateToken = require('../middlewares/authenticateToken');
const portfolioController = require("../controllers/portfolioController");
const router = express.Router();

router.get('/', portfolioController.getPortfolio);

router.post('/', authenticateToken, portfolioController.createPortfolio);

module.exports = router;
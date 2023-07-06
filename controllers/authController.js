const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv").config();

//@desc Register a user
//@route POST /api/auth/register
//@access public
const registerController = async (req, res) => {
  try {
    const { name, username, email, password } = req.body;
    if(!username || !email || !password || !name) {
      res.status(400).json({
        message: "Tüm değerler dolu olmalıdır."
      });
      return;
    }
    const currentUser = await User.findOne({ email, password });
    if(currentUser) {
      res.status(500).json({
        message: "Email adresiyle kayıtlı kullanıcı mevcut"
      })
      return;
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      username,
      email,
      password: hashedPassword
    });
    await user.save();
    res.status(201).json({ message: 'Kullanıcı kaydı başarıyla oluşturuldu' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//@desc User Login
//@route POST /api/auth/login
//@access public
const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    if(!email || !password) {
      res.status(400).json({
        message: "Tüm değerler dolu olmalıdır."
      })
      return;
    }
    const user = await User.findOne({ email });
    if (user && (await bcrypt.compare(password, user.password))) {
      const token = jwt.sign(
        {
          user: {
            username: user.username,
            email: user.email,
            id: user.id,
          },
        },
        process.env.SECRET_KEY,
        { expiresIn: "30m" },
        { algorithm: 'RS256' }
      );
      res.status(200).json({ token });
    } else {
      res.status(401).json({
        message: "Kullanıcı bulunamadı"
      })
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { registerController, loginController };
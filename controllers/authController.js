const User = require('../models/User');

const registerController = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = new User({ username, password });
    await user.save();
    res.status(201).json({ message: 'Kullanıcı kaydı başarıyla oluşturuldu' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const loginController = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username, password });
    if (!user) {
      res.status(401).json({ error: 'Kullanıcı adı veya şifre hatalı' });
      return;
    }
    const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY);
    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { registerController, loginController };
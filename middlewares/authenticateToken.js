const jwt = require('jsonwebtoken');
const dotenv = require('dotenv')

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers.Authorization || req.headers.authorization;
  const token = authHeader && authHeader.startsWith("Bearer") && authHeader.split(' ')[1];
  if (token == null) {
    res.status(401).json({ error: 'Kimlik doğrulama başarısız' });
    return;
  }
  jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
    if (err) {
      res.status(403).json({ error: 'Geçersiz token' });
      return;
    }
    req.user = user;
    next();
  });
}

module.exports = authenticateToken;
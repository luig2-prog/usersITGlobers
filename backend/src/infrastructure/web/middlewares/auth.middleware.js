const jwt = require('jsonwebtoken');

function authMiddleware(req, res, next) {
  const token = req.header('x-token');

  if (!token) {
    return res.status(401).json({
      success: false,
      error: 'Token requerido'
    });
  }

  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      error: 'Token inválido'
    });
  }
}

module.exports = authMiddleware;
module.exports = {
  port: process.env.PORT || 3001,
  mongoUriAuth: process.env.MONGO_URI_AUTH || "mongodb://auth-db:27017/auth",
  jwtSecret: process.env.JWT_SECRET || "secret-key",
};

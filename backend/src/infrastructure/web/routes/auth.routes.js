const express = require("express");
const authMiddleware = require("../middlewares/auth.middleware");

module.exports = function (authController) {
  const router = express.Router();

  router.post("/register", (req, res) => authController.register(req, res));
  router.post("/login", (req, res) => authController.login(req, res));

  router.get("/users", authMiddleware, (req, res) => authController.getUsers(req, res));
  router.get("/validate-token", authMiddleware, (req, res) =>
    authController.validateToken(req, res)
  );
  router.post("/logout", authMiddleware, (req, res) => authController.logout(req, res));

  return router;
};

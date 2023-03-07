const express = require("express");
const router = express.Router();
const {
  registration,
  login,
  getUser,
  forgotPassword,
  resetPassword,
} = require("../controllers/userController");

router.post("/register", registration);
router.post("/login", login);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);

router.get("/api/v1/get-user", getUser);

module.exports = router;

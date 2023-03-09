const express = require("express");
const router = express.Router();
const {
  registration,
  login,
  getUser,
  forgotPassword,
  resetPassword,
  greetMsgUpdate,
} = require("../controllers/userController");

router.post("/register", registration);
router.post("/login", login);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);

router.get("/api/v1/get-user", getUser);
router.patch("/api/v1/greet-msg-update", greetMsgUpdate);

module.exports = router;

const express = require("express");
const router = express.Router();
const {
  registration,
  login,
  getUser,
} = require("../controllers/userController");

router.post("/register", registration);
router.route("/login").post(login);

router.get("/api/v1/get-user", getUser);

module.exports = router;

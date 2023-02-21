const express = require("express");
const router = express.Router();
const { Login, Registration } = require("../controllers/userController");

router.route("/register").post(Registration);
router.route("/login").post(Login);

module.exports = router;
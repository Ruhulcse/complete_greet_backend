const express = require("express");
const router = express.Router();
const { createBubble } = require("../controllers/bubbleController");

router.route("/create").post(createBubble);
module.exports = router;
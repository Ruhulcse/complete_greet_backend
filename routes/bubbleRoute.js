const express = require("express");
const router = express.Router();
const { createBubble } = require("../controllers/bubbleController");

router.route("/api/v1/bubble/create").post(createBubble);
module.exports = router;
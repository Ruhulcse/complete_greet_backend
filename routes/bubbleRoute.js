const express = require("express");
const router = express.Router();
const { createBubble, uploadVideo } = require("../controllers/bubbleController");

router.route("/api/v1/bubble/create").post(createBubble);
router.route("/api/v1/bubble/video_upload").post(uploadVideo);
module.exports = router;
const express = require("express");
const router = express.Router();
const {
  createBubble,
  uploadVideo,
  editBubble,
  deleteBubble,
} = require("../controllers/bubbleController");

router.route("/api/v1/bubble/create").post(createBubble);
router.route("/api/v1/bubble/edit/:id").patch(editBubble);
router.route("/api/v1/bubble/delete/:id").patch(deleteBubble);
router.route("/api/v1/bubble/video_upload").post(uploadVideo);
module.exports = router;

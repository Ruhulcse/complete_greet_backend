const express = require("express");
const router = express.Router();
const {
  createBubble,
  uploadVideo,
  editBubble,
  deleteBubble,
  getAllBubble,
  getSingleBubble,
} = require("../controllers/bubbleController");

router.route("/api/v1/bubble/create").post(createBubble);
router.route("/api/v1/bubble/edit/:id").patch(editBubble);
router.route("/api/v1/bubble/delete/:id").patch(deleteBubble);
router.route("/api/v1/bubble/video_upload").post(uploadVideo);
router.route("/api/v1/bubble/single_bubble/:bubble_code").get(getSingleBubble);
router.route("/api/v1/bubble/all_bubble").get(getAllBubble);
module.exports = router;

const router = require("express").Router();
const { addMessage, getMessage, deleteMessage } = require("../controllers/messageController");

router.post("/api/v1/add-message", addMessage);
router.get("/api/v1/get-message", getMessage);
router.delete("/api/v1/delete-message/:id", deleteMessage);

module.exports = router;

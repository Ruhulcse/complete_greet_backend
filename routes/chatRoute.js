const router = require("express").Router();
const { addChat, getChat, deleteChat } = require("../controllers/chatController");

router.post("/api/v1/add-chat", addChat);
router.get("/api/v1/get-chat", getChat);
router.delete("/api/v1/delete-chat/:id", deleteChat);

module.exports = router;

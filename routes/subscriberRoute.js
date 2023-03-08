const router = require("express").Router();
const { addSubscriber, getSubscriber, deleteSubscriber } = require("../controllers/subscriberController");

router.post("/api/v1/add-subscriber", addSubscriber);
router.get("/api/v1/get-subscriber", getSubscriber);
router.delete("/api/v1/delete-subscriber/:id", deleteSubscriber);

module.exports = router;

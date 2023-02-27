const router = require('express').Router();
const { addNote } = require("../controllers/noteController");

router.post('/api/v1/add-note', addNote);
// router.route('/api/v1/get-note').post('');
// router.route('/api/v1/delete-note').post('');

module.exports = router;
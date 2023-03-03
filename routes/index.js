const users = require('../routes/userRoute');
const notes = require('../routes/noteRoute');
const bugs = require('../routes/bugRoute');

module.exports = [
    users,
    notes,
    bugs,
];
const users = require('../routes/userRoute');
const notes = require('../routes/noteRoute');
const bugs = require('../routes/bugRoute');
const subscribers = require('../routes/subscriberRoute');
const visitors = require('../routes/visitorRoute');

module.exports = [
    users,
    notes,
    bugs,
    subscribers,
    visitors,
];
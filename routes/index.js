const users = require('../routes/userRoute');
const notes = require('../routes/noteRoute');
const bugs = require('../routes/bugRoute');
const subscribers = require('../routes/subscriberRoute');
const visitors = require('../routes/visitorRoute');
const bubbles = require('../routes/bubbleRoute');

module.exports = [
    users,
    notes,
    bugs,
    subscribers,
    visitors,
    bubbles
];
const nodemailer = require("nodemailer");
const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
      user: 'alicia.leffler17@ethereal.email',
      pass: '4ezxZvvNcGW8uhprdN',
    },
  });
  module.exports = transporter;

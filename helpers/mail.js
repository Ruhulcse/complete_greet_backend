const nodemailer = require("nodemailer");

// const transporter = nodemailer.createTransport({
//   service: "gmail",
//   auth: {
//     user: process.env.APP_EMAIL,
//     pass: process.env.APP_EMAIL_PASS,
//   },
// });

const transporter = nodemailer.createTransport({
  host: 'smtp.ethereal.email',
  port: 587,
  auth: {
      user: 'randy.gottlieb@ethereal.email',
      pass: 'Dn5VGFDQKTGBxcGcq2'
  }
});

module.exports.sendMail = (mailOptions) => {
  return new Promise((resolve, reject) => {
    transporter.sendMail(mailOptions, function (err, info) {
      if (err) {
        console.error('mail error -> ', err);
        return reject(err);
      } else {
        return resolve(info);
      }
    });
  });
};

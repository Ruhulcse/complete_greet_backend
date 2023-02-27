const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.APP_EMAIL,
    pass: process.env.APP_EMAIL_PASS,
  },
});

// const transporter = nodemailer.createTransport({
//     host: 'smtp.ethereal.email',
//     port: 587,
//     auth: {
//       user: 'alicia.leffler17@ethereal.email',
//       pass: '4ezxZvvNcGW8uhprdN',
//     },
//   });

module.exports.sendMail = (mailOptions) => {
  return new Promise((resolve, reject) => {
    transporter.sendMail(mailOptions, function (err, info) {
      if (err) {
        return reject(err);
      } else {
        return resolve(info);
      }
    });
  });
};

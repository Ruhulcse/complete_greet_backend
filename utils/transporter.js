const nodemailer = require("nodemailer");

const transporter = async(plaintextPassword) =>{
    let transporter = await nodemailer.createTransport({
        pool: true,
        host: "secure.emailsrvr.com",
        port: 465,
        secure: true, // use TLS
        auth: {
            user: "contact@completegreet.com", // generated ethereal user
            pass: "1212921509Azad",
        },
    });
    return transporter;
 }

 module.exports = transporter;
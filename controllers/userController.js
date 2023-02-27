const asyncHandler = require("express-async-handler");
const crypto = require("crypto");
const knex = require("../db/db");
const transporter = require("../utils/transporter");
const nodemailer = require("nodemailer");
const RegistrationMailTemplate = require("../mail_templates/registrationMail");
const { hashPassword, comparePassword } = require("../helpers/password_hash");
const jwt = require("../helpers/jwt");

//Login for Users
const Login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await knex("Users")
    .select("email", "password")
    .first()
    .where("email", email);
  if (!user) {
    return res
      .status(404)
      .json({ error: true, message: "User not registered", data: [] });
  }
  const isMatch = await comparePassword(password, user.password);
  if (!isMatch) {
    return res
      .status(401)
      .json({ error: true, message: "invalid credential", data: [] });
  }
  const payload = {
    email: user.email
  };
  const token = await jwt.encode(payload);
  res.json({
    error: false,
    message: "successfully login",
    data: {
      token,
    },
  });
});

////Registration  for Users
const Registration = asyncHandler(async (req, res) => {
  try {
    const {
      Name,
      email,
      password,
      BusinessName,
      WebsiteURL,
      Industry,
      Goals,
    } = req.body;
    const payload = {
      Name,
      email,
      BusinessName,
      WebsiteURL,
      Industry,
      Goals,
      isEnrolled: 0,
      Banned: 0,
      Verified: 0,
      GreetMsg: "Hey, thanks for visiting! Feel free to ask anything.",
      VerifyCode: crypto.randomBytes(5).toString("hex"),
      password: await hashPassword(password),
    };
    isUserExist = await knex("Users")
      .select("Name")
      .first()
      .where("email", email);
    if (isUserExist) {
      return res
        .status(409) //conflict
        .json({
          error: true,
          message: "This email has been already registered",
          data: [],
        });
    }
    const createUser = await knex("Users").insert(payload, 'id');
    //   let transporter = await nodemailer.createTransport({
    //     pool: true,
    //     host: "secure.emailsrvr.com",
    //     port: 465,
    //     secure: true, // use TLS
    //     auth: {
    //         user: "contact@completegreet.com", // generated ethereal user
    //         pass: "1212921509Azad",
    //     },

    // });
    //   let mailOptions = {
    //     from: '"Complete Greet" <contact@completegreet.com>',
    //     to: email,
    //     subject: "Registration",
    //     html: RegistrationMailTemplate,
    //   };
    //   transporter.sendMail(mailOptions, function (error, info) {
    //     if (error) {
    //       console.log(error);
    //     } else {
    //       console.log("Email sent: " + info.response);
    //     }
    //   });
    res.status(201).json({
      error: true,
      message: "successfully registration",
      data: createUser,
    });
  } catch (error) {
    console.log(error);
  }
});
module.exports = {
  Login,
  Registration,
};

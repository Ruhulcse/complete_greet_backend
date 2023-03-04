const asyncHandler = require("express-async-handler");
const crypto = require("crypto");
const knex = require("../db/db");
const { sendMail } = require("../helpers/mail");
const RegistrationMailTemplate = require("../mail_templates/registrationMail");
const { hashPassword, comparePassword } = require("../helpers/password_hash");
const jwt = require("../helpers/jwt");

// Login for Users
module.exports.login = asyncHandler(async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await knex("Users")
      .select("email", "password", "id")
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
      user_id: user.id,
      email: user.email,
    };
    const token = await jwt.encode(payload);
    res.json({
      error: false,
      message: "successfully login",
      data: {
        token,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: true,
      message: "Something went wrong!!",
      data: null,
    });
  }
});

// Registration for Users
module.exports.registration = asyncHandler(async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      business_name,
      website_url,
      industry,
      goals,
    } = req.body;
    const payload = {
      name,
      email,
      business_name,
      website_url,
      industry,
      goals,
      is_enrolled: 0,
      banned: 0,
      verified: 0,
      greet_msg: "Hey, thanks for visiting! Feel free to ask anything.",
      verify_code: crypto.randomBytes(5).toString("hex"),
      password: await hashPassword(password),
    };      

    isUserExist = await knex("Users")
      .select("name")
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
    const createUser = await knex("Users").insert(payload);
    console.log("🚀 ~ file: userController.js:92 ~ module.exports.registration=asyncHandler ~ createUser:", createUser)

    // let mailOptions = {
    //   from: '"Complete Greet" <contact@completegreet.com>',
    //   to: email,
    //   subject: "Registration",
    //   html: RegistrationMailTemplate,
    // };
    // let mailInfo = await sendMail(mailOptions);
    // if (!mailInfo) {
    //   throw new ErrorHandler("Mail send failed.", 500);
    // } else {
    //   console.log("Email sent: " + mailInfo);
    // }
    res.status(201).json({
      error: true,
      message: "successfully registration",
      data: createUser,
    });
  } catch (error) {
    res.status(500).json({
      error: true,
      message: "Something went wrong!!",
      data: null,
    });
  }
});

// Get All users
module.exports.getUser = asyncHandler(async (req, res) => {
  try {
    const { query } = req;
    const bugs = await knex("Users")
      .where(query)
      .orderBy("id", "desc");
    if (!bugs) {
      return res
        .status(400)
        .json({ error: true, message: "User Retrive Failed!", data: [] });
    }

    res.json({
      error: false,
      message: "User Retrive Successfully",
      data: bugs,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: true,
      message: "Something went wrong!!",
      data: null,
    });
  }
});


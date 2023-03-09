const asyncHandler = require("express-async-handler");
const crypto = require("crypto");
const knex = require("../db/db");
const { sendMail } = require("../helpers/mail");
const RegistrationMailTemplate = require("../mail_templates/registrationMail");
const {
  hashPassword,
  comparePassword,
  checkPasswordFormat,
} = require("../helpers/password_hash");
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

    if (!checkPasswordFormat(password)) {
      res.status(500).json({
        error: true,
        message: "Please fillup all criteria of password!",
        data: null,
      });
    }
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
    const date = new Date();
    const end_subscribe_date = new Date(date.setMonth(date.getMonth() + 1));
    const subscriberPayload = {
      pname: "Free",
      pcode: "CGBasicPType",
      subscriber: name,
      subscriber_id: createUser[0],
      price: 0,
      duration: 1,
      current_month: 1,
      end_subscribe_date,
      plan_id: 1,
      user_id: createUser[0],
      is_active: 1,
      is_finished: 0,
    };
    const subscriber = await knex("Subscribers").insert(subscriberPayload);
    if (!subscriber) {
      return res
        .status(400)
        .json({ error: true, message: "Subscriber Add Failed!", data: [] });
    }
    res.status(201).json({
      error: false,
      message: "successfully registration",
      data: { createUser, subscriberPayload },
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

// Forgot Password for Users
module.exports.forgotPassword = asyncHandler(async (req, res) => {
  try {
    const { body } = req;

    const user = await knex("Users")
      .select("id", "email")
      .first()
      .where("email", body.email);
    if (!user) {
      return res.status(400).json({
        error: true,
        message: "User with this email not exists.",
        data: [],
      });
    }
    const payload = {
      user_id: user.id,
      email: user.email,
    };
    const token = await jwt.encode(payload);
    const url = process.env.CLIENT_BASE_URL || "http://localhost:4000";
    let mailOptions = {
      from: `Complete Greet <alicia.leffler17@ethereal.email>`,
      to: body.email,
      subject: `The subject goes here`,
      html: `<h2>Please click on given link to reset your password.</h2>
              <p>${url}/reset-password/${token}</p>`,
    };

    const updateUser = await knex("Users")
      .update({ pass_reset: token })
      .where("email", body.email);
    if (!updateUser) {
      return res.status(400).json({
        error: true,
        message: "Reset password link error.",
        data: null,
      });
    } else {
      let mailInfo = await sendMail(mailOptions);
      console.log(
        "🚀 ~ file: userController.js:164 ~ module.exports.forgotPassword=asyncHandler ~ mailInfo:",
        mailInfo
      );
      if (!mailInfo) {
        return res.status(400).json({
          error: true,
          message: "Mail send failed.",
          data: null,
        });
      }
      return res.status(200).json({
        error: false,
        message: "Mail send successfully.",
        data: token,
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: true,
      message: "Something went wrong!!",
      data: null,
    });
  }
});

// Reset Password for Users
module.exports.resetPassword = asyncHandler(async (req, res) => {
  try {
    const { new_password, confirm_password, reset_link } = req.body;
    if (new_password !== confirm_password) {
      res.status(400).json({
        error: true,
        message: "Password not match!.",
        data: null,
      });
    }
    if (!checkPasswordFormat(new_password)) {
      res.status(500).json({
        error: true,
        message: "Please fillup all criteria of password!",
        data: null,
      });
    }
    const hashPass = await hashPassword(new_password);
    if (reset_link) {
      const tokenData = await jwt.decode(reset_link);
      if (!tokenData) {
        res.status(400).json({
          error: true,
          message: "Invalid reset token!.",
          data: null,
        });
      }
      let user = await knex("Users")
        .update({ password: hashPass })
        .where({ id: tokenData.user_id });
      if (!user) {
        res.status(404).json({
          error: true,
          message: "User not found.",
          data: null,
        });
      }
      return res.status(200).json({
        error: false,
        message: "Password reset successfully.",
        data: null,
      });
    }
  } catch (error) {
    console.error(error);
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
    const users = await knex("Users").where(query).orderBy("id", "desc");
    if (!users) {
      return res
        .status(400)
        .json({ error: true, message: "User Retrive Failed!", data: [] });
    }

    res.json({
      error: false,
      message: "User Retrive Successfully",
      data: users,
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

// Greet Msg Update
module.exports.greetMsgUpdate = asyncHandler(async (req, res) => {
  try {
    const { body, user } = req;
    if (body.greet_msg !== "") {
      const users = await knex("Users")
        .update({ greet_msg: body.greet_msg })
        .where({ id: user.user_id });

      res.json({
        error: false,
        message: "User Update Successfully",
        data: users,
      });
    }
    return res
      .status(400)
      .json({ error: true, message: "User update failed!", data: null });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: true,
      message: "Something went wrong!!",
      data: null,
    });
  }
});

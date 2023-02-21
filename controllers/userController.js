const asyncHandler = require("express-async-handler");
const createError = require("http-errors");
const knex = require("../db/db");
const generateToken = require("../utils/generateToken");
const { hashPassword, comparePassword } = require("../utils/hashPassword");

//Login for Users
const Login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await knex("users")
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
  res.json({
    error:false,
    message: "successfully login",
    data: {
      token: generateToken(user.email)
    },
  });

});

////Registration  for Users
const Registration = asyncHandler(async (req, res) => {
  const { email, first_name, last_name, password } = req.body;
  const payload = {
    email,
    first_name,
    last_name,
    password: await hashPassword(password),
  };
  try {
    const createUser = await knex("users").insert(payload).returning("id");
    res.json({
      message: "successfully registration",
      data: {
        email,
      },
    });
  } catch (error) {
    console.log(error);
  }
});
module.exports = {
  Login,
  Registration,
};

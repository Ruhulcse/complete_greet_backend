const asyncHandler = require("express-async-handler");
const knex = require("../db/db");
// const generateToken = require("../utils/generateToken");

//Login for Users
const Login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (user && (await user.matchPassword(password))) {
    res.json({
      message: "login success",
      _id: user._id,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(202).send(new Error("invalid user name or password"));
  }
});

////Registration  for Users
const Registration = asyncHandler(async (req, res) => {
 const {email,first_name, last_name} = req.body;
 const payload = {
    email,
    first_name,
    last_name
 }
  try {
    const createUser = await knex('users').insert(payload);
    res.json({
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
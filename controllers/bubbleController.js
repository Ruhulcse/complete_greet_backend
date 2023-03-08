const asyncHandler = require("express-async-handler");
const crypto = require("crypto");
const knex = require("../db/db");
const transporter = require("../utils/transporter");
const RegistrationMailTemplate = require("../mail_templates/registrationMail");
const { hashPassword, comparePassword } = require("../helpers/password_hash");
const jwt = require("../helpers/jwt");

//bubble create
const createBubble = asyncHandler(async (req, res) => {
  console.log("api called... ");
});

module.exports = {
 createBubble
};

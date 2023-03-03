const asyncHandler = require("express-async-handler");
const knex = require("../db/db");
const { makeid } = require("../helpers/common");

// Add bug
module.exports.addBug = asyncHandler(async (req, res) => {
  try {
    const { body, user } = req;
    if (body.BugText !== "") {
      const payload = {
        BugText: body.BugText,
        BugCode: makeid(7),
        UserId: user.user_id,
        isDeleted: 0,
      };
      const bug = await knex("Bugs").insert(payload);
      if (!bug) {
        return res
          .status(400)
          .json({ error: true, message: "Bug Add Failed!", data: [] });
      }

      res.json({
        error: false,
        message: "Bug Added Successfully",
        data: bug,
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

// Get All bugs
module.exports.getBug = asyncHandler(async (req, res) => {
  try {
    const { user } = req;
    const bugs = await knex("Bugs")
      .where({
        UserId: user.user_id,
        isDeleted: 0,
      })
      .orderBy("id", "desc");
    if (!bugs) {
      return res
        .status(400)
        .json({ error: true, message: "Bug Retrive Failed!", data: [] });
    }

    res.json({
      error: false,
      message: "Bug Retrive Successfully",
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

// Delete bug
module.exports.deleteBug = asyncHandler(async (req, res) => {
  try {
    const { params, user } = req;
    if (!params.id) {
      return res
        .status(400)
        .json({ error: true, message: "Bug id not provide!", data: [] });
    }
    const bug = await knex("Bugs")
      .update({
        isDeleted: 1,
      })
      .where({
        id: params.id,
        UserId: user.user_id,
      });
    if (!bug) {
      return res
        .status(400)
        .json({ error: true, message: "Bug Ddelete Failed!", data: [] });
    }

    res.json({
      error: false,
      message: "Bug Delete Successfully",
      data: params.id,
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

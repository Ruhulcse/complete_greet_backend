const asyncHandler = require("express-async-handler");
const knex = require("../db/db");

// Add visitor
module.exports.addVisitor = asyncHandler(async (req, res) => {
  try {
    const { body, user } = req;
    const payload = {
      ...body,
      user_id: user.user_id,
    };
    const visitor = await knex("Visitors").insert(payload);
    if (!visitor) {
      return res
        .status(400)
        .json({ error: true, message: "Visitor Add Failed!", data: [] });
    }

    res.json({
      error: false,
      message: "Visitor Added Successfully",
      data: visitor,
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

// Get All visitors
module.exports.getVisitor = asyncHandler(async (req, res) => {
  try {
    const { user } = req;
    const visitors = await knex("Visitors")
      .where({
        user_id: user.user_id,
      })
      .orderBy("id", "desc");
    if (!visitors) {
      return res
        .status(400)
        .json({ error: true, message: "Visitor Retrive Failed!", data: [] });
    }

    res.json({
      error: false,
      message: "Visitor Retrive Successfully",
      data: visitors,
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

// Delete visitor
module.exports.deleteVisitor = asyncHandler(async (req, res) => {
  try {
    const { params, user } = req;
    if (!params.id) {
      return res
        .status(400)
        .json({ error: true, message: "Visitor id not provide!", data: [] });
    }
    const visitor = await knex("Visitors")
      .del()
      .where({
        id: params.id,
        user_id: user.user_id,
      });
    if (!visitor) {
      return res
        .status(400)
        .json({ error: true, message: "Visitor Ddelete Failed!", data: [] });
    }

    res.json({
      error: false,
      message: "Visitor Delete Successfully",
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

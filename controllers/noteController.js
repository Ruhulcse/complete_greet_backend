const asyncHandler = require("express-async-handler");
const knex = require("../db/db");
const { makeid } = require("../helpers/common");

// Add note
module.exports.addNote = asyncHandler(async (req, res) => {
  try {
    const { body, user } = req;
    if (body.NoteText !== "") {
      const payload = {
        NoteText: body.NoteText,
        NoteCode: makeid(7),
        UserId: user.id,
        isDeleted: 0,
      };
      const note = await knex("Notes").insert(payload);
      if (!note) {
        return res
          .status(400)
          .json({ error: true, message: "Note Add Failed!", data: [] });
      }

      res.json({
        error: false,
        message: "Note Added Successfully",
        data: note,
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

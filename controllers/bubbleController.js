const asyncHandler = require("express-async-handler");
const { bubbleCode } = require("../helpers/common");
const knex = require("../db/db");
//bubble create
const createBubble = asyncHandler(async (req, res) => {
  const payload = generateBubbleCreatePayload(req);
  try {
      const result = await knex("Bubbles").insert(payload);
      res.status(201).json({
        error: false,
        message: "successfully bubble created",
        data: result,
      });
  } catch (error) {
    res.status(500).json({
      error: true,
      message: "Something went wrong!!",
      data: null,
    });
  }
});
const generateBubbleCreatePayload = (req) => {
  // console.log(req.user)
  const {
    bubble_name,
    bubble_video,
    bubble_gif,
    bubble_font_size,
    bubble_title,
    bubble_size,
    bubble_border_color,
    bubble_background_color,
    bubble_button_color,
    bubble_font_family,
    bubble_darken,
    bubble_style,
    bubble_position,
    bubble_video_fit,
    bubble_delay,
    bubble_animation,
    is_deleted
  } = req.body;
  const payload = {
    bubble_name,
    bubble_video,
    bubble_gif,
    bubble_font_size,
    bubble_title,
    bubble_size,
    bubble_border_color,
    bubble_background_color,
    bubble_button_color,
    bubble_font_family,
    bubble_darken,
    bubble_style,
    bubble_position,
    bubble_video_fit,
    bubble_delay,
    bubble_animation,
    is_deleted,
    bubble_code: bubbleCode(),
    user_id:req.user.user_id
  };
  return payload;
};
module.exports = {
  createBubble,
};

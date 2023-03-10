const asyncHandler = require("express-async-handler");
const multer = require("multer");
const fs = require("fs");
const { bubbleCode } = require("../helpers/common");
const knex = require("../db/db");
//upload video bubble
const uploadVideo = asyncHandler(async (req, res) => {
  const allowedMimeTypes = [
    'video/mp4',
    'video/mov',
    'video/wmv',
    'video/avi',
    'video/mkv',
    'video/webm',
    'video/ogg'
  ];
  const maxVideoSize = 5 * 1024 * 1024; // 5MB
  const user_id = req.user.user_id;
  const storage = multer.diskStorage({
    destination: (req, file, callback) => {
      const path = `public/files/users/${user_id}/Bubble-Videos/`;
      fs.mkdirSync(path, { recursive: true });
      callback(null, path);
    },
    filename: (req, file, cb) => {
      const path = require('path');
      const filename = `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`;
      cb(null, filename);
    }
  });
  const upload = multer({
    storage: storage,
    limits: { fileSize: maxVideoSize },
    fileFilter: function (req, file, cb) {
      if (!allowedMimeTypes.includes(file.mimetype)) {
        const error = new Error(`Invalid file type. Only ${allowedMimeTypes.join(', ')} files are allowed.`);
        error.statusCode = 400;
        return cb(error);
      }
      cb(null, true);
    }
  }).single('video');

  upload(req, res, (err) => {
    if (err) {
      console.error(err);
      return res.status(500).json({
        error: true,
        message: "Error uploading video",
        data: null
      });
    }
    return res.status(201).json({
      error: false,
      message: "Successfully uploaded video",
      data: req.file.filename
    });
  });
});
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
    console.error(error);
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
    is_deleted,
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
    user_id: req.user.user_id,
  };
  return payload;
};
module.exports = {
  createBubble,
  uploadVideo,
};

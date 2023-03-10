const asyncHandler = require("express-async-handler");
const multer = require("multer");
const fs = require("fs");
const { bubbleCode } = require("../helpers/common");
const knex = require("../db/db");
//upload bubble video
const uploadVideo = asyncHandler(async (req, res) => {
  const allowedMimeTypes = [
    "video/mp4",
    "video/mov",
    "video/wmv",
    "video/avi",
    "video/mkv",
    "video/webm",
    "video/ogg",
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
      const path = require("path");
      const filename = `${file.fieldname}-${Date.now()}${path.extname(
        file.originalname
      )}`;
      cb(null, filename);
    },
  });
  const upload = multer({
    storage: storage,
    limits: { fileSize: maxVideoSize },
    fileFilter: function (req, file, cb) {
      if (!allowedMimeTypes.includes(file.mimetype)) {
        const error = new Error(
          `Invalid file type. Only ${allowedMimeTypes.join(
            ", "
          )} files are allowed.`
        );
        error.statusCode = 400;
        return cb(error);
      }
      cb(null, true);
    },
  }).single("video");

  upload(req, res, (err) => {
    if (err) {
      console.error(err);
      return res.status(500).json({
        error: true,
        message: "Error uploading video",
        data: null,
      });
    }
    return res.status(201).json({
      error: false,
      message: "Successfully uploaded video",
      data: req.file.filename,
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
//edit bubble video
const editBubble = asyncHandler(async (req, res) => {
  const bubble_id = req.params.id;
  const payload = await generateBubbleUpdatePayload(req, bubble_id);
  try { 
    await knex('Bubbles').update(payload).where({
      id: bubble_id,
      is_deleted:0
    })
    res.status(201).json({
      error: false,
      message: "successfully bubble updated",
      data: req.params,
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
//delete bubble video 
const deleteBubble = asyncHandler(async(req,res)=>{
  const bubble_id = req.params.id;
  try {
    await knex('Bubbles').update({is_deleted:1}).where({
      id: bubble_id,
      is_deleted:0
    })
    res.status(201).json({
      error: false,
      message: "successfully bubble deleted",
      data: req.params,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: true,
      message: "Something went wrong!!",
      data: null,
    });
  }
})
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
const generateBubbleUpdatePayload = async (req, bubble_id) => {
  // console.log(req.user)
  const queryResult = await knex("Bubbles").select().first().where({
    id: bubble_id,
    is_deleted: 0,
  });
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
    bubble_name: bubble_name || queryResult.bubble_name,
    bubble_video: bubble_video || queryResult.bubble_video,
    bubble_gif: bubble_gif || queryResult.bubble_gif,
    bubble_font_size: bubble_font_size || queryResult.bubble_font_size,
    bubble_title: bubble_title || queryResult.bubble_title,
    bubble_size: bubble_size || queryResult.bubble_size,
    bubble_border_color: bubble_border_color || queryResult.bubble_border_color,
    bubble_background_color:
      bubble_background_color || queryResult.bubble_background_color,
    bubble_button_color: bubble_button_color || queryResult.bubble_button_color,
    bubble_font_family: bubble_font_family || queryResult.bubble_font_family,
    bubble_darken: bubble_darken || queryResult.bubble_darken,
    bubble_style: bubble_style || queryResult.bubble_style,
    bubble_position: bubble_position || queryResult.bubble_position,
    bubble_video_fit: bubble_video_fit || queryResult.bubble_video_fit,
    bubble_delay: bubble_delay || queryResult.bubble_delay,
    bubble_animation: bubble_animation || queryResult.bubble_animation,
  };
  return payload;
};
module.exports = {
  uploadVideo,
  createBubble,
  editBubble,
  deleteBubble
};

const express = require("express");
const cors = require("cors");
const { route } = require("./routes");
const app = express();

require('dotenv').config()

app.use(cors());
app.use(express.json());
// app.use(route)

app.get("/", function (req, res) {
  res.send("Backend is running successfully....");
});

const PORT =5000;
app.listen(
  PORT,
  console.log(
    `server is running on port ${PORT}`
  )
);

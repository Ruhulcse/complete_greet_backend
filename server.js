const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());

app.get("/", function (req, res) {
  res.send("Backend is running successfully....");
});

const PORT = 5000;
app.listen(
  PORT,
  console.log(
    `server is running on port ${PORT}`
  )
);

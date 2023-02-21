const express = require("express");
const cors = require("cors");
const { route } = require("./routes");
const app = express();
app.use(cors());
app.use(express.json());
app.use(route)

app.get("/", function (req, res) {
  res.send("Backend is running successfully....");
});

const PORT = process.env.PORT||3000;
app.listen(
  PORT,
  console.log(
    `server is running on port ${PORT}`
  )
);

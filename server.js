const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const app = express();
const userRoutes = require("./routes/userRoute");
// dotenv.config();

app.use(cors());
app.use(express.json());
// app.use(route)

app.get("/", function (req, res) {
  res.send("Backend is running successfully....");
});
app.use("/api/v1/user", userRoutes);
const PORT =  5000;
app.listen(
  PORT,
  console.log(
    `server is running on port ${PORT}`
  )
);

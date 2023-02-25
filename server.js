const express = require("express");
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server, { cors: { origin: "*" } });
const cors = require("cors");
const dotenv = require("dotenv");
const userRoutes = require("./routes/userRoute");
// dotenv.config();

app.use(cors());
app.use(express.json());
// app.use(route)

app.get("/", function (req, res) {
  res.send("Backend is running successfully....");
});
app.use("/api/v1/user", userRoutes);

const PORT = 5000;
server.listen(PORT, console.log(`server is running on port ${PORT}`));



// socket connection
io.on("connection", function (socket) {
  console.log('User Connected:', socket.id);
  socket.emit("greeting-from-server", {
    greeting: "Hello Client",
  });
  socket.on("greeting-from-client", function (message) {
    console.log(message);
  });

  //Whenever someone disconnects this piece of code executed
  socket.on("disconnect", function () {
    console.log("A user disconnected");
  });
});
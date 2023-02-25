const express = require("express");
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server, { cors: { origin: "*" } });
const cors = require("cors");
const logger = require("morgan");
const helmet = require("helmet");
const userRoutes = require("./routes/userRoute");
const errorHandler = require('./middlewares/errors');
// dotenv.config();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(logger("dev"));
app.use(helmet());
app.use(express.json());
// app.use(route)
app.use(errorHandler);

app.get("/", function (req, res) {
  res.send("Backend is running successfully....");
});
app.use("/api/v1/user", userRoutes);

const PORT = process.env.PORT || 5000;
server.listen(PORT, console.log(`server listening on http://127.0.0.1:${PORT}`));

// socket connection
io.on("connection", function (socket) {
  console.log(`⚡: ${socket.id} user just connected`);
  socket.emit("greeting-from-server", {
    greeting: "Hello Client",
  });
  socket.on("greeting-from-client", function (message) {
    console.log(message);
  });

  //Whenever someone disconnects this piece of code executed
  socket.on("disconnect", function () {
    console.log("A user disconnected", socket.id);
  });

  socket.on("message", (data) => {
    //sends the data to everyone except you.
    socket.broadcast.emit("response", data);

    //sends the data to everyone connected to the server
    // socket.emit("response", data)
  });
});

const express = require("express");
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server, { cors: { origin: "*" } });
const cors = require("cors");
const logger = require("morgan");
const helmet = require("helmet");
<<<<<<< HEAD
const userRoutes = require("./routes/userRoute");
const bubbleRoutes = require('./routes/bubbleRoute')
=======
>>>>>>> 872d7378f661d0e998d0cb59423db7e9b0181509
const errorHandler = require('./middlewares/errors');
const routes = require('./routes');
const auth = require('./middlewares/auth');
// dotenv.config();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(logger("dev"));
app.use(helmet());
app.use(express.json());
app.use('/api', auth.authorize);
app.use(routes);
// app.use(route)
app.use(errorHandler);

app.get("/", function (req, res) {
  res.send("Backend is running successfully....");
});
<<<<<<< HEAD
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/bubble", bubbleRoutes);
=======
>>>>>>> 872d7378f661d0e998d0cb59423db7e9b0181509

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

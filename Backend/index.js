const express = require("express");
const RequestLoggger = require("./middlewares/requestLogger");
const cors = require("cors");
const connectDB = require("./mongoDB/db");
const bodyParser = require("body-parser");
const server = express();

require("dotenv").config();
connectDB();

server.use(express.json({ parameterLimit: 100000, limit: "10mb" }));
server.use(express.urlencoded({ parameterLimit: 100000, limit: "10mb", extended: true }));
server.use(RequestLoggger);
server.use(cors());
server.set("view engine", "ejs");

const userRouter = require("./routes/userRoutes");
const threadRouter = require("./routes/threadRoutes");
const groupRouter = require("./routes/groupRoutes");
const answerRouter = require("./routes/answerRoutes");
const tagRouter = require("./routes/tagRoutes");

server.use("/api", userRouter);
server.use("/api", threadRouter);
server.use("/api", groupRouter);
server.use("/api", answerRouter);
server.use("/api", tagRouter);


server.listen("3001", () =>
  console.log("Server started and listen on Port(3001)")
);

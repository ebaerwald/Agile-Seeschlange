const express = require("express");
const RequestLoggger = require("./middlewares/requestLogger");
const cors = require("cors");
const connectDB = require("./mongoDB/db");
const bodyParser = require("body-parser");

require("dotenv").config();

//instsanzieierung
const server = express();
connectDB();

//regular Middlewares
server.use(express.json({ parameterLimit: 100000, limit: "10mb" }));
server.use(
  express.urlencoded({ parameterLimit: 100000, limit: "10mb", extended: true })
);
server.use(RequestLoggger);

//use Cors middleware
server.use(cors());

//template engine
server.set("view engine", "ejs");

const usersRouter = require("./routes/userRoutes");

server.use("/api", usersRouter);
//WebServer Port 3001
server.listen("3001", () =>
  console.log("Server started and listen on Port(3001)")
);

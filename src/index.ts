import { Logger } from "@bristom/logger";
import express from "express";
import http from "http";
import { Server } from "socket.io";

require("dotenv").config();

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.get("/", (req, res) => {
  res.send("Hello world");
});

io.on("connection", socket => {
  Logger.debug(`User ID ${socket.id} has connected`);
});

server.listen(process.env.PORT, () => {
  Logger.debug(`listening on *:${process.env.PORT}`);
});

import { Logger } from "@bristom/logger";
import express from "express";
import http from "http";
import { Server } from "socket.io";

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.get("/", (req, res) => {
  res.send("Hello world");
});

io.on("connection", socket => {
  Logger.debug(`User ID ${socket.id} has connected`);
});

server.listen(3000, () => {
  Logger.debug("listening on *:3000");
});

import { Logger } from "@bristom/logger";
import express from "express";
import http from "http";
import { Server } from "socket.io";

import { iot, client } from "./mqtt";

require("dotenv").config();

const app = express();
const server = http.createServer(app);
const io = new Server(server);

iot();

app.get("/", (req, res) => {
  res.send("Hello world");
});

io.on("connection", socket => {
  Logger.debug(`User ID ${socket.id} has connected`);
});

// Graceful shutdown process
process.on("SIGINT", () => {
  Logger.info("SIGINT signal received, closing all connections and listeners");

  client.end();
  server.close();
});

process.on("SIGTERM", () => {
  Logger.info("SIGTERM signal received, closing all connections and listeners");

  client.end();
  server.close();
});
// Graceful shutdown process end

server.listen(process.env.PORT, () => {
  Logger.debug(`listening on *:${process.env.PORT}`);
});

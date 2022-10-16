import { Logger } from "@bristom/logger";
import mqtt from "async-mqtt";
import express from "express";
import http from "http";
import { Server } from "socket.io";

require("dotenv").config();

const client = mqtt.connect("mqtt://test.mosquitto.org");
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

const initMqtt = async () => {
  Logger.debug("Starting MQTT");
  try {
    await client.subscribe("presence");
    await client.publish("presence", "Hello mqtt");
  } catch (e) {
    Logger.debug(`Something wrong with MQTT start: ${e}`);
  }
};

client.on("connect", initMqtt);

const handleMqttMessage = async (topic, message) => {
  // message is Buffer
  Logger.debug(message.toString());
  await client.end();
};

client.on("message", handleMqttMessage);

import { Logger } from "@bristom/logger";
import express from "express";
import http from "http";
import { MongoClient, ServerApiVersion } from "mongodb";
import { Server } from "socket.io";

import iot from "./mqtt";

const uri = "mongodb+srv://arthur:arthuradmin@coraenergymeter.yrkp3.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(
  uri,
  { serverApi: ServerApiVersion.v1 }
);

async function dbtest() {
  await client.connect();
  const collection = await client.db("cora").collection("devices");
  await collection.insertOne({ name: "test", value: 1 });
  // perform actions on the collection object
  client.close();
}

dbtest().catch(Logger.debug);
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

server.listen(process.env.PORT, () => {
  Logger.debug(`listening on *:${process.env.PORT}`);
});

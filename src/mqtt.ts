import { Logger } from "@bristom/logger";
import mqtt from "async-mqtt";

const client = mqtt.connect("mqtt://test.mosquitto.org");

const iot = () => {
  const initMqtt = async () => {
    Logger.debug("Starting MQTT");
    try {
      await client.subscribe("cora-hacktoberfest2022");
      await client.publish("cora-hacktoberfest2022", "Hello mqtt"); // this will be inside meter/esp32
    } catch (e) {
      Logger.debug(`Something wrong with MQTT start: ${e}`);
    }
  };

  client.on("connect", initMqtt);

  const handleMqttMessage = async (topic, message) => {
    // message is Buffer
    Logger.debug(message.toString()); // save the payload to the DB in a future implementation
  };

  client.on("message", handleMqttMessage);
};

export { iot, client };

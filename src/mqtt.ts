import { Logger } from "@bristom/logger";
import mqtt from "async-mqtt";

const iot = () => {
  const client = mqtt.connect("mqtt://test.mosquitto.org");

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
    Logger.debug(message.toString());
    await client.end();
  };

  client.on("message", handleMqttMessage);
};

export default iot;

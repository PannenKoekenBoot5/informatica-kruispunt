const DOM_TRAFFIC_LIGHT = ".trafficlight";

const COLOR_RED_ACTIVE = "red";
const COLOR_ORANGE_ACTIVE = "orange";
const COLOR_GREEN_ACTIVE = "green";
const COLOR_RED_PASSIVE = "black";
const COLOR_ORANGE_PASSIVE = "black";
const COLOR_GREEN_PASSIVE = "black";

const DEFAULT_GREEN_TIME = 3000;
const DEFAULT_ORANGE_TIME = 1000;

const manager = new TrafficLightManager();

const socket = io();

function Main() {
  // Get all traffic lights from dom
  let trafficLights = getTrafficLights();

  // Order them in the right direction
  trafficLights.forEach((v) => {
    // Get group by direction
    let direction = v.element.getAttribute("data-direction");
    let group = manager.getGroup(direction);

    // If group does not exist, create one
    if (group) group.trafficLights.push(v);
    else {
      group = new TrafficLightGroup(direction);
      group.trafficLights.push(v);
      manager.groups.push(group);
    }
  });
}
// Wait for entire website to load before calling Main
window.onload = Main;
socket.on("connect", () => {
  console.log("Connected");

  // If socket receives data, check if directions are available, then activate traffic manager.
  socket.on("data", (data) => {
    console.log(data);
    if (data.directions && data.directions.length > 0) {
      for (let i = 0; i < data.directions.length; i++) {
        // Only activate directions after each other (3000 (green light delay) + 1000 (orange light delay) + 1000 (traffic delay))
        setTimeout(() => {
          manager.activate(data.directions[i]);
        }, i * 5000);
      }
    }
  });
});

function Next() {
  // Ask the server for the next traffic light sequence
  socket.emit("next");
}

function Restart() {
  alert("Restart");
}

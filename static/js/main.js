const DOM_TRAFFIC_LIGHT = ".trafficlight"

const COLOR_RED_ACTIVE = "red"
const COLOR_ORANGE_ACTIVE = "orange"
const COLOR_GREEN_ACTIVE = "green"
const COLOR_RED_PASSIVE = "black"
const COLOR_ORANGE_PASSIVE = "black"
const COLOR_GREEN_PASSIVE = "black"

const DEFAULT_GREEN_TIME = 3000
const DEFAULT_ORANGE_TIME = 1000

const manager = new TrafficLightManager();

const socket = io();

function Main() {
    // Get all traffic lights from dom
    let trafficLights = getTrafficLights();

    // Order them in the right direction
	trafficLights.forEach(v => {
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
	socket.on("data", (data) => {
		console.log("Received data", data);
		if (data.direction)
			manager.activate(data.direction, data.green_time, data.orange_time);
	});
})

function Next() {
	socket.emit("next");
}

function Restart() {
    alert("Restart");
}
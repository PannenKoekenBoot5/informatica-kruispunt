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
	// Load SVG stripes
	let svg = document.getElementById("traffic-stripes");
	x = 499;
	y = 508;
	for (let i = 0; i < 15; i++) {
		if (i > 7) x = 1416;
		width = 50;
		if (x == 0) width = 26;
		if (i > 7) if (x < 800) x = 1416 - ((i - 8) * 75);
		console.log(i - 8, x);
		let rect = document.createElement("rect");
		rect.setAttribute("x", x);
		rect.setAttribute("y", y);
		rect.setAttribute("width", width);
		rect.setAttribute("height", 9);
		rect.setAttribute("fill", "white");
		console.log(rect);
		svg.appendChild(rect);
		console.log(x);
		x -= 75;
		console.log(x);
		if (i < 8) {
			console.log("1", i);
			if (x < 0) x = 0;
		} else {
			console.log("2", i, i-8);
			if (x < 800) x = 1416 - ((i - 8) * 75);
		}
	}

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
		if (data.direction) {
			manager.activate(data.direction);
			console.log("yeet")
		}
	});
})

function Next() {
	socket.emit("next");
}

function Restart() {
    alert("Restart");
}
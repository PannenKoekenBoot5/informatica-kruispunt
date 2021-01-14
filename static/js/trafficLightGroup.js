class TrafficLightGroup {
    constructor (direction) {
        this.direction = direction;
        this.trafficLights = [];
    }

    activate (greenDuration, orangeDuration) {
		this.trafficLights.forEach(v => v.activate(greenDuration, orangeDuration));
    }
}
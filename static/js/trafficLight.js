class TrafficLight {
    constructor(element) {
        // Store element and store id
        this.element = element;
        this.id = element.id;

		// Store signal elements
		console.log(element.childNodes);
        this.red = element.childNodes[7];
        this.orange = element.childNodes[5];
        this.green = element.childNodes[3];

        this.activated = false;

        this.reset();
    }

    reset() {
        this.green.style.fill = COLOR_GREEN_PASSIVE;
        this.orange.style.fill = COLOR_ORANGE_PASSIVE;
        this.red.style.fill = COLOR_RED_ACTIVE;
    }

    activate(greenDuration, orangeDuration) {
        // Make sure the light can't be activated before it is done animating
        if (this.activated)
            return;
        
        this.activated = true;

        // Activate green light and disable
        this.red.style.fill = COLOR_RED_PASSIVE;
        this.green.style.fill = COLOR_GREEN_ACTIVE;

        // Wait for green duration
        setTimeout(() => {
            // Disable green and activate orange
            this.green.style.fill = COLOR_GREEN_PASSIVE;
            this.orange.style.fill = COLOR_ORANGE_ACTIVE;

            // Wait for orange duration
            setTimeout(() => {
                // Disable orange and activate red
                this.orange.style.fill = COLOR_ORANGE_PASSIVE;
                this.red.style.fill = COLOR_RED_ACTIVE;

                this.activated = false;
            }, orangeDuration);
        }, greenDuration);
    }
}

function getTrafficLights() {    
    return Array.from(document.querySelectorAll(DOM_TRAFFIC_LIGHT)).map(v => new TrafficLight(v));
}
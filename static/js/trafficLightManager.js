class TrafficLightManager {
  constructor() {
    this.groups = [];
  }

  getGroup(direction) {
    return this.groups.find((v) => v.direction == direction);
  }

  // Activate all traffic light groups in the specified direction
  activate(
    direction,
    greenDuration = DEFAULT_GREEN_TIME,
    orangeDuration = DEFAULT_ORANGE_TIME
  ) {
    this.groups.forEach((v) => {
      if (v.direction == direction.toLowerCase())
        v.activate(greenDuration, orangeDuration);
    });
  }
}

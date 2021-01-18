class TrafficLightGroup {
  constructor(direction) {
    this.direction = direction;
    this.trafficLights = [];
  }

  // Activate all traffic lights assigned to this group
  activate(greenDuration, orangeDuration) {
    this.trafficLights.forEach((v) =>
      v.activate(greenDuration, orangeDuration)
    );
  }
}

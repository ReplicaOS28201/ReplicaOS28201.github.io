import Position from "../Core/Position.js";

export default class Light {
  constructor(type = "directional", intensity = 1) {
    this.type = type;
    this.intensity = intensity;
    this.position = new Position(0, 10, 0);
    this.color = "#ffffff";
  }
}

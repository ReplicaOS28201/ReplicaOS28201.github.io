import Position from "../Core/Position.js";

export default class Transform {
  constructor() {
    this.position = new Position();
    this.rotation = new Position();
    this.scale = new Position(1, 1, 1);
  }

  translate(x = 0, y = 0, z = 0) {
    this.position.translate(x, y, z);
    return this;
  }

  rotate(x = 0, y = 0, z = 0) {
    this.rotation.translate(x, y, z);
    return this;
  }
}

import CoreMath from "../Core/Math.js";

export default class Gravity {
  constructor(strength = 9.8) {
    this.strength = strength;
  }

  apply(velocity, deltaTime) {
    const next = velocity - this.strength * deltaTime;
    return CoreMath.clamp(next, -1000, 1000);
  }
}

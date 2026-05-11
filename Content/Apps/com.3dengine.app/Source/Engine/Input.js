export default class Input {
  constructor() {
    this.pressed = new Set();
  }

  press(key) {
    this.pressed.add(key);
  }

  release(key) {
    this.pressed.delete(key);
  }

  isPressed(key) {
    return this.pressed.has(key);
  }
}

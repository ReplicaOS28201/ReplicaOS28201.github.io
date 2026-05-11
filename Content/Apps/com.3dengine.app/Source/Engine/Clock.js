export default class Clock {
  constructor() {
    this.previous = Date.now();
  }

  tick() {
    const now = Date.now();
    const delta = (now - this.previous) / 1000;
    this.previous = now;
    return delta;
  }
}

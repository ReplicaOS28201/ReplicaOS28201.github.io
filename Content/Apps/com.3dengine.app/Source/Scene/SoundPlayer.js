export default class SoundPlayer {
  constructor(enabled = true) {
    this.enabled = enabled;
    this.lastPlayed = null;
  }

  play(path) {
    if (!this.enabled) {
      return false;
    }

    this.lastPlayed = path;
    return true;
  }
}

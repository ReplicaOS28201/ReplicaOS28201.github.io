export default class SceneViewport {
  constructor(width = 1280, height = 720) {
    this.width = width;
    this.height = height;
  }

  resize(width, height) {
    this.width = width;
    this.height = height;
  }
}

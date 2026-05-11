import { EngineError } from "../Core/View/ErrorHandler.js";

export default class Renderer {
  constructor(viewport) {
    this.viewport = viewport;
    this.frame = 0;
  }

  render(scene, camera) {
    this.frame += 1;

    return {
      frame: this.frame,
      viewport: { width: this.viewport.width, height: this.viewport.height },
      entities: scene.entities.length,
      lights: scene.lights.length,
      camera: camera.toJSON(),
    };
  }
}

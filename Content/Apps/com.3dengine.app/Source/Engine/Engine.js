import CameraPosition from "../Camera/CamPos.js";
import SceneViewport from "../Scene/SceneViewport.js";
import Gravity from "../Scene/Gravity.js";
import Renderer from "./Renderer.js";
import Scene from "./Scene.js";
import Clock from "./Clock.js";
import Input from "./Input.js";
import errorScene from "../ErrorScene.js";
import { EngineError } from "../Core/View/ErrorHandler.js";

export default class Engine {
  constructor({ width = 1280, height = 720 } = {}) {
    this.camera = new CameraPosition();
    this.viewport = new SceneViewport(width, height);
    this.gravity = new Gravity();
    this.renderer = new Renderer(this.viewport);
    this.scene = new Scene();
    this.clock = new Clock();
    this.input = new Input();
  }

  update() {
    const deltaTime = this.clock.tick();

    return {
      deltaTime,
      frame: this.renderer.render(this.scene, this.camera),
    };
  }

  safeUpdate() {
    try {
      return this.update();
    } catch (error) {
      return errorScene(
        error instanceof Error
          ? error
          : new EngineError("Unknown engine failure", {
              context: "Engine",
              code: "ENGINE_UPDATE_UNKNOWN",
            }),
      );
    }
  }
}

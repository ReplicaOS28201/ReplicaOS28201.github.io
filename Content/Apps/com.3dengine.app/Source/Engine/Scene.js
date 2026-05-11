export default class Scene {
  constructor(name = "MainScene") {
    this.name = name;
    this.entities = [];
    this.lights = [];
  }

  addEntity(entity) {
    this.entities.push(entity);
    return entity;
  }

  addLight(light) {
    this.lights.push(light);
    return light;
  }
}

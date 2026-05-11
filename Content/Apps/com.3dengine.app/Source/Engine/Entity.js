import Transform from "./Transform.js";
import { EngineError } from "../Core/View/ErrorHandler.js";

let nextId = 1;

export default class Entity {
  constructor(name = "Entity") {
    this.id = nextId++;
    this.name = name;
    this.transform = new Transform();
    this.components = new Map();
  }

  addComponent(key, component) {
    if (!key || typeof key !== "string") {
      throw new EngineError("addComponent requires a string key", {
        context: "Entity",
        code: "ENTITY_COMPONENT_KEY_INVALID",
        details: { key },
      });
    }

    if (component === undefined) {
      throw new EngineError("addComponent requires a component value", {
        context: "Entity",
        code: "ENTITY_COMPONENT_VALUE_INVALID",
      });
    }

    this.components.set(key, component);
    return this;
  }

  getComponent(key) {
    return this.components.get(key);
  }
}

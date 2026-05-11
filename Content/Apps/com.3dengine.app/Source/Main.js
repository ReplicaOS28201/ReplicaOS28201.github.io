import Engine from "./Engine/Engine.js";
import Entity from "./Engine/Entity.js";
import Material from "./Engine/Material.js";
import Mesh from "./Engine/Mesh.js";
import Light from "./Engine/Light.js";

export function createEngine(options) {
  return new Engine(options);
}

export { Engine, Entity, Material, Mesh, Light };

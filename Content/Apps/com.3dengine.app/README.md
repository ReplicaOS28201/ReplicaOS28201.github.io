# 3DENGINE

A lightweight modular JavaScript 3D engine scaffold for simulation-style apps.

## Quick Start

```js
import { createEngine, Entity, Mesh, Material, Light } from "./Source/Main.js";

const engine = createEngine({ width: 1024, height: 576 });

const ship = new Entity("Ship")
  .addComponent("mesh", Mesh.createTriangle())
  .addComponent("material", new Material({ color: "#50c4ff" }));

engine.scene.addEntity(ship);
engine.scene.addLight(new Light("directional", 1.2));

const frameState = engine.safeUpdate();
console.log(frameState);
```

## Engine-Specific Files

- `Source/Engine/Engine.js` - Runtime coordinator for camera, scene, renderer, timing, gravity and input.
- `Source/Engine/Scene.js` - Entity/light container with guarded insertion methods.
- `Source/Engine/Entity.js` - ECS-like object with transform and component map.
- `Source/Engine/Transform.js` - Position, rotation and scale helper for entities.
- `Source/Engine/Renderer.js` - Frame serializer for viewport/scene/camera metadata.
- `Source/Engine/Mesh.js` - Mesh structure with a built-in triangle primitive.
- `Source/Engine/Material.js` - Basic PBR-like material fields (`color`, `roughness`, `metallic`).
- `Source/Engine/Light.js` - Light model with type, intensity, position and color.
- `Source/Engine/Clock.js` - Delta-time timing utility.
- `Source/Engine/Input.js` - Keyboard-like pressed-state tracker.

## Error Handling

- `EngineError` provides typed errors with `context`, `code`, and optional `details`.
- `Engine.update()` throws for invalid runtime states.
- `Engine.safeUpdate()` catches failures and returns a structured scene-safe error object.

See full details in `docs/error-handling.md`.

# Error Handling in 3DENGINE

## Core primitives

`Source/Core/View/ErrorHandler.js` exposes:

- `EngineError` - custom error type for engine failures.
- `formatError(error, context?)` - formats errors into consistent messages.
- `createErrorPayload(error, context?)` - returns structured error payloads.

## Where checks are enforced

- `Scene.addEntity` and `Scene.addLight` validate incoming objects.
- `Entity.addComponent` validates component keys and values.
- `Renderer.render` validates scene shape and camera serialization support.
- `Engine.safeUpdate` captures runtime failures and returns an error payload.

## Example

```js
import { createEngine } from "../Source/Main.js";

const engine = createEngine();
engine.scene = null; // corrupt state
const state = engine.safeUpdate();

// {
//   status: "error",
//   message: "[Renderer] (RENDER_SCENE_INVALID) render expected a valid scene",
//   details: null
// }
```

# Raylib WASM

Package with WASM bindings for raylib generated via `emscripten/bind.h`.

Main idea is to provide almost entire raylib API for browser's js.

Example:

```js
Module.InitWindow(320, 240, "game");
Module.SetTargetFPS(60);

const userUpdate = (timeStamp) => {
  Module.BeginDrawing();
    Module.ClearBackground(PINK);
    Module.DrawFPS(10, 10);
  Module.EndDrawing();
}

const updateLoop = (timeStamp) => {
  userUpdate(timeStamp)
  requestAnimationFrame(updateLoop)
}
updateLoop(1, state)
```

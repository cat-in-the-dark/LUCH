# Raylib WASM

Package with WASM bindings for raylib generated via `emscripten/bind.h`.

Main idea is to provide almost entire raylib API for browser's js.

Example:

```typescript
import { Raylib } from '@cat_in_the_dark/raylib-wasm';

const canvas = document.getElementById('game') as HTMLCanvasElement;

async function main(rl: Raylib) {
  rl.initWindow(320, 240, 'Hello');
  rl.setTargetFPS(60);

  const logo = await rl.loadTexture('logo.png');
  const pos = { x: 100, y: 120 };

  const update = () => {
    rl.drawing(() => {
      rl.clearBackground(rl.PINK);
      logo.draw(pos);
      rl.drawFPS(10, 10);
    });
  };

  rl.runLoop(update);
}

Raylib.init({ canvas }).then(main).catch(err => console.error(err));
```

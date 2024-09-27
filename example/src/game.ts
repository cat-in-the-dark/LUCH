import { ctx, Texture, Vector2 } from '@cat_in_the_dark/raylib-wasm';
import { Raylib } from '@cat_in_the_dark/raylib-wasm';

export function update(state: { logo: Texture; alpha: number; pos: Vector2 }) {
  const rl = ctx.rl;

  state.alpha *= 0.999;

  if (rl.isKeyDown(65)) {
    state.pos.x -= 5;
  }
  if (rl.isKeyDown(68)) {
    state.pos.x += 5;
  }
  if (rl.isKeyDown(87)) {
    state.pos.y -= 5;
  }
  if (rl.isKeyDown(83)) {
    state.pos.y += 5;
  }

  rl.drawing(() => {
    rl.clearBackground(rl.PINK.fade(state.alpha));
    state.logo.draw(state.pos);
    rl.drawFPS(10, 10);
  });
}

async function main(rl: Raylib) {
  rl.initWindow(320, 240, 'Hello');
  rl.setTargetFPS(60);

  const alpha = 1;
  const pos = { x: 100, y: 120 };
  const logo = await rl.loadTexture('logo.png');

  rl.runLoop(() => update({ logo, alpha, pos }));
}

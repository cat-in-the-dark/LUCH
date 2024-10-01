import { Vector2 } from '@cat_in_the_dark/math';
import { ctx, Texture, Color, Raylib } from '@cat_in_the_dark/raylib-wasm';

const screenWidth = 800;
const screenHeight = 450;
const MAX_BATCH_ELEMENTS = 8192;
const textPos = new Vector2(120, 0);

class Bunny {
  constructor(
    public tex: Texture,
    public pos: Vector2,
    public speed: Vector2,
    public color: Color,
  ) {}

  draw() {
    this.tex.draw(this.pos, 0, 1, this.color);
  }
}

function spawnBunny(tex: Texture, pos: Vector2) {
  return new Bunny(
    tex,
    pos,
    new Vector2(
      Math.random() * 8 - 4,
      Math.random() * 8 - 4,
    ),
    new Color(
      Math.random() * 255,
      Math.random() * 255,
      Math.random() * 255,
      255,
    ),
  );
}

function update(state: { bunnies: Bunny[] }) {
  const rl = ctx.rl;
  const { bunnies } = state;

  for (const bunny of bunnies) {
    bunny.pos.x += bunny.speed.x;
    bunny.pos.y += bunny.speed.y;
    if (((bunny.pos.x + bunny.tex.width / 2) > screenWidth) || ((bunny.pos.x + bunny.tex.width / 2) < 0)) {
      bunny.speed.x *= -1;
    }
    if (((bunny.pos.y + bunny.tex.height / 2) > screenHeight) || ((bunny.pos.y + bunny.tex.height / 2 - 40) < 0)) {
      bunny.speed.y *= -1;
    }
  }

  rl.drawing(() => {
    rl.clearBackground(rl.WHITE);

    for (const bunny of bunnies) {
      bunny.draw();
    }

    rl.drawFPS(10, 0);
    rl.drawText(`bunnies: ${bunnies.length}`, textPos, 20, rl.GREEN);
  });
}

export async function runBenchmark(rl: Raylib) {
  rl.initWindow(screenWidth, screenHeight, 'Hello');
  rl.setTargetFPS(60);

  const tex = await rl.loadTexture('wabbit_alpha.png');
  const bunnies = new Array<Bunny>();

  for (let i = 0; i < MAX_BATCH_ELEMENTS; i++) {
    bunnies.push(spawnBunny(tex, new Vector2(128, 128)));
  }

  rl.runLoop(() => update({ bunnies }));
}

// @ts-types="./build/raylibjs.d.ts"
import initModule, { type Vector2, type Color, type MainModule, type Texture2D as NativeTexture } from './build/raylibjs.js';

// @ts-types="./build/raylibjs.d.ts"
export { type Color, type Vector2 } from './build/raylibjs.js';

async function addFile(mod: MainModule, filename: string, target?: string) {
  if (!target) {
    target = filename;
  }
  const p = target.split('/').slice(0, -1);
  let dir = '';
  for (const d of p) {
    dir = dir + '/' + d;
    try {
      mod.FS.mkdir(dir, 0o777);
    }
    catch (e) {
      console.error('Faield to add file', e);
    }
  }
  const buf = await fetch(filename).then(r => r.arrayBuffer());
  mod.FS.writeFile(target, new Uint8Array(buf));
}

export class Raylib {
  constructor(public readonly mod: MainModule) {}

  /**
   * Initialize Raylib bindings: canvas, wasm.
   *
   * @param options wasm module options
   * @returns raylib api object
   */
  static async init(options: { canvas: HTMLCanvasElement }) {
    const mod = await initModule(options);
    return new Raylib(mod);
  }

  runLoop(updateFn: (rl: Raylib) => unknown) {
    const updateLoop = () => {
      requestAnimationFrame(updateLoop);
      updateFn(this);
    };
    updateLoop();
  }

  initWindow(width: number, height: number, title: string) {
    this.mod.InitWindow(width, height, title);
  }

  setTargetFPS(fps: number) {
    this.mod.SetTargetFPS(fps);
  }

  beginDrawing() {
    this.mod.BeginDrawing();
  }

  endDrawing() {
    this.mod.EndDrawing();
  }

  /**
   * Call fn between beginDrawing - endDrawing.
   * @param fn
   */
  drawing(fn: () => unknown) {
    this.beginDrawing();
    fn();
    this.endDrawing();
  }

  clearBackground(color: Color) {
    this.mod.ClearBackground(color);
  }

  drawFPS(x: number, y: number) {
    this.mod.DrawFPS(x, y);
  }

  isKeyDown(key: number) {
    return this.mod.IsKeyDown(key);
  }

  get frameTime() { return this.mod.GetFrameTime(); }

  /**
   * Load texture from file into GPU memory (VRAM)
   * @param path
   * @returns
   */
  async loadTexture(path: string) {
    await addFile(this.mod, path, path);
    return new Texture(this.mod.LoadTexture(path), this);
  }

  get LIGHTGRAY() { return this.mod.LIGHTGRAY; }
  get GRAY() { return this.mod.GRAY; }
  get DARKGRAY() { return this.mod.DARKGRAY; }
  get YELLOW() { return this.mod.YELLOW; }
  get GOLD() { return this.mod.GOLD; }
  get ORANGE() { return this.mod.ORANGE; }
  get PINK() { return this.mod.PINK; }
  get RED() { return this.mod.RED; }
  get MAROON() { return this.mod.MAROON; }
  get GREEN() { return this.mod.GREEN; }
  get LIME() { return this.mod.LIME; }
  get DARKGREEN() { return this.mod.DARKGREEN; }
  get SKYBLUE() { return this.mod.SKYBLUE; }
  get BLUE() { return this.mod.BLUE; }
  get DARKBLUE() { return this.mod.DARKBLUE; }
  get PURPLE() { return this.mod.PURPLE; }
  get VIOLET() { return this.mod.VIOLET; }
  get DARKPURPLE() { return this.mod.DARKPURPLE; }
  get BEIGE() { return this.mod.BEIGE; }
  get BROWN() { return this.mod.BROWN; }
  get DARKBROWN() { return this.mod.DARKBROWN; }
  get WHITE() { return this.mod.WHITE; }
  get BLACK() { return this.mod.BLACK; }
  get BLANK() { return this.mod.BLANK; }
  get MAGENTA() { return this.mod.MAGENTA; }
  get RAYWHITE() { return this.mod.RAYWHITE; }
}

export class Texture {
  constructor(private readonly tex: NativeTexture, private readonly rl: Raylib) {}

  draw(pos: Vector2, tint: Color = this.rl.WHITE) {
    this.rl.mod.DrawTexture(this.tex, pos, tint);
  }

  get id() { return this.tex.id; }
  get width() { return this.tex.width; }
  get height() { return this.tex.height; }
  get mipmaps() { return this.tex.mipmaps; }
  get format() { return this.tex.format; }
}

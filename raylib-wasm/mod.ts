// @ts-types="./build/raylibjs.d.ts"
import initModule, { type MainModule, type Vector2, type Texture2D as NativeTexture, type Rectangle, type NPatchInfo, Vector3, Vector4 } from './build/raylibjs.js';

const zeroVec2 = { x: 0, y: 0 };

class Context {
  private _rl: Raylib | undefined = undefined;

  init(rl: Raylib) {
    if (this._rl) {
      throw new Error('Context already initialized');
    }
    this._rl = rl;
  }

  get rl(): Raylib {
    if (!this._rl) {
      throw new Error('Context is not initialized');
    }

    return this._rl;
  }

  get mod(): MainModule {
    if (!this._rl) {
      throw new Error('Context is not initialized');
    }

    return this._rl.mod;
  }
}

export const ctx = new Context();

async function addFile(mod: MainModule, filename: string, target?: string) {
  if (!target) {
    target = filename;
  }
  const p = target.split('/').slice(0, -1);
  let dir = '';
  for (const d of p) {
    dir = dir + '/' + d;
    try {
      // skipping already exists folders
      if (!mod.FS.analyzePath(dir, true).exists) {
        mod.FS.mkdir(dir, 0o777);
      }
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
    const rl = new Raylib(mod);
    ctx.init(rl);
    return rl;
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

  drawText(text: string, pos: Vector2, fontSize: number, color: Color) {
    this.mod.DrawText(text, pos, fontSize, color);
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

  async loadFont(path: string): Promise<Font> {
    await addFile(this.mod, path, path);
    return new Font(path, this);
  }

  get LIGHTGRAY() { return Color.fromNative(this.mod.LIGHTGRAY); }
  get GRAY() { return Color.fromNative(this.mod.GRAY); }
  get DARKGRAY() { return Color.fromNative(this.mod.DARKGRAY); }
  get YELLOW() { return Color.fromNative(this.mod.YELLOW); }
  get GOLD() { return Color.fromNative(this.mod.GOLD); }
  get ORANGE() { return Color.fromNative(this.mod.ORANGE); }
  get PINK() { return Color.fromNative(this.mod.PINK); }
  get RED() { return Color.fromNative(this.mod.RED); }
  get MAROON() { return Color.fromNative(this.mod.MAROON); }
  get GREEN() { return Color.fromNative(this.mod.GREEN); }
  get LIME() { return Color.fromNative(this.mod.LIME); }
  get DARKGREEN() { return Color.fromNative(this.mod.DARKGREEN); }
  get SKYBLUE() { return Color.fromNative(this.mod.SKYBLUE); }
  get BLUE() { return Color.fromNative(this.mod.BLUE); }
  get DARKBLUE() { return Color.fromNative(this.mod.DARKBLUE); }
  get PURPLE() { return Color.fromNative(this.mod.PURPLE); }
  get VIOLET() { return Color.fromNative(this.mod.VIOLET); }
  get DARKPURPLE() { return Color.fromNative(this.mod.DARKPURPLE); }
  get BEIGE() { return Color.fromNative(this.mod.BEIGE); }
  get BROWN() { return Color.fromNative(this.mod.BROWN); }
  get DARKBROWN() { return Color.fromNative(this.mod.DARKBROWN); }
  get WHITE() { return Color.fromNative(this.mod.WHITE); }
  get BLACK() { return Color.fromNative(this.mod.BLACK); }
  get BLANK() { return Color.fromNative(this.mod.BLANK); }
  get MAGENTA() { return Color.fromNative(this.mod.MAGENTA); }
  get RAYWHITE() { return Color.fromNative(this.mod.RAYWHITE); }
}

export class Color {
  constructor(
    public r: number,
    public g: number,
    public b: number,
    public a = 255,
  ) {}

  static fromNative(native: { r: number; g: number; b: number; a: number }) {
    return new Color(native.r, native.g, native.b, native.a);
  }

  native() {
    return { r: this.r & 0xFF, g: this.g & 0xFF, b: this.b & 0xFF, a: this.a & 0xFF };
  }

  /**
   * Get color with alpha applied, alpha goes from 0.0f to 1.0f
   * @param alpha
   */
  fade(alpha: number) {
    return Color.fromNative(ctx.mod.Fade(this, alpha));
  }

  /**
   * Get color multiplied with another color
   * @param color
   */
  tint(color: Color) {
    return Color.fromNative(ctx.mod.ColorTint(this, color));
  }

  brightness(factor: number) {
    return Color.fromNative(ctx.mod.ColorBrightness(this, factor));
  }

  contrast(factor: number) {
    return Color.fromNative(ctx.mod.ColorContrast(this, factor));
  }

  /**
   * Get hexadecimal value for a Color
   */
  get hex() {
    return ctx.mod.ColorToInt(this);
  }

  static fromHex(hex: number) {
    return Color.fromNative(ctx.mod.GetColor(hex));
  }

  get normalized() {
    return ctx.mod.ColorNormalize(this);
  }

  static fromNormalized(vec: Vector4) {
    return Color.fromNative(ctx.mod.ColorFromNormalized(vec));
  }

  get hsv() {
    return ctx.mod.ColorToHSV(this);
  }

  static fromHSV(hsv: Vector3) {
    return Color.fromNative(ctx.mod.ColorFromHSV(hsv.x, hsv.y, hsv.z));
  }
}

export class Texture {
  constructor(private readonly tex: NativeTexture, private readonly rl: Raylib) {}

  /**
   * Draw a texture with extended parameters
   * @param pos
   * @param rotation
   * @param scale
   * @param tint
   */
  draw(pos: Vector2, rotation = 0, scale = 1, tint: Color = this.rl.WHITE) {
    this.rl.mod.DrawTextureEx(this.tex, pos, rotation, scale, tint);
  }

  /**
   * Draw a part of a texture (defined by a rectangle) with 'pro' parameters
   * @param source
   * @param dest
   * @param origin relative to destination rectangle size
   * @param rotation
   * @param tint
   */
  drawRec(source: Rectangle, dest: Rectangle, origin: Vector2, rotation = 0, tint: Color = this.rl.WHITE) {
    this.rl.mod.DrawTexturePro(this.tex, source, dest, origin, rotation, tint);
  }

  /**
   * Draws a texture (or part of it) that stretches or shrinks nicely using n-patch info
   * @param nPatchInfo
   * @param dest
   * @param origin
   * @param rotation
   * @param tint
   */
  drawNPatch(nPatchInfo: NPatchInfo, dest: Rectangle, origin: Vector2, rotation = 0, tint: Color = this.rl.WHITE) {
    this.rl.mod.DrawTextureNPatch(this.tex, nPatchInfo, dest, origin, rotation, tint);
  }

  get id() { return this.tex.id; }
  get width() { return this.tex.width; }
  get height() { return this.tex.height; }
  get mipmaps() { return this.tex.mipmaps; }
  get format() { return this.tex.format; }
}

export class Font {
  constructor(public readonly path: string, private readonly rl: Raylib) {}

  drawTextPro(params: {
    text: string;
    position: Vector2;
    origin?: Vector2;
    rotation?: number;
    fontSize: number;
    spacing?: number;
    tint?: Color;
  }) {
    this.rl.mod.DrawTextPro(this.path, params.text, params.position, params.origin ?? zeroVec2, params.rotation ?? 0, params.fontSize ?? 10, params.spacing ?? 1, params.tint ?? this.rl.WHITE);
  }
}

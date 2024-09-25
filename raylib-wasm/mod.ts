// @ts-types="./build/raylibjs.d.ts"
import initModule, { type MainModule } from "./build/raylibjs.js";

export default class Raylib {
  constructor(public readonly mod: MainModule) {}

  /**
   * Initialize Raylib bindings: canvas, wasm.
   *
   * @param options wasm module factory options
   * @returns raylib api object
   */
  static async initRaylib(
    options: { canvas: HTMLCanvasElement },
  ): Promise<Raylib> {
    const mod = await initModule(options);
    return new Raylib(mod);
  }

  /**
   * Initialize window and OpenGL context
   * @param width
   * @param height
   */
  InitWindow(width: number, height: number, title: string): void {
    this.mod.InitWindow(width & 0xFFFFFFFF, height & 0xFFFFFFFF, title);
  }
}

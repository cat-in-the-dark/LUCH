// @ts-types="./build/raylibjs.d.ts"
import initModule, { type MainModule } from "./build/raylibjs.js";

/**
 * Initialize Raylib bindings: canvas, wasm.
 *
 * @param root canvas where game should be rendered in
 * @returns raylib api object
 */
export async function initRaylib(root: HTMLCanvasElement): Promise<MainModule> {
  const mod = await initModule({
    canvas: root,
  });
  // TODO: rewrap bindings or add docs
  return mod;
}

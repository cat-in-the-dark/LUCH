import { update } from './game';
import { Raylib } from '@cat_in_the_dark/raylib-wasm';

const canvas = document.getElementById('game') as HTMLCanvasElement;

async function main(rl: Raylib) {
  rl.initWindow(320, 240, 'Hello');
  rl.setTargetFPS(60);

  const alpha = 1;
  const pos = { x: 100, y: 120 };
  const logo = await rl.loadTexture('logo.png');

  rl.runLoop(() => update({ logo, alpha, pos }));
}

Raylib.init({ canvas }).then(main).catch(err => console.error(err));

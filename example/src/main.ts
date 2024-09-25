import './style.css';
import { Raylib } from '@luch/raylib-wasm';

const canvas = document.getElementById('game') as HTMLCanvasElement;

async function main(rl: Raylib) {
  rl.initWindow(320, 240, 'Hello');
  rl.setTargetFPS(60);

  const logo = await rl.loadTexture('logo.png');
  const pos = { x: 100, y: 120 };

  const userUpdate = (_timeStamp: DOMHighResTimeStamp) => {
    if (rl.isKeyDown(65)) {
      pos.x -= 5;
    }
    if (rl.isKeyDown(68)) {
      pos.x += 5;
    }
    if (rl.isKeyDown(87)) {
      pos.y -= 5;
    }
    if (rl.isKeyDown(83)) {
      pos.y += 5;
    }

    rl.beginDrawing();
    rl.clearBackground(rl.PINK);
    logo.draw(pos);
    rl.drawFPS(10, 10);
    rl.endDrawing();
  };

  const updateLoop = (timeStamp: DOMHighResTimeStamp) => {
    userUpdate(timeStamp);
    requestAnimationFrame(updateLoop);
  };
  updateLoop(1);
}

Raylib.init({ canvas }).then(main).catch(err => console.error(err));

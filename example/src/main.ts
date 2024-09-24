import './style.css'
import { initRaylib } from '@luch/raylib-wasm';

const canvas = document.getElementById('game') as HTMLCanvasElement;

type Module = Awaited<ReturnType<typeof initRaylib>>;

async function addFile (mod: Module, filename: string, target?: string) {
  if (!target) {
    target = filename
  }
  const p = target.split('/').slice(0,-1)
  let dir = ''
  for (const d of p) {
    dir = dir + '/' + d
    try{
      mod.FS.mkdir(dir)
    }catch(e){
      console.error('Faield to add file', e)
    }
  }
  const buf = await fetch(filename).then(r => r.arrayBuffer());
  mod.FS.writeFile(target, new Uint8Array(buf));
}

initRaylib(canvas).then(async (rl) => {
  await addFile(rl, 'logo.png');

  rl.InitWindow(320, 240, "Hello");
  rl.SetTargetFPS(60);

  const logo = rl.LoadTexture('logo.png');
  const pos = {x: 100, y: 120};

  const userUpdate = (_timeStamp: DOMHighResTimeStamp) => {
    if (rl.IsKeyDown(65)) {
      pos.x -= 5;
    }
    if (rl.IsKeyDown(68)) {
      pos.x += 5;
    }
    if (rl.IsKeyDown(87)) {
      pos.y -= 5;
    }
    if (rl.IsKeyDown(83)) {
      pos.y += 5;
    }

    rl.BeginDrawing();
      rl.ClearBackground(rl.PINK);
      rl.DrawTexture(logo, pos, rl.WHITE);
      rl.DrawFPS(10, 10);
    rl.EndDrawing();
  }

  const updateLoop = (timeStamp: DOMHighResTimeStamp) => {
    userUpdate(timeStamp)
    requestAnimationFrame(updateLoop)
  }
  updateLoop(1)
});

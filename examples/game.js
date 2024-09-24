async function addFile (filename, target) {
  if (!target) {
    target = filename
  }
  const p = target.split('/').slice(0,-1)
  let dir = ''
  for (const d of p) {
    dir = dir + '/' + d
    try{
      Module.FS.mkdir(dir)
    }catch(e){
      console.error('Faield to add file', e)
    }
  }
  Module.FS.writeFile(target, new Uint8Array(await fetch(filename).then(r => r.arrayBuffer())))
}

const PINK = {r: 255, g: 109, b: 194, a: 255};
const BLACK = {r: 255, g: 255, b: 255, a: 255};

function userUpdate (ts, state) {
  // console.log(ts)
  if (Module.IsKeyDown(65)) {
    state.pos.x -= 5;
  }
  if (Module.IsKeyDown(68)) {
    state.pos.x += 5;
  }
  if (Module.IsKeyDown(87)) {
    state.pos.y -= 5;
  }
  if (Module.IsKeyDown(83)) {
    state.pos.y += 5;
  }


  Module.BeginDrawing();
    Module.ClearBackground(PINK);
    Module.DrawTexture(state.logo, state.pos, BLACK);
    Module.DrawFPS(10, 10);
  Module.EndDrawing();
}

async function start () {
  await addFile('logo.png');
  await addFile('sounds/1_sh.wav')

  Module.InitWindow(320, 240, "aaa");
  Module.SetTargetFPS(60);
  Module.InitAudioDevice();

  const state = {
    logo: Module.LoadTexture('logo.png'),
    sound: Module.LoadSound('sounds/1_sh.wav'),
    pos: {x: 120, y: 100},
  }
  console.log(state)

  // setInterval(() => Module.PlaySound('sounds/1_sh.wav'), 1000);

  const updateLoop = (timeStamp) => {
    userUpdate(timeStamp, state)
    requestAnimationFrame(updateLoop)
  }
  updateLoop(1, state)
}

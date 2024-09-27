import { Raylib } from '@cat_in_the_dark/raylib-wasm';
import { runBenchmark } from './benchmark';

const canvas = document.getElementById('game') as HTMLCanvasElement;

Raylib.init({ canvas }).then(runBenchmark).catch(err => console.error(err));

import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['mod.ts'],
  format: ['esm'],
  dts: true,
  splitting: false,
  clean: false,
  outDir: 'build',
});

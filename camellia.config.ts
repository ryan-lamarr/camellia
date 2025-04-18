// camellia.config.ts
import { defineConfig } from './cli/config';

export default defineConfig({
  entry: './examples/bundle-test',
  outputDir: './examples/bundle-test/dist',
  preserveStructure: true,
});

// cli/runCli.ts
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import path from 'path';
import fs from 'fs';
import { bundle } from '@core/bundler';
import { CamelliaUserConfig } from './config';
import { mergeCliWithConfig } from './utils/mergeCliWithConfig';
import { ResolvedConfig } from '@camellia/types';

interface CLIConfig {
  entry?: string;
  outputDir?: string;
  preserveStructure?: boolean;
}

async function loadConfigFile(): Promise<CamelliaUserConfig | null> {
  const configPath = path.resolve(process.cwd(), 'camellia.config.ts');

  if (!fs.existsSync(configPath)) return null;

  // 动态导入 ESM 模块
  const configModule = await import(configPath);
  return configModule.default ?? null;
}

export function runCli() {
  yargs(hideBin(process.argv))
    .command<CLIConfig>(
      'build',
      'Build the project',
      (yargs) =>
        yargs
          .option('entry', {
            alias: 'e',
            type: 'string',
            describe: 'The entry directory for the project',
          })
          .option('outputDir', {
            alias: 'o',
            type: 'string',
            describe: 'The output directory',
          })
          .option('preserveStructure', {
            alias: 'p',
            type: 'boolean',
            default: true,
          }),
          async (argv) => {
            const fileConfig: Partial<CamelliaUserConfig> = (await loadConfigFile()) ?? {};
    
            let config: ResolvedConfig;
            try {
              config = mergeCliWithConfig(argv, fileConfig);
            } catch (err) {
              console.error((err as Error).message);
              process.exit(1);
            }
    
            try {
              console.log(`Bundling from ${config.entry} to ${config.output.dir}`);
              await bundle(config);
              console.log('Build complete!');
            } catch (err) {
              console.error('Error during bundling:', err);
            }
          }
    )
    .help()
    .alias('h', 'help')
    .strict()
    .parse();
}

// cli/config.ts
export interface CamelliaUserConfig {
  entry: string;
  outputDir: string;
  preserveStructure?: boolean;
}

export function defineConfig(config: CamelliaUserConfig): CamelliaUserConfig {
  return config;
}

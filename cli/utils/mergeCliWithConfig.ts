// cli/utils/mergeCliWithConfig.ts
import { CamelliaUserConfig } from '../config';
import { ResolvedConfig } from '@camellia/types';

/**
 * 合并命令行参数和配置文件
 * @param cliArgs 命令行参数
 * @param fileConfig 配置文件内容
 */
export function mergeCliWithConfig(
  cliArgs: Partial<CamelliaUserConfig>,
  fileConfig: Partial<CamelliaUserConfig>
): ResolvedConfig {
  const entry = cliArgs.entry ?? fileConfig.entry;
  const outputDir = cliArgs.outputDir ?? fileConfig.outputDir;
  const preserveStructure =
    cliArgs.preserveStructure !== undefined
      ? cliArgs.preserveStructure
      : fileConfig.preserveStructure ?? true;

  if (!entry || !outputDir) {
    throw new Error('Missing required entry or outputDir.');
  }

  return {
    entry,
    output: {
      dir: outputDir,
      preserveStructure,
    },
  };
}

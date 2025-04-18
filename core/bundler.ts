import fs from 'fs/promises';
import path from 'path';
import {glob, GlobOptions} from 'glob';
import { BuildConfig } from '@camellia/types';

// 文件拷贝函数
async function copyFile(src: string, dest: string) {
  try {
    await fs.copyFile(src, dest);
    console.log(`Copied: ${src} to ${dest}`);
  } catch (error) {
    console.error(`Error copying file: ${src} -> ${dest}`, error);
  }
}

// 创建目录函数
async function createDir(dir: string) {
  try {
    await fs.mkdir(dir, { recursive: true });
  } catch (error) {
    console.error(`Error creating directory: ${dir}`, error);
  }
}

// 拷贝资源函数
async function copyAssets(srcDir: string, destDir: string) {
  try {
    const files = await glob(`${srcDir}/**/*`, { nodir: true });

    for (const file of files) {
      const destFile = path.join(destDir, path.relative(srcDir, file));
      const destDirPath = path.dirname(destFile);
      await createDir(destDirPath);
      await copyFile(file, destFile);
    }
    console.log(`Assets copied to: ${destDir}`);
  } catch (error) {
    console.error(`Error copying assets from ${srcDir} to ${destDir}`, error);
  }
}

// 执行打包任务
export async function bundle(config: BuildConfig) {
  const { entry, output } = config;
  const { dir: outputDir, preserveStructure } = output;

  // 1. 拷贝 HTML
  const htmlFiles = await glob(`${entry}/**/*.html`, { nodir: true });
  for (const htmlFile of htmlFiles) {
    const destHtml = path.join(outputDir, path.relative(entry, htmlFile));
    await createDir(path.dirname(destHtml));
    await copyFile(htmlFile, destHtml);
  }

  // 2. 拷贝 CSS
  const cssFiles = await glob(`${entry}/**/*.css`, { nodir: true });
  for (const cssFile of cssFiles) {
    const destCss = path.join(outputDir, path.relative(entry, cssFile));
    await createDir(path.dirname(destCss));
    await copyFile(cssFile, destCss);
  }

  // 3. 拷贝 JS
  const jsFiles = await glob(`${entry}/**/*.js`, { nodir: true });
  for (const jsFile of jsFiles) {
    const destJs = path.join(outputDir, path.relative(entry, jsFile));
    await createDir(path.dirname(destJs));
    await copyFile(jsFile, destJs);
  }

  // 4. 拷贝 assets（图片等）
  const assetDirs = await glob(`${entry}/**/assets/**/*`, { nodir: true });
  for (const assetDir of assetDirs) {
    const destAsset = path.join(outputDir, path.relative(entry, assetDir));
    await createDir(path.dirname(destAsset));
    await copyFile(assetDir, destAsset);
  }

  console.log('Bundling complete!');
}

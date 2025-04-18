// types/index.d.ts
export interface CamelliaUserConfig extends Partial<ResolvedConfig> {}

export interface ResolvedConfig {
    entry: string;
    output: {
      dir: string;
      preserveStructure: boolean;
    };
  }
// 配置类型
export interface BuildConfig {
  entry: string;
  output: {
    dir: string;
    preserveStructure: boolean;
  };
}

export interface CLIConfig {
    entry?: string;
    outputDir?: string;
    preserveStructure?: boolean;
  }
export interface BundleOptions {
    entry: string;
    outputDir: string;
    preserveStructure: boolean;
    format: 'esm' | 'cjs';
    minify: boolean;
    sourcemap: boolean;
    external: string[];
    watch: boolean;
    clean: boolean;
    tsconfig: string;
    alias: Record<string, string>;
    onStart: () => void;
    onEnd: () => void;
    onError: (error: Error) => void;
    onFileChange: (filePath: string) => void;
    onFileAdd: (filePath: string) => void;
    onFileRemove: (filePath: string) => void;
    onFileRename: (oldPath: string, newPath: string) => void;
    onFileDelete: (filePath: string) => void;
    onFileCopy: (src: string, dest: string) => void;
    onFileMove: (src: string, dest: string) => void;
    onFileSymlink: (src: string, dest: string) => void;
    onFileUnlink: (filePath: string) => void;
    onFileChangeStart: (filePath: string) => void;
    onFileChangeEnd: (filePath: string) => void;
    onFileChangeError: (filePath: string, error: Error) => void;
    onFileAddStart: (filePath: string) => void;
    onFileAddEnd: (filePath: string) => void;
    onFileAddError: (filePath: string, error: Error) => void;
    onFileRemoveStart: (filePath: string) => void;
    onFileRemoveEnd: (filePath: string) => void;
    onFileRemoveError: (filePath: string, error: Error) => void;
    onFileRenameStart: (oldPath: string, newPath: string) => void;
    onFileRenameEnd: (oldPath: string, newPath: string) => void;
    onFileRenameError: (oldPath: string, newPath: string, error: Error) => void;
    onFileDeleteStart: (filePath: string) => void;
    onFileDeleteEnd: (filePath: string) => void;
    onFileDeleteError: (filePath: string, error: Error) => void;
    onFileCopyStart: (src: string, dest: string) => void;
    onFileCopyEnd: (src: string, dest: string) => void;
    onFileCopyError: (src: string, dest: string, error: Error) => void;
    onFileMoveStart: (src: string, dest: string) => void;
    onFileMoveEnd: (src: string, dest: string) => void;
    onFileMoveError: (src: string, dest: string, error: Error) => void;
    onFileSymlinkStart: (src: string, dest: string) => void;
    onFileSymlinkEnd: (src: string, dest: string) => void;
    onFileSymlinkError: (src: string, dest: string, error: Error) => void;
    onFileUnlinkStart: (filePath: string) => void;
    onFileUnlinkEnd: (filePath: string) => void;
    onFileUnlinkError: (filePath: string, error: Error) => void;
}
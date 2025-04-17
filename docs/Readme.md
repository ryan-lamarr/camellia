模块 | 技术栈选择 | 说明
核心框架 | Node.js + TypeScript | 提供 CLI、插件框架、指令调度等
模块预打包器 | Rust 编写（或用 SWC） | 替换 esbuild，性能更强
构建阶段打包器 | Rollup（可插拔）/ Rspack | 高度插件化 + Tree Shaking 好
Dev Server | Node.js 原生 HTTP + WebSocket | 实现 HMR、按需加载
AST 转换器 | SWC 或自研基于 napi 的 AST 层 | 性能更高于 Babel，支持多语言扩展
插件系统 | 类似 Vite/Rollup 的钩子系统 | 支持生命周期：resolve、load、transform、optimize 等
缓存系统 | 基于文件 hash + AST 变更检测 | 精细缓存，避免冗余重构
多线程构建 | Rust 多线程 + Worker Pool | 提升大型项目打包速度
CLI 工具 | TS 编写（支持 --config，自动检测框架类型） | 用户体验好，支持多个模板生成
配置机制 | 支持 camellia.config.ts、插件式 | 零配置起步、按需覆盖

性能优化建议
利用 Rust/SWC 进行 AST 解析与代码压缩（替代 Babel + Terser）

利用持久缓存（文件变更检测 + 文件快照存储）

对 Vue/React 组件进行按需编译（仅在变更时重新编译）

利用 SSR 预渲染减少客户端包大小

Rollup/Rspack 构建产物支持 code splitting + 预加载 hint


camellia-pack/
├── core/                 # 核心逻辑
│   ├── config.ts         # 配置解析（支持 camellia.config.ts/json/yaml）
│   ├── plugin.ts         # 插件机制（支持 hook 生命周期）
│   ├── bundler.ts        # 打包器主逻辑
│   └── devServer.ts      # 开发服务器（含热更新逻辑）

├── cli/                  # CLI 入口
│   └── index.ts

├── rust/                 # Rust 模块（使用 napi/swc/core 库）
│   └── native-parser/    # SWC 绑定：AST 解析、transform、压缩等

├── plugins/              # 官方插件（按功能分类）
│   ├── react/
│   ├── vue/
│   └── legacy/           # 老浏览器兼容插件等

├── loaders/              # 自定义 loader 转换器（如 css、图片）
│   ├── cssLoader.ts
│   └── assetLoader.ts

├── resolvers/            # 模块解析逻辑（alias、路径映射等）

├── cache/                # 缓存相关（用于加速二次构建）
│   └── index.ts

├── examples/             # 示例项目
│   └── basic-react-app/

├── docs/                 # 文档系统

└── types/                # 类型定义
    └── index.d.ts

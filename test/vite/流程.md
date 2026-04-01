# 一、本地开发阶段（Dev Server：基于 ES modules， **不打包、仅实时编译 + 预构建** ）

**核心：基于浏览器原生 ESM 按需加载，esbuild 负责实时编译**

1. 启动 Node HTTP Server，建立 WebSocket 连接（用于 HMR 信号）
2. 基于操作系统 API（fsevents/inotify）监听 **src 内文件变化**
3. **依赖预构建（optimizeDeps）** ：

* 扫描入口用到的第三方包
* 对 CJS/AMD 或碎片化 ESM，**递归全依赖图**做解析
* 可静态分析的 CJS → 生成**静态 ESM 导出**
* 不可静态分析的 CJS → 生成**动态 ESM Proxy（运行时取值）**
* 合并为 **单文件 ESM** ，减少浏览器请求数
* 写入缓存：`node_modules/.vite/deps/xxx.js`

1. **缓存有效性判断** ：

* 依据：依赖版本 + 文件哈希 + 导出元信息 + esbuild/Vite 版本
* 动态 CJS → 元信息不稳定 → **缓存频繁失效**

1. 浏览器请求模块时：
   * 本地代码： **实时编译（ts/jsx/vue ⇒ JS）** ，不合并、不分包
   * 第三方包：直接读取 `.vite/deps` 预构建产物
2. 文件变化：
   * 只重新编译**当前改动文件**
   * 通过 WebSocket 推送 HMR 更新信号
   * 浏览器模块热替换，不刷新、不重建全量 bundle
3. 本阶段 **无** ：打包、chunk 分割、Tree Shaking、压缩、代码分割

---

# 二、生产构建阶段（Build：全量打包，Rollup 为主，esbuild 为辅）

**核心：生成可部署静态资源，追求最小体积、最优加载性能**

1. **确定构建入口** ，从入口开始**递归构建完整模块依赖图**
2. **模块归一化处理** ：

* 所有文件（TS/Vue/JSX/CSS）交给 **esbuild 编译到标准 ESM**
* 第三方包统一解析为 ESM 格式（CJS 已在前置阶段被兼容处理）

1. **全量静态分析** ：

* 追踪所有 `import`/`export` 依赖关系
* 标记**被引用**与**未被引用**的绑定

1. **Tree Shaking（仅 ESM 有效）** ：

* 删除 **未被引用的代码** （dead code）
* 受 `sideEffects` 配置影响：标记有副作用的文件不删除

1. **代码分包（Chunk Splitting）** ：

* 按规则分割：业务代码、第三方 vendor、异步路由 chunk
* 处理公共依赖，避免重复打包
* 抽离 CSS 为独立文件（非内联）

1. **产物优化** ：

* **esbuild 压缩 JS/CSS** （比 Terser 快 10～100 倍）
* 静态资源加  **content hash** （强缓存策略）
* 小图片 / 字体转 base64（可配置阈值）

1. 输出最终构建结果到 `dist`

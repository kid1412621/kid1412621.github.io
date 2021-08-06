# 2021 ESLint StyleLint Pritter EditorConfig 整合 VSCode

2021 前端开发，就连环境搭建也不比后端简单了，一堆 bundler/transpiler/linter/formatter/...（及其插件和editor/IDE整合），各种概念占据了开发者的内存，各种配置文件充斥了项目根文件。Maybe that's why frontend dev ~~sucks~~ is awesome.

## 单项独自配置
0. 安装配置 VSCode；
由于 VSCode 默认的 TabSize 为 4，而[大多数框架和插件都为 2](https://github.com/Microsoft/vscode/issues/41200)，为避免不必要的冲突，最好将其也设置为 2;
### ESLint
1. 安装 VSCode [ESLint 插件](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)；
2. 配置插件使其达到保存时自动修复代码：
	a. 方法一：[VSCode 更新后将`FixOnSave`功能进行了整合](https://stackoverflow.com/a/59485018/8140523)
	b. 方法二：设置 Eslint › Format: Enable 使其成为 VSCode 中的一个代码格式化器，再将 js 的默认格式化器设置为 ESLint；

### StyleLint
1. 暗转 [VSCode StyleLint 插件]()；

## 完全整合配置
### ESLint/StyleLint 整合 Prettier
1. Linter 优先，将 Prettier 作为 Linter 的规则
eslint-plugin-prettier 仅仅关闭 eslint 一些默认的冲突规则，要是用户自定义了一些规则导致冲突，vscode 识别到后则任会报错。而且插件需要关闭 vscode 的"editor.formatOnSave": false

This extension will use prettier from your project's local dependencies (recommended). When the prettier.resolveGlobalModules is set to true the extension can also attempt to resolve global modules. Should prettier not be installed locally with your project's dependencies or globally on the machine, the version of prettier that is bundled with the extension will be used.

Prettier 配置文件和 eslint 中 "prettier/prettier" 规则冲突，例如在 `.prettierrc` 中加入 `"semi": true`，eslint 会报出 `Delete `;`eslintprettier/prettier`；而且 Prettier 配置文件和 eslint 的配置文件的自定义规则(如 semi)若单独设置，也会诱发冲突。所以若坚持使用这种方式，那么最好将规则定义到一个地方。

2. prettier-eslint
### Vue
Vetur 内嵌了 prettier 作为格式化器，这也意味着无需安装 Prettier 插件也可配置 `.prettierrc` 文件来指定格式化配置，

### React

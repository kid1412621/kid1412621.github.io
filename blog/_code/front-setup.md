# 2021 ESLint StyleLint Pritter EditorConfig 整合 VSCode

2021 前端开发，就连环境搭建也不比后端简单了，一堆 bundler/transpiler/linter/formatter/...（及其插件和editor/IDE 整合），各种概念占据了开发者的内存，各种配置文件充斥了项目根文件。Maybe that's why frontend dev ~~sucks~~ is awesome.



## 单项独自配置
0. 安装并配置 VSCode ；
由于 VSCode 默认的 TabSize 为 4，而[大多数框架和插件都为 2](https://github.com/Microsoft/vscode/issues/41200)，为避免不必要的冲突，最好将其也设置为 2 ；

### EditorConfig

[EditorConfig](https://editorconfig.org/) 旨在统一涉及到多人（/平台）时代码文本的**基本格式**，例如编码格式、缩进方式、换行符（ Windows/Unix ）、尾部空格等等。像 IDEA 等 IDE 自带集成，若存在其配置文件（ `.editorconfig` ）则会遵循其定义的格式化规则；但 VSCode 需要安装插件才会默认遵循。

1. 安装 VSCode [EditorConfig 插件](https://marketplace.visualstudio.com/items?itemName=EditorConfig.EditorConfig) ，安装完后即可发现 VSCode 右下方状态栏的文本格式会遵循配置文件；

2. *若项目未定义其配置文件，在项目根文件夹点击右键，选择 `Generate .editorconfig`* ，该配置文件遵循 [.properties](https://en.wikipedia.org/wiki/.properties) 格式，例：

   ```properties
   # 表示这为最顶层的配置文件，editorconfig 不会再往上寻找配置文件
   root = true
   
   [*]
   indent_style = space
   indent_size = 4
   end_of_line = lf
   charset = utf-8
   trim_trailing_whitespace = false
   insert_final_newline = false
   ```

   

### ESLint

[ESLint](https://eslint.org) 旨在提供 ECMAScript/JavaScript 语言的静态代码检查，可提示/修复代码中的**语法问题**、潜在 **Bug**、代码风格。

1. 安装 VSCode [ESLint 插件](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) ，安装后赋予 VSCode 根据配置文件<u>提示</u>代码问题、<u>修复</u>问题的能力（当然不安装的话也可以通过命令行使用，安装插件的本质也就是能在 VSCode 中更便捷的使用 ESLint CLI ）；

2. 安装 ESLint ，因为 VSCode ESLint 插件本身并不自带 ESLint ，所以需要单独安装。本地安装：`npm i -D eslint` ；全局安装：`npm i -g eslint` 。插件采用优先级为：<u>项目依赖 > 全局安装</u>；

3. *若项目未定义其配置文件，可按 `Ctrl/Cmd` + `Shift` + `p` ，然后执行 ESLint: Create ESLint configuration ，或者在终端输入 `eslint --init`（但初始化的前提是已经执行了 `npm init` ，因为 ESLint 会根据选择安装相关依赖），接着根据提示选择；*

   ```shell
   $ eslint --init
   ✔ How would you like to use ESLint? · style
   ✔ What type of modules does your project use? · esm
   ✔ Which framework does your project use? · none
   ✔ Does your project use TypeScript? · No / Yes
   ✔ Where does your code run? · browser✔ How would you like to define a style for your project? · guide
   ✔ Which style guide do you want to follow? · standard
   ✔ What format do you want your config file to be in? · JSON
   ✔ Would you like to install them now with npm? · No / Yes
   ```

   ESLint 提供 json/js/yaml 格式的配置文件，也可定义在 `package.json` 中，在初始化时可选，配置文件详情参见[官网](https://eslint.org/docs/user-guide/configuring/)，例：

   ```json
   {
     	// 代码的 context
       "env": {
           "browser": true,
           "es2021": true
       },
     	// 使用插件
     	"plugins": [
           "react"
   		],
     	// 继承现成规则合集
       "extends": [
           "standard",
         	"plugin:react/recommended" // 继承插件中的规则，越往后的优先级越高
       ],
     	// 自定义规则，优先级高
       "rules": {
           "semi": ["error", "always"],
           "quotes": ["error", "double"]
       }
   }
   ```

   ESLint 规则一般无需自行编写规则，而是使用现成的规则（加之按需配置的规则），可通过两种方式：

   a. 使用 `extends` 来继承既有的规则合集；

   b. 使用 `plugins` 后从中选中一些规则来继承使用；

   两者的[差别](https://stackoverflow.com/a/54522973/8140523)可理解为：前者的规则全盘接受，后者的规则选择性使用。

4. 配置插件使其达到保存时自动修复代码，也有两种方法：
    a. [VSCode 更新后将 `FixOnSave` 功能进行了整合](https://stackoverflow.com/a/59485018/8140523)，可直接设置 `"editor.codeActionsOnSave":{"source.fixAll.eslint": true}` 启用；

  b. 第二种方式首先需要设置 `"editor.formatOnSave": true` 开启编辑器在保存时自动格式化，然后开启 `"eslint.format.enable": true` 使其成为 VSCode 中的一个代码格式化器（且将其作为目标文件类型的默认格式化器）。这种方式有个弊端，若 ESLint 规则设置的不全，则有些格式化效果不佳，因为方法一仅 ESLint 作问题修复用，格式化还是交给了其它格式化器。



### StyleLint

[StyleLint](https://stylelint.io) 之于 css 就像 ESLint 之于 JavaScript ，致力于类 css 文件的静态检查，避免样式文件的错误及代码风格。

1. 安装 VSCode [StyleLint 插件](https://marketplace.visualstudio.com/items?itemName=stylelint.vscode-stylelint)，安装后 VSCode 将拥有根据配置文件<u>提示</u>代码问题、<u>修复</u>问题的能力；

2. 安装 StyleLint 及规则，本地安装：`npm i -D stylelint` ；全局安装：`npm i -g stylelint` ；安装规则：`npm i -D stylelint-config-standard ` 。插件采用优先级为：<u>项目依赖 > 全局安装 > 插件自带</u>（不推荐）；

3. 初始化配置文件，项目根目录新建 `.stylelintrc` 文件（同时支持 json/js/yaml 格式）或定义在 `package.json` 中。配置项和 ESLint 极为相似，同样有 extends/plugins/rules 的概念（详见[官网](https://stylelint.io/user-guide/configure)），例：

   ```json
   {
     "extends": "stylelint-config-standard",
     "plugins": [
   		"stylelint-order"
   	],
     "rules": {
       "color-no-invalid-hex": true,
       "order/order": [
   			"custom-properties",
   			"declarations"
   		]
     }
   }
   ```

4. 配置保存时自动修复问题，设置 `"editor.codeActionsOnSave":{"source.fixAll.stylelint": true}` 启用，但插件并[未提供格式化代码的功能](https://github.com/stylelint/vscode-stylelint/issues/25)，



### Prettier

相对于 [Uglify](https://github.com/mishoo/UglifyJS) 是让机器更有效率的读取代码，[Prettier](https://prettier.io/) 是一个「主观的」代码格式化器，主要专注于前端代码风格的统一，提高代码可读性以便人更高效的阅读。不同于 Linter 专注于代码质量，Prettier 专注于代码风格，这在多人协作中很是必要，而使用 Prettier 则无需开发者过多关注格式化问题。

> **Prettier for formatting** and **linters for catching bugs!**

1. 安装 VSCode [Prettier 插件](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)，Prettier 同样提供[命令行](https://prettier.io/docs/en/cli.html)操作，插件只是使得在 VSCode 中使用更便捷；

2. 安装 Prettier ，项目本地安装：`npm i -D prettier` ，全局安装：`npm i -g prettier` 。插件自带 Prettier 库，其选用优先级为：<u>项目依赖 > 全局安装 > 插件自带</u>；

3. 配置 Prettier ，在项目根目录新建 `.prettierrc` （支持 js/json/yaml/toml 格式）配置文件或在 `package.json` 中定义 `prettier` 字段。[配置项](https://prettier.io/docs/en/options.html)相较于 Linter 简单，直接是一条条规则，某一类型若有特殊规则使用 `overrides` 覆写即可，下为基础范例：

   ```json
   {
   	"endOfLine": "lf",        // 换行符
     "useTabs": false,					// 是否使用 tab
     "tabWidth": 2,						// tab 转化为空格的宽度
     "semi": true,							// 表达式尾分号
     "singleQuote": false,			// 是否使用单引号
     "bracketSpacing": true,		// 括号首尾空格
     "trailingComma": "es5",		// 行尾逗号
     "overrides": [						// 覆写总体规则
       {
         "files": "*.test.js",	// 覆写的文件类型
         "options": {					// 覆写的具体规则
           "semi": false
         }
       }
     ]
   }
   ```

   虽然插件也可以配置部分配置，但还是推荐使用配置文件（以便团队协同时保证有相同的格式），插件采用配置的优先级：<u>Prettier 配置文件 > Editorconfig 配置文件 > VSCode 插件配置（前两者存在时不生效，且[不推荐](https://github.com/prettier/prettier-vscode/issues/958#issue-493377488)）</u>；值得注意的是，修改 Prettier 配置文件，插件未能实时检测修改；

4. 参照前文设置 VSCode 在保存时自动格式化，并配置相应文件类型默认格式化器为 Prettier 。



## 完全整合配置
### ESLint/StyleLint 整合 Prettier

由于 ESLint 带有问题修复功能，VSCode 也自带代码格式化、修复问题功能，所有很容易和 Prettier 产生冲突，严重的甚至造成代码错乱无法运行。

根据官方的[整合指南](https://prettier.io/docs/en/integrating-with-linters.html)， Prettier 作为 Linter 的一部分（插件/扩展）使用，下以 ESLint 为例：

1. 使用 plugins [eslint-plugin-prettier](https://github.com/prettier/eslint-plugin-prettier) 使 Prettier 作为 ESLint 的一部分来运行（而不是直接运行 Prettier ），Prettier 的配置项会作为 ESLint 的规则来校验；

2. 使用 extends [eslint-config-prettier](https://github.com/prettier/eslint-config-prettier) 覆盖冲突的、代码风格相关的规则*。

```json
{
  plugins: ["prettier"],
  extends: [
    "eslint:recommended",
    "prettier"
  ],
  rules: {
    "prettier/prettier": "error"
  }
}
```

这样仅仅关闭 eslint 一些默认的冲突规则，要是用户自定义了一些规则（如 ESLint 配置中的 rules 字段）导致冲突，VSCode 识别到后则任会报错。例如在 `.prettierrc` 中配置 `"semi": false `，`.eslintrc` 中 rules 加入 `semi: "error"` ，VSCode 会报错提示删除分号。



#### 可能的冲突点

1. <u>配置文件</u>冲突，ESLint 的规则未能和 Prettier 规则正确配置，可能是优先级问题，也可能是多个地方同一个配置项设置了不同的值；
2. <u>依赖版本</u>冲突，比如 eslint-config-prettier 依赖的 eslint 版本和安装的 eslint 版本不兼容；
3. <u>VSCode 设置</u>同时配置了保存时格式化（ `editor.formatOnSave` ）和保存时修复问题（ `editor.codeActionsOnSave` ），但格式化使用的是 Prettier ，修复问题使用的是 ESLint ，这样会造成在保存文件时会对代码修改两次。



### Vue

开发 Vue 项目一般都会安装官方 VSCode 插件 [Vetur](https://marketplace.visualstudio.com/items?itemName=octref.vetur) 来对 `.vue` 文件提供语法高亮等功能，其[内嵌 Prettier 作为格式化器](https://vuejs.github.io/vetur/guide/formatting.html#formatters)，这也意味着无需单独安装 Prettier 插件也可配置 `.prettierrc` 文件来指定格式化配置，其默认配置：

```json
{
  "vetur.format.defaultFormatter.html": "prettier",
  "vetur.format.defaultFormatter.pug": "prettier",
  "vetur.format.defaultFormatter.css": "prettier",
  "vetur.format.defaultFormatter.postcss": "prettier",
  "vetur.format.defaultFormatter.scss": "prettier",
  "vetur.format.defaultFormatter.less": "prettier",
  "vetur.format.defaultFormatter.stylus": "stylus-supremacy",
  "vetur.format.defaultFormatter.js": "prettier",
  "vetur.format.defaultFormatter.ts": "prettier",
  "vetur.format.defaultFormatter.sass": "sass-formatter"
}
```

这些配置定义了 `.vue` 文件中每类语言的格式化器，相应的，最好再配置 VSCode 中 `.vue` 文件的默认格式化器为 Vetur ：`"[vue]":{"editor.defaultFormatter": "octref.vetur"}` 以避免冲突。

额外的，我会设置 `"vetur.format.defaultFormatter.js": "prettier-eslint"` ，这会使用 [prettier-eslint](https://github.com/prettier/prettier-eslint) 来格式化 `.vue` 文件中的 js 代码，这会将代码先用 `prettier` 格式化，然后将结果传给 `eslint --fix` 修复，最后得到格式化的代码。

此外，根据 Vetur [官方文档](https://vuejs.github.io/vetur/guide/linting-error.html#linting)，如要集成 ESLint 并使用自定义规则，需要设置 `"vetur.validation.template": false` 来关闭 Vetur 自带的 eslint-plugin-vue 校验。



### React

React 的集成就十分简单，使用 [create-react-app](https://create-react-app.dev/) 来构建项目会自动整合 [eslint-config-react-app](https://www.npmjs.com/package/eslint-config-react-app) ，其包括了网上大多数教程提供的以下配置，<u>无需单独配置</u>：

```json
parserOptions: {
  ecmaFeatures: {
    jsx: true
  },
  ecmaVersion: 11
}
```

再者，VSCode 中可针对 `.jsx` 文件设置默认的格式化器：`"[javascriptreact]": {"editor.defaultFormatter": "esbenp.prettier-vscode"}` 。


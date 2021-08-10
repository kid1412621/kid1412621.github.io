# 2021 ESLint StyleLint Pritter EditorConfig 整合 VSCode

2021 前端开发，就连环境搭建也不比后端简单了，一堆 bundler/transpiler/linter/formatter/...（及其插件和editor/IDE整合），各种概念占据了开发者的内存，各种配置文件充斥了项目根文件。Maybe that's why frontend dev ~~sucks~~ is awesome.



## 单项独自配置
0. 安装配置 VSCode；
由于 VSCode 默认的 TabSize 为 4，而[大多数框架和插件都为 2](https://github.com/Microsoft/vscode/issues/41200)，为避免不必要的冲突，最好将其也设置为 2;

### EditorConfig

[EditorConfig](https://editorconfig.org/) 旨在统一涉及到多人（/平台）时代码文本的**基本格式**，例如编码格式、缩进方式、换行符（Windows/Unix）、尾部空格等等。像 IDEA 等 IDE 自带集成，若存在其配置文件（`.editorconfig`）则会遵循其定义的格式化规则；但 VSCode 需要安装插件才会默认遵循。

1. 安装 VSCode [EditorConfig 插件](https://marketplace.visualstudio.com/items?itemName=EditorConfig.EditorConfig) ，安装完后即可发现 VSCode 右下方状态栏的文本格式会遵循配置文件；

2. *若项目未定义其配置文件，在项目根文件夹点击右键，选择 Generate .editorconfig* ，该配置文件遵循 [.properties](https://en.wikipedia.org/wiki/.properties) 格式，例：

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

2. 安装 ESLint ，本地安装：`npm i -D eslint` ；全局安装：`npm i -g eslint` 。因为 VSCode ESLint 插件本身并不自带 ESLint ，所以需要单独安装，插件使用 ESLint 的逻辑为：若本项目文件夹中不包含 ESLint ，则使用全局安装的版本。

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

   ESLint 提供 js/yaml/json 格式的配置文件，在初始化时可选，配置文件详情参见[官网](https://eslint.org/docs/user-guide/configuring/)，例：

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
         	"plugin:react/recommended" // 继承插件中的规则
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

1. 安装 VSCode [StyleLint 插件](https://marketplace.visualstudio.com/items?itemName=stylelint.vscode-stylelint)，安装后 VSCode 拥有根据配置文件<u>提示</u>代码问题、<u>修复</u>问题的能力；
2. 安装 StyleLint 及规则：
3. *初始化配置文件*
4. 配置，但插件并[未提供格式化代码的功能](https://github.com/stylelint/vscode-stylelint/issues/25)，



### Prettier



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

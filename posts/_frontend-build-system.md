---
title: 前端构建系统纵览
date: 2024-08-25
tags:
  - frontend
  - build
permalink: frontend-build-system
---

# 前端构建系统纵览

> 本译文已获取作者许可后翻译、发布。
>
> 原文：[Exposition of Frontend Build Systems](https://sunsetglow.net/posts/frontend-build-systems.html)

开发者编写 JavaScript；浏览器运行 JavaScript。从根本上说，前端开发中不需要构建步骤。那么，为什么在现代前端中我们需要构建步骤呢？

随着前端代码库变得越来越大，开发者效率变得越来越重要，直接将 JavaScript 源代码传输给客户端会导致两个主要问题：

1. **不支持的语言特性：**由于 JavaScript 在浏览器中运行，而且有很多不同版本的浏览器，每当你使用一种语言特性时，能够执行你 JavaScript 代码的客户端数量就会减少。此外，像 JSX 这样的语言扩展不是有效的 JavaScript，并且无法在任何浏览器中运行。

2. **性能**：浏览器必须单独请求每个 JavaScript 文件。在大型代码库中，这可能导致成千上万的 HTTP 请求来渲染单个页面。在过去，在 HTTP/2 之前，这还会导致成千上万次 TLS 握手。

此外，在加载所有 JavaScript 之前，可能需要几次连续的网络请求。例如，如果 index.js 导入 page.js，page.js 导入 button.js，则需要三次连续的网络请求才能完全加载 JavaScript。这就是瀑布问题。

由于变量名称过长和空白缩进字符，源文件还可能不必要地变大，从而增加带宽使用量和网络加载时间。

前端构建系统处理源代码，生成一个或多个优化的 JavaScript 文件传输给到浏览器。但生成的文件可读性很差。

## 1. 构建步骤

### 1.1. 转译

转译通过将用现代 JavaScript 标准编写的 JavaScript 代码转换为较旧的 JavaScript 标准来解决不支持的语言特性的问题。如今，ES6/ES2015 是一个常见的目标。

框架和工具也可能引入转译步骤。例如，JSX 语法必须被转译为 JavaScript。如果一个库提供了 Babel 插件，通常意味着它需要一个转译步骤。此外，像 TypeScript、CoffeeScript 和 Elm 这样的语言也必须转译为 JavaScript。

CommonJS 模块（CJS）也必须被转译为与浏览器兼容的模块系统。在浏览器在 2018 年广泛支持 ES6 模块（ESM）之后，转译为 ESM 通常是推荐的。此外，ESM 更容易优化和进行 Tree-Shaking，因为它的导入和导出是静态定义的。

目前常用的转译器有 Babel、SWC 和 TypeScript 编译器。

Babel（2014）是标准的转译器：一个用 JavaScript 编写的单线程转译器，速度较慢。许多需要转译的框架和库通过 Babel 插件来实现转译，因此 Babel 成为构建过程中不可或缺的一部分。然而，Babel 难以调试，且常常令人困惑。

SWC（2020）是一个用 Rust 编写的多线程转译器，速度快。它声称比 Babel 快 20 倍，因此被较新的框架和构建工具使用。它支持转译 TypeScript 和 JSX。如果你的应用不需要 Babel，SWC 是一个更好的选择。

TypeScript 编译器（tsc）也支持转译 TypeScript 和 JSX。它是 TypeScript 的参考实现，是唯一功能齐全的 TypeScript 类型检查器。然而，它非常慢。虽然 TypeScript 应用必须使用 TypeScript 编译器进行类型检查，但在构建步骤中，选择一个替代的转译器将更加高效。

如果你的代码是纯 JavaScript 并且使用 ES6 模块，你也可以跳过转译步骤。

对于不支持的语言特性的一个替代解决方案是填充（polyfill）。填充在运行时执行，在执行主要应用逻辑之前实现任何缺失的语言特性。然而，这会增加运行时成本，且某些语言特性无法通过填充实现。参见 core-js。

所有的打包工具本质上也是转译器，因为它们解析多个 JavaScript 源文件并生成一个新的打包 JavaScript 文件。在此过程中，它们可以选择在生成的 JavaScript 文件中使用哪些语言特性。一些打包工具还能够解析 TypeScript 和 JSX 源文件。如果你的应用有简单的转译需求，你可能不需要一个单独的转译器。

### 1.2. 打包

打包解决了需要发出多次网络请求以及瀑布问题（waterfall problem）。打包工具将多个 JavaScript 源文件连接成一个 JavaScript 输出文件，称为打包文件，且不改变应用行为。浏览器可以通过单次往返网络请求高效加载该打包文件。

目前常用的打包工具有 Webpack、Parcel、Rollup、esbuild 和 Turbopack。

1. Webpack（2014）在 2016 年左右获得了广泛的流行，后来成为了标准的打包工具。与当时使用广泛的 Browserify 不同，Browserify 通常与 Gulp 任务运行器一起使用，而 Webpack 率先引入了 “加载器”，它能够在导入时转换源文件，使 Webpack 能够协调整个构建管道。

加载器允许开发者在 JavaScript 文件中透明地导入静态资产，将所有源文件和静态资产组合成一个单一的依赖图。在 Gulp 中，每种类型的静态资产必须作为一个单独的任务进行构建。Webpack 还支持代码分割，这简化了它的设置和配置。

Webpack 用 JavaScript 编写，速度较慢且是单线程的。它高度可配置，但其众多配置选项可能让人困惑。

2. Rollup（2016）利用了 ES6 模块在浏览器中的广泛支持及其带来的优化，尤其是 Tree Shaking。它生成的打包文件比 Webpack 小得多，后来 Webpack 也采用了类似的优化。Rollup 是一个用 JavaScript 编写的单线程打包工具，其性能仅略优于 Webpack。

3. Parcel（2018）是一个低配置的打包工具，旨在开箱即用，为构建过程和开发者工具需求提供合理的默认配置。它是多线程的，比 Webpack 和 Rollup 快得多。Parcel 2 在底层使用 SWC。

4. Esbuild（2020）是一个为并行性和优化性能而设计的打包工具，用 Go 编写。它的性能比 Webpack、Rollup 和 Parcel 高出几十倍。Esbuild 实现了一个基本的转译器以及一个压缩器。然而，它的功能不如其他打包工具丰富，只提供了一个有限的插件 API，无法直接修改 AST。与其使用 esbuild 插件修改源文件，不如在传递给 esbuild 之前对文件进行转换。

5. Turbopack（2022）是一个支持增量重建的快速 Rust 打包工具。该项目由 Vercel 构建，并由 Webpack 的创始人领导。目前它处于测试阶段，可以在 Next.js 中选择使用。

如果你有非常少的模块或网络延迟非常低（例如在本地主机上），跳过打包步骤是合理的。几个开发服务器也选择不为开发服务器打包模块。

#### 1.2.1. 代码分割

默认情况下，客户端 React 应用程序会被转换为一个单一的包。对于具有许多页面和功能的大型应用程序，这个包可能会非常大，从而抵消了打包带来的原始性能优势。

将包分割成几个较小的包，即代码分割，解决了这个问题。一种常见的方法是将每个页面分割为一个单独的包。使用 HTTP/2 协议，共享的依赖项也可以被分离到各自的包中，以避免重复且成本较低。此外，大型模块可能会被分割成单独的包，并按需懒加载。

在进行代码分割后，每个包的文件大小大大减少，但现在需要额外的网络往返，这可能重新引入瀑布问题。代码分割是一种权衡取舍。

文件系统路由器（filesystem router），由 Next.js 推广，优化了代码分割的权衡取舍。Next.js 为每个页面创建单独的包，仅在包中包含该页面导入的代码。加载页面时会并行预加载该页面使用的所有包。这样既优化了包的大小，也不会重新引入瀑布问题。文件系统路由器通过为每个页面创建一个入口点（pages/**/*.jsx），而不是传统客户端 React 应用的单一入口点（index.jsx）来实现这一点。

#### 1.2.2. Tree Shaking

一个包由多个模块组成，每个模块包含一个或多个导出内容。通常，一个包只会使用它导入的模块中的一部分导出内容。打包工具可以在摇树（tree shaking）过程中移除模块中未使用的导出内容。这可以优化包的大小，改善加载和解析时间。

摇树依赖于源文件的静态分析，因此当静态分析变得更加困难时，摇树的效果会受到影响。两个主要因素影响摇树的效率：

模块系统：ES6 模块具有静态导出和导入，而 CommonJS 模块具有动态导出和导入。因此，打包工具在对 ES6 模块进行摇树时可以更加激进和高效。

副作用：package.json 中的 sideEffects 属性声明了一个模块在导入时是否具有副作用。如果存在副作用，由于静态分析的局限性，未使用的模块和未使用的导出内容可能不会被摇树。

#### 1.2.3. 静态资源

静态资源（如 CSS、图片和字体）通常会在打包步骤中添加到可分发文件中。它们也可以在最小化步骤中优化文件大小。

在 Webpack 出现之前，静态资源是在构建管道中作为独立的构建任务与源代码分开构建的。要加载静态资源，应用程序必须通过它们在可分发文件中的最终路径来引用它们。因此，通常会根据 URL 约定仔细组织资源（例如 /assets/css/banner.jpg 和 /assets/fonts/Inter.woff2）。

Webpack 的 “加载器” 允许从 JavaScript 中导入静态资源，将代码和静态资源统一到一个依赖图中。在打包过程中，Webpack 会用静态资源在可分发文件中的最终路径替换静态资源的导入路径。这个特性使得静态资源可以与其相关的组件一起在源代码中进行组织，并创造了静态分析的新可能性，例如检测不存在的资源。

需要认识到的是，静态资源的导入（非 JavaScript 或非转译为 JavaScript 的文件）并不是 JavaScript 语言的一部分。它需要一个打包工具，并配置支持该资源类型的加载器。幸运的是，继 Webpack 之后的打包工具也采用了 “加载器” 模式，使这一特性变得普遍。

### 1.3 压缩

Minification resolves the problem of unnecessarily large files. Minifiers reduce the size of a file without affecting its behavior. For JavaScript code and CSS assets, minifiers can shorten variables, eliminate whitespace and comments, eliminate dead code, and optimize language feature use. For other static assets, minifiers can perform file size optimization. Minifiers are typically run on a bundle at the end of the build process.
压缩解决了文件过大带来的问题。压缩工具在不影响行为的情况下减少文件大小。对于 JavaScript 代码和 CSS 资源，压缩工具可以缩短变量，消除空白和注释，消除无用代码，并优化语言特性使用。对于其他静态资源，压缩工具可以进行文件大小优化。压缩工具通常在构建过程的最后对打包文件进行处理。

Several JavaScript minifiers in common use today are Terser, esbuild, and SWC. Terser was forked from the unmaintained uglify-es. It is written in JavaScript and is somewhat slow. Esbuild and SWC, mentioned previously, implement minifiers in addition to their other capabilities and are faster than Terser.
目前常用的 JavaScript 压缩工具有 Terser、esbuild 和 SWC。Terser 是从已不再维护的 uglify-es 分叉而来的。它是用 JavaScript 编写的，速度相对较慢。前面提到的 esbuild 和 SWC 除了其他功能外，还实现了压缩功能，而且比 Terser 更快。

Several CSS minifiers in common use today are cssnano, csso, and Lightning CSS. Cssnano and csso are pure CSS minifiers written in JavaScript and thus somewhat slow. Lightning CSS is written in Rust and claims to be 100x faster than cssnano. Lightning CSS additionally supports CSS transformation and bundling.
目前常用的 CSS 压缩工具有 cssnano、csso 和 Lightning CSS。cssnano 和 csso 是用 JavaScript 编写的纯 CSS 压缩工具，因此速度相对较慢。Lightning CSS 是用 Rust 编写的，据称比 cssnano 快 100 倍。Lightning CSS 还支持 CSS 转换和打包功能。

## 2. 开发者工具

上述的基础前端构建管道足以创建优化后的生产分发文件。但还有几类工具可以增强基础构建管道，并改善开发者的体验。

### 2.1. 元框架
前端领域在选择 “合适” 的包时臭名昭著。例如，上述提到的五个打包工具中，你应该选择哪一个？

元框架提供了一套经过精心挑选的包，包括构建工具，这些包能够协同工作并实现特定的应用范式。例如，Next.js 专注于服务器端渲染（SSR），而 Remix 专注于渐进增强。

元框架通常提供一个预配置的构建系统，无需自己拼凑一个系统。它们的构建系统既有生产环境的配置，也有开发服务器的配置。

与元框架类似，像 Vite 这样的构建工具也提供了预配置的构建系统，既适用于生产环境也适用于开发环境。与元框架不同的是，它们不强制使用特定的应用范式，适用于通用的前端应用。

### 2.2. 源映射（Sourcemaps）
构建管道生成的分发文件对大多数人来说是不可读的。这使得调试任何出现的错误变得困难，因为它们的追踪指向的是不可读的代码。

源映射通过将分发文件中的代码映射回源代码中的原始位置来解决这个问题。浏览器和故障排查工具（如 Sentry）使用源映射来恢复并显示原始源代码。在生产环境中，源映射通常对浏览器隐藏，仅上传到故障排查工具，以避免公开源代码。

构建管道的每一步都可以生成源映射。如果使用多个构建工具来构建管道，源映射将形成一个链条（例如：source.js -> transpiler.map -> bundler.map -> minifier.map）。要识别与压缩代码对应的源代码，必须遍历源映射链。

然而，大多数工具无法解释源映射链；它们期望每个分发文件最多只有一个源映射。源映射链必须被压平为一个单一的源映射。预配置的构建系统可以解决这个问题（参见 Vite 的 combineSourcemaps 函数）。

### 2.3. 热重载（Hot Reload）
开发服务器通常提供热重载功能，当源代码更改时自动重新构建新包并重新加载浏览器。尽管比手动重建和重新加载要优越得多，但它仍然比较慢，且所有客户端状态在重新加载时都会丢失。

热模块替换（Hot Module Replacement）在热重载的基础上进行了改进，通过在运行中的应用中替换更改的包进行原地更新。这保留了未更改模块的客户端状态，并减少了代码更改与应用更新之间的延迟。

然而，每次代码更改都会触发所有导入它的包的重建。这种操作的时间复杂度与包大小呈线性关系。因此，在大型应用中，由于重包成本的增加，热模块替换可能会变慢。

Vite 目前倡导的无打包范式通过不为开发服务器打包来解决这个问题。相反，Vite 直接将每个源文件对应的 ESM 模块提供给浏览器。在这种范式中，每次代码更改只会触发前端的单个模块替换。这样，刷新时间复杂度几乎不随应用大小变化。然而，如果有很多模块，初始页面加载可能会变慢。

### 2.4. 单一仓库（Monorepos）
在拥有多个团队或多个应用的组织中，前端可能会拆分为多个 JavaScript 包，但保留在一个仓库中。在这样的架构中，每个包都有自己的构建步骤，它们共同形成一个包依赖图。应用程序位于依赖图的根节点。

单一仓库工具负责协调依赖图的构建。它们通常提供增量重建、并行处理和远程缓存等功能。借助这些功能，大型代码库可以享受小型代码库的构建时间。

更广泛的行业标准单一仓库工具，如 Bazel，支持广泛的语言、复杂的构建图和封闭执行。然而，JavaScript 前端是与这些工具完全集成最困难的生态系统之一，目前几乎没有先例。

幸运的是，存在一些专门为前端设计的单一仓库工具。不幸的是，它们缺乏 Bazel 等工具的灵活性和健壮性，尤其是封闭执行。

目前常用的前端专用单一仓库工具有 Nx 和 Turborepo。Nx 更成熟且功能丰富，而 Turborepo 则是 Vercel 生态系统的一部分。过去，Lerna 是用于将多个 JavaScript 包链接在一起并发布到 NPM 的标准工具。在 2022 年，Nx 团队接管了 Lerna，现在 Lerna 在底层使用 Nx 来支持构建。

## 3. 趋势
更新的构建工具是用编译语言编写的，并强调性能。2019年的前端构建速度非常慢，但现代工具已经大大加快了速度。然而，现代工具的功能集较小，有时与库不兼容，因此遗留代码库通常难以轻松切换到它们。

服务器端渲染（SSR）在 Next.js 兴起后变得更加流行。SSR 不会对前端构建系统引入任何根本性的差异。SSR 应用程序也必须向浏览器提供 JavaScript，因此它们会执行相同的构建步骤。


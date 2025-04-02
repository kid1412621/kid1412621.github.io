---
title: ChromeOS 默认终端设置 Nerd Fonts
date: 2025-04-02
tags:
  - chromeOS
  - terminal
  - tui
  - vim
---

[自从入了 Pixelbook 后](./pixelbook.md)，使用频率还不错，比 iPad 高，因为我发现一些很轻量级的任务在这个续航很强的触屏设备上完全可以满足，比如看文档，写博客，刷 Github，简单前端开发。

但遇到最麻烦的一个问题是，我的 [dotfiles](https://github.com/kid1412621/dotfiles) 配置了 [LazVim](http://lazyvim.org/)，[chromeOS 默认终端](https://chromeos.dev/en/productivity/terminal)不支持设置 nerd fonts，导致 neovim 里的图标（glyphs/icons）无法正常显示。

一开始我使用了简单粗暴的方式解决，换终端。[Warp](http://warp.dev/) 之前正好比较火，Rust 写的，集成 LLM 。一开始用着还不错，但毕竟是在 vm 里装的 debian 包，有时候会很卡。

最终搜到了[一片帖子](https://ricma.co/posts/tech/tutorials/chrome-os-nerd-fonts/)，完美解决。步骤如下：

1. 浏览器访问：`chrome-untrusted://terminal/html/nassh_preferences_editor.html`。

   Fun fact: `chrome-untrusted://terminal/` 打开的就是 ChromeOS 自带的终端，其实就是基于 [hterm](https://chromium.googlesource.com/apps/libapps/+/HEAD/README.md) (terminal emulator UI，能在浏览器渲染个终端模拟器) + [nassh](https://chromium.googlesource.com/apps/libapps/+/HEAD/nassh) ([chrome ssh 插件](https://chromewebstore.google.com/detail/secure-shell/iodihamcpbpeioajjeobimgagajmlibd?pli=1))的套壳。对，你可以 `ctrl` + `shift` + `i` 来 debug 它。

2. 在 `Terminal Settings` -> `Appearance` -> `Custom CSS (inline text)` 加入使用 nerd fonts 的 CSS 代码:

   ```css
   @font-face {
     font-family: 'Caskaydia Cove NFM';
     src: url('https://raw.githubusercontent.com/ryanoasis/nerd-fonts/v3.1.1/patched-fonts/CascadiaCode/Regular/CaskaydiaCoveNerdFontMono-Regular.ttf');
     font-weight: normal;
     font-style: normal;
   }

   x-row {
     text-rendering: optimizeLegibility;
     font-variant-ligatures: normal;
   }
   ```

完美解决:

![chromeos-nvim-nerd-fonts](/image/chromeos-nvim-nerd-fonts.webp)

再来个 fun fact，LazyVim 默认的的主题需要对 [24-bit truecolor](https://github.com/termstandard/colors) 支持，然而 [macOS 的默认终端 (terminal.app) 居然不支持](https://apple.stackexchange.com/questions/190167/how-to-enable-true-color-mode-in-an-os-x-terminal)，现在是 2025 年了啊。

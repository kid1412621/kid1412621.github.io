---
title: Pixelbook Go - Google's Chromebook swansong
date: 2024-04-17
tags:
  - hardware
  - google
  - pixel
---

本文编辑于 Pixelbook Go & Pixel 5 😂

---

# Intro
最近入手了台二手 Pixelbook Go，使用下来感到比较惊艳，分享下感受。

至于为何会购买一台小众设备，一是因为在播客里听闻其安全性和天生瘦客户端特性，二是想搞起 Google 全家桶。

下面是我现有的 Google 设备（几乎全是不到一千块的二手设备）：
![google-devices](/public/image/google-devices.webp)

# Hardware
性能一般，但完全够用，我手上这台的[配置](https://support.google.com/pixelbook/answer/9481398?hl=en)如下：
|           |                                     |
| --------- | ----------------------------------- |
| cpu       | 8th Gen Intel i5                    |
| mem       | 16GB                                |
| disk      | 128GB                               |
| display   | Full HD 1920x1080 (166 ppi)         |
| io        | 2 USB-C ports, 3.5mm headphone jack |
| wifi      | 802.11 a/b/g/n/ac                   |
| bluetooth | 4.2                                 |

有些不满足的地方，比如磁盘太小，毕竟现在很多手机起步就这配置；
再比如蓝牙太老，即使对于 2019 年的设备来说，在搭配 Pixel Buds A-Series 的时候，偶尔会出现断连的情况；
此外，不同于 2017 款可以将屏幕整个翻转 360 度作为平板使用，这款翻转的角度有限，而且卖家表示翻转时的异响是个通病；
再者，电触感源键太软，和其它普通按键没区别，反馈不足，很多时候不知道到底开机没开机；
再说到触控板，比较灵敏，但是不像 MacBook 那样是整体不下沉，给震动错觉，这个是物理下沉的。

但总体来说，手感讨喜，虽是塑料材质，但给人比较 firm 的感觉。扬声器效果很感人，显示器效果除了反光处理不足都挺好，也可单手抬起屏幕。

# Software
ChromeOS 感觉就是个 Web + Android + Linux VM 的缝合怪，整体采用了 Ｍaterial Ｄesign，观感现代美观。
内置壁纸和 Android 的很像，也有自动暗色主题和 Accent Color，但是没有地球那种动态壁纸，有点可惜。屏保的 Art Gallery 和 Google TV 上的感觉几乎一模一样。
安装的 Apps 也和 Windows 很像，在状态栏左下角有个 Laucher 罗列了所有 App。也同 Pixel Launcher 相似，可直接搜 App 或网页内容，当然也有 Google Assistant 加持（对，完全没有 Gemini 的影子）。
关于自动暗色模式这个我觉得应该是现在每个系统的标配，ChromeOS 也有，Web App 和 Android App 都能识别到系统主题的变化，但是 Linux App 就不行，VSCode 和 Android Studio 试了都不行，不太清楚是不是 Linux VM 里面的原因。
值得一提的是，桌面不支任何的控件，也不能放文件或文件夹。（完全清爽了😂）

右下角是一些状态图标，通知中心和控制中心分开；值得说一下的是 Phone hub，能直接查看手机状态，可以查看最近手机里的相片和 App，App 可以直接在 ChromeOS 里面操控。比 Windows 的 Phone Link 集成感更好。但也并非完美，比如虽然可以使用 Pixel Phone 解锁 ChromeBook，但是需要手机解锁，然后再在 ChromeBook 上确认，没有 Apple Watch 解锁 Mac 简单便捷；再如 Pixel Buds 不能自动连接 ChromeBook，更不会在 ChromeBook 播放音频时从手机切换过来。

![chromeos-desk](/public/image/chromeos-desk.webp)

触控板手势支持多点触控，常用的双指上下滑动（可配置反向），双指左右前进后退完全没问题，很多系统应用都做了适配。但三指向上查看窗口概览，四指左右切换虚拟桌面，这两个手势很割裂，而且不支持自定义，和 Windows 或 MacOS 的使用习惯很不同。可能的原因是，一些系统 App（比如 Chrome）支持三指左右切换 Tab 页，三指点击关闭 Tab 页（相当于鼠标中键），方便是方便，但造成的冲突还是需要适应。

说到冲突，关于快捷键也有。系统支持自定义的快捷键很少，但一些常用的快捷键提供了查看的地方又不支持更改。我遇到的最大的痛点是，在 VSCode 中，无法切换输入法，即使在 VSCode 里面把冲突的快捷键移除了也不行。还有个痛点是默认没 Fn 物理键盘上完全没有印出来，虽然可以在设置里把多媒体功能键更改为 Fn 键，而且 F11，F12 需要快捷键组合映射。

[这里](https://chromeos.dev/en/productivity/keyboard-trackpad)可以查到常用手势和快捷键。

# Apps
ChromeOS 的生态来说，我个人觉得一点不差，支持 Chrome Extension (Web Store)， PWA， Android App (Google Play) 和 Linux App，可以应付大多数的简单任务需求。
Chrome Extension 安装后不会有独立的图标，因为这只是 Chrome 的插件。
网页应用的话分两种，一种相当于就是普通的网页添加系统级书签，另一种就是 PWA 具有离线使用的能力（最典型的就是 [Squoosh](https://squoosh.app) 和 Youtube），两者都会出现在 Launcher 里面，但[难以区分](https://www.reddit.com/r/chromeos/comments/kl2e93/difference_between_pwa_and_create_shortcut/?onetap_auto=true&one_tap=true)。PWA 安装后，若打开相应的网页，不会自动打开单独的窗口，得手动点下地址栏的 Open in app，Laucher 里打开的就能独立窗口启动。
在访问支持 PWA 的网页时，地址栏会有个 Install App 的提示，如果提示消失可在菜单里找到；若是不支持，这里会仅有创建快捷方式。

![pwa-install](/public/image/pwa-install.webp)

当然这些主流操作系统都支持，只是在 ChromeOS 里面感觉更自然？

Android App 算是体验最好的一类，因为官方给 [Android 虚拟机进行了优化](https://chromeos.dev/en/posts/making-android-more-secure-with-arcvm)。一些常规操作，比如粘贴板、音频、照片选择器等都能无缝衔接。对于 ChromeOS 有特殊优化的 App，窗口布局更趋于桌面应用；若没有优化，ChromeOS 会允许切换手机、平板和自定义视图。

![no-optimised-android-app-on-chromeos](/public/image/no-optimised-android-app-on-chromeos.webp)

至于 Linux App，我觉得体验很差，但也不是不能用。ChromeOS 内置的 VM（[crostini](https://chromeos.dev/en/linux/linux-on-chromeos-faq#why-the-name-crostini)）是 Debian 发行版，需要[在设置里开发者手动选项开启](https://chromeos.dev/en/linux/setup)。每次打开 Terminal 的时候，能明显感觉到 VM 加载的时间很长。而且 Android Studio 也是在 VM 中装的，编译一个普通的项目至少 5 分钟以上；窗口最大化点击完全没反应。和 WSL 比起来比较差劲。不过也有可圈点之处，ChromeOS 的文件系统可以共享加载到 Linux 里面，VM Disk 大小可随时动态调整。

有的 App 可能同时有多种选择，就像在 M1 的 MacBook 可安装同一 App 的 MacOS  和 iOS/iPadOS 版一样，下面是 Obsidian Linux 版 和 Android 版的对比：

![obsidian-linux](/public/image/obsidian-linux.webp)
Linux 版

![obsidian-android](/public/image/obsidian-android.webp)
Android 版

显然 Linux 版功能更全，因为是桌面应用，Android 版因为是面向手机/平板，部分功能被简化甚至砍掉，UI 由于是主触控交互所以也偏大。

# Outro
说实话，2019 年的设备能有如此到的体验确实不错。但是优缺点都十分明显，入手前需要明确自己需求。
对于我来说，拿来当上网本，码字机，或者大号 Android 平板，最多做下轻度 Web 开发，或者 [VSCode](https://code.visualstudio.com/blogs/2020/12/03/chromebook-get-started) 来 Remote 到 Server 上开发。比 MBA 还轻的重量，适合随身携带。
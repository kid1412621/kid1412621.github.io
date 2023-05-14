---
title: Windows dev setup
date: 2023-05-13
tags:
  - dev env
  - windows
---

Reluctantly or willingly, Windows as an OS has companied me over 2 decades (since Win95). After encountered other OSes as a developer, I still got the mixed feeling about Windows when lots of coders were complaining about its bloats and privacy. To be frank, the developer experience(DX) on Windows did not good as the \*NIX-based systems.

However M$ is committing to improve it, Windows 11 got much better experience in different ways (yes, it still sucks in certain ways). As a nerd, I do enjoy the variety of OS(using MacOS/Linux/Windows at the same time), though Windows plays a role of my daily developing and gaming activities. This post is just my personal experience of win dev setup. I hope to keep it minimal and helpful.

---

## Windows Terminal

First thing first, the CLI infrastructure, the terminal(aka console). In Windows world, before we got some ugly and "outdated" tools (Command Prompt and Windows PowerShell) to type command line to interact with the OS. Some more eye-catching tools like [cmder](https://cmder.app/), [Fluent Terminal](https://github.com/felixse/FluentTerminal) emerged, trying to improve DX. A million years later, M$ finally decided to address on this issue. So the [Windows Terminal](https://github.com/microsoft/terminal) turned out and this new toy rocketed.
Windows Terminal provides a bunch of morden features and unifies the UX across cmd, PowerShell and [WSL](##WSL). With the latest Win11, the terminal is already be installed and set as the default system-level terminal application. If you're not using the latest Win11, you can just install it via [Microsoft Store](https://aka.ms/terminal), or [Github binary release](https://github.com/microsoft/terminal/releases)(yes, it's open source), or [Winget](###Winget).

![wt](https://learn.microsoft.com/en-us/windows/terminal/images/alt-click-pane.gif)

Here's the [official guide to _fancy-lise_ your terminal](https://learn.microsoft.com/en-us/windows/terminal/tutorials/custom-prompt-setup), and I'll metion few in the follow sections.

## PowerShell

PowerShell is the de facto shell for Windows. Unlike bash dealing with text, PowerShell deal with object. Moreover, PowerShell's Verb-Noun schema comes handy sometimes. And you can always set an [alias](https://learn.microsoft.com/en-us/powershell/module/microsoft.powershell.core/about/about_aliases?view=powershell-7.3) for [cmdlets and commands](https://learn.microsoft.com/en-us/powershell/scripting/powershell-commands?view=powershell-7.3).
Even in Win11, the system default PowerShell version remains in 5.X which is for compatibility but outdated. Install latest version to gain some useful features like [pipeline](https://learn.microsoft.com/en-us/powershell/module/microsoft.powershell.core/about/about_pipelines?view=powershell-7.3):

`winget install Microsoft.PowerShell -s winget`

Check the installed version:

`$PSVersionTable`

Set up some useful configs in shell profile (similar to `.bashrc` or `.bash_profile`) (notice the [profile scope](https://learn.microsoft.com/en-us/powershell/module/microsoft.powershell.core/about/about_profiles?view=powershell-7.3)):

`notepad $PROFILE` or `vim $PROFILE`

Adding [bash-like keybindings](https://github.com/kid1412621/geek-cheat-sheet/blob/master/sh/bash.md) and auto-completion:

```powershell
Set-PSReadLineOption -EditMode Emacs -HistorySearchCursorMovesToEnd
Set-PSReadlineKeyHandler -Key Tab -Function MenuComplete
Set-PSReadlineKeyHandler -Key UpArrow -Function HistorySearchBackward
Set-PSReadlineKeyHandler -Key DownArrow -Function HistorySearchForward
```

Setting up some aliases:

```powershell
Set-Alias -N l -V Get-ChildItem
Set-Alias -N v -V vim
Set-Alias -N g -V git
Set-Alias -N d -V docker
Set-Alias -N nsv -V New-Service
Set-Alias -N rssv -V Restart-Service
Set-Alias -N fmo -V Find-Module
Set-Alias -N rdns -V Resolve-DnsName
Set-Alias -N gnc -V Get-NetTCPConnection
Set-Alias -N gvm -V Get-VM
function Connnect-VM { vmconnect localhost $args }
Set-Alias -N cnvm -V Connnect-VM
Set-Alias -N open -V Invoke-Item
```

Adding some [PowerShell modules](https://learn.microsoft.com/en-us/powershell/module/microsoft.powershell.core/about/about_modules?view=powershell-7.3) for common commands. (Notice: using some of those modules to implement auto-completion might [slow down the shell initiation](https://stackoverflow.com/questions/68998763/how-to-import-modules-in-background-in-powershell), that's why [kubernetes provides a way to generate script directly into profile file](https://kubernetes.io/docs/tasks/tools/install-kubectl-windows/#optional-kubectl-configurations-and-plugins))

```powershell
Import-Module posh-git
Import-Module DockerCompletion
Import-Module MavenAutoCompletion
Import-Module npm-completion
```

Here's [my profile file](https://gist.github.com/kid1412621/e9bafc5362acbded0f6b726402c40d62#file-microsoft-powershell_profile-ps1), and highly recommend to read this section of documentation for [optimizing your shell experience](https://learn.microsoft.com/en-us/powershell/scripting/learn/shell/optimize-shell?view=powershell-7.3).

### Oh My Posh

[oh my posh](https://ohmyposh.dev/) is a prompt theme engine for shell env. Before rewrited with go, it's mainly for powershell env (much like oh-my-zsh to zsh).

See the [official document](https://ohmyposh.dev/docs/installation/windows) for more installation options:

```powershell
winget install JanDeDobbeleer.OhMyPosh -s winget
```

Init with [preset theme](https://ohmyposh.dev/docs/themes) (you can create your own theme for [customization](https://ohmyposh.dev/docs/installation/customize)):

```powershell
oh-my-posh init pwsh --config $env:POSH_THEMES_PATH\star.omp.json' | Invoke-Expression
```

Reload profile for the changes to take effect:

```powershell
. $PROFILE
```

In order to show certain fonts and glyphs(icons), you need to install dev fonts. [Nerd Fonts](https://www.nerdfonts.com/) is quit popular([Input Fonts](https://input.djr.com/) might be another option), and you can [install via scoop](#fonts) or run `oh-my-posh font install`.

So far, we can get a ~~cool~~ useful shell env for developing. Finally, you can follow [this instruction](https://learn.microsoft.com/en-us/windows-server/administration/openssh/openssh_install_firstuse?tabs=gui) to setup openssh.

![shell-setup](https://learn.microsoft.com/en-us/windows/terminal/images/custom-prompt.png)

## Package Manager

### Winget

Linux got `apt`/`apt-get`, `dnf`/`yum`, `pacman` etc. MacOS got `brew`. So why different on Windows? As Windows official package manager, [winget](https://learn.microsoft.com/en-us/windows/package-manager/winget/) is still relative naive and the official repo lists are not abundant. But basic usages are satisfied. For Win11, winget is available out of box as a part of [App Installer](https://www.microsoft.com/p/app-installer/9nblggh4nns1#activetab=pivot:overviewtab).

![winget](https://learn.microsoft.com/en-us/windows/package-manager/winget/images/install.png)

Not recommend to use winget to install apps from Microsoft Store since this may conflict with x86/64 app (e.g. the powershell from msstore is different than the counterpart one). Besides, some apps are missing(e.g. Netflix). If you try to use `winget search` to find such app, the result will be different than search result from msstore. Off course, you can [contribute the missing packages](https://learn.microsoft.com/en-us/windows/package-manager/package/).

### Choco

The good old [Chocolatey](https://chocolatey.org/) is definitly worth mentioning, here's its intro from [Wikipedia](https://en.wikipedia.org/wiki/Chocolatey):

> Chocolatey is a machine-level, command-line package manager and installer for software on Microsoft Windows. It uses the NuGet packaging infrastructure and Windows PowerShell to simplify the process of downloading and installing software. The name is an extension on a pun of NuGet "because everyone loves Chocolatey nougat".

To install choco:

```powershell
Set-ExecutionPolicy Bypass -Scope Process -Force; [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072; iex ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1'))
```

Similar to winget's interaction with packages:

```powershell
choco search ruby
# or: choco find ruby
choco install ruby
choco uninstall ruby
```

Althrough it even got the [GUI](https://docs.chocolatey.org/en-us/chocolatey-gui/), personally I prefer [scoop](#scoop) because of its simplicity(using json over NuGet for package repo) and cleanness(non-admin user by default).

### Scoop

[Scoop](https://scoop.sh) got similar concepts as [Homebrew](https://brew.sh), and [scoop bucket](https://github.com/ScoopInstaller/Scoop/wiki/Buckets) relates to [brew tap](https://docs.brew.sh/Taps), basically both are using git repo to store package meta infos.

To install scoop:

```powershell
iwr -useb get.scoop.sh | iex`
```

To install some basic tools:

```powershell
scoop install sudo aria2 curl git vim gow
```

Here's few setups for some stacks which I've been using:

#### Java dev env

```powershell
scoop bucket add java
scoop install openjdk gradle maven
scoop bucket add extras
scoop install jenv
```

#### Node dev env

```powershell
scoop install nvm
nvm install lts
nvm use lts
```

#### Fonts

```powershell
scoop bucket add nerd-fonts
scoop install CascadiaCode-NF-Mono
# or
scoop install JetBrainsMono-NF-Mono
```

## VSCode

I think [VSCode](https://code.visualstudio.com/) no need for more explaination since it's THE most popular lightweight IDE (right, I don't consider it just as text editor). With planty of extensions, you can arm your VSCode into a universal IDE. Plus, the integration with Github, the [codespace](https://github.dev/)(not sure the relationship with [vscode.dev](https://vscode.dev/)) enables you to develop even in browser.

To [get started](https://code.visualstudio.com/docs/getstarted/introvideos):

```powershell
winget install vscode
```

The VSCode [Remote Development](https://code.visualstudio.com/docs/remote/remote-overview) allows you to use a [dev container](https://code.visualstudio.com/docs/devcontainers/containers), [remote machine](https://code.visualstudio.com/docs/remote/ssh), or the [WSL](#wsl) as a full-featured development environment. Personally, I feel the DX is better than [fleet](https://www.jetbrains.com/fleet/).

Farewell, the good old [Sublime Text](https://www.sublimetext.com/) and [sunsetting Atom](https://github.blog/2022-06-08-sunsetting-atom/).

## WSL

The [Windows Subsystem for Linux (WSL)](https://learn.microsoft.com/en-us/windows/wsl/) probablly is a game changer in Windows dev world. Windows coder can use Linux tool sets without the overhead of a traditional virtual machine or dual-boot setup. It's interoperable between Windows and WSL, meaning you can boot up a service in WSL and access in Windows, see [more details](https://learn.microsoft.com/en-us/windows/wsl/networking).

Run `wsl --install <Distro>` to install a distribution for WSL. To check, run `wsl -l -v`. By default, the [WSL 2](https://learn.microsoft.com/en-us/windows/wsl/compare-versions) will be used. Comparing to WSL 1 which translates system calls to Linux kernal, WSL 2 is based on Hyper-V which got performance boost for file system and full system call compatibility.

Tips:

1. Use admin to install;
2. If got any issue during installation, try run `dism.exe /online /enable-feature /featurename:VirtualMachinePlatform /all /norestart` to enable relative feature;

Moreover, you can [set up GPU acceleration](https://learn.microsoft.com/en-us/windows/wsl/tutorials/gpu-compute) and [run Linux GUI app](https://learn.microsoft.com/en-us/windows/wsl/tutorials/gui-apps) via [WSLg](https://github.com/microsoft/wslg)(support both X11 and Wayland).

## WSA

[Windows Subsystem for Android(WSA)](https://learn.microsoft.com/en-us/windows/android/wsa/) enables your Win 11 device to run Android app, but the catch is your have to [install Amazon Appstore](https://learn.microsoft.com/en-us/windows/android/wsa/#install-the-amazon-appstore) first.

Once done, you got an Android vm in Windows. So you can sideload any Android app to install on Windows via [adb](https://developer.android.com/tools/adb). No longer limited to the apps in the Amazon Appstore, and all you need to do is [enable developer mode](https://learn.microsoft.com/en-us/windows/android/wsa/#enable-developer-mode-in-windows-settings) and [Connect to WSA](https://learn.microsoft.com/en-us/windows/android/wsa/#connect-to-the-windows-subsystem-for-android-for-debugging).

Android Studio will automatically detect the WSA, and you can debug apps on it.

From my observation, the gaming experience on WSA is better than [Google Play Games on PC](https://play.google.com/googleplaygames) somehow.

One little tip, [Google's neadby share for Windows](https://android.com/better-together/nearby-share-app/) will facilitate info share between Android and Windows.

## PowerToys

[PowerToys](https://learn.microsoft.com/en-us/windows/powertoys/) is a set of utilities for power users to tune and streamline their Windows experience for greater productivity, which is developed by M$.

My most fav pick is [PowerToys Run](https://learn.microsoft.com/en-us/windows/powertoys/run) which offers similar funtionality to Spotlight Search on MacOS.

![powerToys-run](https://learn.microsoft.com/en-us/windows/images/pt-powerrun-demo.gif)

[Keyboard Manager utility](https://learn.microsoft.com/en-us/windows/powertoys/keyboard-manager) help me to change the default keybinding on Windows, like remapping `Caps Lock` to language switch(yes, I'm trying to mimic the MacOS experience).

One more thing.

## DevToys

[DevToys](https://devtoys.app/) is created by a Software Engineer on Visual Studio team from M$. Comparing to PowerToys, it provides loads of tools to help developer's daily task **offline**, meaning you don't have to open a untrusted site just for JSON formating, JWT decoding, comparing text or testing RegExp.

![devToys](https://devtoys.app/img/hero-feature-2.gif)

A cool thing about DevToys is that you can start it in command line. For this, simply open a PowerShell command prompt and type `start devtoys:?tool={tool name}`.

Currently it's only available for Windows, but there's an [alternative for MacOS](https://github.com/ObuchiYuki/DevToysMac).

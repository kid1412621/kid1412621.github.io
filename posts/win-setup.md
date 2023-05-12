---
title: Windows 11 dev setup
date: 2023-05-12
tags:
  - dev env
  - windows
---

Windows as an OS companied me over 2 decades (started from Win95) reluctantly or willingly, since it was phenomenonally popular pirated software in China. After I encountered other OSs as a developer, I still got the mixed feeling about Windows even lots of poeple complaining about its bloats and privacy. To be frank, the dev experience on Windows did not good as the \*NIX-based systems.
However M$ devotes to improve this, Windows 11 got much better experience in different ways (yes, it still sucks in certain ways). And I do enjoy the variety of OS for nerds like me, so Windows is still part of my daily developing and gaming activities. This post is just my personal experience of win dev setup. I wanna keep it minimal and helpful.

---

## Windows Terminal

First thing first, the CLI infrastructure, the terminal(aka console). In Windows world, before we got some ugly and "outdated" tools (Command Prompt and Windows PowerShell) to type command line to interact with the OS. Some more eye-catching tools like [cmder](https://cmder.app/), [Fluent Terminal](https://github.com/felixse/FluentTerminal) emerged, trying to improve developer experience. A million years later, M$ finally decided to address on this issue. So the [Windows Terminal](https://github.com/microsoft/terminal) turned out and this new toy rocketed.
Windows Terminal provides a bunch of morden features and unifies the UX across cmd, PowerShell and [WSL](##WSL). With the latest Win11, the terminal is already be installed and set as the default system-level terminal application. If you're not using the latest Win11, you can just install it via [Microsoft Store](https://aka.ms/terminal), or [Github binary release](https://github.com/microsoft/terminal/releases)(yes, it's open source), or [Winget](###Winget).

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

`winget install JanDeDobbeleer.OhMyPosh -s winget`

Init with preset theme:

`oh-my-posh init pwsh --config $env:POSH_THEMES_PATH\star.omp.json' | Invoke-Expression`

Reload profile for the changes to take effect:

`. $PROFILE`

In order to implement an eye-catchy theming for shell env, certain fonts need to be installed. [Nerd Fonts](https://www.nerdfonts.com/) is quit popular, and you can [install via scoop](#fonts).

## Package Manager

### Winget

Linux got `apt`/`apt-get`, `dnf`/`yum`, `pacman` etc. MacOS got `brew`. So why different on Windows? As Windows official package manager, `winget` is still relative naive and the official repo lists are not abundant. But basic usages are satisfied.

Not recommend to use `winget` to install apps from Microsoft Store since this may conflict with x86/64 app (e.g. the powershell from msstore is different than the counterpart one). Besides, some apps are missing, like Netflix. If you try to use `winget search` to find such app, the result will be different than using search bar in msstore.

### Choco

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

So far, we can get a ~~cool~~ useful shell env for developing. Finally, you can follow [this instruction](https://learn.microsoft.com/en-us/windows-server/administration/openssh/openssh_install_firstuse?tabs=gui) to setup openssh.

<!-- todo insert pic here -->

## VSCode

I think VSCode no need for more explaination since it's THE most popular lightweight IDE (right, I don't consider it just as text editor).

## WSL

Run `wsl --install <Distro>` to install a distribution for WSL. To check, run `wsl -l -v`. By default, the WSL 2 will be used. Comparing to WSL 1 which translates system calls to Linux kernal, WSL 2 is based on Hyper-V which got performance boost for file system and full system call compatibility.

Tips:

1. Use admin to install;
2. If got any issue during installation, try run `dism.exe /online /enable-feature /featurename:VirtualMachinePlatform /all /norestart` to enable relative feature;

### WSL 2

### WSLg

## WSA

## Powertoys

One more thing.

## DevToys

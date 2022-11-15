# Windows 11 dev setup

Windows as an OS companied me over 2 decades (started from Win95) reluctantly or willingly, since it was phenomenonally popular pirated software in China. After I encountered other OSs as a developer, I still got the mixed feeling about Windows even lots of poeple complaining about its bloat and privacy. To be frank, the dev experience on Windows did not good as the \*NIX systems. However M$ devotes to improve this, Windows 11 got much better experience in different ways (yes, it still sucks in certain way). And I do enjoy the variety of OS for nerds like me, so Windows is still part of my daily developing and gaming activities.

## Terminal

## Powershell

### Oh My Posh

## Package Manager

### Winget

Linux got `apt`/`apt-get`, `dnf`/`yum`, `pacman` etc. MacOS got `brew`. So why not on Windows? As Windows official package manager, `winget` is still relative naive and the official repo lists are not abundant. But basic usages are satisfied.

Not recommend to use `winget` to install apps from Microsoft Store since this may conflict with x86/64 app (e.g. the powershell from msstore is different than the counterpart one). Besides, some apps are missing, like Netflix. If you try to use `winget search` to find such app, the result will be different than using search bar in msstore.

### Scoop
install git vim grep java nodejs

## VSCode

## WSL

Run `wsl --install <Distro>` to install a distribution for WSL. To check, run `wsl -l -v`. By default, the WSL 2 will be used. Comparing to WSL 1 which translates system calls to Linux kernal, WSL 2 is based on Hyper-V which got performance boost for file system and full system call compatibility.

Tips:

1. Use admin to install;
2. If got any issue during installation, try run `dism.exe /online /enable-feature /featurename:VirtualMachinePlatform /all /norestart` to enable relative feature;

### WSL 2

### WSLg

## Powertoys

## DevToys

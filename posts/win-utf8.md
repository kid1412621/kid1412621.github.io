---
title: Windows 开发环境设置 UTF-8
date: 2022-11-20
tags:
  - dev env
  - windows
---

Encoding on Windows is painful.

---

## System

System Settings (`win` + `i`) -> language settings -> Administrative language settings -> Administrative -> Change system locale

勾选：Beta: Use Unicode UTF-8 for worldwide language support

[参考](https://zhuanlan.zhihu.com/p/153219931)

> Windows 11 默认启用

## Cmd

```cmd
chcp 65001
```

> Windows 11 默认启用

## PowerShell

```powershell
vim $PROFILE

# add this line to the top
$OutputEncoding = [console]::InputEncoding = [console]::OutputEncoding = New-Object System.Text.UTF8Encoding
```

## Git

[git-bash 设置](https://stackoverflow.com/questions/10651975/unicode-utf-8-with-git-bash)

## Less

提供环境变量（[参考](https://www.man7.org/linux/man-pages/man1/less.1.html)）：

LESSCHARDEF: `UTF-8`
LESSCHARSET: `UTF-8`

以管理员身份启动 PowerShell，然后执行：

```powershell
[Environment]::SetEnvironmentVariable('LESSCHARSET', 'UTF-8', 'Machine')
[Environment]::SetEnvironmentVariable('LESSCHARDEF', 'UTF-8', 'Machine')
```

## Java

提供环境变量：

### JShell 等相关命令行工具

JAVA_TOOL_OPTIONS: `-Dfile.encoding=UTF8`

### Maven

MAVEN_OPTS: `-Duser.language=cn -Dfile.encoding=UTF-8`

### Gradle

GRADLE_OPTS: `-Dfile.encoding=utf-8`

或者设置 [gradle.properties](https://docs.gradle.org/current/userguide/common_caching_problems.html#system_file_encoding):

```properties
org.gradle.jvmargs=-Dfile.encoding=UTF-8
```

## IDEA

Settins (`Ctrl` + `Alt` + `s`) -> Editor -> File Encodings -> Project Encoding

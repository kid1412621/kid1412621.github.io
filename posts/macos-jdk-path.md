---
title: MacOS JDK path
date: 2023-05-21
tags:
  - macos
  - java
---

An overlook of the JDK path on MacOS.

TL;DR

There're several symlinks targeted to system java lib directory from brew-installed JDK. And JEnv could help to mange and switch multiple JDK versions.

---

## MacOS Library folder levels

On MacOS system, there's 3 levels of Library folder in simply terms:

- The user library, `~/Library`, stores per-user settings etc.
- The local library, `/Library`, stores computer-wide settings etc.
- The system library, `/System/Library`, stores the base settings, resources, etc that comes with the system. (In theory, you shouldn't change anything in here.)

## JDK path

Normally, the JDK path lays on `/Library/Java/JavaVirtualMachines/`. However, if JDK installed via IntelliJ, it will be `~/Library/Java/JavaVirtualMachines/`.

## brew install

Things become little complicated when comes to Homebrew.
First, let's install the latest version of JDK via brew.

```bash
$ brew install openjdk
# or (the java is an alias for openjdk)
$ brew install java
```

By the way, the JDK migrated from homebrew/cask to homebrew/core, and [brew 4 replaced the git repo with JSON file for metadata](https://brew.sh/2023/02/16/homebrew-4.0.0/), you don't have to tap any taprooms unless you want to install a non-LTS version(in such case, you need `homebrew/cask-versions`) or from other third-party vendors.

After successfully installed, brew will prompts something like this:

```bash
==> Caveats
For the system Java wrappers to find this JDK, symlink it with
  sudo ln -sfn /usr/local/opt/openjdk/libexec/openjdk.jdk /Library/Java/JavaVirtualMachines/openjdk.jdk

openjdk is keg-only, which means it was not symlinked into /usr/local,
because macOS provides similar software and installing this software in
parallel can cause all kinds of trouble.

If you need to have openjdk first in your PATH, run:
  echo 'export PATH="/usr/local/opt/openjdk/bin:$PATH"' >> ~/.zshrc

For compilers to find openjdk you may need to set:
  export CPPFLAGS="-I/usr/local/opt/openjdk/include"
==> Summary
🍺  /usr/local/Cellar/openjdk/20.0.1: 636 files, 322.4MB
```

As suggested, we need to run `sudo ln -sfn /usr/local/opt/openjdk/libexec/openjdk.jdk /Library/Java/JavaVirtualMachines/openjdk.jdk` to symlink our installed JDK to system Java wrapper. How this works? That command just creates a soft link from JDK installation to system java lib folder. But when we run `which java`, it shows like this:

```bash
$ which java
/usr/bin/java
```

What is `/usr/bin/java`? Where does the `JavaVirtualMachines` folder go?

The `/usr/bin/java` is system wrapper tool that locates and executes the actual `java` executables, which means it will look for available java versions under `JavaVirtualMachines` folder. And MacOS system provides a tool to locate the effective `JAVA_HOME`, `/usr/libexec/java_home`.

Ok, that explained something, but how about the line shown the real JDK installation path? Why `/usr/local/Cellar/openjdk` instead of `/usr/local/opt/openjdk`?

Well, it's symlink again. Roughly as the purpose of `JavaVirtualMachines` folder for multiple versions, Homebrew installs formulae to the Cellar at `$(brew --cellar)` and then symlinks some of the installation into the prefix at `$(brew --prefix)`. We can see the linking like this:

```bash
$ ls -l /Library/Java/JavaVirtualMachines/openjdk.jdk
lrwxr-xr-x  1 root  wheel    42B Aug 15  2020 /Library/Java/JavaVirtualMachines/openjdk.jdk -> /usr/local/opt/openjdk/libexec/openjdk.jdk
$ ls -l /usr/local/opt/openjdk
lrwxr-xr-x  1 kid  admin    24B May 20 15:46 /usr/local/opt/openjdk -> ../Cellar/openjdk/20.0.1
$ ls -l /usr/local/Cellar/openjdk/20.0.1
total 56
-rw-r--r--   1 kid  admin   3.5K May 20 15:46 INSTALL_RECEIPT.json
-rw-r--r--   1 kid  admin    19K Mar  7 21:51 LICENSE
-rw-r--r--   1 kid  admin   424B Mar  7 21:51 README.md
drwxr-xr-x  31 kid  admin   992B Mar  7 21:51 bin
drwxr-xr-x  10 kid  admin   320B Mar  7 21:51 include
drwxr-xr-x   3 kid  admin    96B Mar  7 21:51 libexec
drwxr-xr-x   3 kid  admin    96B Mar  7 21:51 share
```

The folders are different for Apple Silicon machines, it would be `/opt/homebrew/Cellar` instead of `/usr/local/Cellar`, and `/opt/homebrew/opt` instead of `/usr/local/opt`.

Wrap up: `java` -> `/Library/Java/JavaVirtualMachines/openjdk.jdk` -> `/usr/local/opt/openjdk` -> `/usr/local/Cellar/openjdk`

## JEnv

[JEnv](https://www.jenv.be/) is a CLI tool to facilitate managing and switching multiple JDK versions on MacOS/Linux.

Quickly get started:

```bash
$ brew install jenv
$ echo 'export PATH="$HOME/.jenv/bin:$PATH"' >> ~/.bash_profile
$ echo 'eval "$(jenv init -)"' >> ~/.bash_profile
$ jenv enable-plugin export # to export JAVA_HOME
# add JDK to Jenv
$ jenv add /Library/Java/JavaVirtualMachines/openjdk.jdk/
# list all managed jdk versions
$ jenv versions
* system (set by /Users/kid/.jenv/version)
  20.0
  20.0.1
  openjdk64-20.0.1
# config a global version
$ jenv global 20.0
# config a local(per-directory) version
$ jenv local 20.0
# config a (current) shell version
$ jenv shell 20.0
```

We can now the JEnv script is taking over the control of responsibility to locate Java executables. Yes, just another wrapper, another abstract layer.

```bash
$ which java
/Users/kid/.jenv/shims/java
```

JEnv provides more dynamical and fine-grained control of locating `java`. Essentially, it looks different registered Java versions under `~/.jenv/versions` by given condition. For each specifying version command, JEnv will export the corresponding JAVA_HOME env var. Hence each time firing `java`, the JEnv shim will redirect to the specific java executable (by default, is the system Java wrapper).

```bash
$ jenv which java
/usr/bin/java
$ jenv shell 20.0
$ jenv which java
/Users/kid/.jenv/versions/20.0/bin/java
```

---

References:

1. https://gist.github.com/gwpantazes/50810d5635fc2e053ad117b39b597a14#installing-java
2. https://gist.github.com/hogmoru/8e02cf826c840914a8ed93fd418ed88e
3. https://apple.stackexchange.com/questions/269588/how-does-usr-bin-java-work-on-mac
4. https://stackoverflow.com/questions/14286571/what-does-mac-os-library-folder-store
5. https://apple.stackexchange.com/questions/428356/what-does-usr-local-cellar-directory-contain

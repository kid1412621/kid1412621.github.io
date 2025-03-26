---
title: Android 项目 Github Actions 集成：打包发布 Google Play
date: 2024-10-15
tags:
  - Android
  - Google Play
  - GCP
  - Github
  - CI/CD
---

通过配置 Github Actions，在打 Tag 时自动编译打包，读取 CHANGELOG.md 文件生成 Release Note， 发布 Github Release 时使用并附上 APK 文件，同时将 AAB 上传 Google Play。

---

# 前言

开始之前，我们需要了解关于 key 的基本概念，Android App 发布时涉及两种 Key：

key 选择： https://support.google.com/googleplay/android-developer/answer/9842756?hl=en#:~:text=If%20you%20also%20distribute%20your,distribute%20outside%20of%20Google%20Play

由此可见，

# 步骤

## 配置 Gradle

```kotlin
android {
    defaultConfig {
        versionCode = 8
        versionName = "0.1.1"
    }

    buildTypes {
        release {
            val keystorePropertiesFile = rootProject.file("keystore.properties")
            if (keystorePropertiesFile.exists()) {
                val keystoreProperties = Properties()
                keystoreProperties.load(FileInputStream(keystorePropertiesFile))
                signingConfigs {
                    create("releaseConfig") {
                        storeFile = rootProject.file(keystoreProperties["storeFile"] as String)
                        storePassword = keystoreProperties["storePassword"] as String
                        keyAlias = keystoreProperties["keyAlias"] as String
                        keyPassword = keystoreProperties["keyPassword"] as String
                    }
                }
                signingConfig = signingConfigs.getByName("releaseConfig")
            }
        }
    }
}
```

完整配置可参看[这里](https://github.com/kid1412621/subspace/blob/main/app/build.gradle.kts)

## 配置 Github Actions

```yaml

```

然后生成 Release Note, 由于文本可能是多行的，我们需要[特殊的语法](https://docs.github.com/en/actions/using-workflows/workflow-commands-for-github-actions#multiline-strings)来支持多行文本。

[CHANGELOG 格式](https://github.com/standard/standard/blob/master/CHANGELOG.md?plain=1)

虽然官方也有关于 Release 的 Action，例如：[create-release](https://github.com/actions/create-release) 和 [upload-release-asset](https://github.com/actions/upload-release-asset)。但都已被废弃了，搜索一圈，这个第三方的 Action 还比较流行：[action-gh-release](https://github.com/softprops/action-gh-release)。

需要注意的是，需要 action-gh-release 来发布 Github Release 的话，需要[在项目设置里配置写权限](https://github.com/softprops/action-gh-release/issues/366#issuecomment-1605875364)

使用第三方 Action [Upload-Google-Play](https://github.com/r0adkll/upload-google-play) 将签好名的包传到 Google Play。
完整配置可参看[这里](https://github.com/kid1412621/subspace/blob/main/.github/workflows/release.yml)

## 配置 Google Play

## 配置 GCP

---

References:

1. https://medium.com/@vit.azarov/building-android-ci-cd-pipeline-with-github-actions-c9c25831bd03
2. https://medium.com/@vontonnie/automating-success-github-actions-workflow-for-android-app-deployment-908095d53b97

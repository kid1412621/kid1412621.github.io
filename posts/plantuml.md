---
title: 当 Markdown 遇上 UML
date: 2020-05-30
tags:
  - tool
---

程序员喜欢简洁，所以 [Markdown](https://daringfireball.net/projects/markdown/) 作为轻量级、纯文本的格式化标记语言深受喜爱。在书写技术文档时，让程序员感受到「世界的美好」，将其从 Office 各种格式化问题的泥潭中解放出来，专注生产。

写技术文档不免需要要结合 UML 配图，以让读者更方便直观的理解。那么，同理，有没有什么工具/语言能让程序员免于下盗版 Visio 的痛苦？或者 [ProcessOn](https://www.processon.com) 对 UML 支持有限的痛苦？再或者 [Draw.io](https://drawio-app.com) 连接慢的痛苦？

当然，我们能想到的大多场景，早已有人也在深受折磨后，造好了轮子。

---

## PlantUML 是什么

[PlantUML](https://plantuml.com) 是一个开源项目，支持以特定简单直观的语法，来描述多种图表，并转化成图片，或者整合在 Markdown 中。支持 UML 中的类图、时序图、用例图等，非 UML 支持 LaxTex、思维导图、甘特图、架构图等，具体支持情况请参见官网。

## PlantUML 语法

PlantUML 提供的语法极其简单，几分钟就能上手，下面是声明语法：

开头 `@startuml` 和结尾 `@enduml` 是声明，若要放在 Markdown 里面的话，需要放在代码块中，声明为 plantuml，如下：

```md
​```plantuml
@startuml
...do your own stuff
@enduml
​```
```

下面是我写的一些简单的例子，你可以去[官网在线渲染服务](https://www.plantuml.com/plantuml/umla/SoWkIImgAStDuNBAJrBGjLDmpCbCJbMmKiX8pSd9vt98pKi1IW80) get your hands dirty。

### 类图

- PlantUML 代码

```md
​```plantuml
@startuml
Thanos -up-> InfinityGauntlet : use

SoulStone -up-|> InfinityStone
TimeStone -up-|> InfinityStone
SpaceStone -up-|> InfinityStone
MindStone -up-|> InfinityStone
RealityStone -up-|> InfinityStone
PowerStone -up-|> InfinityStone

SoulStone --o InfinityGauntlet
TimeStone --o InfinityGauntlet
SpaceStone --o InfinityGauntlet
MindStone --o InfinityGauntlet
RealityStone --o InfinityGauntlet
PowerStone --o InfinityGauntlet

interface InfinityStone {}

class InfinityGauntlet {
  snap()
}

note left:  需集齐6颗无限宝石

note "灭霸使用无限手套打响指" as N

N .. Thanos
InfinityGauntlet .. N
@enduml
​```
```

- 生成后效果

@startuml
Thanos -up-> InfinityGauntlet : use

SoulStone -up-|> InfinityStone
TimeStone -up-|> InfinityStone
SpaceStone -up-|> InfinityStone
MindStone -up-|> InfinityStone
RealityStone -up-|> InfinityStone
PowerStone -up-|> InfinityStone

SoulStone --o InfinityGauntlet
TimeStone --o InfinityGauntlet
SpaceStone --o InfinityGauntlet
MindStone --o InfinityGauntlet
RealityStone --o InfinityGauntlet
PowerStone --o InfinityGauntlet

interface InfinityStone {}

class InfinityGauntlet {
snap()
}

note left: 需集齐 6 颗无限宝石

note "灭霸使用无限手套打响指" as N

N .. Thanos
InfinityGauntlet .. N
@enduml

可以看出，类之间关系的箭头，通过如 `--|>` 或 `--o` 之类的符号，很直观的映射成了图中的关系，短横线 `-` 的长短决定了图中关系线的长短，还可以在短横线中加方向关键字 `-up->` 来改变布局。下面是一些图例，一图胜千言：

![plantuml-example](/image/plantuml-example.webp)

关系的声明和元素（类、接口）的声明是分开的，若仅有关系的声明，那么元素默认为类。你可以通过声明语法来改变元素的类型，并添加元素的成员变量和方法（其可访问性修饰符号也和 UML 一致），语法和 Java 很像：

```md
​```plantuml
@startuml
skinparam classAttributeIconSize 0
// 声明类
class Dummy {
 -{static} field1
 #field2
 ~method1()
 +{abstract} method2()
}
// 声明枚举
enum TimeUnit {
  DAYS
  HOURS
  MINUTES
}
// 声明抽象类
abstract class AbstractList
// 声明接口
interface List
@enduml
​```
```

### 时序图

- PlantUML 代码

```md
​```plantuml
@startuml
actor 需求 #yellow
actor 开发 #green
actor 测试 #red

需求 -> 开发: 要加个小需求
开发 -> 需求: 这个实现不了
需求 -> 开发: 这个很重要，客户都快投诉了
activate 开发
开发 ->>x 测试: 终于写完了
return 需求验证
开发 -> 开发: 还是先自测下
开发 -> 测试: 提测，你点几下
测试 ->> 开发: 有个 bug
开发 -> 测试: 这个需求不明确
测试 -> 需求: 这个需求需要明确下
[->> 需求: 客户确认
需求 ->> 开发: 那个这么改
开发 -> 需求: 这么改会影响以前的功能
需求 -> 开发: 那把以前的功能也改了啊
开发 -> 开发  ++ : 我...
return 增量需求开发完成
开发 -> 需求: 改完了，验证下，这回不会变了吧
[->> 需求: 客户又确认
需求 -> 开发: 放一百个心，客户说了...
开发 ->> 测试: 终于改完了，快测下发版
[->> 需求: 客户再...
需求 ->> 开发: 等下，客户又说了...
测试 ->> 开发: 之前的功能改出 bug 了
开发 --> 开发 !! : 猝
@enduml
​```
```

- 生成后效果

@startuml
actor 需求 #yellow
actor 开发 #green
actor 测试 #red

需求 -> 开发: 要加个小需求
开发 -> 需求: 这个实现不了
需求 -> 开发: 这个很重要，客户都快投诉了
activate 开发
开发 ->>x 测试: 终于写完了
return 需求验证
开发 -> 开发: 还是先自测下
开发 -> 测试: 提测，你点几下
测试 ->> 开发: 有个 bug
开发 -> 测试: 这个需求不明确
测试 -> 需求: 这个需求需要明确下
[->> 需求: 客户确认
需求 ->> 开发: 那个这么改
开发 -> 需求: 这么改会影响以前的功能
需求 -> 开发: 那把以前的功能也改了啊
开发 -> 开发 ++ : 我...
return 增量需求开发完成
开发 -> 需求: 改完了，验证下，这回不会变了吧
[->> 需求: 客户又确认
需求 -> 开发: 放一百个心，客户说了...
开发 ->> 测试: 终于改完了，快测下发版
[->> 需求: 客户再...
需求 ->> 开发: 等下，客户又说了...
测试 ->> 开发: 之前的功能改出 bug 了
开发 --> 开发 !! : 猝
@enduml

## PlantUML 集成

PlantUML 的本质就是一个解析文本并转图片的渲染服务，所以你可以使用其官方的渲染服务，也可以自己本地搭设，主要有[两种方式](https://github.com/plantuml/plantuml-server)：

- JAR (with Maven)

```bash
mvn jetty:run -Djetty.port=9999

```

- Docker

```dockerfile
# 直接运行
docker run -d -p 8080:8080 plantuml/plantuml-server:jetty
docker run -d -p 8080:8080 plantuml/plantuml-server:tomcat
# 拉镜像
docker pull plantuml/plantuml-server
```

将 PlantUML 和你现有的工具流集成也不是件麻烦事，下面简单介绍下我常用工具的集成，其它未提及的，可以探索下[官网教程](https://plantuml.com/zh/running)。

### 编辑器

#### Typora（ Winows / Mac OS / Linux ）

作为 Markdown 编辑器中的明星产品，Typora 对图表绘制仅做了[有限的支持](https://support.typora.io/Draw-Diagrams-With-Markdown/)，不过支持无需第三方服务完成本地渲染。缺乏对 UML 更全面的支持（一般的需求也已覆盖）实在让人叹息，值得让人期待的是，官方有个 [issue](https://github.com/typora/typora-issues/issues/1138?notification_referrer_id=MDE4Ok5vdGlmaWNhdGlvblRocmVhZDI4OTQ4MDA3MzoyNjI3ODA1NA%3D%3D&notifications_query=is%3Aunread#issuecomment-629978863) 列举了对一些图表库/语法，其中 PlantUML 呼声最高，后续可能会考虑支持。

若现在你的写作流 Typora 是无可替代的，那么只能采取先将 PlantUML 转成图片，[上传图床](https://support.typora.io/Upload-Image/)，再把图片贴回来。

#### MWeb（ Mac OS ）

国产独立开发者做的 Markdown 编辑器精品还真不少，MWeb 对 PlantUML [原生支持](https://zh.mweb.im/markdown.html)，无需第三方服务可完成实时渲染，也支持导出图片、PDF 等，很是省心。这家伙甚至丧心病狂的支持了 echarts。

#### VSCode（ Winows / Mac OS / Linux ）

大厂的编辑器品质有保证，在 M$ 收购 Github 前，同样使用 Electron 开发的 VSCode 比 Atom 性能高出不是一星半点（而且 Electron 还是 Github 开发的）。使用 VSCode 最大的幸福感之一坐拥无比繁荣的插件生态，要什么样的自行车，丰俭由君。支持 Markdown 中使用 PlantUML 主要涉及两个插件：[PlantUML](https://marketplace.visualstudio.com/items?itemName=jebbs.plantuml) 和 [Markdown Extended](https://marketplace.visualstudio.com/items?itemName=jebbs.markdown-extended)，前者主要集成 PlantUML 渲染服务以及语法高亮，后者主要提供转化文件。

Tips：

- PlantUML 插件需要配置渲染服务的地址，你可以使用官网提供的，也可以本地搭一个，在 `settings.json` 里添加：

```json
"plantuml.server": "https://www.plantuml.com/plantuml",
"plantuml.render": "PlantUMLServer",
```

- PlantUML 插件仅能将某一块 PlantUML 代码转换成图片，Markdown Extended 插件可以将整个 Markdown 文件（含 UML 转化）转化为 PDF 等格式。`Ctrl/Cmd` + `Shift` + `P` 唤出 VSCode 的命令面板，输入 `export` 搜索就会出现 `Markdown: Export Markdown To File` 条目，选择后会提示下载 chromium（因为是基于 puppeteer 的），下载后就能转化了。

#### IntelliJ IDEA（ Winows / Mac OS / Linux ）

IDEA 的支持也是靠插件：[PlantUML integration](https://plugins.jetbrains.com/plugin/7017-plantuml-integration)，安装完成后，`Ctrl` + `Shift` + `A` 唤出 IDEA 的 Action 搜索 PlantUML，选择 PlantUML File New，可根据不同的类别直接生成模板。此插件同样支持在无需配置渲染服务的情况下，实时浏览。唯一的不足是，不支持整个 Markdown 文件支持导出，PlantUML 代码只能挨个导出图片。

### 服务

#### Gitlab

Gitlab 从 8.16 开始就支持了 PlantUML 集成，未自己试过，可以参考下[官方文档](https://docs.gitlab.com/ee/administration/integration/plantuml.html#gitlab)。

#### ~~VuePress~~

VuePress 成为历史，看我写的 [VitePress 迁移记录](./vitepress-migration.md#markdown-plugins)。

[VuePress](https://vuepress.vuejs.org/) 是 Vue 官方出品的一款静态网站生成器，可以实现用 Markdown 写博客/文档，同时还支持 Vue 的一些特性。由于 VuePress 使用 [markdown-it](https://github.com/markdown-it/markdown-it) 作为其 Markdown 渲染器，所以就可以使用 markdown-it 的[插件](https://github.com/gmunguia/markdown-it-plantuml)来支持。

npm 安装：

```bash
npm i -D markdown-it-plantuml
```

编辑 `.vuepress/config.js` 文件：

```javascript
module.exports = {
	markdown: {
		extendMarkdown: (md) => {
			md.use(require('markdown-it-plantuml'))
		},
	},
}
```

## 结语

> _“Sometimes the truth of a thing is not so much in the think of it, but in the feel of it.”_
>
> ​ —STANLEY KUBRICK

最后，引述 John Gruber 在其 [Dive Into Markdown](https://daringfireball.net/2004/03/dive_into_markdown) 一文中对创造 Markdown 的想法，来总结下我折腾 PlantUML 的初衷。

> 我在文章开始引用库布里克的话是我非常喜欢的之一。当你在用 HTML 标签写作时，它迫使你将注意力耗散在思考（样式）上，而不是在感受上。但正是后者，才是我想 Markdown 作为格式化语言所去传达的。

PlantUML 正是作为一种简单直观的语言来描述图表，正像 Markdown 当时将人们从 HTML 中解放出来一样，将人们的注意力聚焦在内容本身的思考（类的设计，交互的时序等），而不是在一个 GUI 工具里面拖拽方框，然后将其摆得好看。

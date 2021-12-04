---
date: 2021-04-18
tags:
  - backend
  - java
  - translation
permalink: java-lang-jvm-updates
---

# Java 9 到 16 的语言和 JVM 特性更新分类清单

> 本译文已获取作者许可后翻译、调整、发布。
>
> 原文：[A categorized list of all Java and JVM features since JDK 8 to 16](https://advancedweb.hu/a-categorized-list-of-all-java-and-jvm-features-since-jdk-8-to-16/)

从 Java 8 以来，一直到 16 版本，已有 180 个 [JDK Enhancement Proposals](http://openjdk.java.net/jeps/0)（JEPs）塑造 Java，每个 JEP 都给这个平台带来了改善。这篇文章分类梳理了最重要的改进。

![TOTAL NUMBER OF JEPS SINCE JDK 8](https://advancedweb.hu/assets/posts/post_java_8/jdktimeline-v4-284e4243b1ecaae845e987964b565e343eb3046efb507b20a7d4bed511a6a821.jpg)

目录：

- [新语言特性](#新语言特性)
- [新 API](#新-API)
- [性能提升](#性能提升)
- [安全改进](#安全改进)
- [启动](#启动)
- [打包](#打包)
- [Javadoc](#Javadoc)
- [字节码变动](#字节码)
- [新支持平台](#新支持平台)
- [新版本号格式](#新版本号格式)
- [废弃和移除](#废弃和移除)

JEPs 的完全列表可以在 OpenJDK 网站下的 [jdk](https://openjdk.java.net/projects/jdk/) 和 [jdk9](https://openjdk.java.net/projects/jdk9/) 项目找到。

所有的特性基本上都是可用的，且默认开启，除了那些有标记为以下：

- **预览**🔍 特性是完全明确且实现的，但还未被认为是最终版本。它们几乎完成，就等实际使用中再来一轮反馈。必须被[显示声明开启](https://openjdk.java.net/jeps/12)。
- **实验**💥特性相对没那么稳定，更有可能会有改变。也是需要显示声明开启。
- **孵化**🥚 模块不是最终的工具或 API ，会被[指定到单独的模块](https://openjdk.java.net/jeps/11)。



## 新语言特性

由于 Java 8 给这个语言带来了许多深具影响的改进，这个章节会简要涵盖下最近几年的更新。想要更深入的了解，参看 [New language features since Java 8 to 16](https://advancedweb.hu/new-language-features-since-java-8)。[^1]

- 记录类，定义不可变 DTO 的精简语法

   [`JDK 16`](https://openjdk.java.net/jeps/395) ( [`JDK 15`](https://openjdk.java.net/jeps/384) [`JDK 14`](https://openjdk.java.net/jeps/359) 为**预览特性**🔍 )

  ```java
  record Point(int x, int y) { }

  var point = new Point(1, 2);
  point.x(); // 返回 1
  point.y(); // 返回 2
  ```

- instanceof 模式匹配用于消除类型检查后的显示转化

     [`JDK 16`](https://openjdk.java.net/jeps/394) ( [`JDK 15`](https://openjdk.java.net/jeps/375) [`JDK 14`](https://openjdk.java.net/jeps/305) 为**预览特性**🔍 )

  ```java
  if (obj instanceof String s && s.length() > 5) {
      System.out.println("obj is a String with more than 5 characters: " + s.toUpperCase());
  }
  ```

- 封闭类可以限制哪些类能继承

     ( [`JDK 16`](https://openjdk.java.net/jeps/397) [`JDK 15`](https://openjdk.java.net/jeps/360) 为**预览特性**🔍 )

     ```java
     public abstract sealed class Shape
         permits Circle, Rectangle {...}
     
     public class Circle extends Shape {...} // OK
     public class Rectangle extends Shape {...} // OK
     public class Triangle extends Shape {...} // 编译错误
     
     // 不再需要 default 分支，已覆盖所有可能的类型
     double area = switch (shape) {
         case Circle c    -> Math.pow(c.radius(), 2) * Math.PI
         case Rectangle r -> r.a() * r.b()
     };
     ```

- 文本块

  [`JDK 15`](https://openjdk.java.net/jeps/378) ( [`JDK 14`](https://openjdk.java.net/jeps/368) [`JDK 13`](https://openjdk.java.net/jeps/355) 为**预览特性**🔍 )

  ```java
  String html = """
              <html>
                  <body>
                      <p>Hello, world</p>
                  </body>
              </html>
              """;
  ```

- 有用信息空指针异常

  [`JDK 15`](https://bugs.openjdk.java.net/browse/JDK-8233014) ( [`JDK 14`](https://openjdk.java.net/jeps/358) 中需要 `-XX:+ShowCodeDetailsInExceptionMessages` 开启 )

  ```java
  a.b.c.i = 99;
  ---
  Exception in thread "main" java.lang.NullPointerException:
        Cannot read field "c" because "a.b" is null
  ```

- Switch 表达式

  [`JDK 14`](https://openjdk.java.net/jeps/361) ( [`JDK 13`](https://openjdk.java.net/jeps/354) [`JDK 12`](https://openjdk.java.net/jeps/325) 为**预览特性**🔍 )

  ```java
  int numLetters = switch (day) {
      case MONDAY, FRIDAY, SUNDAY -> 6;
      case TUESDAY                -> 7;
      default      -> {
        String s = day.toString();
        int result = s.length();
        yield result;
      }
  };
  ```

- `var` 关键字引入使得本地变量声明没那么繁琐

  [`JDK 11`](https://openjdk.java.net/jeps/323) ( [`JDK 10`](https://openjdk.java.net/jeps/286) 中没有 lambda 支持 )

  ```java
  var greeting = "Hello World!";
  ```

- 可选且向后兼容的模块系统，可避免运行时出现 `ClassDefNotFoundErrors` 和创建内部 API

  [`JDK 9`](https://openjdk.java.net/jeps/261) (Project Jigsaw)

  ```java
  module hu.advancedweb.helloworld {
      requires hu.advancedweb.somedependency;
      exports hu.advancedweb.hello
  }
  ```

- 接口中允许私有方法

  [`JDK 9`](https://openjdk.java.net/jeps/213) (Milling Project Coin)

- 匿名内部类的钻石操作符

  [`JDK 9`](https://openjdk.java.net/jeps/213) (Milling Project Coin)

- Try-with-resources 语块允许 effectively final 变量

  [`JDK 9`](https://openjdk.java.net/jeps/213) (Milling Project Coin)

- 私有实例方法的 `@SafeVargs` 注解

  [`JDK 9`](https://openjdk.java.net/jeps/213) (Milling Project Coin)

- `import` 声明语句不再有废弃警告

  [`JDK 9`](https://openjdk.java.net/jeps/211)

  

## 新 API

### 通用

- `Stream.toList` 添加为更方便的集合常用方法（取代以前的 `.collect(Collectors.toList())` ）

  [`JDK 16`](https://docs.oracle.com/en/java/javase/16/docs/api/java.base/java/util/stream/Stream.html#toList())

  ```java
  List<String> result =
    Stream.of("one", "two", "three").stream()
      .filter(s -> s.length() == 3)
      .toList();
  ```

- `Stream.mapMulti` 替换（零个或多个元素的）流中的每个元素，`flatMap` 的一种备选方案

  [`JDK 16`](https://docs.oracle.com/en/java/javase/16/docs/api/java.base/java/util/stream/Stream.html#mapMulti(java.util.function.BiConsumer))

  ```java
  Stream.of(1, 2, 3, 4)
      .mapMulti((number, downstream) -> downstream.accept(number))
      .forEach(System.out::print); // 输出 1234
  ```

  相关链接[^2]：[Faster flatMaps with Stream::mapMulti in Java 16](https://nipafx.dev/java-16-stream-mapmulti/)

- 可指定 HTTP 客户端中筛选请求头的新构造器

  [`JDK 16`](https://docs.oracle.com/en/java/javase/16/docs/api/java.net.http/java/net/http/HttpRequest.html#newBuilder(java.net.http.HttpRequest,java.util.function.BiPredicate))

- `DateTimeFormatterBuilder.html#appendDayPeriodText` 支持除 AM/PM 外的其它时间区段格式

  [`JDK 16`](https://docs.oracle.com/en/java/javase/16/docs/api/java.base/java/time/format/DateTimeFormatterBuilder.html#appendDayPeriodText(java.time.format.TextStyle))

- Unix 域 socket channel 和 server-socket channel

  [`JDK 16`](https://openjdk.java.net/jeps/380)

- 矢量 API ，用于描述编译为最佳硬件指令的计算(**孵化模块** 🥚) 

  [`JDK 16`](https://openjdk.java.net/jeps/338)

- 用于静态类型的纯 Java 访问本地代码的外部链接器API (**孵化模块** 🥚) 

  [`JDK 16`](https://openjdk.java.net/jeps/389)

- 用于访问 Java 堆外内存的 API (**孵化模块** 🥚) 

  [`JDK 16`](https://openjdk.java.net/jeps/393)

- FileChannel API 中支持映射非 volatile （内存）的字节缓冲器

  [`JDK 14`](https://openjdk.java.net/jeps/352)

- `Files.mismatch`: 找出两个文件中第一个不匹配的字节

  [`JDK 12`](https://docs.oracle.com/en/java/javase/12/docs/api/java.base/java/nio/file/Files.html)

- `Collectors.teeing`: 用于创建一个由两个下游收集器复合而成的收集器

  [`JDK 12`](https://docs.oracle.com/en/java/javase/12/docs/api/java.base/java/util/stream/Collectors.html#teeing(java.util.stream.Collector,java.util.stream.Collector,java.util.function.BiFunction))

- 字符串增强：`indent` 和 `transform` 方法

  [`JDK 12`](https://docs.oracle.com/en/java/javase/12/docs/api/java.base/java/lang/String.html)

- 具有 HTTP/2，WebSocket 支持以及非阻塞 API 特性的标准 HTTP 客户端

  [`JDK 11`](https://openjdk.java.net/jeps/321) (在 [JDK 9](https://openjdk.java.net/jeps/110) 中是**孵化模块** 🥚) 

  ```java
  HttpClient httpClient = HttpClient.newBuilder().build();
  
  HttpRequest request =
    HttpRequest.newBuilder()
      .uri(URI.create("https://advancedweb.hu/"))
      .GET()
      .build();
  
  HttpResponse<String> response =
    httpClient.send(request, BodyHandlers.ofString());
  ```

- 字符串增强，如 `isBlank`, `lines`, `repeat` 和 `strip` 方法

  [`JDK 11`](https://docs.oracle.com/en/java/javase/11/docs/api/java.base/java/lang/String.html)

- 一些便捷的工厂方法，用于缓解没有集合字面量的不便

  [`JDK 9`](https://openjdk.java.net/jeps/269)

  ```java
  Set<Integer> mySet = Set.of(1, 2, 3);
  List<Integer> myList = List.of(1, 2, 3);
  Map<String, Integer> myMap = Map.of("one", 1, "two", 2);
  ```

- 响应式流的发布/订阅框架，用于非阻塞背压的异步流处理

  [`JDK 9`](https://openjdk.java.net/jeps/266)

- `CompletableFuture` 针对时间方面的增强（超时、延迟）

  [`JDK 9`](https://openjdk.java.net/jeps/266)

- 更多改变流（`dropWhile`, `takeWhile`）和生成流（`iterate`, `ofNullable`）的选项；只读的收集器（`toUnmodifiableList`）; Optional 可以转化为流

  [`JDK 9`](https://docs.oracle.com/javase/9/docs/api/java/util/stream/Stream.html#iterate-T-java.util.function.UnaryOperator-)

- `Arrays.mismatch`：找到两个数组中第一个不匹配的元素

  [`JDK 9`](https://docs.oracle.com/javase/9/docs/api/java/util/Arrays.html#mismatch-java.lang.Object:A-java.lang.Object:A-)

- Stack-Walking API 支持懒访问和栈帧过滤

  [`JDK 9`](https://openjdk.java.net/jeps/259)

- 进程 API 提供更多的信息和控制（例如进程 ID，参数，CPU 时间，父/子进程），加强了 `ProcessBuilder` 来帮助进程管道的创建

  [`JDK 9`](https://openjdk.java.net/jeps/102)

- `varHandle` API 取代 `java.util.concurrent.atomic` 和 `sun.misc.Unsafe` 成员变量和数组相关操作，来提供低层级的访问机制，比如原子写

  [`JDK 9`](https://openjdk.java.net/jeps/193)

- `MethodHandle` 的新组合体和查找方法

  [`JDK 9`](https://openjdk.java.net/jeps/274)

- 改进废弃机制。`@Deprecated` 注解中能添加 `forRemoval` 标记，会产生新的警告。

  [`JDK 9`](https://openjdk.java.net/jeps/277)

- OASIS 标准的 XML Catalog API，以安全和高性能的方式管理 XML 中的外部资源

  [`JDK 9`](https://openjdk.java.net/jeps/268)

- 升级 JDK 的 XML 解析器，Xerces，到 2.11.0 版本

  [`JDK 9`](https://openjdk.java.net/jeps/255)

- Image I/O 框架支持 TIFF 格式

  [`JDK 9`](https://openjdk.java.net/jeps/262)

  

### 国际化

- Unicode 10.0，新增了大概 27,000 多个字符，10 个区块，以及 30 余种古文字

  [`JDK 11`](https://openjdk.java.net/jeps/327)（[`JDK 9`](https://openjdk.java.net/jeps/267) 中支持 Unicode 8.0）

- `java.util.Locale` 和相关 API 支持货币种类，时区等等

  [`JDK 10`](https://openjdk.java.net/jeps/314)

- `ResourceBundle` 以 UTF-8 编码加载 properties 文件，而不是 ISO-8859-1

  [`JDK 9`](https://openjdk.java.net/jeps/226)

- CLDR 本地化数据默认开启

  [`JDK 9`](https://openjdk.java.net/jeps/252)

  

### 图形和桌面应用

- 面向全平台的桌面特性，比如 login/logout/lock 事件监听器和任务栏交互

  [`JDK 9`](https://openjdk.java.net/jeps/272)

- `MultiResolutionImage` 让检索特定分辨率（DPI）图片变得更简单

  [`JDK 9`](https://openjdk.java.net/jeps/251)

- Windows 和 Linux 平台的 HiDPI 图形

  [`JDK 9`](https://openjdk.java.net/jeps/263)

- Linux 上 JavaFX，Swing 和 AWT 支持 GTK 3

  [`JDK 9`](https://openjdk.java.net/jeps/283)

- Swing 中 Javadoc 的 `@beaninfo` 注解替换为 `@BeanInfo`

  [`JDK 9`](https://openjdk.java.net/jeps/256)

- 升级 JavaFX/Media 中 GStreamer 到 1.4.4 版本

  [`JDK 9`](https://openjdk.java.net/jeps/257)

- HarfBuzz 替换现有的 ICU OpenType 字体排版引擎

  [`JDK 9`](https://openjdk.java.net/jeps/258)

  

## 性能提升

### 通用

- 弹性元空间将未使用的 HotSpot 类元数据内存更及时地返还给操作系统

  [`JDK 16`](https://openjdk.java.net/jeps/387)

- 外部内存访问器 API ，安全有效地使用非堆内存(**孵化模块** 🥚) 

  [`JDK 15`](https://openjdk.java.net/jeps/383) [`JDK 14`](https://openjdk.java.net/jeps/370)

- 允许在 Java 应用执行结束时对类进行动态归档

  [`JDK 13`](https://openjdk.java.net/jeps/350)

- 默认启用默认类列表的类数据共享存档，以改善开箱即用的启动时间

  [`JDK 12`](https://openjdk.java.net/jeps/341)

- 应用类数据共享，通过在Java进程之间共享类元数据来改善启动时间并减少占用空间

  [`JDK 10`](https://openjdk.java.net/jeps/310)

- 节省空间的紧凑型字符串，更有效地存储只有 Latin-1 字符的字符串

  [`JDK 9`](https://openjdk.java.net/jeps/254)

- 性能分析和未分析的编译代码缓存被分离开，以提高性能和内存占用

  [`JDK 9`](https://openjdk.java.net/jeps/197)

- 将 intern 字符串存储在类数据共享档案中，以减少内存消耗

  [`JDK 9`](https://openjdk.java.net/jeps/250)

  

### 库

- 改进 AArch64 处理器上 `java.lang.Math` 的 `sin`、`cos` 和 `log` 函数的内部函数

  [`JDK 11`](https://openjdk.java.net/jeps/387)

- 安全管理器的性能提升

  [`JDK 9`](https://openjdk.java.net/jeps/232)

- Spin-Wait 提示 (`Thread#onSpinWait`) 来优化繁忙等待式循环

  [`JDK 9`](https://openjdk.java.net/jeps/285)

- 替换 Java 2D 中 Pisces 渲染器成 Marlin 作为默认的图形光栅化器

  [`JDK 9`](https://openjdk.java.net/jeps/265)

- 使用最近推出的 SPARC 和英特尔 x64 CPU 指令，以提高 GHASH 和 RSA 性能

  [`JDK 9`](https://openjdk.java.net/jeps/246)

  

### 并发

- Thread-Local 握手机制以停止个别线程

  [`JDK 10`](https://openjdk.java.net/jeps/312)

- 提高被竞争对象的 monitor 性能

  [`JDK 9`](https://openjdk.java.net/jeps/143)

- 在线程堆栈上为关键部分提供额外空间，减小 `java.util.concurrent` 的 locks 在堆栈溢出时出现死锁的风险

  [`JDK 9`](https://openjdk.java.net/jeps/270)

  

### 编译器

- Linux 平台支持 Ahead-of-Time 编译功能（**实验特性**💥）

  [`JDK 10`](https://openjdk.java.net/jeps/246)（Graal 作为实验性的 JIT 编译器）

  [`JDK 9`](https://openjdk.java.net/jeps/243)（JVM 编译器接口）

  [`JDK 9`](https://openjdk.java.net/jeps/295)（Graal 作为 AoT 编译器）

  

### G1 垃圾收集器（默认）

- NUMA（ non-uniform memory access ）感知的内存分配
  [`JDK 14`](https://openjdk.java.net/jeps/345)
- 可中止的混合收集，以满足用户提供的暂停目标
  [`JDK 12`](https://openjdk.java.net/jeps/344)
- 空闲时自动将堆内存返回给操作系统
  [`JDK 12`](https://openjdk.java.net/jeps/346)
- 并行 Full GC 以改善最坏情况下的延迟
  [`JDK 10`](https://openjdk.java.net/jeps/307)
- 将并行 GC 替换为 G1 作为默认垃圾收集器
  [`JDK 9`](https://openjdk.java.net/jeps/248)



### 其它垃圾收集器

- Z 垃圾收集器，在大的堆空间上提供非常低的暂停时间
  [`JDK 16`](https://openjdk.java.net/jeps/376) [`JDK 15`](https://openjdk.java.net/jeps/379) (**实验特性**💥  [`JDK 14`](https://openjdk.java.net/jeps/365) (Windows) [`JDK 14`](https://openjdk.java.net/jeps/364) (OS X) [`JDK 11`](https://openjdk.java.net/jeps/333) (Linux) )

- Shenandoah 垃圾收集器, 提供同 ZGC 类似的好处，但基于不同的算法
  [`JDK 15`](https://openjdk.java.net/jeps/377) ( [`JDK 12`](https://openjdk.java.net/jeps/189) 中为**实验特性**💥)

- Epsilon 垃圾收集器, 未实现实际的内存回收，力求最低开销
  [`JDK 11`](https://openjdk.java.net/jeps/318)

- `XX:AllocateHeapAt=<path>` 支持可替代的存储器设备
  [`JDK 10`](https://openjdk.java.net/jeps/316)

  

### 诊断分析及工具

- Flight Recorder 事件流: 可通过 [API](https://cr.openjdk.java.net/~egahlin/jep-349/javadocs/api/jdk.jfr/jdk/jfr/consumer/package-summary.html) 提供性能分析数据， 使其适用于连续监测
  [`JDK 14`](https://openjdk.java.net/jeps/349)
- 基于 JMH 的微基准测试套件[^3]
  [`JDK 12`](https://openjdk.java.net/jeps/230)
- Flight Recorder 成为 OpenJDK 的一部分
  [`JDK 11`](https://openjdk.java.net/jeps/328)
- 通过 JMTI 进行低开销堆性能分析
  [`JDK 11`](https://openjdk.java.net/jeps/331)
- C1 和 C2 编译器的运行时可管理和特定方法控制实现包含的测试
  [`JDK 9`](https://openjdk.java.net/jeps/165)
- 为 JVM 所有组件提供的细粒度、易配置的日志系统
  [`JDK 9`](https://openjdk.java.net/jeps/158) (Unified JVM Logging) [JDK 9](https://openjdk.java.net/jeps/271) (Unified GC Logging)
- 允许应用程序提供日志实现，供平台类使用
  [`JDK 9`](https://openjdk.java.net/jeps/264)



## 安全改进

- JDK 提供一组默认的根认证机构 (CA) 证书，TLS 连接可开箱即用
  [`JDK 10`](https://openjdk.java.net/jeps/319)
- 验证传入的序列化数据
  [`JDK 9`](https://openjdk.java.net/jeps/290)
- 默认的密钥存储类型是标准的 PKCS12，而不是专属的 JKS
  [`JDK 9`](https://openjdk.java.net/jeps/229)
- 基于 DRBG (Deterministic Random Bit Generator) 的 `SecureRandom`
  [`JDK 9`](https://openjdk.java.net/jeps/273)
- 禁用基于 SHA-1 签名的 X.509 证书链
  [`JDK 9`](https://openjdk.java.net/jeps/288)
- SHA-3 哈希算法
  [`JDK 9`](https://openjdk.java.net/jeps/287)



### TLS

- 支持 TLS 1.3
  [`JDK 11`](https://openjdk.java.net/jeps/332)

- 数据报传输层安全 ( DTLS, Datagram Transport Layer Security ) 的 API
  [`JDK 9`](https://openjdk.java.net/jeps/219)

- 实现 TLS 的 OCSP 修订 ( Online Certificate Status Protocol (OCSP) stapling ) ，提高证书状态检查的性能
  [`JDK 9`](https://openjdk.java.net/jeps/249)

- TLS 应用层协议协商 ( ALPN, Application-Layer Protocol Negotiation ) 扩展，无需额外的来回通信即可进行协议协商；ALPN 是 HTTP/2 连接的要求
  [`JDK 9`](https://openjdk.java.net/jeps/244)

  

### 加密

- Edwards-Curve 电子签名算法 (EdDSA) - [RFC8032](https://tools.ietf.org/html/rfc8032)
  [`JDK 15`](https://openjdk.java.net/jeps/339)
- 使用 Curve25519 和 Curve448 的密钥协议
  [`JDK 11`](https://openjdk.java.net/jeps/324)
- ChaCha20 和 Poly1305 加密算法
  [`JDK 11`](https://openjdk.java.net/jeps/329)



## 启动

- 支持启动单文件源码程序，包括 Unix 的 Shebang (`#!`) 行
  [`JDK 11`](https://openjdk.java.net/jeps/330)
- `jshell`:  Java 的「读取-求值-输出」循环 ( Read-Eval-Print Loop, REPL ) 编程环境
  [`JDK 9`](https://openjdk.java.net/jeps/222) (Project Kulla)
  相关链接[^2]： [Prototyping with JShell](https://advancedweb.hu/prototyping-with-jshell/)
- 用 `--release` 编译旧的平台版本，配置 `--source` 和 `--target` 并链接到相应的平台版本
  [`JDK 9`](https://openjdk.java.net/jeps/247)
- JVM 命令行标记的提前校验，避免崩溃
  [`JDK 9`](https://openjdk.java.net/jeps/245)



## 打包

- 用于创建单文件应用 ( self-contained applications ) 的打包工具，也支持原生包格式：msi，exe，pkg，dmg，deb 和 rpm
  [`JDK 16`](https://openjdk.java.net/jeps/392) ( **孵化模块** 🥚 in [`JDK 14`](https://openjdk.java.net/jeps/343) )
  相关链接[^2]：[Inside Java - Episode 12 “jpackage” with Kevin Rushforth](https://inside.java/2021/02/11/podcast-012/)
- `jlink` Java Linker，可为模块化 Java 应用程序构建一个优化的、精简的运行时映像，该映像只包含 JDK 的所需部分
  [`JDK 9`](https://openjdk.java.net/jeps/282) - [[2](https://openjdk.java.net/jeps/220)], [[3](https://openjdk.java.net/jeps/275)], [[4](https://openjdk.java.net/jeps/200)], [[4](https://openjdk.java.net/jeps/201)], [[5](https://openjdk.java.net/jeps/260)]
- 多版本 JAR 文件允许多个 Java 版本的类在一个打包文件
  [`JDK 9`](https://openjdk.java.net/jeps/238)



## Javadoc

- Javadoc 工具现在使用 HTML5 ，而不是基于 iframe 的布局，文档包含一个搜索框以方便导航
  [`JDK 9`](https://openjdk.java.net/jeps/225) - [[2](https://openjdk.java.net/jeps/224)], [[3](https://openjdk.java.net/jeps/221)]



## 字节码

- 用 `Unsafe::defineAnonymousClass()` 替换 `Lookup::defineHiddenClass()`，使框架动态生成隐藏类，这些类不能被其它类发现、链接或直接使用

  [`JDK 15`](https://openjdk.java.net/jeps/371)

- `java.lang.invoke.constant` 包允许轻松的描述可加载常量（ `ldc` 指令的运算元 ），这比依赖临时的 String 表示法更不易出错
  [`JDK 12`](https://openjdk.java.net/jeps/334)

- `CONSTANT_Dynamic` 常量池条目，使用引导的方式进行解析，和 `INVOKEDYNAMIC` 调用类似
  [`JDK 11`](https://openjdk.java.net/jeps/309)

- 引入 Nest 访问控制上下文，将类包装在同一代码实体中，例如嵌套类，避免了编译器向生成的字节码插入桥接方法的需要
  [`JDK 11`](https://openjdk.java.net/jeps/181)

- 为静态字符串连接生成的字节码使用 `invokedynamic ` 而不是直接创建 `StringBuilder#append` 链。这将使未来的字符串连接优化不需要字节码变动
  [`JDK 9`](https://openjdk.java.net/jeps/280)

- `INVOKEDYNAMIC` 可以表示对象属性和/或集合的高层级操作
  [`JDK 9`](https://openjdk.java.net/jeps/276)



## 新支持平台

- Alpine
  [`JDK 16`](https://openjdk.java.net/jeps/386)
- Windows/AArch64
  [`JDK 16`](https://openjdk.java.net/jeps/388)
- Linux/AArch64
  [`JDK 9`](https://openjdk.java.net/jeps/237)
- Linux/s390x
  [`JDK 9`](https://openjdk.java.net/jeps/294)
- Unified arm32/arm64
  [`JDK 9`](https://openjdk.java.net/jeps/297)



## 新版本号格式

- 简化的版本格式
  [`JDK 9`](https://openjdk.java.net/jeps/223) [`JDK 10`](https://openjdk.java.net/jeps/322)



## 废弃和移除

- 默认情况下对内部 API 强封装 ( `sun.*` )， 除了一些[关键 API](https://openjdk.java.net/jeps/260#Description)，例如  `sun.misc.Unsafe`
  解开强封装由启动器参数 [`--illegal-access`](https://openjdk.java.net/jeps/396#Description) 控制
  [`JDK 16`](https://openjdk.java.net/jeps/396) (Deprecated in [`JDK 9`](https://openjdk.java.net/jeps/260) - [[2](https://openjdk.java.net/jeps/253)])

- 废弃原始包装器类的构造函数，不允许在包装器对象上进行同步
  (`Byte`, `Short`, `Integer`, `Long`, `Float`, `Double`, `Boolean`, 和 `Character`)
  [`JDK 16`](https://openjdk.java.net/jeps/390)

- 移除 Javascript 引擎 Nashorn 和 `jjs` 工具
  [`JDK 15`](https://openjdk.java.net/jeps/372) (Deprecated in [`JDK 11`](https://openjdk.java.net/jeps/335))

- 移除 Solaris 和 SPARC 平台移植
  [`JDK 15`](https://openjdk.java.net/jeps/381) (Deprecated in [`JDK 14`](https://openjdk.java.net/jeps/362))

- 废弃 [RMI Activation](https://docs.oracle.com/javase/9/docs/specs/rmi/activation.html)，影响  `java.rmi.activation` 包和  `rmid` 工具，一般不会影响 Java RMI
  [`JDK 15`](https://openjdk.java.net/jeps/385)

- 默认禁用 [偏向锁](https://stackoverflow.com/questions/9439602/biased-locking-in-java) ，废弃相关的命令行参数
  [`JDK 15`](https://openjdk.java.net/jeps/374)

- 废弃 `Unsafe::defineAnonymousClass()` 
  [`JDK 15`](https://openjdk.java.net/jeps/371)

- 移除 Concurrent Mark Sweep (CMS) 垃圾收集器
  [`JDK 14`](https://openjdk.java.net/jeps/363)

- 废弃 ParallelScavenge + SerialOld GC 的组合
  [`JDK 14`](https://openjdk.java.net/jeps/366)

- 移除 Pack200 工具及其 API
  [`JDK 14`](https://openjdk.java.net/jeps/367)

- 废弃 Pack200 工具及其 API
  [`JDK 11`](https://openjdk.java.net/jeps/336)

- 移除 Java EE 
  [`JDK 11`](https://openjdk.java.net/jeps/320)

- 移除 CORBA 
  [`JDK 11`](https://openjdk.java.net/jeps/321)

- 移除 `Thread#destroy` 和  `Thread#stop`
  [`JDK 11`](https://bugs.openjdk.java.net/browse/JDK-8204243)

- `var` 不再是合法的类名
  [`JDK 10`](https://openjdk.java.net/jeps/286)

- 移除 javah 工具
  [`JDK 10`](https://openjdk.java.net/jeps/313)

- 下划线不再是合法的变量名
  [`JDK 9`](https://openjdk.java.net/jeps/213)

- 移除 `apple.applescript` 和 `com.apple` 包
  [`JDK 9`](https://openjdk.java.net/jeps/272)

- 禁用基于 SHA-1 签名的 X.509 证书链
  [`JDK 9`](https://openjdk.java.net/jeps/288)

- 移除 Launch-Time JRE 版本选择指令：`JRE-Version` 清单条目和 `-version:` 命令行选项
  [`JDK 9`](https://openjdk.java.net/jeps/231)

- 移除 jhat 工具
  [`JDK 9`](https://openjdk.java.net/jeps/241)

- 移除 JVM TI hprof 代理
  [`JDK 9`](https://openjdk.java.net/jeps/240)

- 移除 JDK 8 中废弃的 GC 组合 
  [`JDK 9`](https://openjdk.java.net/jeps/214)

- 废弃 Applet API 
  [`JDK 9`](https://openjdk.java.net/jeps/289)

- 废弃 Concurrent Mark Sweep (CMS) 垃圾收集器 
  [`JDK 9`](https://openjdk.java.net/jeps/291)

- 废弃  `Object.finalize()` 
  [`JDK 9`](https://bugs.openjdk.java.net/browse/JDK-8165641)

- 移除 JRE 中的认可标准覆盖 (`lib/endorsed`) 和扩展 (`lib/ext`) 机制
  [`JDK 9`](https://docs.oracle.com/javase/9/migrate/toc.htm#JSMIG-GUID-A78CC891-701D-4549-AA4E-B8DD90228B4B)

- 移除 JRE 中的 `rt.jar`
  [`JDK 9`](https://docs.oracle.com/javase/9/migrate/toc.htm#JSMIG-GUID-A78CC891-701D-4549-AA4E-B8DD90228B4B)

  如果你对 Java 8 和 14 之间所有 API 级别的差异有兴趣，请查看 [`Java Almanac`](https://github.com/marchof/java-almanac) 项目。此外，还可以查看Java类依赖分析器 [`jdeps`](https://docs.oracle.com/javase/8/docs/technotes/tools/unix/jdeps.html)，找出你的项目是否还在使用旧的内部 API。

## 总结

[`JDK 8`](https://openjdk.java.net/projects/jdk8/) 是在 2014 年发布的。我们不得不为 [`JDK 9`](https://openjdk.java.net/projects/jdk9/) 等待三年半的时间。 但从那时起，就快了起来。Java 有一个新的发布架构，目标是每六个月提供一个新版本。

虽然现在仍然支持 Java 8，但迁移到最新版本会带来相当多的改进。





译者注：

[^1]: 这篇文章也有翻译：参看 [Java 9 到 16 的语言特性更新](https://nanova.me/2021/04/04/java-lang-updates/)
[^2]: 这里指的是原文的参考来源
[^3]: 译者有写相关的介绍文[章](https://nanova.me/2020/06/21/jmh/)


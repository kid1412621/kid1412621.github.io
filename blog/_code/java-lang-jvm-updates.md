# Java 9 至 16 的语言和 JVM 特性更新分类列表

从 Java 8 到 16 版本，已有 180 个 [JDK Enhancement Proposals](http://openjdk.java.net/jeps/0)（JEPs）塑造 Java，每个 JEP 都给这个平台带来了改善。这篇文章分类梳理了最重要的改进。

![TOTAL NUMBER OF JEPS SINCE JDK 8](https://advancedweb.hu/assets/posts/post_java_8/jdktimeline-v4-284e4243b1ecaae845e987964b565e343eb3046efb507b20a7d4bed511a6a821.jpg)

目录：

- [New Language Features](https://advancedweb.hu/a-categorized-list-of-all-java-and-jvm-features-since-jdk-8-to-16/#new-language-features)
- [New APIs](https://advancedweb.hu/a-categorized-list-of-all-java-and-jvm-features-since-jdk-8-to-16/#new-apis)
- [Performance Improvements](https://advancedweb.hu/a-categorized-list-of-all-java-and-jvm-features-since-jdk-8-to-16/#performance-improvements)
- [Security Improvements](https://advancedweb.hu/a-categorized-list-of-all-java-and-jvm-features-since-jdk-8-to-16/#security-improvements)
- [Bytecode Changes](https://advancedweb.hu/a-categorized-list-of-all-java-and-jvm-features-since-jdk-8-to-16/#bytecode)
- [Launching](https://advancedweb.hu/a-categorized-list-of-all-java-and-jvm-features-since-jdk-8-to-16/#launching)
- [Packaging](https://advancedweb.hu/a-categorized-list-of-all-java-and-jvm-features-since-jdk-8-to-16/#packaging)
- [Javadoc](https://advancedweb.hu/a-categorized-list-of-all-java-and-jvm-features-since-jdk-8-to-16/#javadoc)
- [New Platforms](https://advancedweb.hu/a-categorized-list-of-all-java-and-jvm-features-since-jdk-8-to-16/#new-supported-platforms)
- [Deprecation and Removal](https://advancedweb.hu/a-categorized-list-of-all-java-and-jvm-features-since-jdk-8-to-16/#deprecation-and-removal)
- [New Version Scheme](https://advancedweb.hu/a-categorized-list-of-all-java-and-jvm-features-since-jdk-8-to-16/#new-version-scheme)

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

- 

### 库

### 并发

### 编译器

### G1 垃圾回收器（默认）

### 其它垃圾回收器

### 诊断分析及工具



## 安全改进

### TLS

### 加解密



## 启动



## 打包



## Javadoc



## 字节码



## 新支持平台



新版本命名格式



## 废弃和移除



总结



译者注：

[^1]: 这篇文章也有翻译：参看 [Java 9 到 16 的语言特性更新](https://nanova.me/2021/04/04/java-lang-updates/)
[^2]: 这里指的是原文的参考来源


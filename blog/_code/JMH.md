---
date: 2020-06-21
tag:
  - backend
  - java
  - test
---

# Java 微基准测试套件

## What & Why

说到基准测试，我们脑海中可能很快会想起 PC 上跑着鲁大师飙得风扇哄哄转，或者手机上跑着 GeekBench 烧得 CPU 烫手的场景。硬件有基准测试，软件也有；再具体到 Java 世界，就像你可以用 ab 、jmeter、loadrunner 来跑并发测试，你可以用 JMH 来跑微基准测试，同样也是一类性能测试。所谓微基准测试，系针对细粒度代码块进行的，可重复的，可得到定量的结果的，检验该代码块是否达到某个特定标准的测量方法（这篇文章[^2]或许比我解释的更好）。所谓 JMH（ Java Microbenchmark Harness ）[^official]，为 JDK 项目官方提供地微基准测试套件，在 JDK 9 后已被集成为 JDK 的一部分 。

~~存在即合理~~（未必）？为什么要用它？什么时候需要它？先讲个笑话[^3]：

> 1. You want to write an article about microbenchmarking.
> 2. You identified the code segment that eats most of the resources in your application and the improvement can be tested by microbenchmarks.
> 3. You cannot identify the code segment that eats most of the resources in an application, but you suspect it.

要测试方法调用时间不能直接在调用前后写 `System.currentTimeMillis()` 吗？直接丢结论，这样的手段并未考虑到 JVM 预热、JIT 代码优化等因素，得到的结果未必精准。

## 基础入门

### 快速起步

### 基本概念

### 注解

### 结果解读

## 最佳实践

## 集成

### IntelliJ

在 IntelliJ 中使用时，务必像使用 Lombok 那样，在设置中打开 Annotation Processors。

另外，你还可以装上使用[插件](https://github.com/artyushov/idea-jmh-plugin)，能将 `@Benchmark` 注释的方法，像单元测试那样单独执行，光标移至方法名，然后`Ctrl` + `R` 或`Ctrl` + `Shift` + `R`，运行某个类同理。也可以快速生成 `@Benchmark` 方法（`Ctrl/Cmd` + `N`）。

### Jenkins

Jenkins 也可以通过相应[插件](https://github.com/brianfromoregon/jmh-plugin)集成，配置成 JSON 导出测试报告，还可通过 `d3.js` 做可视化展示。

还有一些在线可视化服务：[JMH Visual Chart](http://deepoove.com/jmh-visual-chart/)，[JMH Visualizer](https://jmh.morethan.io/)。

## Sum-up

测试，并非只是测试人员需要关注的内容，开发人员在优化自己代码时，往往需要数据做支撑，不能凭空想象实际使用场景。借以 JMH 来测量代码在实际运行场景时的性能基准数据，以此为依据，再做有依据的针对性优化。如果仍有兴趣，可以参看这些链接[^guide1][^guide2][^guide3][^guide4][^guide5]，亦可参看官方代码样例[^example]。

[^official]: [JMH official site](https://hg.openjdk.java.net/code-tools/jmh)
[^2]: [Performance measurement with JMH – Java Microbenchmark Harness](https://blog.codecentric.de/en/2017/10/performance-measurement-with-jmh-java-microbenchmark-harness/)
[^3]: [Microbenchmarking Comes to Java 9](https://dzone.com/articles/microbenchmarking-comes-to-java-9)
[^guide1]: [Microbenchmarking with Java](https://www.baeldung.com/java-microbenchmark-harness)
[^guide2]: [JMH - Java Microbenchmark Harness](http://tutorials.jenkov.com/java-performance/jmh.html#why-are-java-microbenchmarks-hard)
[^guide3]: [Testing your code performance with JMH tool](https://blog.aspiresys.pl/technology/testing-code-performance-jmh-tool/)
[^guide4]: [JAVA 拾遗 — JMH 与 8 个测试陷阱](https://www.cnkirito.moe/java-jmh/)
[^guide5]: [Java 微基准测试框架 JMH](https://www.xncoding.com/2018/01/07/java/jmh.html)
[^example]: [JMH official code example](https://hg.openjdk.java.net/code-tools/jmh/file/tip/jmh-samples/src/main/java/org/openjdk/jmh/samples/)

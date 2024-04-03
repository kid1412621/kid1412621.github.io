---
title: JMH - Java 微基准测试套件
date: 2020-06-21
tags:
  - backend
  - java
  - test
---

说到基准测试，我们脑海中可能很快会想起 PC 上跑着鲁大师飙得风扇哄哄转，或者手机上跑着 GeekBench 烧得 CPU 烫手的场景。硬件有基准测试，软件也有；再具体到 Java 世界，就像你可以用 ab 、jmeter、loadrunner 来跑并发测试，你可以用 JMH 来跑微基准测试，同样也是一类性能测试。

---

## 3W

### What

所谓微基准测试，系针对细粒度代码块进行的，可重复的，可得到定量的结果的，检验该代码块是否达到某个特定标准（基准水平）的测量方法（这篇文章[^2]或许比我解释的更好）。所谓 JMH（ Java Microbenchmark Harness ）[^official]，由 JVM 性能工程师 [Aleksey Shipilëv](https://shipilev.net/) 开发，作为 OpenJDK 的子项目之一，旨在微基准测试（官方定义为 nano/micro/milli/macro ，可见能做的不止是微基准测试）的工具套件，在 OpenJDK 9 后已被集成其一部分 。

### Why

~~存在即合理~~（未必）？为什么要用它？先讲个笑话[^3]：

> 1. You want to write an article about microbenchmarking.
> 2. You identified the code segment that eats most of the resources in your application and the improvement can be tested by microbenchmarks.
> 3. You cannot identify the code segment that eats most of the resources in an application, but you suspect it.

要测试方法调用时间不能直接在调用前后写 `System.currentTimeMillis()` 吗？

众所周知，Java 是一种半编译半解释的语言，源码编译成成字节码后，JIT 会依据实际运行时的工况持续的动态优化，并缓存热点代码为机器码。若使用前面提到的手段，得到的结果往往不是真实的（写在循环里多跑几次也是）。JMH 除了考虑到 JVM 预热、JIT 优化等因素，提供的测试精度也是远远高于前者。

### When

那什么时候需要它？我列举了一些我能想到的实际应用场景：

1. 针对热点代码进行优化，要优化就得有依据，不然怎么优化？
2. 在不同类库提供相同实现时之间抉择使用哪一个性能更佳；
3. 学习 JVM 或算法等知识，需要定量的得出结论。



## Hands-on

### 快速起步

Maven 项目引入（ `pom.xml`）

```xml
<dependency>
  <groupId>org.openjdk.jmh</groupId>
  <artifactId>jmh-core</artifactId>
  <version>1.23</version>
</dependency>
<dependency>
  <groupId>org.openjdk.jmh</groupId>
  <artifactId>jmh-generator-annprocess</artifactId>
  <version>1.23</version>
  <scope>provided</scope>
</dependency>
```

Gradle 项目引入（`build.gradle`）

```groovy
plugins {
  id "me.champeau.gradle.jmh" version "0.5.0"
}
// 若编写的基准测试依赖于第三方库
dependencies {
    jmh 'commons-io:commons-io:2.4'
}
```

可以看到，引入了一个专门处理注解的包，没错，JMH 和 JUnit 一样是基于注解的（当然也可以不用），下面是一个最简单的例子：

```java
public class JMHTest {
    @Benchmark
    public void dummy() {
        // Do literally nothing
    }

    public static void main(String[] args) throws IOException {
        org.openjdk.jmh.Main.main(args);
    }
}
```

`@Benchmark` 和 JUnit 中的 `@Test` 注解极为相似，标记方法为基准测试方法，不同的是前者可以是类注解，并且权限必须是 `public`。  JMH 通过该注解在编译期会生成相应的测试代码。

### 基本概念

1. 测试模式

   通过 `@BenchmarkMode` 注解设置当前基准测试的模式，该注解为类注解和方法注解，可接受多个值，包括：

   - Throughput：吞吐量，意为单位时间内方法可执行的次数，如「1 秒内可以执行多少次调用」，该模式为默认值；
   - AverageTime：平均时间，意为执行（单次）测试的平均耗时， 如「每次调用平均耗时多少毫秒」；
   - SampleTime：随机取样时间，意为方法执行到某个完成度到耗时，例如「50% 的调用在多少毫秒以内，99.999% 的调用在多少毫秒以内」；
   - SingleShotTime：单次执行时间，上述模式都是一个测试迭代（ iteration ）运行多次，该模式仅运行一次。往往配合关闭预热配置，用于测试冷启动时的性能；
   - All：测试会包含上述所有模式。

   以上涉及到时间单位的定义，都可通过 `@OutputTimeUnit` 来配置测试报告中的呈现。

2. 测试迭代

   JMH 单次运行会包含多次测试迭代，每个测试迭代测试的内容完全相同，多次测量是为了得到更准确的结果，若每次迭代（单位时间内）内能运行次数（ops）越多，则性能越佳。类似于 JUnit 的 `@Repeat` 注解，JMH 通过 `@Measurement` 可设置测试迭代的次数，每次迭代运行完后会串行的执行下一次。通过 `time`, `timeUnit`, `batchSize` 可分别控制每个迭代的时间，以及单次迭代的执行次数。值得注意的是， 文档上说 `@Timeout` 可控制每次迭代的超时时间，但实际测试发现当迭代运行时间超过指定的超时时间并不会中断测试，根据 SO 的答案其实际仅作用于收尾阶段[^timeout]。

3. 测试预热

   上文中已提到，由于 JIT 优化和 JVM 预热的原因，要想得到趋于真实场景的测试结果，需要在进入正式的测量迭代前进行预热。 配置 `@Warmup` 注解来控制预热的执行，用法与 `@Measurement` 完全相同，既控制在正式测量前运行代码的预热迭代次数和频率。也可以t通过 `Runner` 传入配置设置 `WarmupMode` 预热模式（无相应注解）；

4. 多线程测试

   JUnit 配置 `@Execution(ExecutionMode.CONCURRENT)` 可以并发跑测试，JMH 的 `@Threads` 注解可设置运行测试的线程数（虽然两者可能不是一个概念），测试结果是同步的。此外，JMH 还提供了线程分组，主要用于非对称基准测试[^asym]，通过 `@Group` 和 `@GroupThreads` 注解，来设置测试方法的分组及其在组内的线程数，假如有两个测试方法，每个都注解 `@GroupThreads(4)`，那总共将运行 8 * N 个线程，N 取值取决于 JMH 的工作线程数。需要注意的是，`@Threads` 和 `@GroupThreads` 注解不能同时使用，编译器会警告有歧义；

6. 依赖注入

   基准测试的方法的参数仅能传 `@State` 注解的类（后简称状态类），或是由 JMH 提供的一些类（后文会提及）。状态类不会被基准测试所测量，可以理解为测试方法的一个状态，实际上就是测试的一个固定上下文（[Test Fixture](https://github.com/junit-team/junit4/wiki/Test-fixtures)），一种和测试内容本身解耦的抽象。状态类要求该类为 `public` 的，若为内部类需要是 `static` 的，且拥有一个公共的无参构造函数。状态类的 Scope （可类比理解为 Spring 中 `@Bean` 的作用域）有三种：

   - Thread：该状态为每个线程独享，每个线程运行测试时都会创建自己的状态类实例；
   - Group：该状态为同一个分组内所有线程共享，每个线程组运行测试时都会创建自己的状态类实例；
   - Benchmark：该状态在所有线程间共享，所有线程共享状态类实例。

6. 参数化测试

   再次，类似于 JUnit 的 `@ParameterizedTest` 参数化测试，JMH 可以通过 `@Param` 「注入」测试方法所需的参数。该注解仅能在状态类中注入，而且参数类型仅能为基本类型及其包装类、java.lang.String、枚举；

7. 准备、收尾

   JMH 的 `@Setup` 和 `@Teardown` 很类似于 JUnit 的 `@BeforeAll` 和 `@AfterAll` 注释在方法上表示在测试前准备工作和结束后收尾工作。当然，这两个注解的目的就是准备或销毁测试的上下文（Fixture method），所以也仅能在状态类中使用。它们支持不同的执行级别（ Junit 中 `@After` 和 `@AfterAll` 的区别）：

   - Level.Trial：每次基准测试执行，其包括所有的预热迭代和测试迭代；
   - Level.Iteration：每次测试迭代执行；
   - Level.Invocation：每次测试方法被调用执行，谨慎使用。

8. 其它

   `@OperationsPerInvocation` 用于告诉 JMH 测量方法中包含有几次操作，以便得到更精准的测量结论，例如需要测量一个循环中的单次执行性能，（当然在测试中写循环存在各种问题，[后面](#最佳实践)会细说，可以先看下[这个例子](https://hg.openjdk.java.net/code-tools/jmh/file/b6f87aa2a687/jmh-samples/src/main/java/org/openjdk/jmh/samples/JMHSample_11_Loops.java)）：

   ```java
   @Benchmark
   @OperationsPerInvocation(10)
   public void test() {
     for (int i = 0; i < 10; i++) {
       // do something
     }
   }
   ```

   `@CompilerControl` 用于 JIT 编译器的行为控制，很多时候由于 JIT 优化的原因会导致测试结果不准，借助该注解也要屏蔽掉这样一些优化，[后面](#最佳实践)也会详解。

### 结果解读

行文过半，上一段完整些的代码：

```java
@Warmup(iterations = 3, time = 2)
@Measurement(iterations = 10, time = 2)
@Fork(1)
@State(Scope.Thread)
@OutputTimeUnit(TimeUnit.MILLISECONDS)
public class StringConcatBench {
    String[] words;

    @Param({"1", "3", "5", "10", "100"})
    int loop;

    @Setup(Level.Iteration)
    public void init() {
        words = new String[loop];
        for (int i = 0; i < loop; i++)
            words[i] = UUID.randomUUID().toString();
    }

    @Benchmark
    public void plus(Blackhole bh) {
        String s = "";
        for (String word : words)
            s += word;
        bh.consume(s);
    }

    @Benchmark
    public void concat(Blackhole bh) {
        String s = "";
        for (String word : words)
            s = s.concat(word);
        bh.consume(s);
    }

    @Benchmark
    public void builder(Blackhole bh) {
        StringBuilder sb = new StringBuilder();
        for (String word : words)
            sb.append(word);
        bh.consume(sb.toString());
    }

    @Benchmark
    public void format(Blackhole bh) {
        String s = "";
        for (String word : words)
            s = String.format("%s%s", s, word);
        bh.consume(s);
    }
}
```

上面的代码简单的基准测试了下不同方式的字符串拼接的效率，通过注解指定了基准测试的一些基本配置，3 次预热迭代，10 次测量迭代（每次 2 秒），然后将该类设置成状态类以便配置测试的上下文参数，即字符串拼接的个数，并在 `@Setup` 方法里面初始化需拼接的字符串；（这里可能会看到 `String.format()` 是在循环里做的，而不是写 `%s%s%s` 来「一次性」拼接是为了统一，对总体结论的影响是差距不大的 ）。把代码跑起来（很需要一小会儿），运行完后用我们可以在控制台看到测试报告（亦可为报告指定输出文件路径），下面是测试报告：

```java
// 此处省略若干行……

# JMH version: 1.23
# VM version: JDK 1.8.0_252, OpenJDK 64-Bit Server VM, 25.252-b09
# VM invoker: /Library/Java/JavaVirtualMachines/adoptopenjdk-8.jdk/Contents/Home/jre/bin/java
# VM options: -Dfile.encoding=UTF-8
# Warmup: 3 iterations, 2 s each
# Measurement: 10 iterations, 2 s each
# Timeout: 10 min per iteration
# Threads: 1 thread, will synchronize iterations
# Benchmark mode: Throughput, ops/time
# Benchmark: com.example.demo.StringConcatBench.plus
# Parameters: (loop = 100)

# Run progress: 95.00% complete, ETA 00:00:26
# Fork: 1 of 1
# Warmup Iteration   1: 22.087 ops/ms
# Warmup Iteration   2: 29.275 ops/ms
# Warmup Iteration   3: 29.192 ops/ms
Iteration   1: 29.212 ops/ms
Iteration   2: 29.274 ops/ms
Iteration   3: 28.637 ops/ms
Iteration   4: 29.062 ops/ms
Iteration   5: 29.124 ops/ms
Iteration   6: 28.748 ops/ms
Iteration   7: 28.848 ops/ms
Iteration   8: 28.381 ops/ms
Iteration   9: 29.115 ops/ms
Iteration  10: 29.085 ops/ms


Result "com.example.demo.StringConcatBench.plus":
  28.949 ±(99.9%) 0.432 ops/ms [Average]
  (min, avg, max) = (28.381, 28.949, 29.274), stdev = 0.286
  CI (99.9%): [28.517, 29.381] (assumes normal distribution)


# Run complete. Total time: 00:08:48

REMEMBER: The numbers below are just data. To gain reusable insights, you need to follow up on
why the numbers are the way they are. Use profilers (see -prof, -lprof), design factorial
experiments, perform baseline and negative tests that provide experimental control, make sure
the benchmarking environment is safe on JVM/OS/HW level, ask for reviews from the domain experts.
Do not assume the numbers tell you what you want them to tell.

Benchmark                  (loop)   Mode  Cnt      Score      Error   Units
StringConcatBench.builder       1  thrpt   10  21779.683 ± 1089.463  ops/ms
StringConcatBench.builder       3  thrpt   10   5052.652 ± 5313.233  ops/ms
StringConcatBench.builder       5  thrpt   10   5563.023 ±   76.160  ops/ms
StringConcatBench.builder      10  thrpt   10   2942.174 ±   57.457  ops/ms
StringConcatBench.builder     100  thrpt   10    338.177 ±    8.542  ops/ms
StringConcatBench.concat        1  thrpt   10  36313.432 ± 2163.469  ops/ms
StringConcatBench.concat        3  thrpt   10  12044.826 ±  403.363  ops/ms
StringConcatBench.concat        5  thrpt   10   6820.171 ±  265.983  ops/ms
StringConcatBench.concat       10  thrpt   10   2359.855 ±  152.101  ops/ms
StringConcatBench.concat      100  thrpt   10     29.109 ±    0.196  ops/ms
StringConcatBench.format        1  thrpt   10   2083.978 ±   21.523  ops/ms
StringConcatBench.format        3  thrpt   10    660.604 ±    3.908  ops/ms
StringConcatBench.format        5  thrpt   10    391.101 ±    2.238  ops/ms
StringConcatBench.format       10  thrpt   10    178.915 ±    0.600  ops/ms
StringConcatBench.format      100  thrpt   10      6.437 ±    0.050  ops/ms
StringConcatBench.plus          1  thrpt   10  68603.818 ±  529.401  ops/ms
StringConcatBench.plus          3  thrpt   10  19402.687 ±  155.594  ops/ms
StringConcatBench.plus          5  thrpt   10   8313.385 ±   97.153  ops/ms
StringConcatBench.plus         10  thrpt   10   2402.194 ±   31.245  ops/ms
StringConcatBench.plus        100  thrpt   10     28.949 ±    0.432  ops/ms

Process finished with exit code 0
```

报告大致分为三个部分（从上至下依次为）：测试配置信息、测试过程（部分省略）和测试结论。配置信息前文已提及，不再赘述。测试过程显示了不同测试方法，在不同测试参数下，每个迭代周期和预热周期的信息，以及本轮测试迭代小结（依次为：均值、极值、方差、正态分布）。

值得关注的是测试结论部分，是以表格的形式展现，第一列为基准测试的方法，每个分组会有单独一行；后面紧跟的是参数，若某个参数为数组，单个测试方法会生成多行对应相应的基准；`Mode` 列是基准模式，这里 `thrpt` 代表吞吐量，可能会多种模式并存；`Cnt` 列大致表示测量得到的样本量，该值受参数、测量迭代数、线程数、独立进程数及基准模式影响，具体可参看[这里](https://stackoverflow.com/questions/50799696/whats-the-cnt-column-in-the-jmh-results)；`Score` 列很容易理解，即为该测试方法的基准得分，配合最后一列 `Units` 来看，以数据第一行为例，每毫秒可执行大约 21779.683 次，当然不同的基准模式含义不同[^score]；最后 `Error` 列代表得分的置信区间，大致可理解为得分的正负偏差，有兴趣可以看下[作者的回答](https://stackoverflow.com/a/24725075/8140523)。

由此，我们大概能得出四种字符串拼接方法的性能对比，在拼接元素较小时：`+` >  `String.concat()` > `StringBuilder` > `String.format()` ；在拼接元素较大时：`StringBuilder` > `+` > `String.concat() ` > `String.format()`。这和 [Oracle 官方的最佳实践](https://docs.oracle.com/cd/A97688_16/generic.903/bp/java.htm#1007796)大致一致。将基准测试代码移除，`javac StringConcatBench.java && javap -c StringConcatBench.class` 看下 `plus()` 和 `append()` 方法的字节码：

```java {22,27}
   java.lang.String plus();
    Code:
       0: ldc           #2                  // String
       2: astore_1
       3: aload_0
       4: getfield      #3                  // Field words:[Ljava/lang/String;
       7: astore_2
       8: aload_2
       9: arraylength
      10: istore_3
      11: iconst_0
      12: istore        4
      14: iload         4
      16: iload_3
      17: if_icmpge     52
      20: aload_2
      21: iload         4
      23: aaload
      24: astore        5
      26: new           #4                  // class java/lang/StringBuilder
      29: dup
      30: invokespecial #5                  // Method java/lang/StringBuilder."<init>":()V
      33: aload_1
      34: invokevirtual #6                  // Method java/lang/StringBuilder.append:(Ljava/lang/String;)Ljava/lang/StringBuilder;
      37: aload         5
      39: invokevirtual #6                  // Method java/lang/StringBuilder.append:(Ljava/lang/String;)Ljava/lang/StringBuilder;
      42: invokevirtual #7                  // Method java/lang/StringBuilder.toString:()Ljava/lang/String;
      45: astore_1
      46: iinc          4, 1
      49: goto          14
      52: aload_1
      53: areturn

  java.lang.String append();
    Code:
       0: new           #4                  // class java/lang/StringBuilder
       3: dup
       4: invokespecial #5                  // Method java/lang/StringBuilder."<init>":()V
       7: astore_1
       8: aload_0
       9: getfield      #3                  // Field words:[Ljava/lang/String;
      12: astore_2
      13: aload_2
      14: arraylength
      15: istore_3
      16: iconst_0
      17: istore        4
      19: iload         4
      21: iload_3
      22: if_icmpge     44
      25: aload_2
      26: iload         4
      28: aaload
      29: astore        5
      31: aload_1
      32: aload         5
      34: invokevirtual #6                  // Method java/lang/StringBuilder.append:(Ljava/lang/String;)Ljava/lang/StringBuilder;
      37: pop
      38: iinc          4, 1
      41: goto          19
      44: aload_1
      45: invokevirtual #7                  // Method java/lang/StringBuilder.toString:()Ljava/lang/String;
      48: areturn
}
```

众所周知， Java 编译器会自动将 `+` 替换成 `StringBuilder` （或 `StringBuffer` ），所以 `+` 和 `StringBuilder` 的性能差距和老版本 JDK 不一样。在拼接元素少时（小于 10 ），`+` 拼接 JIT 对字节码解释机器码时做了优化，所以性能高于 `append()`。在拼接元素较多时，可以从看到 `plus()` 方法循环体中重复的构建 `StringBuilder` 对象，而且拼接完成后还会转化为 `String` 对象。当然这不代表所有使用场景，而且性能也不是写代码时唯一需要考虑的事，还有可读性、NPE 预防、线程安全等方面需要考虑，[这篇文章](https://redfin.engineering/java-string-concatenation-which-way-is-best-8f590a7d22a8)不仅阐述了这些方面，并将常用框架的字符串拼接方法纳入对比，有兴趣可以看看。最后，测试报告中的这个警告很有意思：

> Do not assume the numbers tell you what you want them to tell.



## 最佳实践

由于前面提到的 JIT 优化等原因，在写基准测试的时候有一些暗坑需要格外关注：

1. 死码消除

   ```java
   @Benchmark
   public void doNothing() {
   }
    
   @Benchmark
   public void objectCreation() {
       new Object();
   }
   ```

   跑一下上面的代码，你会很惊奇的发现，两个方法的基准几乎一样，为什么会这样？难道创建一个对象不怎么也会更耗时吗？事实上，`new Object()` 这段代码并没用，JIT 将其视作无效代码优化掉了。要想解决办法很简单，添加方法的返回值；或者（上面例子已经用到）使用 JMH 提供的 `Blackhole` 类传入方法，然后将「没用到」的参数放入「黑洞」消耗掉，这样也可以解决多个返回值的问题。

2. 常量折叠

   ```java 
   @Benchmark
   public double foldedConstant() {
       int x = Math.PI;    // 同理：int x = 8; 或 int y = x + 8;
       return Math.log(x); // 实际是这样： return 1.1447298858494002;
   }
   ```

   上面的错误示例代码中，编译器会将可预知的变量直接替换为常量（包括常量传播），这样在跑基准测试时，完全无需计算，基准结果也是恒定的。要避免很简单，将变量放入状态内中，然后基准方法入参传入：

   ```java
   @State(Scope.Benchmark)
   public static class Log {
       public int x = Math.PI;
   }
    
   @Benchmark
   public double log(Log input) {
        return Math.log(input.x);
   }
   ```

3. 方法内联

   这也是 JIT 对代码的优化，在运行时将热点方法直接「合并」入其调用方法的内部（有可能也不会，根据方法体大小），减少调用调用栈提升性能。判断是否为热点方法由 JVM 的一个参数决定：

   > -XX:CompileThreshold=10000 		// client 模式默认：1500，server 模式默认：10000

   如果要控制 JIT 行为，可以通过这个注解关闭方法内联：`@CompilerControl(CompilerControl.Mode.DONT_INLINE)` 以此来看其对性能的影响。

4. 测试方法隔离

   由于 JVM 存在基于性能分析的优化（ [Profile-guided optimization](https://en.wikipedia.org/wiki/Profile-guided_optimization) ），多个测试方法会由于 JVM 合并性能分析（ Profiling ）导致单个测量结果不准。为了解决这个问题， `@Fork` 可标示测试需要的隔离进程数，每份 fork 出的测试方法都在独立 JVM 进程中执行。只要不是 `@Fork(0)`（甚至不使用[^process]），JMH 默认都是隔离的，此外该注解还能传入 JVM 参数。具体可参看[这个例子](https://hg.openjdk.java.net/code-tools/jmh/file/b6f87aa2a687/jmh-samples/src/main/java/org/openjdk/jmh/samples/JMHSample_12_Forking.java)。除此之外，使用多个隔离进程也能帮助得到更精准的结果[^fork]。

5. 循环优化

   同样 JIT 会对循环做优化（关键字：loop unwinding/unrolling），结合 OSR（On Stack Replacement[^osr]）技术对循环优化后得到的基准结果往往是让人意想不到的。OSR 同样有个 JVM 参数控制：（讲真，这已超出我的理解范围）

   > -XX:+UseOnStackReplacement

   要避免陷入这类陷阱，建议：

   - 在有循环的基准测试方法上使用 `@OperationsPerInvocation`；

   - 使用 `@Param` 的方式替换掉不必要的循环；

   - 尽一切可能不用循环。

   

## 集成

### IntelliJ

在 IntelliJ 中使用时，务必像使用 Lombok 那样，在设置中打开 Annotation Processors。

另外，你还可以装上使用[插件](https://github.com/artyushov/idea-jmh-plugin)，能将 `@Benchmark` 注释的方法，像单元测试那样单独执行，光标移至方法名或类名，然后 `Ctrl` + `R` 或 `Ctrl` + `Shift` + `R` 运行。也可以快速生成 `@Benchmark` 方法（`Ctrl/Cmd` + `N`）。

### Jenkins

Jenkins 也可以通过相应[插件](https://github.com/brianfromoregon/jmh-plugin)集成，配置成  JSON 导出测试报告（CSV 格式也支持），还可通过 `d3.js` 做可视化展示。

还有一些在线可视化服务：[JMH Visual Chart](https://deepoove.com/jmh-visual-chart/)，[JMH Visualizer](https://jmh.morethan.io/)。



## Sum-up

测试，并非只是测试人员需要关注的内容，开发人员在优化自己代码时，往往需要数据做支撑，不能凭空想象实际使用场景。借以 JMH 来测量代码在实际运行场景时的性能基准数据，以此为依据，再做有依据的针对性优化。JMH 本身的使用很类似于 JUnit ，但基准测试代码的编写涉及到较多 JVM 知识，若未掌握很容易在编写时陷入 JMH 的陷阱中，得到不精准，甚至错误的结论。如果仍有兴趣，可以参看这些链接[^guide1][^guide2][^guide3][^guide4][^guide5]，亦可参看官方代码样例[^example]，或 Kafka 的基准测试模块[^kafka]。

最后引述 Oracle 官网一篇介绍 JMH 文章[^pitfalls]的一句话来表达我的观点：

> Microbenchmarks are very peculiar, since stressing a small portion of code does not preclude what actually happens to that code when it is part of a larger application.

JMH 确实能提供细粒度的性能测试，但这一切的前提是，项目对性能极其的敏感，或者某部分代码急需优化（常规优化手段已无法解决性能需求），不然花费大力气将某块代码的运行时间缩减了几十毫秒，还不如费点心思去提高可读性/可维护性/可扩展性。



[^official]: [JMH official site](https://hg.openjdk.java.net/code-tools/jmh)
[^pitfalls]: [Avoiding Benchmarking Pitfalls on the JVM](https://www.oracle.com/technical-resources/articles/java/architect-benchmarking.html)
[^timeout]: [JMH Timeout doesn't interrupt](https://stackoverflow.com/questions/50003967/jmh-timeout-doesnt-interrupt)
[^score]: [JMH: What does the score value mean?](https://stackoverflow.com/questions/24928922/jmh-what-does-the-score-value-mean)
[^process]: [JMH processes](https://stackoverflow.com/a/42703468/8140523)

[^fork]: [What is the purpose of JMH @Fork?](https://stackoverflow.com/a/35147232/8140523)

[^asym]: [Understanding asymmetric in jmh](https://stackoverflow.com/questions/40259005/understanding-asymmetric-in-jmh)
[^osr]: [Differences between Just in Time compilation and On Stack Replacement](https://stackoverflow.com/questions/9105505/differences-between-just-in-time-compilation-and-on-stack-replacement)
[^2]: [Performance measurement with JMH – Java Microbenchmark Harness](https://blog.codecentric.de/en/2017/10/performance-measurement-with-jmh-java-microbenchmark-harness/)
[^3]: [Microbenchmarking Comes to Java 9](https://dzone.com/articles/microbenchmarking-comes-to-java-9)
[^guide1]: [Microbenchmarking with Java](https://www.baeldung.com/java-microbenchmark-harness)
[^guide2]: [JMH - Java Microbenchmark Harness](https://tutorials.jenkov.com/java-performance/jmh.html#why-are-java-microbenchmarks-hard)
[^guide3]: [Testing your code performance with JMH tool](https://blog.aspiresys.pl/technology/testing-code-performance-jmh-tool/)
[^guide4]: [JAVA 拾遗 — JMH 与 8 个测试陷阱](https://www.cnkirito.moe/java-jmh/)

[^guide5]: [Java 微基准测试框架 JMH](https://www.xncoding.com/2018/01/07/java/jmh.html)
[^example]: [JMH official code example](https://hg.openjdk.java.net/code-tools/jmh/file/tip/jmh-samples/src/main/java/org/openjdk/jmh/samples/)
[^kafka]: [Kafka JMH module](https://github.com/apache/kafka/tree/trunk/jmh-benchmarks)


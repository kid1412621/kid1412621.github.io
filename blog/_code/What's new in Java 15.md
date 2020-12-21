---
date: 2020-12-20
tags:
  - backend
  - java
  - translate
---

# Java 15 都更新了什么

> 本译文已获取作者许可后翻译、发布。
>
> 原文：[What's new in Java 15](https://www.baeldung.com/java-15-new)

## 1. 引言

Java 15 作为 JDK 平台下一个短期发行版[^1]，在 2020 年 9 月已进入普遍可用（GA）阶段。该版本基于早期版本一些功能的同时，也提供了一些新的改进。

**在本文中，我们将一同探讨 Java 15 所提供的一些新特性**，以及 Java 开发者可能感兴趣的一些变动。

## 2. 记录类 (JEP[^2] 384)

**记录类是 Java 类型（class）系统中一个新的种类（type），可以用于更容易地创建不可变对象。**

在 Java 14 的版本中，就作为早期预览特性[^3][引入](https://www.baeldung.com/java-record-keyword)，Java 15 中旨于在其成为正式特性前做[一些改进](https://openjdk.java.net/jeps/384)。

接下来我们看下使用当前版本 Java 代码的例子，以及使用了记录类的样例代码。

### 2.1 未使用记录类

早于记录类引入的时候，我们定义一个不可变的 DTO 可能这么写：

```java
public class Person {
    private final String name;
    private final int age;

    public Person(String name, int age) {
        this.name = name;
        this.age = age;
    }

    public String getName() {
        return name;
    }

    public int getAge() {
        return age;
    }
}
```

可见为了创建一个仅仅是保持状态的不可变对象写了很多代码。所有的成员变量都显式地声明为 final 的，并定义了一个含参构造函数，然后为每一个成员变量定义一个访问方法。在某些情况下，我们甚至可能会将这个类本身声明为 final 的，以防止被继承。

在大多数情况下，我们还会覆写 toString 方法以便在打印日志的时候是有意义的输出。我们还可能会覆写 equals 和 hashCode 方法，来避免在比较这些对象时会产生意料之外结果。

### 2.2 使用记录类

如果我们使用记录类来定义同样一个不可变对象，代码可以更紧凑：

```java
public record Person(String name, int age) {
}
```

我们可以看到一些变化。首先，**类定义的语法有了一个专门的关键字**。定义入参的地方正是我们定义记录类成员变量的地方。

这么声明编译器能推断出记录类的内部成员变量。这也就意味着我们不再需要定义成员变量及其访问方法，因为它们都默认提供了。再者，我们也不需要单独定义构造器。

此外，编译器也提供了 toString、equals 和 hashCode 方法这些实用的实现。

在记录类消除了很多样板代码的同时，**也允许我们覆写一些编译器的默认行为**。比如，我们可以定义一个范式构造器[^4]来做一些校验：

```java
public record Person(String name, int age) {
    public Person {
        if(age < 0) {
            throw new IllegalArgumentException("Age cannot be negative");
        }
    }
}
```

值得一提的是，记录类确实有一些限制。它们总是 final 的，它们不能声明为 abstract 的，也不能使用 [native 方法](https://www.baeldung.com/java-native)。

## 3. 封闭类 (JEP 360)

当前，**Java 没有针对继承提供细粒度的控制**。现有的 public、protected、private 权限访问符，以及默认的包私有权限，都是十分粗粒度的。

为此，[封闭类](https://openjdk.java.net/jeps/360)的目的就是为了让各个类声明哪些类可以成为其子类型（sub-types）。这也同样适用于接口，限定可以实现它们的类型。

封闭类涉及两个关键字：*sealed* 和 *permits* ：

```java
public abstract sealed class Person
    permits Employee, Manager {
 
    //...
}
```

在这个例子中，我们声明了一个叫 Person 的抽象类。我们还可以限制仅仅只有 Employee 和 Manager 可以继承这个类。继承封闭类就像当今继承普通类一样，只需要使用 extends 关键字：

```java
public final class Employee extends Person {
}

public non-sealed class Manager extends Person {
}
```

值得注意的是，**任何继承封闭类的子类，其本身必须是被声明为 sealed、non-sealed 或 final 的**。这样是为了确保类继承的层级是有限的，能被编译器获知。

**这种有限且详尽的继承关系是使用封闭类的一大益处**。来举个例子实际看下：

```java
if (person instanceof Employee) {
    return ((Employee) person).getEmployeeId();
} 
else if (person instanceof Manager) {
    return ((Manager) person).getSupervisorId();
}
```

若没有封闭类，**编译器不能推断出是否所有可能的子类都被涵盖**到 if-else 语块中。没有最后的 else 语块，编译器可能报出警告说我们的逻辑没有涵盖所有的情况。

## 4. 隐藏类 (JEP 371)

这个叫做[隐藏类](https://openjdk.java.net/jeps/371)的新特性在 Java 15 被引入。虽然绝大多数开发者被不能从中直接获益，但与动态字节码或 JVM 语言打交道的人会发现其十分有用。

**隐藏类的目的是为了允许在运行时创建类而不被发现**。这意味着，这些类不会被链接到其它类，也不能通过[反射](https://www.baeldung.com/java-reflection)来找到。一般来说，这些类具有较短的生命周期，旨于在类加载和卸载的时候均为高效。

值得注意的是，当前版本的 Java 允许创建和隐藏类相似的匿名类。但这是依赖于 [Unsafe](https://www.baeldung.com/java-unsafe) API 。隐藏类没有这样的依赖。

## 5. 类型检查的模式匹配 (JEP 375)

[模式匹配](https://openjdk.java.net/jeps/375)作为预览功能在 Java 14 中就被引入，在 Java 15 中仍然是预览状态，没有新增改进。

此特性被设计的目的是为了消除由 *instanceof* 操作符带来的样板代码：

```java
if (person instanceof Employee) {
    Employee employee = (Employee) person;
    Date hireDate = employee.getHireDate();
    //...
}
```

这是 Java 中很常见的模式。每当我们需要检查一个变量是否为某个类型的时候，几乎总是在后面跟随显式的类型转换。

这个模式匹配特性通过引入一个新的绑定变量来简化了上面提及的问题：

```java
if (person instanceof Employee employee) {
    Date hireDate = employee.getHireDate();
    //...
}
```

注意我们是如何提供这个新的变量名 —— employee ，同时又兼顾了类型检查。如果类型检查的结果为 true ，JVM 就会自动为我们转化类型，并赋值。

我们还可以将绑定变量和条件判断语句结合起来：

```java
if (person instanceof Employee employee && employee.getYearsOfService() > 5) {
    //...
}
```

在未来的 Java 版本中，计划是将模式匹配延伸到其它特性中，比如 *switch* 。

## 6. 堆外内存 API  (JEP 383)

[堆外内存访问](https://openjdk.java.net/jeps/383)在 Java 14 中已经作为孵化特性存在。在 Java 15 中，继续维持孵化状态的同时，增加一些新特性：

- 一个新的 *VarHandle* API ，用于自定义访问器的变量句柄
- 支持通过 *Spliterator* 接口对内存段进行并行处理
- 增强对内存映射段的支持
- 增加对如 native 调用等内存地址的操作或取消引用支持

堆外内存一般指在 JVM 堆以外管理的内存。因此，不受垃圾回收管理，一般会占用很大一段内存。

虽然这些新的 API 不能直接影响绝大多数开发者，但其对于处理对外内存的第三方类库十分有价值。这包括分布式缓存、非范式文档储存、较大任意字节缓冲器、内存映射文件等等。

## 7. 垃圾回收

在 Java 15 中，[ZGC](https://www.baeldung.com/jvm-zgc-garbage-collector)（JEP 377）和 Shenandoah（JEP 379）都不再是实验特性。都将支持配置选用，以前的 G1 会继续保持为默认回收器。

此前它们支持使用实验特性标记来使用。这样可以让开发者无需单独下载 JDK 或插件，就能尝试新的垃圾回收器，提交反馈。

关于 [Shenandoah](https://openjdk.java.net/jeps/379) 有点需要注意：所有提供商 JDK 版本[^5]都不自带，尤其 Oracle JDK 也不包含。

## 8. 其它变化

Java 15 还有其它一些值得注意的变化。

经过在 Java 13 和 Java 14 中几轮预览，[文本块](https://www.baeldung.com/java-text-blocks)将在 Java 15 中作为产品特性被完全支持。

[有用的空指针异常](https://www.baeldung.com/java-14-nullpointerexception)，最初在 Java 14 中 JEP 358 被引入，现在被默认开启。

遗留的 *DatagramSocket* API 被重写。这是 Java 14 中 *Socket* API 重写的后续。大多数开发者不会受其影响，但它是 [Project Loom](https://www.baeldung.com/openjdk-project-loom) [^6]的先决条件。

同样值得一提，Java 15 包括了对爱德华兹曲线数字签名算法。EdDSA 是一个现代的椭圆曲线签名方案，相较于 JDK 中现存的签名方案有很多优势。

最后，很多事物在 Java 15 中被废弃。偏向锁、Solaris/SPARC 系统移植、RMI 调用都被移除或已计划在未来某个版本中移除。

最初在 Java 8 中引入的 Nashorn JavaScript 引擎现被移除。随着 GraalVM 及其它 VM 技术的引入，Nashorn 已失去在 JDK 生态中的地位。

## 9. 总结

Java 15 基于前续版本的若干特性构建，包括记录类、文本块、新的垃圾回收算法等等。**同时提供了包括封闭类、隐藏类在内的预览特性**。

由于 Java 15 不是长期支持版本，其支持周期将于 2021 年 3 月结束。同时我们能期待 Java 16 ，以及紧随其后的长期支持版本 Java 17。



---

[^1]: short-term release 或 non-LTS release ，相较于 LTS 而言，会在下一个版本发布后终止支持，一般每 6 个月作为迭代周期；LTS 一般迭代周期 3 年，支持周期长达约十年，译者注
[^2]: JEP, JDK Enhancement Proposal, JDK 改进提议，JDK 的重大修改/特性几乎都以此提出，类似于 ECMA 的 [TC39 Proposal](https://github.com/tc39/proposals) ，译者注；

[^3]: Java 非最终特性分为三个类型：预览（Preview）特性旨在提供 JavaSE 的新特性预览，以收集开发者反馈，此阶段的特性可能会在未来版本中发生变化，一般经过两轮预览版本后，会「转正」成为永久（Permanent）特性；实验（Experimental）特性主要是针对 HotSpot JVM 的功能，最终会成为产品（Production）特性；孵化（Incubating）特性涵盖一些在日后可能成为标准的潜在 API 或 JDK 工具，一般在 jdk.incubator 命名空间下。[参考链接](https://blogs.oracle.com/javamagazine/the-role-of-previews-in-java-14-java-15-java-16-and-beyond)，译者注

[^4]: canonical constructor，翻译[参照](https://en.wikipedia.org/wiki/Canonical_form)
[^5]: [List of Java virtual machines](https://en.wikipedia.org/wiki/List_of_Java_virtual_machines)，译者注
[^6]: Java 原生的协（纤）程，译者注
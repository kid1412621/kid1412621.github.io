---
date: 2021-03-07
tags:
  - backend
  - java
  - translation
---

# Java 9 到 15 的语言特性更新

> 本译文已获取作者许可后翻译、发布。
>
> 原文：[New language features since Java 8 to 15（Enhancements to the Java language you should know）](https://advancedweb.hu/new-language-features-since-java-8)

当 Java 8 引入流和 Lambda 这两个重大更新时，函数式编程风格赋予了 Java 更少模板代码的语法。虽然最近的版本更新没添加这么富有影响的特性，但带来了很多较小的改进。



## 目录

**Java 15**

- [文本块](#文本块)
- [包含有用信息的空指针异常](#包含有用信息的空指针异常)

**Java 14**

- [Switch 表达式](#switch-表达式)

**Java 11**

- [局部变量类型推断](#局部变量类型推断)

**Java 9**

- [接口中允许私有方法](#接口中允许私有方法)
- [匿名内部类的钻石操作符](#匿名内部类的钻石操作符)
- [try-with-resources 语句中允许使用 effectively-final 变量](#try-with-resources-语句中允许使用-effectively-final-变量)
- [下划线不再是合法变量名](#下划线不再是合法变量名)
- [改进的警告](#改进的警告)

**[接下来还什么更新: Java 15 中的预览特性](#接下来还什么更新-java-15-中的预览特性)**

- [记录类](#记录类)
- [instanceof 的模式匹配](#instanceof-的模式匹配)
- [封闭类](#封闭类)

想要一览塑造这个新平台所有的 JEP[^1]，其涵盖了包括 API 、性能与安全方面的改进，参看这份[精选清单：Java 8 以来所有的改进](https://advancedweb.hu/a-categorized-list-of-all-java-and-jvm-features-since-jdk-8-to-15/)。



## 文本块

**开始支持版本：** [`JDK 15`](https://openjdk.java.net/jeps/378) ( [`JDK 13`](https://openjdk.java.net/jeps/355)  [`JDK 14`](https://openjdk.java.net/jeps/368) 为预览特性)

相较于其它现代编程语言，在 Java 中编写多行字符串是臭名昭著的麻烦：

```java
String html = "";
html += "<html>\n";
html += "  <body>\n";
html += "    <p>Hello, world</p>\n";
html += "  </body>\n";
html += "</html>\n";

System.out.println(html);
```

为改进这种情况，更加利好程序员，Java 15 引入了多行字符串字面量，叫做文本块：

```java
String html = """
          <html>
            <body>
              <p>Hello, world</p>
            </body>
          </html>
          """;

System.out.println(html);
```

它们和之前旧的字符串字面量相似，但它们**换行和引号都不需要转义**。

文本块开始于 `"""`，后面紧跟换行，最后也以 `"""` 结尾。结尾标记可以放在最后一行，也可以像上面的例子新起一行。

它们可以用在任何之前旧的字符串字面量能使用的地方，都同样产生 String 对象。

源代码中的每个换行的地方都会产生一个 `\n` 字符。

```java
String twoLines = """
          Hello
          World
          """;
```

这样可以避免每行以 `\` 字符结尾，对于那些太长以至于不得不换行的字符串来说，保持其代码可读性十分有帮助。

```java
String singleLine = """
          Hello \
          World
          """;
```

文本段可以和相邻的 Java 代码对齐，因为**意外的缩进会被自动移除**。编译器会检查每行用于缩进的空格，找到缩进最少的行，然后将每行都转化为这个相同的最少缩进。

这就意味着如果结尾的 `"""` 是在一个单独的行，转变结尾标记到左边会导致缩进增加。

```java
String noIndentation = """
          First line
          Second line
          """;

String indentedByToSpaces = """
          First line 
          Second line
        """;
```

开头的 `"""` 不会影响缩进移除，所以文本块没有必要和其对齐。例如，下面的例子将产生相同的缩进：

```java
String indentedByToSpaces = """
         First line 
         Second line
       """;

String indentedByToSpaces = """
                              First line 
                              Second line
                            """;
```

`String` 类通用也可以通过编程式的方法来处理缩进。`indent` 方法接收一个整数作为入参，相应的返回一个新的，特定缩进级别的字符串；与之对应的，`stripIndent` 方法返回一个移除源内容所有缩进的字符串。

文本块不支持插值，这个功能我十分期待。JEP 表示在未来的版本中会考虑，但到那之前，我们可以使用 `String::formatted` 或 `String::format`：

```java
var greeting = """
    hello
    %s
    """.formatted("world");
```

参考来源[^2]：

- [Programmer’s Guide To Text Blocks](https://cr.openjdk.java.net/~jlaskey/Strings/TextBlocksGuide_v11.html)
- [Definitive Guide To Text Blocks In Java 13](https://nipafx.dev/java-13-text-blocks#)
- [Java Text Blocks - Bealdung](https://www.baeldung.com/java-text-blocks)

### ⚠️ 技巧：保留结尾空格

在文本块的结尾空格会被忽略掉。这通常不是问题，除非在特定的场景，比如在单元测试时一个方法的执行结果需要和一个基准值做比较。

如果是需要考虑这些的场景时，这行结尾需要添加 `\s` 或 `\t`，而不是空格或者是制表符。

### ⚠️ 技巧：正确处理 Windows 的换行符

[换行](https://en.wikipedia.org/wiki/Newline)在 Unix 和 Windows 下有着不同的控制符。前者使用单一的换行符（`\n`），而后者多使用了回车符（`\r\n`）。

然后不论你是用什么操作系统，或者在源码中使用什么换行符，文本块都会使用单一的 `\n` 来换行，这可能会导致兼容性问题。

```java
Files.writeString(Paths.get("<PATH_TO_FILE>"), """
    first line
    second line
    """);
```

如果使用一个仅兼容 Windows 换行符的软件（如 Notepad）打开这样的文件，会单单只显示一行。如果你旨在兼容 Windows 系统，请确保使用正确的换行符，比方说使用 `Stirng::replace` 来替换每一个 `"\n"` 字符为 `"\r\n"`。

### ⚠️ 技巧：关注缩进的一致性

文本块在任意类型的缩进下都能胜任：制表符、空格或者两者混用。但每行使用一致的缩进很重要，否则意外的缩进不会被移除。

大多数文本编辑器都提供了自动格式化，且在你敲击回车键时会自动添加缩进。使用最新版本的编辑器来确保它们能正确处理文本块，还有就是避免使用错误的缩进。



## 包含有用信息的空指针异常

**开始支持版本：**[`JDK 15`](https://bugs.openjdk.java.net/browse/JDK-8233014) ([`JDK 14`](https://openjdk.java.net/jeps/358) 中使用 `-XX:+ShowCodeDetailsInExceptionMessages` 开启)

这个特性不能算做真正意义的语言特性，但它很棒以至于我想将它加到这份清单中。

一般来说，遇到一个 `NullPointerException` 是这样的：

```java
node.getElementsByTagName("name").item(0).getChildNodes().item(0).getNodeValue();

Exception in thread "main" java.lang.NullPointerException
        at Unlucky.method(Unlucky.java:83)
```

这个例子中，异常信息中很难看出是哪个方法返回了空。因此很多开发者常常将这样的语句改写为多行，来排查到底是哪一行代码导致了空指针异常。

从 Java 15 开始，再也没必要这样做了，NPE 会描述出这条语句的哪个部分为空。（在 Java 14 中你也可以通过 `-XX:+ShowCodeDetailsInExceptionMessages` 标记来开启这个特性）

```
Exception in thread "main" java.lang.NullPointerException:
  Cannot invoke "org.w3c.dom.Node.getChildNodes()" because
  the return value of "org.w3c.dom.NodeList.item(int)" is null
        at Unlucky.method(Unlucky.java:83)
```

（[参看 Github 上这个示例项目](https://github.com/dodie/java-helpful-npe-demo)）

详细的信息包含了不能被执行的步骤（无法调用 `getChildNodes`），及其失败原因（`item(int)` 为空），这大大简化了定位问题根源。

总体上来说，**这个特性有助于调试，同样也对代码可读性有提升**，从此你又失去了一个牺牲代码可读性的技术原因。

有用信息的空指针异常扩展是在 JVM 层面实现的，这也就是说，即使你的代码编译为较老的 Java 版本也同样能受益，而且当你使用其它 JVM 语言，例如 Scala 或 Kotlin 也一样。

值得注意的是，**并非所有的空指针异常都能得到这些额外的信息，仅仅是被 JVM 创建并抛出的才行**：

- 读取或写入一个成员变量为空时
- 调用一个方法为空时
- 获取或赋值一个数组元素为空时（索引信息**不在**错误信息中）
- [包装类开箱](https://docs.oracle.com/javase/tutorial/java/data/autoboxing.html) 为空时

另外值得注意的是，这个特性**不支持序列化**。比如，当一个空指针异常被通过 RMI 方式的远程调用，异常信息里不会包含有用信息。

当前**有用信息的空指针这一特性默认关闭**，必须加上 `-XX:+ShowCodeDetailsInExceptionMessages` 标记来手动开启。

### ⚠️ 技巧：检查你的工具链

当你升级到 Java 15 时，检查你的应用和基础设施并确保以下几点：

- 大小写敏感到变量命名不会出现在日志文件和网页服务器响应中
- 日志分析工具能处理新的消息格式
- 构建额外细节的额外开销是有必要的



## Switch 表达式

**开始支持版本：** [`JDK 14`](https://openjdk.java.net/jeps/361) ([`JDK 12`](https://openjdk.java.net/jeps/325) [`JDK 13`](https://openjdk.java.net/jeps/354) 中为预览特性)

久远的 `switch` 关键字在 Java 14 中获得了一次大提升。Java 在保持支持久的 [switch 语句](https://docs.oracle.com/javase/tutorial/java/nutsandbolts/switch.html) 功能特性的同时，也添加了 **swith 表达式**[^3]的语法支持：

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

最重大的差别是，这个新的语法形式能作为表达式使用。从上面的例子中可见，这可用于变量赋值，且可以用在任何接受表达式的地方：

```java
int k = 3;
System.out.println(
    switch (k) {
        case  1 -> "one";
        case  2 -> "two";
        default -> "many";
    }
);
```

然而，switch 表达式和 switch 语句之间存在一些细微的差别。

首先，switch 表达式**不存在击穿（fall-through）的情况**。这样再也不会因缺失 `break` 关键字而产生缺陷了。为了避免有使用击穿的需求，**每个 `case` 可以定义多个常量**，以逗号分割。

其次，每一个 `case` 有其自己的作用域。

```java
String s = switch (k) {
    case  1 -> {
        String temp = "one";
        yield temp;
    }
    case  2 -> {
        String temp = "two";
        yield temp;
    }
    default -> "many";
}
```

每个分支要么是一条单独的表达式，要么是由包裹在一个语块中的多条语句组成。

再者，**switch 表达式必须涵盖所有的分支条件**。这就意味着对于字符串类型、基本类型以及它们的包装类来说，`default` 的情况必须指明。

```java
int k = 3;
String s = switch (k) {
    case  1 -> "one";
    case  2 -> "two";
    default -> "many";
}
```

对于枚举的话，要么 `defualt` 需要声明，要么显式的声明出所有情况。后者的话是最佳实践，能确保所有的值都被考虑到了。当给枚举中添加一个新值时，用到它作为 switch 表达式的地方都会报出编译错误。

```java
enum Day {
   MONDAY, TUESDAY, WEDNESDAY, THURSDAY, FRIDAY, SATURDAY, SUNDAY
}

Day day = Day.TUESDAY;
switch (day) {
    case  MONDAY -> ":(";
    case  TUESDAY, WEDNESDAY, THURSDAY -> ":|";
    case  FRIDAY -> ":)";
    case  SATURDAY, SUNDAY -> ":D";
}
```

鉴于以上所有原因，更偏向于使用 switch 表达式而不是 switch 语句，能利于产出更多可维护的代码。

### ⚠️ 技巧：使用箭头语法

switch 表达式中 `case` 不仅能使用类似于 lambda 表达式中箭头形式，还能配合 `yeild` 关键字**使用类似于以往 switch 语句中的冒号形式**：

```java
int result = switch (s) {
    case "foo":
    case "bar":
        yield 2;
    default:
        yield 3;
};
```

这种形式也能被用作一个表达式，但这更类似于以往的 switch 语句，因为：

- 击穿
- 所有分支共享一个作用域

我的意见？不要使用这种形式，而是使用箭头形式的 switch 表达式，这样能获取所有好处。



## 局部变量类型推断

**开始支持版本：** [`JDK 11`](https://openjdk.java.net/jeps/323) ([`JDK 10`](https://openjdk.java.net/jeps/286) Lambda 中不支持)

自从 Java 8 之后最显著的语言特性改进可能是 `var` 关键字。这最初是在 [Java 10](https://openjdk.java.net/jeps/286) 中引入的，随后在 [Java 11](https://openjdk.java.net/jeps/323) 中得到进一步改进。

通过省略显式的类型声明，这个特性帮助我们简化了局部变量声明的繁文缛节：

```java
var greetingMessage = "Hello!";
```

虽然看起来像 Javascript 中的 `var` 关键字，但这**并非是动态类型**。

来看下这段来自 JEP 的引述：

> > > 我们旨在简化 Java 代码编写中的繁文缛节，来提升开发者的编程体验，并保持 Java 作为静态类型安全语言的承诺。

声明变量的类型是**在编译时推断的**。在上面的例子中其类型是字符串。使用 `var` 而不是显式的类型，能使这块代码不那么臃肿，也更易读。

这是另一个类型推断能发挥优势的例子：

```java
MyAwesomeClass awesome = new MyAwesomeClass();
```

在很多的情况下，这个特性确实能提升代码质量。但有时候继续使用显式的类型声明反而是更推崇的。我们来看几个使用 `var` 替换类型声明导致问题的例子。

### ⚠️ 技巧：时刻想着可读性

第一个情形是，当在源码中移除显式的类型信息，会影响可读性。

当然，IDE 能在这方面起到一定帮助，但是在代码评审，或快速浏览代码时这就会有影响。例如，在工厂模式或构造者模式中，你不得不找到负责构建对象的代码，才能推断出其类型。

来点小测试，下面的代码片段使用了 Java 8 中的日期时间 API，猜下这些变量的类型：

```java
var date = LocalDate.parse("2019-08-13");
var dayOfWeek = date.getDayOfWeek();
var dayOfMonth = date.getDayOfMonth();
```

猜完了吗？这是答案：

第一个变量十分直观，`parse` 方法返回了 `LocalDate` 对象。然而，接下来两个，你需要对 API 更了解： `dayOfWeek` 方法返回的是 `java.time.DayOfWeek`，但 `dayOfMonth` 仅仅是返回了 `int`。

还有个潜在问题，遇到 `var` 时，代码阅读者不得不更依赖于上下文。想象下这个例子：

```java
private void longerMethod() {
    // ...
    // ...
    // ...

    var dayOfWeek = date.getDayOfWeek();

    // ...
    // ...
    // ...
}
```

基于之前对例子，你可能会猜是 `java.time.DayOfWeek` 。但这个例子中的 `date` 对象是 Joda 库中的，所以返回的是整型。这是个不同的 API，同样的方法但有所差池，在较长的方法体中，若没看完每行代码，会导致你看不出差异。(JavaDoc: [Joda time](https://www.joda.org/joda-time/apidocs/org/joda/time/ReadableDateTime.html#getDayOfWeek--) / [Java 8 Date/Time API](https://docs.oracle.com/javase/8/docs/api/java/time/LocalDate.html#getDayOfWeek--))

如果这儿有显式的类型声明，弄清 `dayOfWeek` 对象是什么类型就很容易。现在有了 `var` ，读者首先得找出 `date` 对象的类型，还要搞清 `getDayOfWeek` 方法做了什么。要是有一个 IDE，这一切都很轻松，但是仅仅是快速浏览代码，这就没那么容易了。

### ⚠️ 技巧：注意保留重要的类型信息

第二个情形是，使用 `var` 消除了所有可用的类型信息，甚至导致无法被推断。在绝大多数情形下，这些问题能被 Java 编译器捕获。比如，`var` 不能针对 lambda 和方法引用进行推断，因为编译器依赖于表达式左边的声明来确定类型。

然而，存在一些例外情况。例如，`var` 不能和钻石运算符很好的搭配使用，后者能移除在创建泛型对象时右侧表达式冗长的语法：

```java
Map<String, String> myMap = new HashMap<String, String>(); // Pre Java 7
Map<String, String> myMap = new HashMap<>(); // Using Diamond operator
```

由于钻石操作符仅和泛型有关，这就还有语法上的冗余能被移除。我们来用 `var` 关键字使它看起来更简洁：

```java
var myMap = new HashMap<>();
```

这个例子语法上是可行的，在 Java 11 中编译器甚至不会报出警告。然而，我们完全不指定泛型类型，类型推断会给出 `Map<Object, Object>` 的结果。

当然，我们能替换掉钻石操作符来轻松的解决这个问题：

```java
var myMap = new HashMap<String, String>();
```

`var` 和基础类型使用的时候还有另一系列问题：

```java
byte   b = 1;
short  s = 1;
int    i = 1;
long   l = 1;
float  f = 1;
double d = 1;
```

在没有显式类型声明的情况下，上面的所有变量都会被推断为整型。在处理基本类型时，要么使用类型字面量（比如 `1L`），要么就完全避免使用 `var` 。

### **⚠️ 技巧：确保阅读官方的代码风格指南**

什么时候使用类型推断完全取决于你，但确保它不会影响可读性和正确性。经验之谈，保持一个良好的编程实践，比如不错的命名和缩小局部变量的作用域肯定是很有帮助的。确保阅读官方针对 `var` 的[代码风格指南](https://openjdk.java.net/projects/amber/LVTIstyle.html)和[常见问题](https://openjdk.java.net/projects/amber/LVTIFAQ.html)。

由于 `var` 有很多坑，最好在把它引入到代码中时保守些，也仅仅在局部变量中使用它，这样它的作用域也十分局限。

同时，在引入时也尽量谨慎些，**`var` 不是一个新的关键字，而是一个保留类名**。这意味着当用作类名时有特殊含义，在任何地方其都作为合法的引用。

当前，`var` 还没有相应的单一「关键字」来声明不可变变量（比如 `val` 或 `const`）。希望未来的版本中会支持，在那之前，我们可以使用 `final var` 。

参考来源：

- [First Contact With ‘var’ In Java 10](https://blog.codefx.org/java/java-10-var-type-inference/)
- [26 Items for Dissecting Java Local Variable Type Inference (Var Type)](https://dzone.com/articles/var-work-in-progress)
- [Java 10: Local Variable Type Inference](https://www.journaldev.com/19871/java-10-local-variable-type-inference)



## 接口中允许私有方法

**开始支持版本：** [JDK 9](https://openjdk.java.net/jeps/213) ([Milling Project Coin](http://openjdk.java.net/jeps/213))

从 Java 8 开始，在接口中添加默认方法成为可能。到 Java 9 中，默认方法甚至能调用私有方法，这既满足代码复用的需求，但又不对外暴露相应逻辑。

虽然这不是个大的改进，但这对整理默认方法中的代码小有帮助。



## 匿名内部类的钻石操作符

**开始支持版本：** [JDK 9](https://openjdk.java.net/jeps/213) ([Milling Project Coin](http://openjdk.java.net/jeps/213))

Java 7 引入了钻石操作符（`<>`）来减少冗余，这是通过让编译器推断构造方法的参数类型实现的：

```java
List<Integer> numbers = new ArrayList<>();
```

然而，这个特性之前并不支持匿名内部类。根据 [JDK 项目的邮件列表讨论](http://mail.openjdk.java.net/pipermail/coin-dev/2011-June/003283.html)来看，钻石操作符一开始没有添加此特性是由于这需要 JVM 层面较大的改动。

到 Java 9 时，这个小小的痛点已被解决，钻石操作符更加的通用：

```java
List<Integer> numbers = new ArrayList<>() {
    // ...
}
```



## try-with-resources 语句中允许使用 effectively-final 变量

**开始支持版本：** [JDK 9](https://openjdk.java.net/jeps/213) ([Milling Project Coin](http://openjdk.java.net/jeps/213))

Java 7 带来了另一个语法增强：`try-with-resources` ，帮助开发者解决总是担心释放资源的问题。

为展示它的威力，先看一个先于 Java 7 的正确释放资源示例：

```java
BufferedReader br = new BufferedReader(...);
try {
    return br.readLine();
} finally {
    if (br != null) {
        br.close();
    }
}
```

使用 `try-with-resources` 能自动释放资源，代码量还更少：

```java
try (BufferedReader br = new BufferedReader(...)) {
    return br.readLine();
}
```

尽管它威力强大，但也有短板，Java 9 正好旨在解决它们。

兴许你能用它来处理多个资源，但很容易就会导致代码可读性下降。在 `try` 关键字后声明一长串变量，这稍稍有些违背常规的 Java 代码。

```java
try (BufferedReader br1 = new BufferedReader(...);
    BufferedReader br2 = new BufferedReader(...)) {
    System.out.println(br1.readLine() + br2.readLine());
}
```

还有，在 Java 7 中，如果你有一个已经存在但需要放到这个结构中处理的变量，就不得不引入一个伪变量。（看这例子：[JDK-8068948](https://bugs.openjdk.java.net/browse/JDK-8068948)）

为减少这些负面影响，`try-with-resources` 得到了增强，除了新建变量外，可以处理不可变或实际不可变的局部变量：

```java
BufferedReader br1 = new BufferedReader(...);
BufferedReader br2 = new BufferedReader(...);
try (br1; br2) {
    System.out.println(br1.readLine() + br2.readLine());
}
```

在这个例子中，变量的初始化和其注册到 `try-with-resources` 结构中的步骤已经分离开。

**⚠️ 技巧：当心已释放的资源**

有一点需要警惕在心，已被 `try-with-resources` 释放的资源是可能会被再次引用的，但这几乎都会失败：

```java
BufferedReader br = new BufferedReader(...);
try (br) {
    System.out.println(br.readLine());
}
br.readLine(); // Boom!
```



## 下划线不再是合法变量名

**开始支持版本：** [JDK 9](https://openjdk.java.net/jeps/213) (Milling Project Coin)

[在 Java 8 中](https://bugs.java.com/bugdatabase/view_bug.do?bug_id=8005852)，变量名为下划线（`_`）时编译器会抛出警告。Java 9 更进一步，将单个下划线字符视为非法变量名，保留给未来作为特殊语义做准备：

```java
int _ = 10; // 编译错误
```



## 改进的警告

**开始支持版本：** [JDK 9](https://openjdk.java.net/jeps/211)

最后，我们再说点在较新 Java 版本中关于编译器警告的变化。

现在可以用 `@SafeVarargs` 注解在私有方法上，以标记 `Type safety: Potential heap pollution via varargs parameter` 警告（事实上，这个变化是前面讨论过  [JEP 213: Milling Project Coin](https://openjdk.java.net/jeps/213) 的一部分）。需要了解更多可以参看官方文档，[可变参数](https://docs.oracle.com/javase/8/docs/technotes/guides/language/varargs.html)、[泛型](https://docs.oracle.com/javase/8/docs/technotes/guides/language/generics.html)以及两者结合[可能产生的问题](https://docs.oracle.com/javase/tutorial/java/generics/nonReifiableVarargsType.html)。

还有，自从 [Java 9](https://openjdk.java.net/jeps/211) 以后，编译器不再为引入废弃的类型报出警告。因为这些警告已经在调用的地方展示了，所以没有太多实际有价值的信息，也显得冗余。



## 接下来还什么更新: Java 15 中的预览特性

Java 15 中有三个预览特性，可以通过 `--enable-preview -source 15` 标记来开启。它们很有可能成为下一个 Java 版本更新的特性。这里简短的预告下。

### 记录类

[记录类](https://openjdk.java.net/jeps/359)带来了一种「新的」类型声明，通过简短的语法来创建数据类（data classes）。相较于传统的私有成员变量、getter 和 setter 方法以及构造方法来构建，记录类可以让我们使用更加简短地定义数据结构体（data structures）：

```java
record Point(int x, int y) { }
```

我对它成为一个流行类库和框架都支持的正式特性已经迫不及待了！

### instanceof 的模式匹配

大多数情况下，`instanceof` 都会跟一个显式的类型转换：

```java
if (obj instanceof String) {
    String s = (String) obj;
    // use s
}
```

[JEP 305](https://openjdk.java.net/jeps/305) 扩展了 `instanceof` 关键字，使其在使用时不再那么啰嗦：

```java
if (obj instanceof String s) {
    // use s
}
```

### 封闭类

[JEP 360](https://openjdk.java.net/jeps/360) 改进给 Java 语言添加了封闭类和接口，用于限定哪些类或接口可以被用于继承或实现它们。

```java
public abstract sealed class Shape
    permits Circle, Rectangle {...}

public class Circle extends Shape {...} // OK
public class Rectangle extends Shape {...} // OK
public class Triangle extends Shape {...} // 编译错误
```

这个特性也改善了 switch 表达式。当其使用枚举时，如果可能的值在编译时能确定，且所有分支都有处理，那么不需要定义 default 分支。

```java
double area = switch (shape) {
    case Circle c    -> Math.pow(c.radius(), 2) * Math.PI
    case Rectangle r -> r.a() * r.b()
};
```



## 总结

这篇文章介绍了 Java 8 以后的语言改进。随着新的每 6 个月一次的快速发布周期，更多的变化被引入，保持关注 Java 平台的变化就更加重要了。



[^1]: 译者注：[JDK Enhancement Proposal](http://openjdk.java.net/jeps/0), JDK 改进提议，JDK 的重大修改/特性几乎都以此提出，类似于 ECMA 的 [TC39 Proposal](https://github.com/tc39/proposals)；
[^2]: 这里指的是原文的参考来源，下同
[^3]: 译者注：statement 和 expression 的区别参见：https://stackoverflow.com/questions/39523474/what-is-the-difference-between-an-expression-and-a-statement-in-java


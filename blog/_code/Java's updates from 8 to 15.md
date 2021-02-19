# Java 8 到 15 的更新

> 原文：[New language features since Java 8 to 15（Enhancements to the Java language you should know）](https://advancedweb.hu/new-language-features-since-java-8-to-15/#records)

当 Java 8 引入流和 Lambda 这两个重大更新时，函数式编程的风格赋予了 Java 更少模板代码的语法。虽然最近的版本更新没添加这么富有影响到特性，但带来了很多较小的改进。

~~When Java 8 introduced Streams and Lambdas it was a big change, enabling functional programming style to be expressed with much less boilerplate. While recent versions did not add such impactful features, lots of smaller improvements were made to the language.~~

## Language enhancements after Java 8

**Java 15**

- Text Blocks
  - [Tip: Preserve trailing spaces](https://advancedweb.hu/new-language-features-since-java-8-to-15/#️-tip-preserve-trailing-spaces)
  - [Tip: Produce the correct newline characters for Windows](https://advancedweb.hu/new-language-features-since-java-8-to-15/#️-tip-produce-the-correct-newline-characters-for-windows)
  - [Tip: Pay attention to consistent indentation](https://advancedweb.hu/new-language-features-since-java-8-to-15/#️-tip-pay-attention-to-consistent-indentation)
- Helpful NullPointerExceptions
  - [Tip: Check your tooling](https://advancedweb.hu/new-language-features-since-java-8-to-15/#️-tip-check-your-tooling)

**Java 14**

- Switch Expressions
  - [Tip: Use arrow syntax](https://advancedweb.hu/new-language-features-since-java-8-to-15/#️-tip-use-arrow-syntax)

**Java 11**

- Local-Variable Type Inference
  - [Tip: Keep readability in mind](https://advancedweb.hu/new-language-features-since-java-8-to-15/#️-tip-keep-readability-in-mind)
  - [Tip: Pay attention to preserve important type information](https://advancedweb.hu/new-language-features-since-java-8-to-15/#️-tip-pay-attention-to-preserve-important-type-information)
  - [Tip: Make sure to read the official style guides](https://advancedweb.hu/new-language-features-since-java-8-to-15/#️-tip-make-sure-to-read-the-official-style-guides)

**Java 9**

- [Allow private methods in interfaces](https://advancedweb.hu/new-language-features-since-java-8-to-15/#allow-private-methods-in-interfaces)
- [Diamond operator for anonymous inner classes](https://advancedweb.hu/new-language-features-since-java-8-to-15/#diamond-operator-for-anonymous-inner-classes)
- Allow effectively-final variables to be used as resources in try-with-resources statements
  - [Tip: Watch out for released resources](https://advancedweb.hu/new-language-features-since-java-8-to-15/#️-tip-watch-out-for-released-resources)
- [Underscore is no longer a valid identifier name](https://advancedweb.hu/new-language-features-since-java-8-to-15/#underscore-is-no-longer-a-valid-identifier-name)
- [Improved Warnings](https://advancedweb.hu/new-language-features-since-java-8-to-15/#improved-warnings)

**What’s next: Preview features in Java 15**

- [Records](https://advancedweb.hu/new-language-features-since-java-8-to-15/#records)
- [Pattern Matching for instanceof](https://advancedweb.hu/new-language-features-since-java-8-to-15/#pattern-matching-for-instanceof)
- [Sealed Classes](https://advancedweb.hu/new-language-features-since-java-8-to-15/#sealed-classes)

For an overview of all the JEPs shaping the new platform, including API, performance and security improvements check [the curated list of all enhancements since Java 8](https://advancedweb.hu/a-categorized-list-of-all-java-and-jvm-features-since-jdk-8-to-15/).



## 文本块

**开始支持版本：** [`JDK 15`](https://openjdk.java.net/jeps/378) ( [`JDK 13`](https://openjdk.java.net/jeps/355)  [`JDK 14`](https://openjdk.java.net/jeps/368) 为预览特性)

相较于其它现代编程语言，在 Java 中编写多行字符串是臭名昭著的困难：

~~Compared to other modern languages, in Java it was notoriously hard to express text containing multiple lines:~~

```java
String html = "";
html += "<html>\n";
html += "  <body>\n";
html += "    <p>Hello, world</p>\n";
html += "  </body>\n";
html += "</html>\n";

System.out.println(html);
```

为了将这种情形变得更加的程序员友好，Java 15 引入了多行字符串字面量，叫做文本块：

~~To make this situation more programmer-friendly, Java 15 introduced multi-line string literals called Text Blocks:~~

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

它们和之前旧的字符串字面量很相似，但它们能包含新的一行和不用转义的括号。

文本块开始于 `"""`，后面跟着新的一行，最后也以 `"""` 结尾。结尾标记可以放在最后一行，也可以像上面的例子新起一行。

它们可以用在任何之前旧的字符串字面量能使用的地方，都同样产生 Stirng 对象。

源代码中的每个换行的地方都会产生一个 `\n` 字符。

~~They are similar to the old String literals but they can contain **new lines and quotes without escaping**.~~

~~Text Blocks start with `"""` followed by a new line, and end with `"""`. The closing token can be at the end of the last line or in separate line such as is in the example above.~~

~~They can be used anywhere an old String literal can be used and they both produce similar String objects.~~

~~For each line-break in the source code, there will be a `\n` character in the result.~~

```java
String twoLines = """
          Hello
          World
          """;
```

这样可以避免每行以 `\` 字符结尾，对于那些太长的行以至于不得不分为两行来说，保持代码可读性十分有帮助。

~~This can be prevented by ending the line with the `\` character, which can be useful in case of very long lines that you’d like to split into two for keeping the source code readable.~~

```java
String singleLine = """
          Hello \
          World
          """;
```

文本段可以和相邻的 Java 代码对齐，因为意外的缩进会被自动移除。编译器会检查没行用于缩进的空格，找到缩进最少的行，然后将没行都转化为这个相同的最少缩进。

~~Text Blocks can be aligned with neighboring Java code because **incidental indentation is automatically removed**. The compiler checks the whitespace used for indentation in each line to find the least indented line, and shifts each line to the left by this minimal common indentation.~~

这就意味着如果结尾的 `"""` 是在一个单独的行，转变结尾标记到左边会导致缩进增加。

~~This means that if the closing `"""` is in a separate line, the indentation can be increased by shifting the closing token to the left.~~

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

~~The opening `"""` does not count for the indentation removal so it’s not necessary to line up the text block with it. For example, both of the following examples produce the same string with the same indentation:~~

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

~~The `String` class also provides some programmatic ways to deal with indentation. The `indent` method takes an integer and returns a new string with the specified levels of additional indentation, while `stripIndent` returns the contents of the original string without all the incidental indentation.~~

文本块不支持插值，这个功能我十分期待。JEP 表示在未来的版本中会考虑，但到那之前，我们可以使用 `String::formatted` 或 `String::format`：

~~Text Blocks do not support interpolation, a feature I really miss. As the JEP says it may be considered in the future, and until then we can use `String::formatted` or `String::format`:~~

```java
var greeting = """
    hello
    %s
    """.formatted("world");
```

参考来源[^1]：

- [面向开发者的文本块指南](https://cr.openjdk.java.net/~jlaskey/Strings/TextBlocksGuide_v11.html)
- [Java 13 文本块终极指南](https://nipafx.dev/java-13-text-blocks#)
- [Java 文本块指南 - Bealdung](https://www.baeldung.com/java-text-blocks)

~~Resources:~~

- ~~[Programmer’s Guide To Text Blocks](https://cr.openjdk.java.net/~jlaskey/Strings/TextBlocksGuide_v11.html)~~
- ~~[Definitive Guide To Text Blocks In Java 13](https://nipafx.dev/java-13-text-blocks#)~~
- ~~[Java Text Blocks - Bealdung~~](https://www.baeldung.com/java-text-blocks)



### ⚠️ 技巧：保留结尾空格

在文本块的结尾空格会被忽略掉。这通常不是问题，除非在特定的场景，比如在单元测试时一个方法的执行结果需要和一个基准值做比较。

如果是需要考虑这些的场景时，这行结尾需要添加 `\s` 或 `\t`，而不是空格或者是制表符。

### ~~⚠️ Tip: Preserve trailing spaces~~

~~Trailing spaces in Text Blocks are ignored. This is usually not a problem but in some cases they do matter, for example in context of unit test when a method result is compared to a baseline value.~~

~~If this is the case be mindful about them and if a line ends with whitespace add `\s` or `\t`instead of the last space or tab to the end of the line.~~

### ⚠️ 技巧：正确处理 Windows 的换行符

[换行](https://en.wikipedia.org/wiki/Newline)在 Unix 和 Windows 下有着不同的控制符。前者使用单一的换行符（`\n`），而后者多使用了回车符（`\r\n`）。

然后不论你是用什么操作系统，或者在源码中使用什么换行符，文本块都会使用单一的 `\n` 来换行，这可能会导致兼容性问题。

### ⚠️ Tip: Produce the correct newline characters for Windows

[~~Line endings](https://en.wikipedia.org/wiki/Newline) are represented with different control characters on Unix and Windows. The former one uses a single line feed (`\n`), while the latter uses carriage return followed by line feed (`\r\n`).~~

~~However, regardless to the operating system you choose to use or how you encode new lines in the source code, Text Blocks will use a single `\n` for each new line, which can lead to compatibility issues.~~

```java
Files.writeString(Paths.get("<PATH_TO_FILE>"), """
    first line
    second line
    """);
```

如果使用一个仅兼容 Windows 换行符的软件（如 Notepad）打开这样的文件，会单单只显示一行。如果你旨在兼容 Windows 系统，请确保使用正确的换行符，比方说使用 `Stirng::replace` 来替换每一个 `"\n"` 为 `"\r\n"`。

~~If a tool compatible only with the Windows line ending format (e.g. Notepad) is used to open such a file, it will display only a single line. Make sure that you use the correct control characters if you also target Windows, for example by calling `String::replace` to replace each `"\n"` with `"\r\n"`.~~

### ⚠️ 技巧：关注缩进的一致性

文本块在任意类型的缩进下都能胜任：制表符、空格或者两者混用。但每行使用一致的缩进很重要，否则意外的缩进不会被移除。

大多数文本编辑器都提供了自动格式化，且在你敲击回车键时会自动添加缩进。使用最新版本的编辑器来确保它们能正确处理文本块，再者就是避免使用错误的缩进。

### ~~⚠️ Tip: Pay attention to consistent indentation~~

~~Text Blocks work well with any kind of indentation: tabs spaces or even the mix of these two. It’s important though to use **consistent indentation** for each line in the block, otherwise the incidental indentation can’t be removed.~~

~~Most editors offer autoformatting and automatically add indentation on each new line when you hit enter. Make sure to use the latest version of these tools to ensure they play well with Text Blocks, and don’t try to add wrong indentations.~~



## 包含有用信息的空指针异常 ~~Helpful NullPointerExceptions~~

**开始支持版本：**[`JDK 15`](https://bugs.openjdk.java.net/browse/JDK-8233014) ([`JDK 14`](https://openjdk.java.net/jeps/358) 中使用 `-XX:+ShowCodeDetailsInExceptionMessages` 开启)

这块小宝石不能算做真正意义的语言特性，但它很棒以至于我想将它加到这份清单中。

一般来说，遇到一个 `NullPointerException` 是这样的：

~~**Available since:** [JDK 15](https://bugs.openjdk.java.net/browse/JDK-8233014) (Enabled with `-XX:+ShowCodeDetailsInExceptionMessages` in [JDK 14](https://openjdk.java.net/jeps/358))~~

~~This little gem is not really a language feature, but it’s so nice that I wanted to include it in this list.~~

~~Traditionally, experiencing a `NullPointerException` was like this:~~

```java
node.getElementsByTagName("name").item(0).getChildNodes().item(0).getNodeValue();

Exception in thread "main" java.lang.NullPointerException
        at Unlucky.method(Unlucky.java:83)
```

这个例子中，异常信息中很难看出是哪个方法返回了空。基于此很多开发者常常将这样的语句改写为多行，来排查到底是哪一行代码导致了空指针异常。

从 Java 15 开始，再也没必要这样做了，NPE 会描述出这条语句的哪个部分为空。（在 Java 14 中你也可以通过 `-XX:+ShowCodeDetailsInExceptionMessages` 标记来开启这个特性）

~~From the exception it’s not obvious which method returned null in this case. For this reason many developers used to spread such statements over multiple lines to make sure they’ll be able to figure out which step led to the exception.~~

~~From Java 15, there’s no need to do that because NPE’s describe which part was null in the statement. (Also, in in Java 14 you can enable it with the `-XX:+ShowCodeDetailsInExceptionMessages` flag.)~~

```
Exception in thread "main" java.lang.NullPointerException:
  Cannot invoke "org.w3c.dom.Node.getChildNodes()" because
  the return value of "org.w3c.dom.NodeList.item(int)" is null
        at Unlucky.method(Unlucky.java:83)
```

([参看 Github 上这个示例项目](https://github.com/dodie/java-helpful-npe-demo))

详细的信息包含了不能被执行的步骤（无法调用 `getChildNodes`），以及其失败原因（`item(int)` 为空），这大大简化了定位问题根源。

总体上来说，**这个特性有助于调试，这也意味着对代码可读性也有帮提升**，因为你又失去了一个牺牲代码可读性的技术原因。

有用信息的空指针异常扩展是在 JVM 层面实现的，这也就是说，即使你的代码编译为较老的 Java 版本也同样能受益，而且当你使用其它 JVM 语言，例如 Scala 或 Kotlin 也一样。

值得注意的是，**并非所有的空指针异常都能得到这些额外的信息，仅仅是被 JVM 创建并抛出的才能**：

- 读取或写入一个成员变量为空时
- 调用一个方法为空时
- 获取或赋值一个数组元素为空时（索引信息**不在**错误信息中）
- [包装类开箱](https://docs.oracle.com/javase/tutorial/java/data/autoboxing.html) 为空时

另外值得注意的是，这个特性**不支持序列化**。比如，当一个空指针异常被通过 RMI 方式的远程调用，异常信息里不会包含有用信息。

当前**有用信息的空指针这一特性默认关闭**，必须加上 `-XX:+ShowCodeDetailsInExceptionMessages` 标记来手动开启。

~~([Check the example project on GitHub](https://github.com/dodie/java-helpful-npe-demo))~~

~~The detailed message contains the action that could not be performed (Cannot invoke `getChildNodes`) and the reason for the failure (`item(int)` is `null`), making it much easier to find the exact source of the problem.~~

~~So overall **this feature is good for debugging, and also good for code readability** as there’s one less reason to sacrifice it for a technical reason.~~

~~The Helpful NullPointerExceptions extension is implemented in the JVM so you get the same benefits for code compiled with older Java versions, and when using other JVM languages, such as Scala or Kotlin.~~

~~Note, that **not all NPEs get this extra info, just the ones that are created and thrown by the JVM** upon:~~

- ~~reading or writing a field on null~~
- ~~invoking method on null~~
- ~~accessing or assigning an element of an array (indices are **not** part of the error message)~~
- ~~[unboxing](https://docs.oracle.com/javase/tutorial/java/data/autoboxing.html) null~~

~~Also note that this feature **does not support serialization**. For example, when an NPE is thrown on the remote code executed via RMI, the exception will not include the helpful message.~~

~~Currently the **Helpful NullPointerExceptions are disabled by default**, and have to be enabled with the `-XX:+ShowCodeDetailsInExceptionMessages` flag.~~

### ⚠️ 技巧：检查你的工具链

当你升级到 Java 15 时，检查你的应用和基础设施并确保以下几点：

- 大小写敏感到变量命名不会出现在日志文件和网页服务器响应中
- 日志分析工具能处理新的消息格式
- 构建额外细节的额外开销是有必要

### ~~⚠️ Tip: Check your tooling~~

~~When upgrading to Java 15, make sure to check your application and infrastructure to ensure:~~

- ~~sensitive variable names not end up in log files and web server responses~~
- ~~log parsing tools can handle the new message format~~
- ~~the additional overhead required to construct the additional details is okay~~

## Switch 表达式 ~~Switch Expressions~~

**开始支持版本：** [`JDK 14`](https://openjdk.java.net/jeps/361) ([`JDK 12`](https://openjdk.java.net/jeps/325) [`JDK 13`](https://openjdk.java.net/jeps/354) 中为预览特性)

久远的 `switch` 关键字在 Java 14 中获得了一次大提升。Java 在保持支持久的 [switch 语句](https://docs.oracle.com/javase/tutorial/java/nutsandbolts/switch.html) 功能特性的同时，也添加了 **swith 表达式**[^2]的语法支持：

~~**Available since:** [JDK 14](https://openjdk.java.net/jeps/361) (Preview in [JDK 12](https://openjdk.java.net/jeps/325) [JDK 13](https://openjdk.java.net/jeps/354))~~

~~The good old `switch` got a facelift in Java 14. While Java keeps supporting the old [switch statement](https://docs.oracle.com/javase/tutorial/java/nutsandbolts/switch.html), it adds the new **switch expression** to the language:~~

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

~~The most striking difference is that this new form **can be used as an expression**. It can be used to populate variables as demonstrated in the example above, and it can be used wherever an expression is accepted:~~

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

首先，switch 表达式不存在击穿[^3]的情况。这样再也不会因缺失 `break` 关键字而产生缺陷了。为了避免有使用击穿的需求，**多个常量可以指定到每一个 `case`**，以逗号分割。

其次，每一个 `case` 有其自己的作用域。

~~However, there are some other, more subtle differences between switch expressions and switch statements.~~

~~First, for switch expressions **cases don’t fall-through**. So no more subtle bugs caused by missing `breaks`. To avoid the need for fall-through, **multiple constants can be specified for each case** in a comma separated list.~~

~~Second, each **case has its own scope**.~~

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

再者，switch 表达式必须涵盖所有的情况。这就意味着对于字符串类型、基本类型以及它们的包装类来说，`default` 的情况必须指明。

~~A branch is either a single expression or if it consist of multiple statements it has to be wrapped in a block.~~

~~Third, **cases of a switch expression are exhaustive**. This means that for String, primitive types and their wrappers the `default` case always has to be defined.~~

```java
int k = 3;
String s = switch (k) {
    case  1 -> "one";
    case  2 -> "two";
    default -> "many";
}
```

对于枚举的话，要么 `defualt` 需要声明，要么显式的声明出所有情况。后者的话是最佳实践，能确保所有的值都被考虑到了。当给枚举中添加一个新值时，用到它作为 switch 表达式的地方都会报出编译错误。

~~For `enums` either a `default` case has to be present, or all cases have to be explicitly covered. Relying on the latter is quite nice to ensure that all values are considered. Adding an extra value to the `enum` will result in a compile error for all switch expressions where it’s used.~~

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

鉴于以上所有原因，更偏向于使用 switch 表达式而不是 switch 语句，有利于产出更多可维护的代码。

~~For all these reasons preferring switch expressions over switch statements can lead to more maintainable code.~~

### ⚠️ 技巧：使用箭头语法

switch 表达式中 `case` 不仅能使用类似于 lambda 表达式中箭头形式，还能配合 `yeild` 关键字**使用类似于以往 switch 语句中的冒号形式**：

### ~~⚠️ Tip: Use arrow syntax~~

~~Switch expression can not only used with the lambda-like arrow-form cases. **The old switch statement with its colon-form cases can also be used as an expression** using `yield`:~~

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

- 条件击穿
- 条件之共享一个作用域

~~我的意见？不要使用这种形式，而是使用箭头形式的 switch 表达式，这样能获取所有好处。~~

~~This version can also be used as an expression, but it’s more similar to the old switch statement because~~

- ~~cases fall through~~
- ~~cases share the same scope~~

~~My advice? Don’t use this form, use switch expressions with the arrow syntax instead to get all the benefits.~~

## 局部变量类型推断 ~~Local-Variable Type Inference~~

**开始支持版本：** [`JDK 11`](https://openjdk.java.net/jeps/323) ([`JDK 10`](https://openjdk.java.net/jeps/286) 中无 lambda 支持)

自从 Java 8 之后最显著的语言特性改进可能是 `var` 关键字。这最初是在 [Java 10](https://openjdk.java.net/jeps/286) 中引入的，随后在 [Java 11](https://openjdk.java.net/jeps/323) 中得到进一步改进。

通过省略显式的类型声明，这个特性帮助我们简化了局部变量声明的繁文缛节：

~~**Available since:** [JDK 11](https://openjdk.java.net/jeps/323) (Without lambda support in [JDK 10](https://openjdk.java.net/jeps/286))~~

~~Probably the most significant language improvement since Java 8 is the addition of the `var`keyword. It was initially introduced in [Java 10](https://openjdk.java.net/jeps/286), and was further improved in [Java 11](https://openjdk.java.net/jeps/323).~~

~~This feature allows us to reduce the ceremony of a local variable declaration by omitting the explicit type specification:~~

```java
var greetingMessage = "Hello!";
```

虽然看起来像 Javascript 中的 `var` 关键字，但这**并非是动态类型**。

来看下这段来自 JEP 的引述：

> > > 我们旨在简化 Java 代码编写中的繁文缛节，来提升开发者的编程体验，并保持 Java 作为静态类型安全语言的承诺。

声明变量的类型是**在编译时推断的**。在上面的例子中其类型是字符串。使用 `var` 而不是显示的类型，能使这块代码不那么臃肿，也更易读。

这是另一个类型推断能发挥优势的例子：

~~While it looks similar to Javascript’s `var` keyword, this is **not about dynamic typing**.~~

~~Take this quote from the JEP:~~

> > > ~~We seek to improve the developer experience by reducing the ceremony associated with writing Java code, while maintaining Java’s commitment to static type safety.~~

~~The type of the declared variables is **inferred at compile time**. In the example above the inferred type is String. Using `var` instead of an explicit type makes this piece of code less redundant, thus, easier to read.~~

~~Here’s another good candidate for type inference:~~

```java
MyAwesomeClass awesome = new MyAwesomeClass();
```

在很多的情况下，这个特性确实能提升代码质量。但有时候继续使用显示的类型声明反而是更推崇的。我们来看几个使用 `var` 替换类型声明导致问题的例子。

~~It’s clear that in many cases this feature can improve code quality. However, sometimes it’s better to stick with the explicit type declaration. Let’s see a few examples where replacing a type declaration with `var` can backfire.~~

### ⚠️ 技巧：时刻想着可读性

第一个情形是，当在源码中移除显示的类型信息，会减少可读性。

当然，IDE 能在这方面起到一定帮助，但是在代码评审，或快速浏览代码时这就会损失可读性。例如，在工厂模式或构造者模式中，你不得不找到负责构建对象的代码，才能推断出其类型。

来点小测试，下面的代码片段使用了 Java 8 中的日期时间 API，猜下这些变量的类型：

### ~~⚠️ Tip: Keep readability in mind~~

~~The first case is when removing explicit type information from the source code makes it less readable.~~

~~Of course, IDEs can help in this regard, but during code-reviews or when you just quickly scanning the code it might hurt readability. For example, consider factories or builders: you have to find the code responsible for object initialization to determine the type.~~

~~Here’s a little puzzle. The following piece of code is using Java 8’s Date/Time API. Guess the types of the variables in the following snippet:~~

```java
var date = LocalDate.parse("2019-08-13");
var dayOfWeek = date.getDayOfWeek();
var dayOfMonth = date.getDayOfMonth();
```

猜完了吗？这是答案：

第一个变量十分直观，`parse` 方法返回了 `LocalDate` 对象。然而，接下来两个，你需要对 API 更了解： `dayOfWeek` 方法返回的是 `java.time.DayOfWeek`，但 `dayOfMonth` 仅仅是返回了 `int`。

还有个潜在问题，遇到 `var` 时，代码阅读者不得不更依赖于上下文。想象下这个例子：

~~Done? Here’s the solution:~~

~~The first one is pretty intuitive, the `parse` method returns a `LocalDate` object. However, for the next two, you should be a little bit more familiar with the API: `dayOfWeek` returns a `java.time.DayOfWeek`, while `dayOfMonth` simply returns an `int`.~~

~~Another potential problem is that with `var` the reader has to rely more on the context. Consider the following:~~

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

基于之前对例子，你可能会猜是 `java.time.DayOfWeek` 。但这个例子中的 `date` 对象是 Joda 库中的，所以返回的是整型。这是个不同的 API，同样的方法有所差池，这个较长的方法，没看完每行代码，导致你看不出差异。(JavaDoc: [Joda time](https://www.joda.org/joda-time/apidocs/org/joda/time/ReadableDateTime.html#getDayOfWeek--) / [Java 8 Date/Time API](https://docs.oracle.com/javase/8/docs/api/java/time/LocalDate.html#getDayOfWeek--))

如果这儿有显示的类型声明，弄清 `dayOfWeek` 对象是什么类型旧很容易。现在有了 `var` ，读者首先得找出 `date` 对象的类型，还要搞清 `getDayOfWeek` 方法做了什么。要是有一个 IDE，这一切都很轻松，但是仅仅是快速浏览代码，这就没那么容易了。

~~Based on the previous example, I bet you’d guess it’s a `java.time.DayOfWeek`. But this time, it’s an integer, because the `date` in this example is from Joda time. It’s a different API, behaving slightly differently, but you can’t see it because it’s a longer method, and you did not read all the lines. (JavaDoc: [Joda time](https://www.joda.org/joda-time/apidocs/org/joda/time/ReadableDateTime.html#getDayOfWeek--) / [Java 8 Date/Time API](https://docs.oracle.com/javase/8/docs/api/java/time/LocalDate.html#getDayOfWeek--))~~

~~If the explicit type declaration was present, figuring out what type `dayOfWeek` has would be trivial. Now, with `var`, the reader first has to find out the type of the `date` variable and check what `getDayOfWeek` does. This is simple with an IDE, not so simple when just scanning the code.~~

### ⚠️ 技巧：注意保留重要的类型信息

第二个情形是，使用 `var` 消除了所有可用的类型信息，导致甚至无法被推断。在绝大多数情形下，这些问题能被 Java 编译器捕获。比如，`var` 不能针对 lambda 和方法引用进行推断，因为编译器依赖于表达式左边的声明来确定类型。

然而，存在一些例外情况。例如，`var` 不能和钻石运算符很好的搭配使用，后者能移除在创建泛型对象时右侧表达式冗长的语法：

### ~~⚠️ Tip: Pay attention to preserve important type information~~

~~The second case is when using `var` removes all available type information, so it can not be even inferred. In most cases, these situations are caught by the Java compiler. For example, `var` cannot infer type for lambdas or method references, because for these features the compiler relies on the left-hand side expression to figure out the types.~~

~~However, there are a few exceptions. For example, `var` does not play nicely with the Diamond Operator. The Diamond operator is a nice feature to remove some verbosity from the right-hand side of an expression when creating a generic instance:~~

```java
Map<String, String> myMap = new HashMap<String, String>(); // Pre Java 7
Map<String, String> myMap = new HashMap<>(); // Using Diamond operator
```

由于钻石操作符仅和泛型有关，这就还有语法上的冗余能被移除。我们来用 `var` 关键字使它看起来更简洁：

~~Because it only deals with the generic types, there is still redundancy to be removed. Let’s try to make it terser with `var`:~~

```java
var myMap = new HashMap<>();
```

这个例子语法上是可行的，在 Java 11 中编译器甚至不会报出警告。然而，我们完全不指定泛型类型，类型推断会给出 `Map<Object, Object>` 的结果。

当然，我们能替换掉钻石操作符来轻松的解决这个问题：

~~This example is valid, and Java 11 it does not even emit in compiler warnings about it. However, with all these type inference we ended up not specifying the generic types at all, and the type will be `Map<Object, Object>`.~~

~~Of course, this can be solved easily by removing the Diamond Operator:~~

```java
var myMap = new HashMap<String, String>();
```

`var` 的另一系列问题是和基础类型使用的时候：

~~Another set of problems can arise when `var` is used with primitive data types:~~

```java
byte   b = 1;
short  s = 1;
int    i = 1;
long   l = 1;
float  f = 1;
double d = 1;
```

在没有显示类型声明的情况下，上面的所有变量都会被推断为整型。在处理基本类型时，要么使用类型字面量（比如 `1L`），要么就完全避免使用 `var` 。

~~Without explicit type declaration, the type of all these variables would be inferred to `int`. Use type literals (e.g. `1L`) when working with primitive data types, or don’t use `var` in this case at all.~~

### **⚠️ 技巧：确保阅读官方的代码风格指南**

什么时候使用类型推断完全取决于你，但确保它不会影响可读性和正确性。经验之谈，保持一个良好的编程实践，比如好的命名和缩小局部变量的作用域肯定是很有帮助的。确保阅读官方针对 `var` 的 [代码风格指南](https://openjdk.java.net/projects/amber/LVTIstyle.html) 和 [常见问题](https://openjdk.java.net/projects/amber/LVTIFAQ.html)。

由于 `var` 有很多坑，最好在把它引入到代码中时保守些，也仅仅在局部变量中使用它，这样它的作用域也十分局限。

同时，在引入时也尽量谨慎些，**`var` 不是一个新的关键字，而是一个保留类名**。这意味着当用作类名时有特殊含义，在任何地方其都作为合法的引用。

当前，`var` 还没有相应的单一「关键字」来声明不可变变量（比如 `val` 或 `const`）。希望未来的版本中会支持，在那之前，我们可以使用 `final var` 。

参考来源：

### ~~⚠️ Tip: Make sure to read the official style guides~~

~~It’s ultimately up to you to decide when to use type inference and make sure that it does not hurt readability and correctness. As a rule of thumb, sticking to good programming practices, such as good naming and minimizing the scope of local variables certainly helps a lot. Make sure to read the official [style guide](https://openjdk.java.net/projects/amber/LVTIstyle.html) and [FAQ](https://openjdk.java.net/projects/amber/LVTIFAQ.html) about `var`.~~

~~Because `var` has so many gotchas, it’s great that it was introduced conservatively and can only be used on local variables, which scope is usually pretty limited.~~

~~Also, it has been introduced cautiously, **`var` is not a new keyword but a reserved type name**. This means that it only has special meaning when it’s used as a type name, everywhere else `var` is continuing to be a valid identifier.~~

~~Currently, `var` does not have an immutable counterpart (such as `val` or `const`) to declare a final variable and infer its type with a single keyword. Hopefully, we’ll get it in a future release, until then, we can resort to `final var`.~~

~~Resources:~~

- [First Contact With ‘var’ In Java 10](https://blog.codefx.org/java/java-10-var-type-inference/)
- [26 Items for Dissecting Java Local Variable Type Inference (Var Type)](https://dzone.com/articles/var-work-in-progress)
- [Java 10: Local Variable Type Inference](https://www.journaldev.com/19871/java-10-local-variable-type-inference)



## 接口中允许私有方法 ~~Allow private methods in interfaces~~

**开始支持版本：** [JDK 9](https://openjdk.java.net/jeps/213) ([Milling Project Coin](http://openjdk.java.net/jeps/213))

从 Java 8 开始，在接口中添加默认方法成为可能。到 Java 9 中，默认方法甚至能调用私有方法，这既满足代码复用的需求，但又不对外暴露相应逻辑。

虽然这不是个大的改进，但这对整理默认方法中的代码小有帮助。

~~**Available since:** [JDK 9](https://openjdk.java.net/jeps/213) (Milling Project Coin)~~

~~Since Java 8 it is possible to add default methods to interfaces. With Java 9 these default methods can even call private methods to share code in case you are in a need for reuse, but do not want to expose functionality publicly.~~

~~Although it’s not a huge deal, it’s a logical addition that allows to tidy up code in default methods.~~



## 匿名内部类的钻石操作符 ~~Diamond operator for anonymous inner classes~~

**开始支持版本：** [JDK 9](https://openjdk.java.net/jeps/213) ([Milling Project Coin](http://openjdk.java.net/jeps/213))

Java 7 引入了钻石操作符（`<>`）来减少冗余，这是通过让编译器推断构造方法的参数类型实现的：

~~**Available since:** [JDK 9](https://openjdk.java.net/jeps/213) (Milling Project Coin)~~

~~Java 7 introduced the Diamond Operator (`<>`) to reduce verbosity by letting the compiler infer the parameter types for constructors:~~

```java
List<Integer> numbers = new ArrayList<>();
```

然而，这个特性之前并不能使用在匿名内部类上。根据 [JDK 项目的邮件列表讨论](http://mail.openjdk.java.net/pipermail/coin-dev/2011-June/003283.html)来看，钻石操作符一开始没有添加此特性是由于这需要 JVM 层面较大的改动。

到 Java 9 时，这个小小的痛点已被解决，钻石操作符更加的通用：

~~However, this feature did not work with anonymous inner classes before. According to the [discussion on the project’s mailing list](http://mail.openjdk.java.net/pipermail/coin-dev/2011-June/003283.html) this was not added as part of the original Diamond Operator feature, because it required a substantial JVM change.~~

~~With Java 9, this small rough edge is removed, making the operator more universally applicable:~~

```java
List<Integer> numbers = new ArrayList<>() {
    // ...
}
```



## try-with-resources 语句中允许使用 effectively-final 变量 ~~Allow effectively-final variables to be used as resources in try-with-resources statements~~

**开始支持版本：** [JDK 9](https://openjdk.java.net/jeps/213) ([Milling Project Coin](http://openjdk.java.net/jeps/213))

Java 7 带来了另一个语法增强：`try-with-resources` ，帮助开发者解决总是担心释放资源的问题。

为展示它的威力，先看一个 Java 7 以前正确释放资源的示例：

**Available since:** [JDK 9](https://openjdk.java.net/jeps/213) (Milling Project Coin)

Another enhancement introduced by Java 7 is the `try-with-resources`, which frees the developer from having to worry about releasing resources.

To illustrate its power, first consider the effort made to properly close a resource in this typical pre-Java 7 example:

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

~~With `try-with-resources` resources can be automatically released, with much less ceremony:~~

```java
try (BufferedReader br = new BufferedReader(...)) {
    return br.readLine();
}
```

尽管它威力强大，但也有短板，Java 9 正好旨在解决它们。

兴许你能用它来处理多个资源，但很容易就会导致代码可读性下降。在 `try` 关键字后声明一长串变量，稍稍有些违背常规的 Java 代码。

~~Despite its power, `try-with-resources` had a few shortcomings that Java 9 addressed.~~

~~Although this construct can handle multiple resources, it can easily make the code harder to read. Declaring variables like this in a list after the `try` keyword is a bit unconventional compared to the usual Java code:~~

```java
try (BufferedReader br1 = new BufferedReader(...);
    BufferedReader br2 = new BufferedReader(...)) {
    System.out.println(br1.readLine() + br2.readLine());
}
```

还有，在 Java 7 中，如果你有了一个已经存在但需要放到这个结构中处理的变量，就不得不引入一个伪变量。（看这例子：[JDK-8068948](https://bugs.openjdk.java.net/browse/JDK-8068948)）

为减少这些负面影响，`try-with-resources` 得到了增强，除了新建变量外，可以处理不可变或实际不可变的局部变量：

~~Also, in the Java 7 version, if you already have a variable that you want to handle with this construct, you had to introduce a dummy variable. (For an example, see [JDK-8068948](https://bugs.openjdk.java.net/browse/JDK-8068948).)~~

~~To mitigate these criticisms, `try-with-resources` was enhanced to handle final or effectively final local variables in addition to newly created ones:~~

```java
BufferedReader br1 = new BufferedReader(...);
BufferedReader br2 = new BufferedReader(...);
try (br1; br2) {
    System.out.println(br1.readLine() + br2.readLine());
}
```

在这个例子中，变量的初始化和将其注册到 `try-with-resources` 结构中的步骤已经分离开。

~~In this example, the initialization of the variables is separated from their registration to the `try-with-resources` construct.~~

**⚠️ 技巧：当心已释放的资源**

有一点需要警惕在心，已被 `try-with-resources` 释放的资源是可能会被再次引用的，但这几乎都会失败：

### ~~⚠️ Tip: Watch out for released resources~~

~~One caveat to keep in mind is that now it’s possible to reference variables that are already released by `try-with-resources`, which, in most cases will fail:~~

```java
BufferedReader br = new BufferedReader(...);
try (br) {
    System.out.println(br.readLine());
}
br.readLine(); // Boom!
```

## 下划线不再是合法变量名~~Underscore is no longer a valid identifier name~~

**开始支持版本：** [JDK 9](https://openjdk.java.net/jeps/213) (Milling Project Coin)

**Available since:** [JDK 9](https://openjdk.java.net/jeps/213) (Milling Project Coin)

[在 Java 8 中](https://bugs.java.com/bugdatabase/view_bug.do?bug_id=8005852)，变量名为下划线（`_`）时编译器会抛出警告。Java 9 更进一步，将单个下划线字符视为非法变量名，保留给未来作为特殊语义做准备：

~~[In Java 8](https://bugs.java.com/bugdatabase/view_bug.do?bug_id=8005852), the compiler emits a warning when ‘_’ is used as an identifier. Java 9 took this a step further making the sole underscore character illegal as an identifier, reserving this name to have special semantics in the future:~~

```java
int _ = 10; // Compile error
```

## 改进的警告 ~~Improved Warnings~~

**开始支持版本：** [JDK 9](https://openjdk.java.net/jeps/211)

~~**Available since:** [JDK 9](https://openjdk.java.net/jeps/211)~~

最后，我们再说点在较新 Java 版本中关于编译器警告的变化。

现在可以用 `@SafeVarargs` 注解在私有方法上，以标记 `Type safety: Potential heap pollution via varargs parameter` 警告（事实上，这个变化是前面讨论过  [JEP 213: Milling Project Coin](https://openjdk.java.net/jeps/213) 的一部分）。需要了解更多可以参看官方文档，[可变参数](https://docs.oracle.com/javase/8/docs/technotes/guides/language/varargs.html)、[泛型](https://docs.oracle.com/javase/8/docs/technotes/guides/language/generics.html)以及两者结合[可能产生的问题](https://docs.oracle.com/javase/tutorial/java/generics/nonReifiableVarargsType.html)。

还有，自从 [Java 9](https://openjdk.java.net/jeps/211) 以后，编译器不再为引入废弃的类型报出警告。因为这些警告已经在调用的地方展示了，所以没有太多实际有价值的信息，也显得冗余。

~~Finally, let’s say a word about the changes related to the compiler warnings in newer Java versions.~~

~~Now it’s possible to annotate a private method with `@SafeVarargs` to mark a `Type safety: Potential heap pollution via varargs parameter` warning false positive. (In fact, this change is part of the previously discussed [JEP 213: Milling Project Coin](https://openjdk.java.net/jeps/213)). Read more about [Varargs](https://docs.oracle.com/javase/8/docs/technotes/guides/language/varargs.html), [Generics](https://docs.oracle.com/javase/8/docs/technotes/guides/language/generics.html) and [the potential probems](https://docs.oracle.com/javase/tutorial/java/generics/nonReifiableVarargsType.html) that can arise by combining these features in the official documentation.~~

~~Also since [Java 9](https://openjdk.java.net/jeps/211), the compiler does not issue a warning for import statements when a deprecated type is imported. These warnings were uninformative and redundant since a separate warning is always displayed at the actual usage of the deprecated members.~~

## 接下来还什么：Java 15 中的预览特性 ~~What’s next: Preview features in Java 15~~

Java 15 中有三个预览特性，可以通过 `--enable-preview -source 15` 标记来开启。它们很有可能成为下一个 Java 版本更新的特性。这里简短的预告下。

~~Java 15 has 3 preview features that can be enabled with the `--enable-preview -source 15`flags. Most likely they are the next improvements to the Java language. Here’s short teaser.~~

### 记录类 ~~Records~~

[记录类](https://openjdk.java.net/jeps/359)带来了一种「新的」类型声明，通过简短的语法来创建数据类（data classes）。相较于传统的私有成员变量、getter 和 setter 方法以及构造方法来构建，记录类可以让我们使用更加简短地定义数据结构题（data structures）：

~~[Records](https://openjdk.java.net/jeps/359) introduce a new type declaration to the language, providing compact syntax to create data classes. Instead of the usual ceremony with private fields, getters, setters and constructors, it allows us to use a terse definition to create data structures:~~

```java
record Point(int x, int y) { }
```

我已经迫不及待它成为一个流行类库和框架支持的正式特性了。

~~I can’t wait for this to become a standard feature supported by popular libraries and frameworks!~~

### instanceof 的模式匹配 ~~Pattern Matching for instanceof~~

大多数情况下，`instanceof` 都会跟一个显式的类型转换：

In most cases, `instanceof` is usually followed by a cast:

```java
if (obj instanceof String) {
    String s = (String) obj;
    // use s
}
```

[JEP 305](https://openjdk.java.net/jeps/305) 扩展了 `instanceof` 关键字，使得在使用时不再那么啰嗦：

~~[JEP 305](https://openjdk.java.net/jeps/305) extends `instanceof` to make this typical scenario a bit less verbose:~~

```java
if (obj instanceof String s) {
    // use s
}
```

### 封闭类 ~~Sealed Classes~~

[JEP 360](https://openjdk.java.net/jeps/360) 改进给 Java 语言添加了封闭类和接口，用于限定哪些类或接口可以被继承或实现它们。

~~[JEP 360](https://openjdk.java.net/jeps/360) enhances adds sealed classes and interfaces to the language which can be used to restrict which other classes or interfaces may extend or implement them.~~

```java
public abstract sealed class Shape
    permits Circle, Rectangle {...}

public class Circle extends Shape {...} // OK
public class Rectangle extends Shape {...} // OK
public class Triangle extends Shape {...} // Compile error
```

这个特性也改善了 switch 表达式。当其使用枚举时，如果可能的之在编译时能确定，且所有的情况都有处理，那么不需要定义 default 分支。

~~This feature also enhances switch expressions. As with enums, if the possible values are known compile time and all cases are handled, there’s no need to define a default branch.~~

```java
double area = switch (shape) {
    case Circle c    -> Math.pow(c.radius(), 2) * Math.PI
    case Rectangle r -> r.a() * r.b()
};
```

## 总结 ~~Summary~~

这篇文章介绍了 Java 8 以来该语言的改进。随着新的每 6 个月一次的快速发布周期，带来了许多变化，对 Java 平台保持关注就更加重要了。

~~This post covered the improvements related to the Java language since Java 8. It’s important to keep an eye on the Java platform, as with the new rapid release cadence a new Java version is released every six months, delivering changes to the platform and to the language.~~



[^1]: 这里指的是原文的参考来源，下同
[^2]: 译者注：statement 和 expression 的区别参见：https://stackoverflow.com/questions/39523474/what-is-the-difference-between-an-expression-and-a-statement-in-java
[^3]: fall-through


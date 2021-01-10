# Java 8 到 15 的更新

> 原文：[New language features since Java 8 to 15（Enhancements to the Java language you should know）](https://advancedweb.hu/new-language-features-since-java-8-to-15/#records)

当 Java 8 引入流和 Lambda 这两个重大更新时，函数式编程的风格赋予了 Java 更少模板代码的语法。虽然最近的版本更新没添加这么富有影响到特性，但带来了很多较小的改进。

When Java 8 introduced Streams and Lambdas it was a big change, enabling functional programming style to be expressed with much less boilerplate. While recent versions did not add such impactful features, lots of smaller improvements were made to the language.

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

**可用版本：** [JDK 15](https://openjdk.java.net/jeps/378) ( [JDK 13](https://openjdk.java.net/jeps/355) 处于预览特性) [JDK 14](https://openjdk.java.net/jeps/368)

相较于其它现代编程语言，在 Java 中编写多行字符串是臭名昭著的困难：

Compared to other modern languages, in Java it was notoriously hard to express text containing multiple lines:

```
String html = "";
html += "<html>\n";
html += "  <body>\n";
html += "    <p>Hello, world</p>\n";
html += "  </body>\n";
html += "</html>\n";

System.out.println(html);
```

为了将这种情形变得更加的程序员友好，Java 15 引入了多行字符串字面量，叫做文本块：

To make this situation more programmer-friendly, Java 15 introduced multi-line string literals called Text Blocks:

```
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

They are similar to the old String literals but they can contain **new lines and quotes without escaping**.

Text Blocks start with `"""` followed by a new line, and end with `"""`. The closing token can be at the end of the last line or in separate line such as is in the example above.

They can be used anywhere an old String literal can be used and they both produce similar String objects.

For each line-break in the source code, there will be a `\n` character in the result.

```
String twoLines = """
          Hello
          World
          """;
```

This can be prevented by ending the line with the `\` character, which can be useful in case of very long lines that you’d like to split into two for keeping the source code readable.

```
String singleLine = """
          Hello \
          World
          """;
```

Text Blocks can be aligned with neighboring Java code because **incidental indentation is automatically removed**. The compiler checks the whitespace used for indentation in each line to find the least indented line, and shifts each line to the left by this minimal common indentation.

This means that if the closing `"""` is in a separate line, the indentation can be increased by shifting the closing token to the left.

```
String noIndentation = """
          First line
          Second line
          """;

String indentedByToSpaces = """
          First line 
          Second line
        """;
```

The opening `"""` does not count for the indentation removal so it’s not necessary to line up the text block with it. For example, both of the following examples produce the same string with the same indentation:

```
String indentedByToSpaces = """
         First line 
         Second line
       """;

String indentedByToSpaces = """
                              First line 
                              Second line
                            """;
```

The `String` class also provides some programmatic ways to deal with indentation. The `indent` method takes an integer and returns a new string with the specified levels of additional indentation, while `stripIndent` returns the contents of the original string without all the incidental indentation.

Text Blocks do not support interpolation, a feature I really miss. As the JEP says it may be considered in the future, and until then we can use `String::formatted` or `String::format`:

```
var greeting = """
    hello
    %s
    """.formatted("world");
```

Resources:

- [Programmer’s Guide To Text Blocks](https://cr.openjdk.java.net/~jlaskey/Strings/TextBlocksGuide_v11.html)
- [Definitive Guide To Text Blocks In Java 13](https://nipafx.dev/java-13-text-blocks#)
- [Java Text Blocks - Bealdung](https://www.baeldung.com/java-text-blocks)



### ⚠️ Tip: Preserve trailing spaces

Trailing spaces in Text Blocks are ignored. This is usually not a problem but in some cases they do matter, for example in context of unit test when a method result is compared to a baseline value.

If this is the case be mindful about them and if a line ends with whitespace add `\s` or `\t`instead of the last space or tab to the end of the line.

### ⚠️ Tip: Produce the correct newline characters for Windows

[Line endings](https://en.wikipedia.org/wiki/Newline) are represented with different control characters on Unix and Windows. The former one uses a single line feed (`\n`), while the latter uses carriage return followed by line feed (`\r\n`).

However, regardless to the operating system you choose to use or how you encode new lines in the source code, Text Blocks will use a single `\n` for each new line, which can lead to compatibility issues.

```
Files.writeString(Paths.get("<PATH_TO_FILE>"), """
    first line
    second line
    """);
```

If a tool compatible only with the Windows line ending format (e.g. Notepad) is used to open such a file, it will display only a single line. Make sure that you use the correct control characters if you also target Windows, for example by calling `String::replace` to replace each `"\n"` with `"\r\n"`.

### ⚠️ Tip: Pay attention to consistent indentation

Text Blocks work well with any kind of indentation: tabs spaces or even the mix of these two. It’s important though to use **consistent indentation** for each line in the block, otherwise the incidental indentation can’t be removed.

Most editors offer autoformatting and automatically add indentation on each new line when you hit enter. Make sure to use the latest version of these tools to ensure they play well with Text Blocks, and don’t try to add wrong indentations.

## Helpful NullPointerExceptions

**Available since:** [JDK 15](https://bugs.openjdk.java.net/browse/JDK-8233014) (Enabled with `-XX:+ShowCodeDetailsInExceptionMessages` in [JDK 14](https://openjdk.java.net/jeps/358))

This little gem is not really a language feature, but it’s so nice that I wanted to include it in this list.

Traditionally, experiencing a `NullPointerException` was like this:

```
node.getElementsByTagName("name").item(0).getChildNodes().item(0).getNodeValue();

Exception in thread "main" java.lang.NullPointerException
        at Unlucky.method(Unlucky.java:83)
```

From the exception it’s not obvious which method returned null in this case. For this reason many developers used to spread such statements over multiple lines to make sure they’ll be able to figure out which step led to the exception.

From Java 15, there’s no need to do that because NPE’s describe which part was null in the statement. (Also, in in Java 14 you can enable it with the `-XX:+ShowCodeDetailsInExceptionMessages` flag.)

```
Exception in thread "main" java.lang.NullPointerException:
  Cannot invoke "org.w3c.dom.Node.getChildNodes()" because
  the return value of "org.w3c.dom.NodeList.item(int)" is null
        at Unlucky.method(Unlucky.java:83)
```

([Check the example project on GitHub](https://github.com/dodie/java-helpful-npe-demo))

The detailed message contains the action that could not be performed (Cannot invoke `getChildNodes`) and the reason for the failure (`item(int)` is `null`), making it much easier to find the exact source of the problem.

So overall **this feature is good for debugging, and also good for code readability** as there’s one less reason to sacrifice it for a technical reason.

The Helpful NullPointerExceptions extension is implemented in the JVM so you get the same benefits for code compiled with older Java versions, and when using other JVM languages, such as Scala or Kotlin.

Note, that **not all NPEs get this extra info, just the ones that are created and thrown by the JVM** upon:

- reading or writing a field on null
- invoking method on null
- accessing or assigning an element of an array (indices are **not** part of the error message)
- [unboxing](https://docs.oracle.com/javase/tutorial/java/data/autoboxing.html) null

Also note that this feature **does not support serialization**. For example, when an NPE is thrown on the remote code executed via RMI, the exception will not include the helpful message.

Currently the **Helpful NullPointerExceptions are disabled by default**, and have to be enabled with the `-XX:+ShowCodeDetailsInExceptionMessages` flag.

### ⚠️ Tip: Check your tooling

When upgrading to Java 15, make sure to check your application and infrastructure to ensure:

- sensitive variable names not end up in log files and web server responses
- log parsing tools can handle the new message format
- the additional overhead required to construct the additional details is okay

## Switch Expressions

**Available since:** [JDK 14](https://openjdk.java.net/jeps/361) (Preview in [JDK 12](https://openjdk.java.net/jeps/325) [JDK 13](https://openjdk.java.net/jeps/354))

The good old `switch` got a facelift in Java 14. While Java keeps supporting the old [switch statement](https://docs.oracle.com/javase/tutorial/java/nutsandbolts/switch.html), it adds the new **switch expression** to the language:

```
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

The most striking difference is that this new form **can be used as an expression**. It can be used to populate variables as demonstrated in the example above, and it can be used wherever an expression is accepted:

```
int k = 3;
System.out.println(
    switch (k) {
        case  1 -> "one";
        case  2 -> "two";
        default -> "many";
    }
);
```

However, there are some other, more subtle differences between switch expressions and switch statements.

First, for switch expressions **cases don’t fall-through**. So no more subtle bugs caused by missing `breaks`. To avoid the need for fall-through, **multiple constants can be specified for each case** in a comma separated list.

Second, each **case has its own scope**.

```
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

A branch is either a single expression or if it consist of multiple statements it has to be wrapped in a block.

Third, **cases of a switch expression are exhaustive**. This means that for String, primitive types and their wrappers the `default` case always has to be defined.

```
int k = 3;
String s = switch (k) {
    case  1 -> "one";
    case  2 -> "two";
    default -> "many";
}
```

For `enums` either a `default` case has to be present, or all cases have to be explicitly covered. Relying on the latter is quite nice to ensure that all values are considered. Adding an extra value to the `enum` will result in a compile error for all switch expressions where it’s used.

```
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

For all these reasons preferring switch expressions over switch statements can lead to more maintainable code.

### ⚠️ Tip: Use arrow syntax

Switch expression can not only used with the lambda-like arrow-form cases. **The old switch statement with its colon-form cases can also be used as an expression** using `yield`:

```
int result = switch (s) {
    case "foo":
    case "bar":
        yield 2;
    default:
        yield 3;
};
```

This version can also be used as an expression, but it’s more similar to the old switch statement because

- cases fall through
- cases share the same scope

My advice? Don’t use this form, use switch expressions with the arrow syntax instead to get all the benefits.

## Local-Variable Type Inference

**Available since:** [JDK 11](https://openjdk.java.net/jeps/323) (Without lambda support in [JDK 10](https://openjdk.java.net/jeps/286))

Probably the most significant language improvement since Java 8 is the addition of the `var`keyword. It was initially introduced in [Java 10](https://openjdk.java.net/jeps/286), and was further improved in [Java 11](https://openjdk.java.net/jeps/323).

This feature allows us to reduce the ceremony of a local variable declaration by omitting the explicit type specification:

```
var greetingMessage = "Hello!";
```

While it looks similar to Javascript’s `var` keyword, this is **not about dynamic typing**.

Take this quote from the JEP:

> > > We seek to improve the developer experience by reducing the ceremony associated with writing Java code, while maintaining Java’s commitment to static type safety.

The type of the declared variables is **inferred at compile time**. In the example above the inferred type is String. Using `var` instead of an explicit type makes this piece of code less redundant, thus, easier to read.

Here’s another good candidate for type inference:

```
MyAwesomeClass awesome = new MyAwesomeClass();
```

It’s clear that in many cases this feature can improve code quality. However, sometimes it’s better to stick with the explicit type declaration. Let’s see a few examples where replacing a type declaration with `var` can backfire.

### ⚠️ Tip: Keep readability in mind

The first case is when removing explicit type information from the source code makes it less readable.

Of course, IDEs can help in this regard, but during code-reviews or when you just quickly scanning the code it might hurt readability. For example, consider factories or builders: you have to find the code responsible for object initialization to determine the type.

Here’s a little puzzle. The following piece of code is using Java 8’s Date/Time API. Guess the types of the variables in the following snippet:

```
var date = LocalDate.parse("2019-08-13");
var dayOfWeek = date.getDayOfWeek();
var dayOfMonth = date.getDayOfMonth();
```

Done? Here’s the solution:

The first one is pretty intuitive, the `parse` method returns a `LocalDate` object. However, for the next two, you should be a little bit more familiar with the API: `dayOfWeek` returns a `java.time.DayOfWeek`, while `dayOfMonth` simply returns an `int`.

Another potential problem is that with `var` the reader has to rely more on the context. Consider the following:

```
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

Based on the previous example, I bet you’d guess it’s a `java.time.DayOfWeek`. But this time, it’s an integer, because the `date` in this example is from Joda time. It’s a different API, behaving slightly differently, but you can’t see it because it’s a longer method, and you did not read all the lines. (JavaDoc: [Joda time](https://www.joda.org/joda-time/apidocs/org/joda/time/ReadableDateTime.html#getDayOfWeek--) / [Java 8 Date/Time API](https://docs.oracle.com/javase/8/docs/api/java/time/LocalDate.html#getDayOfWeek--))

If the explicit type declaration was present, figuring out what type `dayOfWeek` has would be trivial. Now, with `var`, the reader first has to find out the type of the `date` variable and check what `getDayOfWeek` does. This is simple with an IDE, not so simple when just scanning the code.

### ⚠️ Tip: Pay attention to preserve important type information

The second case is when using `var` removes all available type information, so it can not be even inferred. In most cases, these situations are caught by the Java compiler. For example, `var` cannot infer type for lambdas or method references, because for these features the compiler relies on the left-hand side expression to figure out the types.

However, there are a few exceptions. For example, `var` does not play nicely with the Diamond Operator. The Diamond operator is a nice feature to remove some verbosity from the right-hand side of an expression when creating a generic instance:

```
Map<String, String> myMap = new HashMap<String, String>(); // Pre Java 7
Map<String, String> myMap = new HashMap<>(); // Using Diamond operator
```

Because it only deals with the generic types, there is still redundancy to be removed. Let’s try to make it terser with `var`:

```
var myMap = new HashMap<>();
```

This example is valid, and Java 11 it does not even emit in compiler warnings about it. However, with all these type inference we ended up not specifying the generic types at all, and the type will be `Map<Object, Object>`.

Of course, this can be solved easily by removing the Diamond Operator:

```
var myMap = new HashMap<String, String>();
```

Another set of problems can arise when `var` is used with primitive data types:

```
byte   b = 1;
short  s = 1;
int    i = 1;
long   l = 1;
float  f = 1;
double d = 1;
```

Without explicit type declaration, the type of all these variables would be inferred to `int`. Use type literals (e.g. `1L`) when working with primitive data types, or don’t use `var` in this case at all.

### ⚠️ Tip: Make sure to read the official style guides

It’s ultimately up to you to decide when to use type inference and make sure that it does not hurt readability and correctness. As a rule of thumb, sticking to good programming practices, such as good naming and minimizing the scope of local variables certainly helps a lot. Make sure to read the official [style guide](https://openjdk.java.net/projects/amber/LVTIstyle.html) and [FAQ](https://openjdk.java.net/projects/amber/LVTIFAQ.html) about `var`.

Because `var` has so many gotchas, it’s great that it was introduced conservatively and can only be used on local variables, which scope is usually pretty limited.

Also, it has been introduced cautiously, **`var` is not a new keyword but a reserved type name**. This means that it only has special meaning when it’s used as a type name, everywhere else `var` is continuing to be a valid identifier.

Currently, `var` does not have an immutable counterpart (such as `val` or `const`) to declare a final variable and infer its type with a single keyword. Hopefully, we’ll get it in a future release, until then, we can resort to `final var`.

Resources:

- [First Contact With ‘var’ In Java 10](https://blog.codefx.org/java/java-10-var-type-inference/)
- [26 Items for Dissecting Java Local Variable Type Inference (Var Type)](https://dzone.com/articles/var-work-in-progress)
- [Java 10: Local Variable Type Inference](https://www.journaldev.com/19871/java-10-local-variable-type-inference)

## Allow private methods in interfaces

**Available since:** [JDK 9](https://openjdk.java.net/jeps/213) (Milling Project Coin)

Since Java 8 it is possible to add default methods to interfaces. With Java 9 these default methods can even call private methods to share code in case you are in a need for reuse, but do not want to expose functionality publicly.

Although it’s not a huge deal, it’s a logical addition that allows to tidy up code in default methods.

## Diamond operator for anonymous inner classes

**Available since:** [JDK 9](https://openjdk.java.net/jeps/213) (Milling Project Coin)

Java 7 introduced the Diamond Operator (`<>`) to reduce verbosity by letting the compiler infer the parameter types for constructors:

```
List<Integer> numbers = new ArrayList<>();
```

However, this feature did not work with anonymous inner classes before. According to the [discussion on the project’s mailing list](http://mail.openjdk.java.net/pipermail/coin-dev/2011-June/003283.html) this was not added as part of the original Diamond Operator feature, because it required a substantial JVM change.

With Java 9, this small rough edge is removed, making the operator more universally applicable:

```
List<Integer> numbers = new ArrayList<>() {
    // ...
}
```

## Allow effectively-final variables to be used as resources in try-with-resources statements

**Available since:** [JDK 9](https://openjdk.java.net/jeps/213) (Milling Project Coin)

Another enhancement introduced by Java 7 is the `try-with-resources`, which frees the developer from having to worry about releasing resources.

To illustrate its power, first consider the effort made to properly close a resource in this typical pre-Java 7 example:

```
BufferedReader br = new BufferedReader(...);
try {
    return br.readLine();
} finally {
    if (br != null) {
        br.close();
    }
}
```

With `try-with-resources` resources can be automatically released, with much less ceremony:

```
try (BufferedReader br = new BufferedReader(...)) {
    return br.readLine();
}
```

Despite its power, `try-with-resources` had a few shortcomings that Java 9 addressed.

Although this construct can handle multiple resources, it can easily make the code harder to read. Declaring variables like this in a list after the `try` keyword is a bit unconventional compared to the usual Java code:

```
try (BufferedReader br1 = new BufferedReader(...);
    BufferedReader br2 = new BufferedReader(...)) {
    System.out.println(br1.readLine() + br2.readLine());
}
```

Also, in the Java 7 version, if you already have a variable that you want to handle with this construct, you had to introduce a dummy variable. (For an example, see [JDK-8068948](https://bugs.openjdk.java.net/browse/JDK-8068948).)

To mitigate these criticisms, `try-with-resources` was enhanced to handle final or effectively final local variables in addition to newly created ones:

```
BufferedReader br1 = new BufferedReader(...);
BufferedReader br2 = new BufferedReader(...);
try (br1; br2) {
    System.out.println(br1.readLine() + br2.readLine());
}
```

In this example, the initialization of the variables is separated from their registration to the `try-with-resources` construct.

### ⚠️ Tip: Watch out for released resources

One caveat to keep in mind is that now it’s possible to reference variables that are already released by `try-with-resources`, which, in most cases will fail:

```
BufferedReader br = new BufferedReader(...);
try (br) {
    System.out.println(br.readLine());
}
br.readLine(); // Boom!
```

## Underscore is no longer a valid identifier name

**Available since:** [JDK 9](https://openjdk.java.net/jeps/213) (Milling Project Coin)

[In Java 8](https://bugs.java.com/bugdatabase/view_bug.do?bug_id=8005852), the compiler emits a warning when ‘_’ is used as an identifier. Java 9 took this a step further making the sole underscore character illegal as an identifier, reserving this name to have special semantics in the future:

```
int _ = 10; // Compile error
```

## Improved Warnings

**Available since:** [JDK 9](https://openjdk.java.net/jeps/211)

Finally, let’s say a word about the changes related to the compiler warnings in newer Java versions.

Now it’s possible to annotate a private method with `@SafeVarargs` to mark a `Type safety: Potential heap pollution via varargs parameter` warning false positive. (In fact, this change is part of the previously discussed [JEP 213: Milling Project Coin](https://openjdk.java.net/jeps/213)). Read more about [Varargs](https://docs.oracle.com/javase/8/docs/technotes/guides/language/varargs.html), [Generics](https://docs.oracle.com/javase/8/docs/technotes/guides/language/generics.html) and [the potential probems](https://docs.oracle.com/javase/tutorial/java/generics/nonReifiableVarargsType.html) that can arise by combining these features in the official documentation.

Also since [Java 9](https://openjdk.java.net/jeps/211), the compiler does not issue a warning for import statements when a deprecated type is imported. These warnings were uninformative and redundant since a separate warning is always displayed at the actual usage of the deprecated members.

## What’s next: Preview features in Java 15

Java 15 has 3 preview features that can be enabled with the `--enable-preview -source 15`flags. Most likely they are the next improvements to the Java language. Here’s short teaser.

### Records

[Records](https://openjdk.java.net/jeps/359) introduce a new type declaration to the language, providing compact syntax to create data classes. Instead of the usual ceremony with private fields, getters, setters and constructors, it allows us to use a terse definition to create data structures:

```
record Point(int x, int y) { }
```

I can’t wait for this to become a standard feature supported by popular libraries and frameworks!

### Pattern Matching for instanceof

In most cases, `instanceof` is usually followed by a cast:

```
if (obj instanceof String) {
    String s = (String) obj;
    // use s
}
```

[JEP 305](https://openjdk.java.net/jeps/305) extends `instanceof` to make this typical scenario a bit less verbose:

```
if (obj instanceof String s) {
    // use s
}
```

### Sealed Classes

[JEP 360](https://openjdk.java.net/jeps/360) enhances adds sealed classes and interfaces to the language which can be used to restrict which other classes or interfaces may extend or implement them.

```
public abstract sealed class Shape
    permits Circle, Rectangle {...}

public class Circle extends Shape {...} // OK
public class Rectangle extends Shape {...} // OK
public class Triangle extends Shape {...} // Compile error
```

This feature also enhances switch expressions. As with enums, if the possible values are known compile time and all cases are handled, there’s no need to define a default branch.

```
double area = switch (shape) {
    case Circle c    -> Math.pow(c.radius(), 2) * Math.PI
    case Rectangle r -> r.a() * r.b()
};
```

## Summary

This post covered the improvements related to the Java language since Java 8. It’s important to keep an eye on the Java platform, as with the new rapid release cadence a new Java version is released every six months, delivering changes to the platform and to the language.
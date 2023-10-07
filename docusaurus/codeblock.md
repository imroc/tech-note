---
sidebar_position: 40.01
---

# 代码块

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## 显示行号

在元数据处加上 `showLineNumbers` 即可：

<Tabs>
<TabItem value="md" label="markdown 写法">

````md {1}
```go showLineNumbers
package main

import (
  "fmt"
)

func main() {
  for i := 0; i < 10; i++ {
    fmt.Println("hello world", i)
  }
}
```
````

</TabItem>

<TabItem value="go" label="效果">

```go showLineNumbers
package main

import (
  "fmt"
)

func main() {
  for i := 0; i < 10; i++ {
    fmt.Println("hello world", i)
  }
}
```

</TabItem>
</Tabs>

## 高亮行

### 单行

使用 `highlight-next-line` 注释：

<Tabs>
<TabItem value="md" label="markdown 写法">

````md {10}
```go showLineNumbers
package main

import (
  "fmt"
)

func main() {
  for i := 0; i < 10; i++ {
    // highlight-next-line
    fmt.Println("hello world", i)
  }
}
```
````

</TabItem>

<TabItem value="go" label="效果">

```go showLineNumbers
package main

import (
  "fmt"
)

func main() {
  for i := 0; i < 10; i++ {
    // highlight-next-line
    fmt.Println("hello world", i)
  }
}
```

</TabItem>
</Tabs>

### 多行

使用 `highlight-start` 和 `highlight-end` 注释：

<Tabs>
<TabItem value="md" label="markdown 写法">

````md {9,13}
```go showLineNumbers
package main

import (
  "fmt"
)

func main() {
  // highlight-start
  for i := 0; i < 10; i++ {
    fmt.Println("hello world", i)
  }
  // highlight-end
}
```
````

</TabItem>

<TabItem value="go" label="效果">

```go showLineNumbers
package main

import (
  "fmt"
)

func main() {
  // highlight-start
  for i := 0; i < 10; i++ {
    fmt.Println("hello world", i)
  }
  // highlight-end
}
```

</TabItem>
</Tabs>

### 在元数据中指定高亮的行

在元数据处加上要高亮的指定行号：

<Tabs>
<TabItem value="md" label="markdown 写法">

````md {1}
```go showLineNumbers {4,8-10}
package main

import (
  "fmt"
)

func main() {
  for i := 0; i < 10; i++ {
    fmt.Println("hello world", i)
  }
}
```
````

</TabItem>

<TabItem value="go" label="效果">

```go showLineNumbers {4,8-10}
package main

import (
  "fmt"
)

func main() {
  for i := 0; i < 10; i++ {
    fmt.Println("hello world", i)
  }
}
```

</TabItem>
</Tabs>

## 高亮行(新增样式)

### 单行

使用 `highlight-add-line` 注释：

<Tabs>
<TabItem value="md" label="markdown 写法">

````md {10}
```go showLineNumbers
package main

import (
  "fmt"
)

func main() {
  for i := 0; i < 10; i++ {
    // highlight-add-line
    fmt.Println("hello world", i)
  }
}
```
````

</TabItem>

<TabItem value="go" label="效果">

```go showLineNumbers
package main

import (
  "fmt"
)

func main() {
  for i := 0; i < 10; i++ {
    // highlight-add-line
    fmt.Println("hello world", i)
  }
}
```

</TabItem>
</Tabs>

### 多行

使用 `highlight-add-start` 和 `highlight-add-end` 注释：

<Tabs>
<TabItem value="md" label="markdown 写法">

````md {9,13}
```go showLineNumbers
package main

import (
  "fmt"
)

func main() {
  // highlight-add-start
  for i := 0; i < 10; i++ {
    fmt.Println("hello world", i)
  }
  // highlight-add-end
}
```
````

</TabItem>

<TabItem value="go" label="效果">

```go showLineNumbers
package main

import (
  "fmt"
)

func main() {
  // highlight-add-start
  for i := 0; i < 10; i++ {
    fmt.Println("hello world", i)
  }
  // highlight-add-end
}
```

</TabItem>
</Tabs>

## 高亮行(修改样式)

### 单行

使用 `highlight-update-line` 注释：

<Tabs>
<TabItem value="md" label="markdown 写法">

````md {10}
```go showLineNumbers
package main

import (
  "fmt"
)

func main() {
  for i := 0; i < 10; i++ {
    // highlight-update-line
    fmt.Println("hello world", i)
  }
}
```
````

</TabItem>

<TabItem value="go" label="效果">

```go showLineNumbers
package main

import (
  "fmt"
)

func main() {
  for i := 0; i < 10; i++ {
    // highlight-update-line
    fmt.Println("hello world", i)
  }
}
```

</TabItem>
</Tabs>

### 多行

使用 `highlight-update-start` 和 `highlight-update-end` 注释：

<Tabs>
<TabItem value="md" label="markdown 写法">

````md {9,13}
```go showLineNumbers
package main

import (
  "fmt"
)

func main() {
  // highlight-update-start
  for i := 0; i < 10; i++ {
    fmt.Println("hello world", i)
  }
  // highlight-update-end
}
```
````

</TabItem>

<TabItem value="go" label="效果">

```go showLineNumbers
package main

import (
  "fmt"
)

func main() {
  // highlight-update-start
  for i := 0; i < 10; i++ {
    fmt.Println("hello world", i)
  }
  // highlight-update-end
}
```

</TabItem>
</Tabs>

## 多语言

<Tabs>
<TabItem value="mdx" label="markdown 写法">

````md
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="js" label="JavaScript">

```js
function helloWorld() {
  console.log('Hello, world!');
}
```

</TabItem>
<TabItem value="py" label="Python">

```py
def hello_world():
  print("Hello, world!")
```

</TabItem>
<TabItem value="java" label="Java">

```java
class HelloWorld {
  public static void main(String args[]) {
    System.out.println("Hello, World");
  }
}
```

</TabItem>
</Tabs>
````

</TabItem>

<TabItem value="go" label="效果">

<Tabs>
<TabItem value="js" label="JavaScript">

```js
function helloWorld() {
  console.log('Hello, world!');
}
```

</TabItem>
<TabItem value="py" label="Python">

```py
def hello_world():
  print("Hello, world!")
```

</TabItem>
<TabItem value="java" label="Java">

```java
class HelloWorld {
  public static void main(String args[]) {
    System.out.println("Hello, World");
  }
}
```

</TabItem>
</Tabs>

</TabItem>
</Tabs>


## 参考资料

* [Docusaurus Code blocks](https://docusaurus.io/docs/3.0.0-beta.0/markdown-features/code-blocks)

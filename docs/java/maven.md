# Maven

## 配置 Maven

### 本地缓存指向数据盘目录

```xml title="~/.m2/settings.xml"
<settings>
  <localRepository>/data/maven</localRepository>
</settings>
```

## 使用 Maven 创建 Java 项目

```bash
mvn archetype:generate "-DgroupId=com.demo.hello" "-DartifactId=helloworld" "-DarchetypeArtifactId=maven-archetype-quickstart" "-DinteractiveMode=false"
```

## 下载依赖到本地缓存

```bash
mvn dependency:copy-dependencies
```

## 运行指定的 Main Class

```bash
mvn clean compile  # 先编译代码
mvn exec:java -Dexec.mainClass="com.demo.hello.App" # 通过exec指令执行mainClass
mvn exec:java -Dexec.mainClass="com.demo.hello.App" -Dexec.args="arg0 arg1 arg2" # 需要传递参数的话，通过-Dexec.args 指定
```

## 打包 jar

目标：
1. 打包出来的 jar 可直接通过 `java -jar xx.jar` 运行，无需指定 mainClass。
2. 将依赖包也一起打包，避免因环境中 classpath 里没安装相关依赖导致无法运行。

修改 `pom.xml` （注意高亮部分）：

<Tabs>
  <TabItem value="1" label="方式一">
    <FileBlock file="java/package-jar-pom-1.xml" showLineNumbers />
  </TabItem>
  <TabItem value="2" label="方式二">
    <FileBlock file="java/package-jar-pom-2.xml" showLineNumbers />
  </TabItem>
</Tabs>

然后执行打包：

```bash
mvn clean package
```

最终 jar 包会在 target 目录下生成。

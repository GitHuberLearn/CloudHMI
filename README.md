<!--
 * @Descripttion: Sustainable
 * @version: 2.0.0
 * @Author: Kenny
 * @Date: 2022-10-08 15:53:31
 * @LastEditors: ~
 * @LastEditTime: 2025-07-04 12:44:52
-->
# CloudHMI：云页面 2022-10-08 - xx20xx-xx-xx

```bash
# 计划：实现动态接口改利调息
# 功能
+ 作为部署云机界面独立页面
* 加入layui
* 添加自定义日期功能
* 引入sass
* 现金利息流
# URL
- 生产：http://cloudhmi.s3-website-us-east-1.amazonaws.com
- 测试：x
- 本地：http://127.0.0.1:5501
```

## 项目开发

### 运行

```bash
- 1.  一般的用工具 Vscode 导入根目录建立项目使用 serve 启动
    Live Server › Settings: Multi Root Workspace Name (清空用了选择工作区)
- 2.安装sass:npm install -g sass
- 2.1  编译scss：sass xx.scss xx.css
- 2.2 监视编译：sass --watch xx.scss:xx.css
```

### 发布

```bash
# 构建环境
- 亚马逊云S3
```

### 使用

```shell
### CloudHMI 介绍
xxx（组件名称）
├── CloudHMI 
│   └── view// 界面
│   └── js // 方法
```

### 代码提交

```bash
- * x
```

## 项目里程碑 2022-10-08 ~

### 项目(xx)明细 2022-10-08 ~

```bash
# 总控
- main：2022-10-08 ING
* 来源：自创
# 版本
## main1.0（2022-10-08 ~ 2025-06-09)
+ 添加悬浮title，log()
+ 深化净现率
+ 添加本息计算功能
## main2.0（2025-06-10 ~ 2025-07-xx)
+ 实现动态接口apifox改利调息
+ 添加图例选择功能

⭐ 状态说明
- ING：属于进行中，未合并到master
- DONE：完成状态，已经合并到master
- DONE-MOCK：完成状态，仅是模拟数据
- PAUSE：暂停状态
```

## 技术支持

### 开发技术说明

```bash
- 基于 jQuery v3.2.1
- 基于 layui v2.11.2
```

### 相关Code

```js
//message
layer.msg('value');
```

### 交流

QQ 群：xx

![QQ群](x.png)

![渲染海报](x.png)

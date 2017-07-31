# node


#### 这是一个便利贴网站

#### 这是一个简单的个人便利贴网站，支持添加，修改，删除功能，支持便利贴的随意拖动，拥有数据库。

#### 使用步骤（首先确保已经安装了node.js）

1. git clone git@github.com:JiangNJ/node.git
2. cd note
3. npm start
4. 在浏览器的地址栏输入localhost:3000
5. 退出在命令行工具中输入ctrl+c

使用express框架搭建整个网站的结构，工程化使用了webpack，编写代码运用了面向对象和模块化的方式让代码之间的耦合性减少，提高复用性，库使用了jQuery，数据库选用了sequelize，布局使用了瀑布流布局，通过监听修改，添加，删除便利贴的操作向对应的路由发送数据实现数据库的更新，通过使用发布订阅模式的思路实现一个事件中心的模块，来监听添加，删除，修改便利贴的操作实现自动瀑布流布局和对应的提示。便利贴的样式使用了css3的transform对伪元素元素进行缩放旋转，border-radius将圆角改变，再配合阴影实现便利贴的外翻卷脚效果。

处理这个项目时遇到各种问题：
1.ejs渲染模版无法引入压缩后的js文件，在论坛中找到原因，在view目录下只是视图，渲染之后localhost:3000直接就指向了public，引入的地址就要发生改变
2.引入sequelize里的sQlite3数据库，并不熟悉数据库的操作，根据sequelize的简介大致完成，但是仍然留有bug，待填
3.运用webpack压缩解析less的过程出现问题，less无法正常的解析压缩，后在webpack官网中了解到less的解析压缩要通过插件"style-loader" , "css-loader" , "less-loader"，一层层的解析压缩才能完成

项目总结：在线便利贴的项目已经大致完成，除后续的数据库的问题待解决，此次项目使我更加了解webpack的运行机制，express的模版使用。由于该项目有路由和中间件的配置，所以让我更加清晰的了解到后端处理请求的逻辑以及和后端协作需要约定的规则。比较遗憾的就是没有发布上线，只是将项目提交到了github上，为了避免通过npm安装依赖模块出现问题，将所有的模块都提交上来了，所以整个文件有些大。
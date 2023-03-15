接口文档
http://39.98.123.211:8170/swagger-ui.html
http://39.98.123.211:8216/swagger-ui.html

http://39.98.123.211:8510/swagger-ui.html#/

这个项目由于时间和接口原因就不做了

记录下业务相关

# element-UI基础

## 组件插槽

作用域插槽可以将子组件数据给父组件

数据传输方向父组件到子组件

传输的数据是HTML结构

# 三级联动

## 核心1

组件挂载完成发送一级筛选条件

一级筛选条件改变，清空二三级筛选条件

```
category2Id = category3Id = 0
```

同时携带category1Id发送请求获取二级分类菜单

```
this.getcategory(category1Id)
```

同理：修改二级筛选条件，清空三级，并重新发送

注意：这里判断筛选条件改变的是@change其是组件自定义事件（具体使用暂时没在官网找到）

## 核心二

若第三级筛选条件确定，那么应该拿去数据进行展示设计组件传参。传递给父亲三级分类的id（每确定一个就给父亲发送一个）

![image-20230308160745723](C:\Users\hang\AppData\Roaming\Typora\typora-user-images\image-20230308160745723.png)

子-》父

自定义事件

# 动态权限（路由）






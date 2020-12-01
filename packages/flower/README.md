# 樱花
这是基于 React + Canvas 画的一朵樱花。
## canvas
首先需要了解一些 canvas 的概念。使用 `<canvas></canvas>` 会创建一块画布，我们可以在这个上面绘制内容。
```js
var canvas = document.getElementById('tutorial');
//获得 2d 上下文对象
var ctx = canvas.getContext('2d');
```
### 绘制路径
一般来说，canvas 创建的画布以左上角作为原点(0, 0)。

我们使用 `beginPath` 来创建一条路径。然后用 `moveTo` 移动到起始点坐标，用 `closePath` 闭合路径。

可以使用 `stroke` 来绘制图形轮廓，用 `fill` 来绘制填充内容。

```js
function draw(){
    var canvas = document.getElementById('tutorial');
    if (!canvas.getContext) return;
    var ctx = canvas.getContext("2d");
    ctx.beginPath(); //新建一条path
    ctx.moveTo(50, 50); //把画笔移动到指定的坐标
    ctx.lineTo(200, 50);  //绘制一条从当前位置到指定坐标(200, 50)的直线.
    //闭合路径。会拉一条从当前点到path起始点的直线。如果当前点与起始点重合，则什么都不做
    ctx.closePath();
    ctx.stroke(); //绘制路径。
}
draw();
```
### 绘制圆形
可以通过 `arc` 来绘制一个圆形，它接受四个参数，分别是圆形坐标、半径、开始弧度、结束弧度、顺逆时针。
`Math.PI` 就是数学上的圆周率π，一般是 3.1415926...

```js
function draw(){
    var canvas = document.getElementById('tutorial');
    if (!canvas.getContext) return;
    var ctx = canvas.getContext("2d");
    ctx.beginPath();
    ctx.arc(50, 50, 40, 0, Math.PI * 2, false);
    ctx.stroke();
}
draw();
```
### 弧度
弧度（rad）是数学上面的概念，一般是指从圆心拉了两条半径，这俩半径中间的圆弧，如果它的长度和半径相等，那么这个角度就是一弧度。

一般来说，一个圆有 `2 * π` 个弧度，也是因为圆周长是 `2πR`。
```js
const rad = 180 / π
```
### cos 和 sin
以前初中就学过这俩知识，对于一个直角三角形来说，cos 就是较长的直角边除以斜边，sin 则是较短的直角边除以斜边。

在 JavaScript 里面会接收弧度作为参数，所以需要手动转换度数为弧度。

```js
const cos = Math.cos(2 * rad)
const sin = Math.sin(2 * rad)
```
### 贝塞尔曲线
一般我们绘制贝塞尔曲线都是用的二次贝塞尔曲线，它有一个起始点、控制点、结束点三个坐标来决定的。

感兴趣的可以看一下这篇文章：[怎么理解贝塞尔曲线？](https://www.zhihu.com/question/29565629)

在 canvas 里面也提供了 `quadraticCurveTo(cp1x, cp1y, x, y)` 方法来绘制曲线。

## 开始绘制
了解完上面的知识后，开始绘制我们的樱花。首先要知道，樱花包含花瓣和花蕊两部分，花蕊在花瓣正中间。

我们考虑用粉红色来绘制花瓣，用白色绘制花蕊。参考的图片是 `assets/image/樱花.png`。

樱花有五瓣，所以一瓣的夹角是 75°，也就是 `75 / rad` 弧度。

首先我们需要声明一个樱花类，它有半径、圆心坐标、颜色等属性。接着开始绘制。

```js
class Flower {
  r = r;
  color = color;
  cx = 800;
  cy = 500;
}
```
绘制最麻烦的一步就是花瓣的弧度，这是个贝塞尔曲线。观察图片，我们可以以花瓣凹进去的三角形（剪刀形状）到圆心距离作为半径，以剪刀两边的作为一个贝塞尔曲线的控制点。

那么这个控制点的坐标是什么呢？这主要是个比例的问题
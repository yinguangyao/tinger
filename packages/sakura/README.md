# 落樱效果
这是一个可爱的粉红色的樱花效果，项目是用 React 来写的。
## 制作流程
### 先画一朵樱花
第一步就是先画一朵樱花瓣，我们目标效果就是 `/assets/image/樱花.png` 那样的效果。
1. 首先画一个正方形的 div。
```
<div className="sakura"></div>
```
2. 设置这个正方形的 `border-radius`，左上和右下都设置为0，左下和右上都设置为 100%，这样得到一个类椭圆形。
```
.sakura {
  border-radius: 0 100%; // 100%是相当于宽度的
}
```
3. 再画一个一样的图形（两者是覆盖的），但是这个图形相对于右下角绕着Z轴旋转15度，就可以形成一个花瓣。
```
.sakura {
  position: relative;
  width: 20px;
  height: 20px;
  border-radius: 0% 100%;
  background: #fcc;
   
  &::before {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    background: #fcc;
    border-radius: 0% 100%;
    transform-origin: 100% 100%; // 相对于右下角
    transform: rotateZ(15deg);
  }
}
```
### 花瓣掉落
接着要实现花瓣掉落效果，其实这个动画比较容易实现。通过 translateY 就可以将花瓣从顶部移动到底部。
```
@keyframes drop {
  0% {
    transform: translateY(0);
  }
  
  100% {
    transform: translateY(1200px);
  }
}
```
花瓣只从上往下掉也挺无聊的，我们再给她加上旋转效果。让它沿着 Y轴和Z轴旋转360度。
```
.rotate {
  animation: rotateY 2s linear infinite;
}
@keyframes rotateY {
  0% {
    transform: rotateZ(0) rotateY(0deg);
  }
  
  100% {
    transform: rotateZ(0) rotateY(360deg);
  }
}

.reverse {
  animation: rotateZ 10s linear infinite reverse;
}

@keyframes rotateZ {
  0% {
    transform: rotateZ(0deg);
  }
  
  100% {
    transform: rotateZ(360deg);
  }
}
```
目前我们的 html 结构是这样的：
```
<div className={style.drop}>
    <div className={style.reverse}>
      <div className={style.rotate}>
        <div className={style.sakura}>
        </div>
      </div>
    </div>
</div>
```
### 花瓣飘动
只是掉落的效果也过于单调，为什么不能随风飘动呢？不如给花瓣加个移动效果。
加上一个从左移动到右边的动画效果。
```
.slide {
  position: absolute;
  top: 0;
  left: 0;
  animation: slide 8s linear infinite;
}
@keyframes slide {
  0% {
    transform: translateX(-2000px);
  }
  
  100% {
    transform: translateX(2000px);
  }
}
```
现在各种特效都已经有了，但只有一个花瓣，是不是太枯燥了点儿？那么给它随机生成200个吧。
在 React 里面用 map 来生成200个花瓣。
```
[...Array(200)].map((item, i) => {
  return <div className={style.sakura}></div>
}
```
但现在这200个花瓣都重叠在一起了，我想要它们满足下面这几点：
1. 大小应该是随机的，一样大就缺少美感
2. 出生位置不一样，主要是 left 值不一样，不然都叠在了左边
3. 掉落速度不一样，不然我就只能看到一条横线

实现起来也很简单，sass本来就支持对css子元素遍历，那么我们用子元素选择器（nth-child)给它一个缩放。
```
 @for $i from 1 through 200 {
    &:nth-child(#{$i}) {
      .size {
        transform: scale(random(2) + 1);
      }
    }
 }
```
这样很好，200个花瓣大小已经不一样了，接着就随机设置 left 和掉落速度。
```
@for $i from 1 through 200 {
    &:nth-child(#{$i}) {

      // 设置 left
      left: random(100) + 0%;
      animation-delay: random(9999) * -1ms;
      animation-duration: random(8) + 5s;

      // 设置移动速度
      .slide {
        animation-delay: random(9999) * -1ms;
        animation-duration: random(10) + 5s;
      }
      // 设置缩放
      .size {
        transform: scale(random(2) + 1);
      }
      // 设置旋转速度
      .rotate {
        animation-delay: random(9999) * -1ms;
        animation-duration: random(4) + 1s;
      }
    }
}
```
这样我们就已经实现了很不错的樱花效果。
### 3D 视图
现在这样已经很完美了，但我还想实现一个花瓣由远及近的效果，看着更加真实生动。
这样，思考一下，不如对200个花瓣的容器绕着Y轴旋转，这样比起绕X轴旋转更加有风吹的效果。
```
@keyframes cameraY {
  0% {
    transform: rotateY(0deg);
  }
  
  100% {
    transform: rotateY(360deg);
  }
}
```
最终，我们实现了一个樱花随风掉落的效果。
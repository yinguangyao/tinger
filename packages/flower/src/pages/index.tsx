import React, { useLayoutEffect, createRef } from 'react'

const w = document.documentElement.clientWidth;
const h = document.documentElement.clientHeight;

const rad = 180 / Math.PI; // 一弧度
const part = 360 / 5; // 樱花有五瓣
const r = 150; // 半径
const color = "hsl(2,70%,90%)";

class Flower {
  r = r;
  color = color;
  cx = w / 2;
  cy = h / 2;
  ctx: CanvasRenderingContext2D
  constructor(ctx: CanvasRenderingContext2D) {
    this.ctx = ctx
  }
  drawFlower() {
    const { ctx, r, color} = this
    ctx.fillStyle = color
    const r1 = r * 1.3;
    for (let a = 0; a < 5; a++) {

      this.drawPetal(a, r1)
      this.drawAnthers(a, r1);
    }
  }
  drawPetal(a: number, R1: number) {
    const { ctx, cx, cy, r: R } = this
    ctx.strokeStyle = "#d9d9d9";
    ctx.fillStyle = color;
  
    const x0 = cx + R * Math.cos((a * part) / rad);
    const y0 = cy + R * Math.sin((a * part) / rad);
  
    const x1 = cx + R1 * Math.cos((a * part + 2 * part / 6) / rad);
    const y1 = cy + R1 * Math.sin((a * part + 2 * part / 6) / rad);
  
    const x2 = cx + R * Math.cos((a * part + 3 * part / 6) / rad);
    const y2 = cy + R * Math.sin((a * part + 3 * part / 6) / rad);
  
    const x3 = cx + R1 * Math.cos((a * part + 4 * part / 6) / rad);
    const y3 = cy + R1 * Math.sin((a * part + 4 * part / 6) / rad);
  
    const x4 = cx + R * Math.cos((a * part + part) / rad);
    const y4 = cy + R * Math.sin((a * part + part) / rad);
  
    // petal
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.quadraticCurveTo(x0, y0, x1, y1);
    ctx.lineTo(x2, y2);
    ctx.lineTo(x3, y3);
    ctx.quadraticCurveTo(x4, y4, cx, cy);
    ctx.fill();
    ctx.stroke();
  }
  drawAnthers(a: number, R1: number) {
    const { ctx, cx, cy, r: R } = this
    ctx.save();
    ctx.strokeStyle = "#fff";

    const ax0 = cx + R / 3 * Math.cos((a * part + 2 * part / 6) / rad);
    const ay0 = cy + R / 3 * Math.sin((a * part + 2 * part / 6) / rad);
    const ax1 = cx + R / 2 * Math.cos((a * part + 3 * part / 6) / rad);
    const ay1 = cy + R / 2 * Math.sin((a * part + 3 * part / 6) / rad);
    const ax2 = cx + R / 3 * Math.cos((a * part + 4 * part / 6) / rad);
    const ay2 = cy + R / 3 * Math.sin((a * part + 4 * part / 6) / rad);
    let ary = []
    // 如果半径大于40
    if (R > 40) {
      ary = [{
        x: ax0,
        y: ay0
      }, {
        x: ax1,
        y: ay1
      }, {
        x: ax2,
        y: ay2
      }];
    } else {
      ary = [{
        x: ax1,
        y: ay1
      }];
    }

    ctx.beginPath();
    for (let i = 0; i < ary.length; i++) {
      ctx.moveTo(cx, cy);
      ctx.lineTo(ary[i].x, ary[i].y);
      ctx.arc(ary[i].x, ary[i].y, 2, 0, 2 * Math.PI)
    }
    ctx.stroke();
    ctx.restore();
  }
}

export default function Index () {
  const ref = createRef<HTMLCanvasElement>()
  useLayoutEffect(() => {
    const ctx = ref.current?.getContext('2d');
    const flower = new Flower(ctx!);
    flower.drawFlower();
  }, [])
  return <canvas ref={ref} width={w} height={h}></canvas>
}
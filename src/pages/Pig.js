import React, { useEffect } from 'react'
import { Input } from 'antd'
const style = {
  height: '100%',
  width: '100%',
  backgroundColor: '#78bb7b',
}

const Pig = () => {
  const createTree = () => {
    const canvas = document.querySelector('canvas')
    // 获取 Canvas 元素
    const ctx = canvas.getContext('2d')
    canvas.width = window.innerWidth - 20 * devicePixelRatio
    canvas.height = window.innerHeight - 20 * devicePixelRatio

    /**
     * 平移
     */
    ctx.translate(canvas.width / 2, canvas.height)
    /**
     * 通过缩放实现反转坐标
     */
    ctx.scale(1, -1)

    // 绘制猪头
    ctx.beginPath()
    ctx.arc(100, 100, 80, 0, Math.PI * 2, false) // 绘制头部
    ctx.fillStyle = 'pink'
    ctx.fill()

    ctx.beginPath()
    ctx.arc(70, 80, 20, 0, Math.PI * 2, false) // 绘制左眼
    ctx.fillStyle = 'white'
    ctx.fill()

    ctx.beginPath()
    ctx.arc(130, 80, 20, 0, Math.PI * 2, false) // 绘制右眼
    ctx.fillStyle = 'white'
    ctx.fill()

    ctx.beginPath()
    ctx.arc(70, 80, 8, 0, Math.PI * 2, false) // 绘制左眼珠
    ctx.fillStyle = 'black'
    ctx.fill()

    ctx.beginPath()
    ctx.arc(130, 80, 8, 0, Math.PI * 2, false) // 绘制右眼珠
    ctx.fillStyle = 'black'
    ctx.fill()

    ctx.beginPath()
    ctx.arc(100, 120, 35, 0, Math.PI, false) // 绘制嘴巴
    ctx.fillStyle = 'pink'
    ctx.fill()

    ctx.beginPath()
    ctx.ellipse(100, 120, 25, 12, 0, 0, Math.PI * 2) // 绘制鼻子围绕的椭圆
    ctx.strokeStyle = 'black'
    ctx.lineWidth = 2
    ctx.stroke()

    ctx.beginPath()
    ctx.arc(92, 120, 4, 0, Math.PI * 2, false) // 绘制左鼻孔
    ctx.fillStyle = 'black'
    ctx.fill()

    ctx.beginPath()
    ctx.arc(108, 120, 4, 0, Math.PI * 2, false) // 绘制右鼻孔
    ctx.fillStyle = 'black'
    ctx.fill()
  }

  useEffect(() => {
    createTree()
    //  const timer =  setInterval(()=>{
    //     createTree()
    //   },2000)
    //   return ()=>{
    //     clearInterval(timer)
    //   }
  }, [])

  return (
    <div style={style}>
      {/* <Input/> */}
      <canvas id='tree'></canvas>
    </div>
  )
}
export default Pig

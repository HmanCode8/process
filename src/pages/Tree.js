import React, { useEffect } from 'react'
import { Input } from 'antd'
import '../css/tree.css'

const Tree = () => {
  const createTree = () => {
    const canvas = document.querySelector('canvas')
    const ctx = canvas.getContext('2d')
    const mainEl = document.querySelector('.ant-layout-sider')
    canvas.width =window.innerWidth - 400 * devicePixelRatio
    canvas.height = 750 - 20 * devicePixelRatio
    /**
     * 平移
     */
    ctx.translate(canvas.width / 2, canvas.height)
    /**
     * 通过缩放实现反转坐标
     */
    ctx.scale(1, -1)

    /**
     *
     * @param {*} v0 起始坐标
     * @param {*} thick 树干的粗细
     * @param {*} length 树干的长度
     * @param {*} dirX 与X轴的夹角 （后面转换成弧度）
     */
    const drawBranch = (v0, thick, length, dirX) => {
      if (thick < 2 && Math.random() < 0.3) {
        return
      }
      if (thick < 2) {
        ctx.beginPath()
        ctx.arc(...v0, 3, 0, 2 * Math.PI)
        ctx.fillStyle = Math.random() > 0.3 ? (Math.random() < 0.5 ? '#d24545' : '#fff') : '#0f0'
        ctx.fill()
        return
      }
      ctx.beginPath()
      ctx.moveTo(...v0)
      /**
       * 通过夹角，三角函数
       */
      const v1 = [v0[0] + length * Math.cos((dirX * Math.PI) / 180), v0[1] + length * Math.sin((dirX * Math.PI) / 180)]
      ctx.lineTo(...v1)
      ctx.strokeStyle = '#333'
      ctx.lineCap = 'round'
      ctx.lineWidth = thick
      ctx.stroke()
      /**
       * 递归绘制左右fenzhi
       */
      drawBranch(v1, thick * 0.8, length * 0.8, dirX + Math.random() * 80)
      drawBranch(v1, thick * 0.8, length * 0.8, dirX - Math.random() * 80)
    }

    /**
     * 一开始就把树干绘制出来
     */
    drawBranch([0, 0], 30, 160, 90)
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
    <div className='tree'>
      {/* <Input/> */}
      
      <canvas id='tree'></canvas>
    </div>
  )
}
export default Tree

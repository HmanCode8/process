import React, { useState, useEffect } from 'react'
import '../css/carousel.css'

import img1 from '../images/1.png'
import img2 from '../images/2.png'
import img3 from '../images/3.png'
import img4 from '../images/4.png'
import img5 from '../images/5.png'
import img6 from '../images/6.png'
import img7 from '../images/7.png'
import img8 from '../images/8.png'

const imgs = [
  {
    title: ':在遥远的未来，科技的飞速发展让人类探索了前所未有的领域。',
    sorce: img1,
  },
  {
    title: '其中最引人瞩目的科技之一是机甲。',
    sorce: img2,
  },
  {
    title: '机甲是一种巨大而强大的机械装甲，',
    sorce: img3,
  },
  {
    title: '类似于人类的外骨骼，',
    sorce: img4, 
  },
  {
    title: '它将先进的工程学、人工智能和武器系统融合在一起，',
    sorce: img5,
  },
  {
    title: '为人类带来了前所未有的力量与机动性',
    sorce: img6,
  },
  {
    title: '为人类带来了前所未有的力量与机动性',
    sorce: img7,
  },
] // 创建图片数组
const imgLength = Math.floor(imgs.length / 2) // 计算图片数组长度的一半，用于初始化当前索引

const Carousel = () => {
  const [imgArr, setImgArr] = useState(imgs) // 创建状态，用于存储图片数组
  const [crrentIndex, setCrrentIndex] = useState(imgLength) // 创建状态，用于存储当前索引

  const changeTo = (key) => {
    if (crrentIndex === 0 || crrentIndex === imgs.length - 1) {
      // 当索引处于第一个或最后一个时，切换到中间的图片
      setCrrentIndex(imgLength)
      return
    }
    setCrrentIndex(crrentIndex - (key === 'next' ? 1 : -1)) // 根据键值切换索引
  }

  useEffect(() => {
    const handleKeyPress = (event) => {
      // 键盘事件监听器
      if (event.key === 'ArrowLeft') {
        // 按下左箭头键
        changeTo('prev')
      } else if (event.key === 'ArrowRight') {
        // 按下右箭头键
        changeTo('next')
      }
    }

    const timeid = setInterval(() => {
      changeTo(Math.random() * 10 > 5 ? 'next' : 'prev')
    }, 6000)

    // 在组件挂载时添加键盘事件监听
    document.addEventListener('keydown', handleKeyPress)

    // 在组件卸载时移除事件监听
    return () => {
      clearInterval(timeid)
      document.removeEventListener('keydown', handleKeyPress)
    }
  }) // 监听 crrentIndex 变化

  const styleFn = (index) => {
    // 计算图片样式的函数
    const sign = Math.sign(index - crrentIndex) // 判断图片相对于当前显示图片的位置，-1 表示在左侧，1 表示在右侧，0 表示当前显示的图片

    const offSetStep = 200 // 每张图片之间的水平偏移量
    const scaleStep = 0.8 // 图片缩放的步长
    const opacityStep = 0.8 // 图片透明度的步长
    const size = imgs.length // 图片数组的长度，用于计算层级（z-index）
    let xOffset = (index - crrentIndex) * offSetStep // 计算图片的水平偏移量
    if (index !== crrentIndex) {
      xOffset = xOffset + 250 * sign // 在非当前显示的图片上再次做一个调整，使其在左侧或右侧显示时稍微偏移
    }
    const scale = scaleStep ** Math.abs(index - crrentIndex) // 根据索引差值计算图片缩放比例
    const opacity = opacityStep ** Math.abs(index - crrentIndex) // 根据索引差值计算图片透明度
    const rotate = index === crrentIndex ? 0 : 60 * -sign // 根据位置来设置图片旋转角度，当前显示的图片无需旋转

    // 返回包含图片样式属性的对象
    return {
      transform: `translateX(${xOffset}px) scale(${scale}) rotateY(${rotate}deg)`,
      zIndex: size - Math.abs(crrentIndex - index), // 设置层级，当前显示的图片层级最高，其余根据与当前显示图片的位置关系逐渐降低
      opacity, // 设置透明度
    }
  }

  return (
    <div className='carousel'>
      <ul className='carousel-list'>
        {window._.map(imgArr, (m, index) => (
          <li
            style={styleFn(index)} // 应用样式
            key={index}
            className='carousel-item'
            onClick={() => {
              setCrrentIndex(index) // 切换索引到点击的图片
            }}
          >
            <div className={`img-text ${crrentIndex === index ? 'animation' : ''}`}>{m.title}</div>
            <img src={m.sorce} alt={'img' + index} />
          </li>
        ))}
        <div className='btn next' onClick={() => changeTo('next')}>
          &lt; {/* 向前切换按钮 */}
        </div>
        <div className='btn prev' onClick={() => changeTo('prev')}>
          &gt; {/* 向后切换按钮 */}
        </div>
      </ul>
    </div>
  )
}

export default Carousel

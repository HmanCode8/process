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

const imgs = [img1, img2, img3, img4, img5, img6, img7]
const imgLength = Math.floor(imgs.length / 2)

const Carousel = () => {
  const [imgArr, setImgArr] = useState(imgs)
  const [crrentIndex, setCrrentIndex] = useState(imgLength)

  const changeTo = (key) => {
    if (crrentIndex === 0 || crrentIndex === imgs.length - 1) {
      setCrrentIndex(imgLength)
      return
    }
    setCrrentIndex(crrentIndex - (key === 'next' ? 1 : -1))
  }

  useEffect(() => {
    const handleKeyPress = (event) => {
      // 按下左箭头键
      if (event.key === 'ArrowLeft') {
        changeTo('prev');
      }
      // 按下右箭头键
      else if (event.key === 'ArrowRight') {
        changeTo('next');
      }
    };

    // 在组件挂载时添加键盘事件监听
    document.addEventListener('keydown', handleKeyPress);

    // 在组件卸载时移除事件监听
    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }); // 监听 crrentIndex 变化

  const styleFn = (index) => {
    const sign = Math.sign(index - crrentIndex)

    const offSetStep = 100
    const scaleStep = 0.8
    const opacityStep = 0.8
    const size = imgs.length
    let xOffset = (index - crrentIndex) * offSetStep
    if (index !== crrentIndex) {
      xOffset = xOffset + 150 * sign
    }
    const scale = scaleStep ** Math.abs(index - crrentIndex)
    const opacity = opacityStep ** Math.abs(index - crrentIndex)
    const rotate = index === crrentIndex ? 0 : 60 * -sign
    return {
      transform: `translateX(${xOffset}px) scale(${scale}) rotateY(${rotate}deg)`,
      zIndex: size - Math.abs(crrentIndex - index),
      opacity,
    }
  }
  return (
    <div className='carousel'>
      <ul className='carousel-list'>
        {window._.map(imgArr, (m, index) => (
          <li
            style={styleFn(index)}
            key={index}
            className='carousel-item'
            onClick={() => {
              setCrrentIndex(index)
            }}
          >
            <img src={m} alt={'img' + index} />
          </li>
        ))}
        <div className='btn next' onClick={() => changeTo('next')}>
          &lt;
        </div>
        <div className='btn prev' onClick={() => changeTo('prev')}>
          &gt;
        </div>
      </ul>
    </div>
  )
}

export default Carousel

import React from 'react'
import '../css/carousel.css'

import img1 from '../images/1.png'
import img2 from '../images/2.png'
import img3 from '../images/3.png'
import img4 from '../images/4.png'

const imgs = [img1,img2, img3, img4]

const Carousel = () => {
  return (
    <div className='carousel'>
      <ul className='carousel-list'>
        {window._.map(imgs, (m,index) => (
          <li key={index} className='carousel-item'>
            <img src={m} alt={'img'+index} />
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Carousel

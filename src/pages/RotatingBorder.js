import React from 'react'
import '../css/rotaborder.css'


const RotatingBorder = () => {
  return (
    <div className='rota-border'>
      <button className='rota-btn' data-color='#0075ff'>
        按钮1
      </button>
      <button className='rota-btn' data-color='#ff0000'>
        按钮2
      </button>
      <button className='rota-btn' data-color='#00ff00'>
        按钮3
      </button>
    </div>
  )
}

export default RotatingBorder

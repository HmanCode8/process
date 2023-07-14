import React, { useEffect } from 'react'
import { Input } from 'antd'
const style = {
  height: '100%',
  width: '100%',
  backgroundColor: '#78bb7b',
}

const Pig = () => {

  return (
    <div style={style}>
      {/* <Input/> */}
      <canvas id='tree'></canvas>
    </div>
  )
}
export default Pig

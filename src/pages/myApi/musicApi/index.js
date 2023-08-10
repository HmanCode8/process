import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Col, Row, Input, Card } from 'antd'
import { SwapOutlined } from '@ant-design/icons'
import './index.css'
const { TextArea } = Input

const MusicApi = () => {
  //qq数据的状态存储
  const [oneValue, setOneValue] = useState('hello')
  const [twoValue, setTwoValue] = useState({})
  const getData = (val) => {
    axios.get(`https://api.vvhan.com/api/fy?text=${val}`).then((res) => {
      console.log('res',res.data.data)
      setTwoValue(res.data)
    })
  }


  const  oneValueChange = (e)=>setOneValue(e.target.value)


  useEffect(() => {
    getData(oneValue)
  }, [oneValue])
  console.log('twoValue',twoValue)
  const fanyi = twoValue.data&&twoValue.data.fanyi
  return (
    <div className='transp-box'>
      <Row style={{width:'100%',margin:'10px'}}>
        <Col span={10}>
          <TextArea rows={4} value={oneValue} onChange={oneValueChange}/>
        </Col>
        <Col span={2}>
          {twoValue.type}
          <SwapOutlined style={{ display: 'flex', justifyContent: 'center',fontSize:'30px' ,alignItems:'center',height: '100%'}} />
        </Col>
        <Col span={10}>
          <TextArea rows={4} value={fanyi}/>
        </Col>
        {/* <Col span={8}>
          <img src={`https://api.vvhan.com/api/qr?text=你好`} alt='img'/>
          <h2>{MusicData.fanyi}</h2>
        </Col> */}
      </Row>
    </div>
  )
}

export default MusicApi

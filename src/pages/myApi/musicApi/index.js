import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Col, Row, Input, Card,Spin  } from 'antd'
import './index.css'

const { Meta } = Card
const { Search } = Input;
const MusicApi = (props) => {
  //qq数据的状态存储
  const [MusicData, setMusicData] = useState({})
  const [value, setValue] = useState('1530829770')
  const getData = () => {
    axios.get(`https://api.vvhan.com/api/rand.music?type=json&sort=${value}`).then((res) => {
      console.log('res', res)
      setMusicData(res.data.info)
    })
  }
  
  const onSearch = (value) => setValue(value);

  useEffect(() => {
    axios.get(`https://api.vvhan.com/api/rand.music?type=json&sort=${value}`).then((res) => {
      console.log('res', res)
      setMusicData(res.data.info)
    })
  },[value])

  const video = <video src={MusicData.mp3url} width="" height="" controls></video>
  return (
    <div className='qq-box'>
      <Row>
        <Col span={8} style={{display:'flex',flexDirection: 'column',alignItems:'center',justifyContent:'center'}}>
        {/* <Search style={{ width: 304,margin: '10px 0' }} placeholder="inter you qq number" onSearch={onSearch} enterButton /> */}
          <Card hoverable style={{ width: 240 }} cover={<img alt='example' src={MusicData.picUrl} />}>
            {video}
              
            
            <Meta title={MusicData.name} description={MusicData.auther} />
          </Card>
        </Col>
        <Col span={8}>col-8</Col>
        <Col span={8}>col-8</Col>
      </Row>
    </div>
  )
}

export default MusicApi

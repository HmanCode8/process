import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Col, Row, Input, Card,Spin  } from 'antd'
import './index.css'

const { Meta } = Card
const { Search } = Input;
const QqApi = (props) => {
  //qq数据的状态存储
  const [qqData, setQqdata] = useState({})
  const [MusicData, setMusicData] = useState({})
  const [value, setValue] = useState('1530829770')
  const getQQData = (val) => {
    axios.get(`https://api.vvhan.com/api/qq?qq=${val}`).then((res) => {
      console.log('res', res)
      setQqdata(res.data)
    })
  }
  
  const getMusicData = (val) => {
    axios.get(`https://api.vvhan.com/api/rand.music?type=json&sort=${val}`).then((res) => {
      console.log('res', res)
      setMusicData(res.data.info)
    })
  }

  useEffect(()=>{
    getQQData(value)
    getMusicData()
  },[value])

  const onSearch = (value) => setValue(value);
  const video = <video src={MusicData.mp3url} width="" height="" controls></video>
  return (
    <div className='qq-box'>
      <Row>
        <Col span={8} style={{display:'flex',flexDirection: 'column',alignItems:'center',justifyContent:'center'}}>
        <Search style={{ width: 304,margin: '10px 0' }} placeholder="inter you qq number" onSearch={onSearch} enterButton />
          <Card hoverable style={{ width: 240 }} cover={<img alt='example' src={qqData.imgurl || <Spin />} />}>
            <Meta title={qqData.name} description={qqData.qemail} />
            <a href={qqData.qzone}>qq空间</a>
          </Card>
        </Col>
        <Col span={8} style={{display:'flex',flexDirection: 'column',alignItems:'center',justifyContent:'center'}}>
        <Col span={8} style={{display:'flex',flexDirection: 'column',alignItems:'center',justifyContent:'center'}}>
        {/* <Search style={{ width: 304,margin: '10px 0' }} placeholder="inter you qq number" onSearch={onSearch} enterButton /> */}
          <Card hoverable style={{ width: 240 }} cover={<img alt='example' src={MusicData.picUrl} />}>
            {video}
              
            
            <Meta title={MusicData.name} description={MusicData.auther} />
          </Card>
        </Col>
        </Col>
        <Col span={8} style={{display:'flex',flexDirection: 'column',alignItems:'center',justifyContent:'center'}}>为你留的位置</Col>
      </Row>
    </div>
  )
}

export default QqApi

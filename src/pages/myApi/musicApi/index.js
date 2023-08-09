import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Col, Row, Input, Card } from 'antd'
import './index.css'

const { Meta } = Card
const { Search } = Input
const MusicApi = () => {
  //qq数据的状态存储
  const [MusicData, setMusicData] = useState('')
  const [textData, setRextData] = useState({})
  const [value, setValue] = useState('hello')
  const getData = (val) => {
    axios.get(`https://api.vvhan.com/api/fy?text=${val}`).then((res) => {
      setMusicData(res.data.data)
    })
  }
  const getTextData = () => {
    axios.get('https://api.vvhan.com/api/en?type=sj').then((res) => {
      console.log('getTextData', res.data.data)
      setRextData(res.data.data)
    })
  }
  useEffect(() => {
    getTextData()
  }, [])
  useEffect(() => {
    getData(value)
  }, [value])
  const onSearch = (value) => setValue(value)

  return (
    <div className='qq-box'>
      <Row>
        <Col span={8} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <Search style={{ width: 304, margin: '10px 0' }} placeholder='inter you qq number' onSearch={onSearch} enterButton />
          <Card hoverable style={{ width: 240 }} cover={<img alt='example' src={textData.pic} />}>
            <Meta title={textData.en} description={textData.zh} />
          </Card>
        </Col>
        <Col span={8}>
          <h2>{MusicData.fanyi}</h2>
        </Col>
      </Row>
    </div>
  )
}

export default MusicApi

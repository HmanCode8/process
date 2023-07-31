import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Col, Row, Input, Card, Spin, Button } from 'antd'
import './index.css'

const { Meta } = Card
const { Search } = Input
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
    try {
      axios.get('https://api.vvhan.com/api/rand.music?type=json&sort=热歌榜').then((res) => {
        console.log('res', res)
        setMusicData(res.data.info)
        //获取video元素，然后绑定他的播放方法
        const video = document.getElementById('video')
        console.log('video', video)
        setTimeout(() => {
          video.play()
        }, 10)
      })
    } catch (error) {
      setTimeout(() => {
        getMusicData()
      }, 10)
    }
  }
  useEffect(() => {
    const handleKeyPress = (event) => {
    if (event.key === 'ArrowRight') {
        // 按下右箭头键
        getMusicData()
      }
    }

    
    // 在组件挂载时添加键盘事件监听
    document.addEventListener('keydown', handleKeyPress)

    // 在组件卸载时移除事件监听
    return () => {
      document.removeEventListener('keydown', handleKeyPress)
    }
  })

  useEffect(() => {
    const video = document.getElementById('video')

    video.addEventListener('ended', function () {
      // 在视频播放结束时执行的操作
      console.log('视频播放结束了！')
      getMusicData()
      // 或者执行其他的操作，比如自动切换到下一个视频等
    })
  })
  useEffect(() => {
    getQQData(value)
    getMusicData()
  }, [value])

  const nextMe = () => {
    getMusicData()
  }
  const onSearch = (value) => setValue(value)
  const videocom = <video id='video' src={MusicData.mp3url} width='' height='' controls></video>
  return (
    <div className='qq-box'>
      <Row>
        <Col span={8} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <Search style={{ width: 304, margin: '10px 0' }} placeholder='inter you qq number' onSearch={onSearch} enterButton />
          <Card hoverable style={{ width: 240 }} cover={<img alt='example' src={qqData.imgurl || <Spin />} />}>
            <Meta title={qqData.name} description={qqData.qemail} />
            <a href={qqData.qzone}>qq空间</a>
          </Card>
        </Col>
        <Col span={8} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <Col span={8} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            {/* <Search style={{ width: 304,margin: '10px 0' }} placeholder="inter you qq number" onSearch={onSearch} enterButton /> */}
            <Card hoverable style={{ width: 240 }} cover={<img alt='example' src={MusicData.picUrl} />}>
              {videocom}

              <Meta title={MusicData.name} description={MusicData.auther} />
            </Card>
          </Col>
        </Col>
        <Col span={8} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          为你留的位置<Button onClick={nextMe}>yes no or to next one </Button>
        </Col>
      </Row>
    </div>
  )
}

export default QqApi

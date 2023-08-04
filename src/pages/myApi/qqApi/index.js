import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Col, Row, Input, Card, Spin, Button } from 'antd'
import './index.css'
import _ from 'lodash'

const coloStyle = { display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }

const { Meta } = Card
const { Search } = Input
const QqApi = (props) => {
  //qq数据的状态存储
  const [qqData, setQqdata] = useState({})
  const [MusicData, setMusicData] = useState({})
  const [weatherData, setWeatherData] = useState({})
  const [value, setValue] = useState('1530829770')

  const getQQData = (val) => {
    axios.get(`https://api.vvhan.com/api/qq?qq=${val}`).then((res) => {
      setQqdata(res.data)
    })
  }

  const getMusicData = (val) => {
    try {
      axios.get('https://api.vvhan.com/api/rand.music?type=json&sort=热歌榜').then((res) => {
        setMusicData(res.data.info)
        //获取video元素，然后绑定他的播放方法
        const video = document.getElementById('video')
        // setTimeout(() => {
        //   video.play()
        // }, 10)
      })
    } catch (error) {
      setTimeout(() => {
        getMusicData()
      }, 10)
    }
  }
  const getWeatherData = (val) => {
    try {
      axios.get('https://api.vvhan.com/api/weather?city=广州&type=week').then((res) => {
        console.log('广州', res.data)
        setWeatherData(res.data)
      })
    } catch (error) {
      console.log('error', error)
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
      // console.log('视频播放结束了！')
      getMusicData()
      // 或者执行其他的操作，比如自动切换到下一个视频等
    })
  })

  useEffect(() => {
    getQQData(value)
  }, [value])

  useEffect(() => {
    getMusicData()
    getWeatherData()
  }, [])

  const nextMe = () => {
    getMusicData()
  }
  const onSearch = (value) => setValue(value)
  const videocom = <video id='video' src={MusicData.mp3url} width='' height='' controls></video>

   // 自定义比较函数，用于按星期一到星期日的顺序排序
   const compareDays = (day1, day2) => {
    const daysOrder = ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期日'];
    return daysOrder.indexOf(day1.week) - daysOrder.indexOf(day2.week);
  };

  // 按顺序排序数据
  const sortedData = weatherData.data.slice().sort(compareDays);
  return (
    <div className='qq-box'>
      <Row>
        {/* qq信息 */}
        <Col span={8} style={coloStyle}>
          <Search style={{ width: 304, margin: '10px 0' }} placeholder='inter you qq number' onSearch={onSearch} enterButton />
          <Card hoverable style={{ width: 240 }} cover={<img alt='example' src={qqData.imgurl || <Spin />} />}>
            <Meta title={qqData.name} description={qqData.qemail} />
            <a href={qqData.qzone}>qq空间</a>
          </Card>
        </Col>
        {/* 网易随机音乐 */}
        <Col span={8} style={coloStyle}>
          <Col span={8} style={coloStyle}>
            <Card hoverable style={{ width: 240 }} cover={<img style={{ height: '200px' }} alt='example' src={MusicData.picUrl} />}>
              {videocom}
              <Meta title={MusicData.name} description={MusicData.auther} />
            </Card>
          </Col>
        </Col>
        <Col span={8} style={coloStyle}>
          为你留的位置<Button onClick={nextMe}>yes no or to next one </Button>
        </Col>
      </Row>
      {/* 天气 */}

      <Row>
        <Col span={24} style={coloStyle}>
          {weatherData.city}
          <div className='weather-forecast'>
            {_.map(sortedData, (day, index) => (
              <div key={index} className='day-forecast'>
                <div className='day'>{day.week}</div>
                <div className='weather'>
                  <div>{day.type}</div>
                  <div>{`高温: ${day.high}，低温: ${day.low}`}</div>
                  <div>{`白天: ${day.fengxiang}${day.fengli}`}</div>
                  <div>{`夜晚: ${day.night.fengxiang}${day.night.fengli}`}</div>
                </div>
              </div>
            ))}
          </div>
        </Col>
      </Row>
    </div>
  )
}

export default QqApi

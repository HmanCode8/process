import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Col, Row, Input, Card, Spin, Select, Radio, Space,Alert, Calendar } from 'antd'
import dayjs from 'dayjs';
import './index.css'
import _ from 'lodash'
import { city } from '../../../menuConfig/citys'
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons'

const coloStyle = { display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }
const rootUrl = 'https://api.vvhan.com'

const { Meta } = Card
const { Search } = Input

// 自定义比较函数，用于按星期一到星期日的顺序排序
const compareDays = (day1, day2) => {
  const daysOrder = ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期日']
  return daysOrder.indexOf(day1.week) - daysOrder.indexOf(day2.week)
}

const QqApi = (props) => {
  //qq数据的状态存储
  const [qqData, setQqdata] = useState({})
  const [MusicData, setMusicData] = useState({})
  const [weatherData, setWeatherData] = useState({})
  const [oneweatherData, setOneWeatherData] = useState({})
  const [textData, setRextData] = useState({})
  const [value, setValue] = useState('1530829770')
  const [cityVal, setCityVal] = useState('广州市')
  const [musicVal, setMusicVal] = useState('热歌榜')
  const [cityChildList, setCityChildList] = useState([])

  const [timeValue, setTimeValue] = useState(() => dayjs(Date.now()));
  const [selectedValue, setSelectedValue] = useState(() => dayjs('2017-01-25'));

  /**
   * qq信息api
   * @param {*} val
   */
  const getQQData = (val) => {
    axios.get(`${rootUrl}/api/qq?qq=${val}`).then((res) => {
      setQqdata(res.data)
    })
  }

  /**
   * 网易云音乐api
   * @param {*} val
   */
  const getMusicData = (val) => {
    try {
      axios.get(`${rootUrl}/api/rand.music?type=json&sort=${val}`).then((res) => {
        setMusicData(res.data.info)
        //获取video元素，然后绑定他的播放方法
        const video = document.getElementById('video')
        // setTimeout(() => {
        //   video.play()
        // }, 10)
      })
    } catch (error) {
      setTimeout(() => {
        getMusicData(musicVal)
      }, 10)
    }
  }
  /**
   * 获取天气数据
   * @param {*} val
   */
  const getWeatherData = (val) => {
    try {
      axios.get(`${rootUrl}/api/weather?city=${cityVal}&type=week`).then((res) => {
        const dataList = res.data
        setWeatherData(dataList)

        axios.get(`${rootUrl}/api/weather?city=${cityVal}`).then((res) => {
          setOneWeatherData(res.data.info)
        })
      })
    } catch (error) {
      console.log('error', error)
    }
  }
  /**
   * 获取格言数据
   */
  const getTextData = () => {
    axios.get(`${rootUrl}/api/en?type=sj`).then((res) => {
      setRextData(res.data.data)
    })
  }

  useEffect(() => {
    getTextData()
  }, [])

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === 'ArrowRight') {
        // 按下右箭头键
        getMusicData(musicVal)
      }
    }

    // 在组件挂载时添加键盘事件监听
    document.addEventListener('keydown', handleKeyPress)

    const video = document.getElementById('video')
    video.addEventListener('ended', function () {
      getMusicData(musicVal)
    })
    // 在组件卸载时移除事件监听
    return () => {
      document.removeEventListener('keydown', handleKeyPress)
    }
  })

  useEffect(() => {
    getQQData(value)
  }, [value])

  useEffect(() => {
    getMusicData(musicVal)
  }, [musicVal])
  useEffect(() => {
    getWeatherData(cityVal)
  }, [cityVal])

  const onSearch = (value) => setValue(value)

  // 按顺序排序数据
  const sortedData = _.slice(weatherData.data).sort(compareDays)
  // 省区数据重新
  const nextCitys = _.map(city, (c) => ({ value: c.province, label: c.province }))

  const selectOnChange = (value) => {
    const cityData = _.map(_.find(city, (c) => c.province === value).citys, (p) => ({ value: p.city, label: p.city }))
    setCityChildList(cityData)
  }
  const selectChildOnChange = (value) => {
    setCityVal(value)
  }
  const videocom = (
    <div>
      <video id='video' src={MusicData.mp3url} width='' height='' controls></video>
      {/* <Button o  nClick={nextMe}>yes no or to next one </Button> */}
    </div>
  )

  const qqMessageJum = ()=>{
    axios.get(`https://api.vvhan.com/api/qqCard?qq=${value}`).then((res) => {
      console.log('qqCard',res)
    })
  }

  const onTimeSelect = (newValue) => {
    setTimeValue(newValue);
    setSelectedValue(newValue);
  };

  const onTimePanelChange = (newValue) => {
    setTimeValue(newValue);
  };

  return (
    <div className='qq-box'>
      <Row>
        {/* qq信息 */}
        <Col span={8} style={coloStyle}>
          <Search style={{ width: 304, margin: '10px 0' }} placeholder='inter you qq number' onSearch={onSearch} enterButton />
          <Card
            hoverable
            style={{ width: 240 }}
            cover={<img alt='example' src={qqData.imgurl || <Spin />} />}
            actions={[<a href={qqData.qzone}>qq空间</a>, <EditOutlined key='edit' onClick={qqMessageJum} />, <EllipsisOutlined key='ellipsis' />]}
          >
            <Meta title={qqData.name} description={qqData.qemail} />
          </Card>
        </Col>
        {/* 网易随机音乐 */}
        <Col span={8} style={{ ...coloStyle, flexDirection: 'row' }}>
          <Radio.Group onChange={(e) => setMusicVal(e.target.value)} value={musicVal}>
            <Space direction='vertical'>
              <Radio value={'热歌榜'}>热歌榜</Radio>
              <Radio value={'新歌榜'}>新歌榜</Radio>
              <Radio value={'飙升榜'}>飙升榜</Radio>
              <Radio value={'原创'}>原创</Radio>
              {/* <Radio value={'飙升榜'}>
          {value === 4 ? <Input style={{ width: 100, marginLeft: 10 }} /> : null}
        </Radio> */}
            </Space>
          </Radio.Group>
          <Card hoverable style={{ width: 240 }} cover={<img style={{ height: '200px' }} alt='example' src={MusicData.picUrl} />}>
            {videocom}
            <Meta title={MusicData.name} description={MusicData.auther} />
          </Card>
        </Col>
        <Col span={8} style={coloStyle}>
          <Card hoverable style={{ width: 240 }} cover={<img alt='example' src={textData.pic} />}>
            <Meta title={textData.en} description={textData.zh} />
          </Card>
        </Col>
      </Row>

      <Row>
        <Col span={24} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          选择省份：
          <Select
            style={{ width: '300px', float: 'right', flexDirection: 'row' }}
            showSearch
            placeholder='选择省份'
            optionFilterProp='children'
            onChange={selectOnChange}
            onSearch={onSearch}
            filterOption={(input, option) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase())}
            options={nextCitys}
          />
          &nbsp;&nbsp;选择城市：
          <Select
            style={{ width: '300px', float: 'right', flexDirection: 'row' }}
            showSearch
            placeholder='选择城市'
            optionFilterProp='children'
            onChange={selectChildOnChange}
            onSearch={onSearch}
            filterOption={(input, option) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase())}
            options={cityChildList}
          />
        </Col>
      </Row>
      {/* 天气 */}

    

      <Row>
        <Col span={24} style={coloStyle}>
          {/* {weatherData.city} */}
          <div className='weather-box'>
            {_.size(sortedData) > 0 && oneweatherData
              ? _.map(sortedData, (day, index) => (
                  <div className='w-item' style={{ margin: '5px' }}>
                    <Card
                      hoverable
                      style={{ width: 240 }}
                      cover={
                        <div key={index} className={`day-forecast ${day.week === oneweatherData.week ? 'day-active' : ''}`}>
                          <div className='day'>{day.week}</div>
                          <div className='weather'>
                            <div>{day.type}</div>
                            <div>{`高温: ${day.high}，低温: ${day.low}`}</div>
                            <div>{`白天: ${day.fengxiang}${day.fengli}`}</div>
                            <div>{`夜晚: ${day.night.fengxiang}${day.night.fengli}`}</div>
                          </div>
                        </div>
                      }
                    >
                      <Meta title={weatherData.city} />
                    </Card>
                  </div>
                ))
              : null}
          </div>
        </Col>
      </Row>

      <Row>
        <Col span={24} style={coloStyle}>
        <Alert message={`你的时间是: ${selectedValue?.format('YYYY-MM-DD')}`} />
      <Calendar value={timeValue} onSelect={onTimeSelect} onPanelChange={onTimePanelChange} />
        </Col>
      </Row>
    </div>
  )
}

export default QqApi

import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Col, Row, Input, Card, Spin, Button } from 'antd'
import './index.css'
import _ from 'lodash'

const coloStyle = { display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }

const { Meta } = Card
const WeatherApi = (props) => {
  const [weatherData, setWeatherData] = useState({})
  const [oneData, setOneData] = useState({})

  const getWeatherData = (val) => {
    try {
      axios.get('https://api.vvhan.com/api/weather?city=敦煌&type=week').then((res) => {
        setWeatherData(res.data)
      })
      axios.get('https://api.vvhan.com/api/weather?city=敦煌').then((res) => {
        console.log('广州', res.data)
        setOneData(res.data)
      })
    } catch (error) {
      console.log('error', error)
    }
  }

  useEffect(() => {
    getWeatherData()
  }, [])

  // 自定义比较函数，用于按星期一到星期日的顺序排序
  const compareDays = (day1, day2) => {
    const daysOrder = ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期日']
    return daysOrder.indexOf(day1.week) - daysOrder.indexOf(day2.week)
  }

  // 按顺序排序数据
  const sortedData = _.slice(weatherData.data).sort(compareDays)
  return (
    <div className='waether-box'>
      <Row>
        <Col span={24} style={coloStyle}>
          <Card>
            {/* {oneData} */}
            <Meta title={oneData.city} description={oneData.city} />
          </Card>
        </Col>
      </Row>
      <Row>
        {/* {weatherData.city} */}
          {_.map(sortedData, (day, index) => (
            <Col span={7} style={{margin: ' 10px'}}>
              <Card
                hoverable
                // style={{ width: 240 }}
                cover={
                  <div key={index} style={{background:'#f00'}}>
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
                <Meta title={weatherData.city} description={weatherData.city} />
              </Card>
            </Col>
          ))}
      </Row>
    </div>
  )
}

export default WeatherApi

import React, { useState, useEffect } from 'react'
import axios from 'axios'
import * as echarts from 'echarts'
import { Button } from 'antd'
import './fieldIllustration.css'

var ROOT_PATH = 'http://localhost:3000'

const FieldIllustration = () => {
  const [treemapOption, setTreemapOption] = useState()
  const [sunburstOption, setSunburstOption] = useState()

  const getData = async () => {
    const { data } = await axios.get(ROOT_PATH + '/data/asset/data/echarts-package-size.json')
    const treemapOption = {
      series: [
        {
          type: 'treemap',
          id: 'echarts-package-size',
          animationDurationUpdate: 1000,
          roam: false,
          nodeClick: 'zoomToNode',
          data: data.children,
          universalTransition: true,
          label: {
            show: true,
          },
          breadcrumb: {
            show: false,
          },
        },
      ],
    }
    const sunburstOption = {
      series: [
        {
          type: 'sunburst',
          id: 'echarts-package-size',
          radius: ['20%', '90%'],
          animationDurationUpdate: 1000,
          nodeClick: undefined,
          data: data.children,
          universalTransition: true,
          itemStyle: {
            borderWidth: 1,
            borderColor: 'rgba(255,255,255,.5)',
          },
          label: {
            show: false,
          },
        },
      ],
    }
    setTreemapOption(treemapOption)
    setSunburstOption(sunburstOption)
  }

  const onchangeEchart = (key) => {
    var chartDom = document.querySelector('.fieldIllustration-content')
    var myChart = echarts.init(chartDom)
    var option =key === '1' ?  treemapOption:  sunburstOption

    // setInterval(function () {
    //   currentOption = currentOption === treemapOption ? sunburstOption : treemapOption
    //   myChart.setOption(currentOption)
    // }, 3000)
    option && myChart.setOption(option)
  }
  useEffect(() => {
    getData()
  }, [])

  useEffect(() => {
    onchangeEchart('1')
  }, [treemapOption])
  return (
    <div className='fieldIllustration-box'>
      <div className='fieldIllustration-header'>
        <div className='btns-group'>
          <Button type='primary' onClick={() => onchangeEchart('1')}>
            矩形图
          </Button>
          <Button onClick={() => onchangeEchart('2')}>旭日图</Button>
        </div>
      </div>
      <div className='fieldIllustration-content'></div>
      <div className='fieldIllustration-header'></div>
    </div>
  )
}

export default FieldIllustration

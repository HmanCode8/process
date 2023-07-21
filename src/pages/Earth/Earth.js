import React, { useEffect } from 'react'
import * as echarts from 'echarts'
import axios from 'axios'
import 'echarts-gl'
const style = {
  height: '100%',
  width: '100%',
  backgroundColor: '#78bb7b',
}

const Pig = () => {
  const createChart = () => {
    var ROOT_PATH = 'http://localhost:3000'

    var chartDom = document.getElementById('chart')
    var myChart = echarts.init(chartDom)
    var option
    option = {
      backgroundColor: '#000',
      globe: {
        baseTexture: ROOT_PATH + '/data-gl/asset/world.topo.bathy.200401.jpg',
        heightTexture: ROOT_PATH + '/data-gl/asset/world.topo.bathy.200401.jpg',
        displacementScale: 0.04,
        shading: 'realistic',
        environment: ROOT_PATH + '/data-gl/asset/starfield.jpg',
        realisticMaterial: {
          roughness: 0.9,
        },
        postEffect: {
          enable: true,
        },
        light: {
          main: {
            intensity: 5,
            shadow: true,
          },
          ambientCubemap: {
            texture: ROOT_PATH + '/data-gl/asset/pisa.hdr',
            diffuseIntensity: 0.2,
          },
        },
      },
    }

    option && myChart.setOption(option)
  }

  useEffect(() => {
    try {
      createChart()
    } catch (error) {
      console.log('error', error)
    }
  })

  return (
    <div style={style}>
      {/* <iframe title='openai' style={{ height: '100%', width: '100%' }} src='https://chat.openai.com/'></iframe> */}
      <div style={style} id='chart'></div>
    </div>
  )
}
export default Pig

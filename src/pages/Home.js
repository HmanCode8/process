import React, { useState, useEffect } from 'react'

import _ from 'lodash'
import '../css/index.css'
import fire from '../images/fire.mp4'
import axios from 'axios'

import { Layout, Menu } from 'antd'
import menuList from '../menuConfig'
import logo from '../images/logo.png'

const items = _.map(menuList, (m, index) => ({
  key: String(index + 1),
  icon: m.icon,
  label: m.label,
  children: m.children,
}))

const { Header, Footer, Sider } = Layout

const Home = () => {
  const [menuKey, setMenuKey] = useState('1')
  const [colorDeg, setColorDeg] = useState(45)
  const [bgImg, setBgImg] = useState('')
  const handleMenuChange = (value) => {
    const { key } = value
    setMenuKey(key)
  }

  const renderComponent = () => {
    const flattenMenu = (data) => {
      let result = []
      _.forEach(data, (d) => {
        result = [...result, d]
        if (!_.isEmpty(d.children)) {
          result = [...result, ...flattenMenu(d.children)]
        }
      })
      return result
    }
    const m = _.find(flattenMenu(menuList), (n) => n.key === menuKey)

    return m
  }
  const title = _.get(renderComponent(), 'label')
  const content = _.get(renderComponent(), 'component')

  const getBgImg = () => {
    axios.get('https://api.vvhan.com/api/view?type=json').then((res) => {
      console.log('imgurl', res.data.imgurl)
      setBgImg(res.data.imgurl)
    })
  }

  useEffect(() => {
    getBgImg()
  }, [])

  useEffect(() => {
    const timeId = setInterval(() => {
      setColorDeg(colorDeg + 45)
    }, 500)
    return () => {
      clearInterval(timeId)
    }
  })

  return (
    <Layout hasSider>
      <Sider
        style={{
          overflow: 'auto',
          height: '100vh',
          position: 'fixed',
          left: 0,
          top: 0,
          bottom: 0,
        }}
      >
        <Menu theme='dark' mode='inline' selectedKeys={menuKey} items={items} onClick={handleMenuChange} />
      </Sider>
      <Layout style={{ marginLeft: 200, }}>
        {/* backgroundImage: `url(${bgImg})` */}
        <Header style={{ padding: 0, background: `linear-gradient(${45}deg,#5470c6,#0f0,20%,#eee,#e3e3,50%,#cde5f9,#00967d)`, fontSize: '30px', fontWeight: '600' }}>
          <span className='logo-title'> {title}</span>
        </Header>
        {content}
        <Footer style={{ textAlign: 'center' }}>Ant Design ©2023 Created by Ant UED</Footer>
      </Layout>
    </Layout>
  )
}

export default Home

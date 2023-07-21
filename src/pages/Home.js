import React, { useState } from 'react'

import _ from 'lodash'
import '../css/index.css'
import fire from '../images/fire.mp4'

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
      <Layout style={{ marginLeft: 200 }}>
        <Header style={{ padding: 0, background: '#156b39', fontSize: '30px', fontWeight: '600' }}>
       
          <span className='logo-title'> {title}</span>
        </Header>
        {content}
        <Footer style={{ textAlign: 'center' }}>Ant Design ©2023 Created by Ant UED</Footer>
      </Layout>
    </Layout>
  )
}

export default Home

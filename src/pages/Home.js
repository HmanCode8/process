import React, { useState } from 'react'

import _ from 'lodash'
import '../css/index.css'

import { Layout, Menu } from 'antd'
import menuList from '../menuConfig'

const items = _.map(menuList, (m, index) => ({
  key: String(index + 1),
  icon: m.icon,
  label: m.label,
  children: m.children,
}))

const { Header, Content, Footer, Sider } = Layout

const Home = () => {
  const [menuKey, setMenuKey] = useState('1')
  const [keyPath, setKeyPath] = useState([])
  const handleMenuChange = (value) => {
    const { key, keyPath } = value
    setMenuKey(key)
    setKeyPath(keyPath)
  }

  const renderComponent = () => {
    const flattenMenu = (data) => {
      let result = []
      _.forEach(data, (d) => {
        result = [...result, d]
        if (!_.isEmpty(d.children)) {
          result = [...result,...flattenMenu(d.children)]
        }
      })
      return result
    }
    const m = _.find(flattenMenu(menuList), (n) => n.key === menuKey)

    return _.get(m, 'component')
  }

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
        <Header style={{ padding: 0, background: '#eeee', fontSize: '30px', fontWeight: '600' }}>我是标题</Header>
        {renderComponent()}
        <Footer style={{ textAlign: 'center' }}>Ant Design ©2023 Created by Ant UED</Footer>
      </Layout>
    </Layout>
  )
}

export default Home

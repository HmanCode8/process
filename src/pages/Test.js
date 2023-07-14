import React, { useState, useReducer, useContext, useEffect, useRef, useCallback, useMemo, memo, Fragment } from 'react'
// import { useParams, useLocation } from 'react-router-dom'
import { Link } from 'react-router-dom'
import '../css/index.css'

import { useTranslation } from 'react-i18next'

import myPromise from '../useContent/myPromise'

import { AppstoreOutlined, BarChartOutlined, CloudOutlined, ShopOutlined, TeamOutlined, UploadOutlined, UserOutlined, VideoCameraOutlined } from '@ant-design/icons'
import { Layout, Menu, theme, Button, ColorPicker, Input, FloatButton } from 'antd'
import MyPromise from '../useContent/myPromise'
import updateClock from '../useContent/dateFormat'

// import myContent from '../useContent/myContent'
const myContent = React.createContext()

const items = [UserOutlined, VideoCameraOutlined, UploadOutlined, BarChartOutlined, CloudOutlined, AppstoreOutlined, TeamOutlined, ShopOutlined].map((icon, index) => ({
  key: String(index + 1),
  icon: React.createElement(icon),
  label: `nav ${index + 1}`,
}))

const { Header, Content, Footer, Sider } = Layout

/**
 * useReducer
 * @param {*} stste
 * @param {*} param1
 * @returns
 */
const reducer = (stste, { type }) => {
  return (stste = type)
  // switch (type) {
  //   case 'red':
  //     return stste = type
  //   case 'green':
  //     return stste = type
  //   default:
  //     return stste
  // }
}

const Home = () => {
  const [num, setNum] = useState(0)
  const [time, setTime] = useState(null)
  const [color, disPatchColor] = useReducer(reducer, '#fff')
  const { t } = useTranslation()

  const addNum = () => {
    setNum(num + 1)
  }
  const promise = () => {
    console.log(1)
    const fn = new MyPromise((resolve, reject) => {
      console.log(2)
      resolve(3)
    })``
    fn.then((res) => {
      console.log('res', res)
    })
  }

  useEffect(() => {
    // const timer = setInterval(() => {
    //   setTime(updateClock())
    // }, 1000)
    // return () => {
    //   clearInterval(timer)
    // }
  }, [])

  const resetNum = useCallback(() => setNum(0), [setNum])
  const changeColor = (val) => {
    disPatchColor({ type: val.toHexString() })
  }

  const {
    token: { colorBgContainer },
  } = theme.useToken()
  return (
    <myContent.Provider value={{ message: '传给子组件的数据' }}>
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
          <div className='demo-logo-vertical' />
          <Menu theme='dark' mode='inline' defaultSelectedKeys={['4']} items={items} />
        </Sider>
        <Layout className='site-layout' style={{ marginLeft: 200 }}>
          <Header style={{ padding: 0, background: '#eeee' }}>
            <nav>
              <Link to='/'>首页</Link>&nbsp;&nbsp;&nbsp;&nbsp;
              <Link to='/login'>登录</Link>
              <Link to='/tree'>Tree</Link>
              <Link to='/pig'>pig</Link>
              
            </nav>
          </Header>
          <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
            数字：<p style={{ color: `${color}`, fontSize: '24px' }}>{num}</p>
            操作：
            <Button type='primary' onClick={addNum}>
              +1
            </Button>
            <Button type='primary' onClick={promise}>
              promise
            </Button>
            {/* <p style={{ color: `${color}`, fontSize: '24px' }}>{time}</p> */}
            <ColorPicker value={color} onChange={changeColor} />
            ---------------------------------------------------
            <div>
              <h1>{t('welcome')}</h1>
              <button>{t('button')}</button>
            </div>
            ----------------------------------------------------
            <Foo num={num} resetNum={resetNum} />
          </Content>
          <Footer style={{ textAlign: 'center' }}>Ant Design ©2023 Created by Ant UED</Footer>
        </Layout>
      </Layout>
    </myContent.Provider>
  )
}

const Foo = memo(function (props) {
  const { num, resetNum } = props
  const [fooData, setFooData] = useState('foo自己的数据')
  const [inputVal, setInputVal] = useState('')
  const [btns, setBtns] = useState([
    {
      title: '按钮1',
      element: <button className='neumorphic-button'>按钮</button>,
    },
    {
      title: '按钮2',
      element: <button className='neumorphic-button'>按钮</button>,
    },
    {
      title: '按钮3',
      element: <button className='neumorphic-button'>按钮</button>,
    },
    {
      title: '按钮4',
      element: <button className='neumorphic-button'>按钮</button>,
    },
  ])
  const inputRef = useRef()
  console.log('foo重新渲染了')
  useEffect(() => {
    inputRef.current.focus()
  }, [inputVal])

  const { message } = useContext(myContent)
  return (
    <div>
      <Button type='primary' onClick={resetNum}>
        重置
      </Button>
      Foo:{inputVal || message}
      <p>{fooData}</p>
      <Input style={{ width: '200px' }} placeholder='Basic usage' ref={inputRef} value={inputVal} onChange={(e) => setInputVal(e.target.value)} />
      <Button
        type='primary'
        onClick={() => {
          setFooData('改变')
        }}
      >
        改变
      </Button>
      <Bar btns={btns} />
    </div>
  )
})

const Bar = memo(({ btns }) => {
  // const location = useLocation()
  const [title, setTitle] = useState('')
  // const params = useParams()
  // console.log('location', location)

  return (
    <div>
      按钮组:
      <div className='grid-container'>
        {btns.map((b, index) => {
          return (
            <Fragment key={index}>
              <div className='grid-item'>{b.title}</div>
              <div className='grid-item' onClick={() => setTitle(b.title)}>
                {b.element}
              </div>
            </Fragment>
          )
        })}
      </div>
      <div className='parent'>
        <div className='child'>{title}</div>
        <div className='child'>2</div>
      </div>
      <FloatButton shape='circle' badge={{ dot: true }} style={{ right: 24 + 70 + 70 }} />
      <LanguageSelector />
    </div>
  )
})

function LanguageSelector() {
  const { i18n } = useTranslation()

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng)
  }

  return (
    <div>
      <button onClick={() => changeLanguage('en')}>English</button>
      <button onClick={() => changeLanguage('fr')}>French</button>
    </div>
  )
}

export default Home

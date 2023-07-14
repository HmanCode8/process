import Login from '../pages/Login'
import Tree from '../pages/Tree'
import Pig from '../pages/Pig'
import Carousel from '../pages/Carousel'

import _ from 'lodash'
import '../css/index.css'

import { UserOutlined, VideoCameraOutlined, AndroidOutlined } from '@ant-design/icons'

const menuList = [
  {
    label: '登录',
    component: <Login />,
    key: '1',
    icon: <AndroidOutlined />,
    children: [
      {
        key: '1-1',
        label: '儿子',
        component: <Tree />,
        children: [
          {
            key: '1-1-1',
            label: '孙子1',
            component: <Carousel />,
          },
          {
            key: '1-1-2',
            label: '孙子2',
            component: <div>
              我是登录的孙子
            </div>,
          },
        ]
      },
    ],
  },
  {
    label: '一棵树',
    component: <Tree />,
    key: '2',
    icon: <VideoCameraOutlined />,
    children: [
      {
        key: '2-1-1',
        label: '2',
        component: <div>
          你好！我是一棵树的孩子
        </div>,
      },
    ]
  },
  {
    label: '一头猪',
    component: <Pig />,
    key: '3',
    icon: <UserOutlined />,
  },
]

export default menuList

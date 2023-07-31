import Login from '../pages/Login/Login'
import Tree from '../pages/Tree/Tree'
import Pig from '../pages/Earth/Earth'
import Carousel from '../pages/Carousel/Carousel'
import RotatingBorder from '../pages/RotatingBorder/RotatingBorder'
import FieldIllustration from '../pages/FieldIllustration/FieldIllustration'
import ThreeScene from '../pages/ThreeScene/ThreeScene'
import QqApi from '../pages/myApi/qqApi'
import MusicApi from '../pages/myApi/musicApi'



import '../css/index.css'

import { UserOutlined, VideoCameraOutlined, AndroidOutlined } from '@ant-design/icons'

const menuList = [
  {
    label: '登录',
    component: <QqApi />,
    key: '1',
    icon: <AndroidOutlined />,
    children: [
      {
        key: '1-1',
        label: 'MusicApi',
        component: <MusicApi />,
        // children: [
        //   {
        //     key: '1-1-1',
        //     label: '孙子1',
        //     component: <Carousel />,
        //   },
        //   {
        //     key: '1-1-2',
        //     label: '孙子2',
        //     component: <div>
        //       我是登录的孙子
        //     </div>,
        //   },
        // ]
      },
    ],
  },
  {
    label: '轮播图',
    component: <Carousel />,
    key: '2',
    icon: <VideoCameraOutlined />,
  },
  {
    label: '旋转边框',
    component: <RotatingBorder />,
    key: '3',
    icon: <VideoCameraOutlined />,
  },
  {
    label: 'Tree',
    component: <Tree />,
    key: '4',
    icon: <UserOutlined />,
  },
  {
    label: '地球',
    component: <Pig />,
    key: '5',
    icon: <UserOutlined />,
  },
  {
    label: '野外插画',
    component: <FieldIllustration />,
    key: '6',
    icon: <UserOutlined />,
  },
  {
    label: 'ThreeScene',
    component: <ThreeScene />,
    key: '7',
    icon: <UserOutlined />,
  },
]

export default menuList

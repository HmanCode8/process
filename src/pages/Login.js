import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { Button, Space,Input } from 'antd'

/**
 * @deprecated
 * @param {*} props
 * @returns
 */
const Login = (props) => {
  console.log('props',props)
  const { result, message, increment, decrement, multiply, divide,changeMessage } = props
  return (
    <Space size={'large'}>
      <Link to='/'>返回首页</Link>
      <Input value={message} onChange={(e)=>changeMessage(e.target.value)}/>
      <div>算数：{message}</div>
      <p>{result}</p>
      <Button type='primary' onClick={() => increment(Number.parseInt(Math.random() * 10))}>
        &nbsp;&nbsp; 加上随机数 0~10
      </Button>
      <Button type='primary' onClick={() => decrement(1)}>
        &nbsp;&nbsp; -1
      </Button>
      <Button type='primary' onClick={() => multiply(20)}>
        &nbsp;&nbsp; *2
      </Button>
      <Button type='primary' onClick={() => divide(3)}>
        &nbsp;&nbsp; /2
      </Button>
    </Space>
  )
}

const mapStateToProps = (state) => {
  console.log('state', state)
  const { math,info } = state
  return {
    result: math.count,
    message: info.message,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    increment: (payload = 1) => dispatch({ type: 'INCREMENT', payload,  }),
    decrement: (payload = 1) => dispatch({ type: 'SUBTRACT', payload }),
    multiply: (payload = 1) => dispatch({ type: 'MULTIPLY', payload }),
    divide: (payload = 1) => dispatch({ type: 'DIVIDE', payload }),
    changeMessage:(text)=>dispatch({type: 'message',message: text})
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)

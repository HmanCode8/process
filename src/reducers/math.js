// 定义初始状态
const initialState = {
  count: 0,
  message:'你好'
}

// 定义 Reducer 函数
const calculatorReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return {
        ...state,
        count: state.count + action.payload,
      }
    case 'SUBTRACT':
      return {
        ...state,
        count: state.count - action.payload,
        
      }
    case 'MULTIPLY':
      return {
        ...state,
        count: state.count * action.payload,
      }
    case 'DIVIDE':
      return {
        ...state,
        count: state.count / action.payload,
      }
    default:
      return state
  }
}
export default calculatorReducer
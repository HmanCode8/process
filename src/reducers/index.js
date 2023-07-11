import { configureStore } from '@reduxjs/toolkit'


import calculatorReducer from './math'
import message from './message'

const reducer = {
  math:calculatorReducer,
  info:message
}

const store = configureStore({
  reducer
})

export default store
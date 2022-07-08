import { configureStore } from '@reduxjs/toolkit'
import toolReducer from './tools/toolSlice'
import detailReducer from './details/detailSlice'
import userReducer from './user/userSlice'
import orderReducer from './orders/orderSlice'
import keyReducer from './keys/keySlice'

const reducer = {
  tools: toolReducer,
  details: detailReducer,
  user: userReducer,
  order: orderReducer,
  key: keyReducer,
}

export const store = configureStore({
  reducer: reducer,
})

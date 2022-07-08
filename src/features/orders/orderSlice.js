import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import orderApi from '../../apis/orderApi'
import orderDetailApi from '../../apis/orderDetailApi'

const initState = {}

export const fetchOrders = createAsyncThunk('order/fetchOrder', async () => {
  const response = await orderApi
    .get('danh-sach', {
      headers: { Authorization: `Bearer ${localStorage.getItem('Token')}` },
    })
    .catch((err) => console.log(err))
  return response.data
})

export const deleteOrder = createAsyncThunk('order/deleteOrder', async (id) => {
  const response = await orderApi
    .put('xoa-don-hang', id, {
      headers: { Authorization: `Bearer ${localStorage.getItem('Token')}` },
    })
    .catch((err) => console.log(err))
  return response.data
})

export const fetchPendingOrders = createAsyncThunk(
  'order/fetchPendingOrder',
  async () => {
    const response = await orderApi
      .get('cho-duyet', {
        headers: { Authorization: `Bearer ${localStorage.getItem('Token')}` },
      })
      .catch((err) => console.log(err))
    return response.data
  },
)

export const approveOrder = createAsyncThunk(
  'order/approveOrder',
  async (id) => {
    const response = await orderApi
      .put('duyet-don-hang', id, {
        headers: { Authorization: `Bearer ${localStorage.getItem('Token')}` },
      })
      .catch((err) => console.log(err))
    return response.data
  },
)

export const fetchAllDetail = createAsyncThunk(
  'order/fetchAllDetail',
  async () => {
    const response = await orderDetailApi
      .get('danh-sach', {
        headers: { Authorization: `Bearer ${localStorage.getItem('Token')}` },
      })
      .catch((err) => console.log(err))
    return response.data
  },
)

export const fetchOrderHistory = createAsyncThunk(
  'order/fetchOrderHistory',
  async (username) => {
    const response = await orderApi
      .get(`lich-su/${username}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('Token')}` },
      })
      .catch((err) => console.log(err))
    return response.data
  },
)

export const addNewOrder = createAsyncThunk(
  'order/addNewOrder',
  async (data) => {
    const response = await orderApi
      .post('them-don-hang', data, {
        headers: { Authorization: `Bearer ${localStorage.getItem('Token')}` },
      })
      .catch((err) => console.log(err))
    return response.data
  },
)

const orderSlice = createSlice({
  name: 'order',
  initialState: initState,
  reducers: {
    removeCurrentOrder: (state) => {
      state.order = {}
    },
  },
  extraReducers: {
    [fetchOrders.fulfilled]: (state, { payload }) => {
      console.log('...fulfilled')
      return { ...state, order: payload.results }
    },
    [approveOrder.fulfilled]: (state, action) => {
      return {
        ...state,
        order: state.order.map((order) =>
          order.id === action.meta.arg.id ? { ...order, status: 1 } : order,
        ),
      }
    },
    [fetchPendingOrders.fulfilled]: (state, { payload }) => {
      return { ...state, order: payload.results }
    },
    [deleteOrder.fulfilled]: (state, action) => {
      return {
        ...state,
        order: state.order.map((order) =>
          order.id === action.meta.arg.id ? { ...order, status: -2 } : order,
        ),
      }
    },
    [fetchAllDetail.fulfilled]: (state, { payload }) => {
      return { ...state, orderDetail: payload.results }
    },
    [fetchOrderHistory.fulfilled]: (state, { payload }) => {
      return { ...state, order: payload.results }
    },
    [addNewOrder.fulfilled]: (state, { payload }) => {
      return { ...state, orderStatus: payload }
    },
  },
})

export const getOrders = (state) => state.order.order
export const getOrderDetails = (state) => state.order.orderDetail
export const getOrderStatus = state => state.order.orderStatus
export const { removeCurrentOrder } = orderSlice.actions
export default orderSlice.reducer

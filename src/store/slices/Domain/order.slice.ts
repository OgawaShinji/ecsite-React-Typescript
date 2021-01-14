import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {Order} from '../../../types/interfaces'
import {RootState} from "../../index";
import axios from "axios";

type orderState = {
    order: Order,
    subTotalPrice: number
}

const initialState: orderState = {
    order: {
        orderId: undefined,
        totalPrice: 0,
        destinationAddress: '',
        destinationName: '',
        orderDate: undefined,
        deliveryTime: undefined,
        status: undefined,
        orderItems: [],
        destinationZipcode: '',
        paymentMethod: ''
    },
    subTotalPrice: 0
}

// --------------------------------  async progress  -----------------------------------------------------

/**
 * カート一覧を取得するメソッド
 * @return res: orderItem[]
 */

export const fetchOrderItems = createAsyncThunk(
    'order/fetchOrderItems',
    async () => {
        const {data} = await axios.get(`http://localhost:3000/cart`, {
            method: 'GET',
            headers: {
                token: localStorage.getItem("token")
            }
        })
        return {data: data}
    }
)

/**
 * 商品をカートに入れる関数
 *  @param order: Order
 *  @return void
 */

export const postOrderItem = createAsyncThunk(
    'order/postOrderItem',
    async () => {

    }
)

/**
 * カートに存在する商品内容を更新する関数
 * @param order: Order
 * @return void
 */

export const updateOrderItem = createAsyncThunk(
    'order/updateOrderItem',
    async () => {

    }
)

/**
 * カートに存在する商品を削除する関数
 * @param orderItemId: number
 * @return void
 */

export const deleteOrderItem = createAsyncThunk(
    'order/deleteOrderItem',
    async () => {

    }
)

/**
 * カートに存在する商品を注文する関数
 * @param order: Order
 * @return void
 */

export const postOrder = createAsyncThunk(
    'order/postOrder',
    async () => {

    }
)


// ------------------------------------  slice  ---------------------------------------------------

export const orderSlice = createSlice({
    name: 'order',
    initialState: initialState,
    reducers: {
        setOrderItems: ((state: orderState, action) => {
            state.order = action.payload
        }),
        setOrderUserInfo: ((state, action) => {

        }),
        setOrder: ((state, action) => {

        })
    },
    extraReducers: (builder => {
        builder.addCase(fetchOrderItems.fulfilled, (state, action) => {
            console.log(action.payload.data.order.orderItems)
            const _action = orderSlice.actions.setOrderItems(action.payload.data.order)
            orderSlice.caseReducers.setOrderItems(state, _action)
        })
    })
})

export const selectOrder = (state: RootState) => state.order.order.orderItems
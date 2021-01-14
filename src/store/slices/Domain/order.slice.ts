import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {Order, User} from '../../../types/interfaces'
import {RootState} from "../../index";
import axios from "axios";
import {API_URL} from "../../api";

type orderState = {
    order: Order,
    subTotalPrice: number,
}

const initialState: orderState = {
    order: {
        id: undefined,
        user: {
            id: 0,
            name: '',
            email: '',
            zipcode: '',
            address: '',
            telephone: '',
            password: '',
            status: 0
        },
        status: undefined,
        orderDate: undefined,
        destinationName: '',
        destinationEmail: '',
        destinationZipcode: '',
        destinationAddress: '',
        destinationTel: '',
        deliveryTime: undefined,
        paymentMethod: '',
        totalPrice: 0,
        orderItems: []
    },
    subTotalPrice: 0,
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
    async (orderInfo:orderState) => {
        await axios.post(
            `${API_URL}/django/order`,
            {orderInfo},
            {
                method: 'POST',
                headers: {
                    token: localStorage.getItem('Authorization')
                }
            }).catch(error => {
                throw new Error(error);
        });
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
        setOrderUserInfo: ((state:orderState, action) => {
            state.order.user = action.payload
        }),
        setOrderDate: ((state: orderState, action) => {
            state.order.orderDate = action.payload
        }),
        setDeliveryTime: ((state: orderState, action) => {
            state.order.deliveryTime = action.payload
        }),
        setPaymentMethod: ((state: orderState, action) => {
            state.order.paymentMethod = action.payload
        }),
        //追加機能
        setUserAddress:((state:orderState , action) => {

        }),

    },
    extraReducers: (builder => {
        builder.addCase(fetchOrderItems.fulfilled, (state, action) => {
            console.log(action.payload.data.order.orderItems)
            const _action = orderSlice.actions.setOrderItems(action.payload.data.order)
            orderSlice.caseReducers.setOrderItems(state, _action)
        })

        //注文確定処理:postOrder
        builder.addCase(postOrder.fulfilled, (state, action) => {
            //保留中、書くことないかも
        })
        builder.addCase(postOrder.rejected, (state, action) => {
            //保留中、エラー表示を想定
        })

    })
})

export const selectOrder = (state: RootState) => state.order.order.orderItems
export const selectOrderDate = (state: RootState) => state.order.order.orderDate
export const selectDeliveryTime = (state: RootState) => state.order.order.deliveryTime
export const selectPaymentMethod = (state: RootState) => state.order.order.paymentMethod
export const selectOrderUserInfo = (state: RootState) => state.order.order.user
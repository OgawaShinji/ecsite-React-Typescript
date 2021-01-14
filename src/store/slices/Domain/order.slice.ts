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
    order: {},
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
        const {data} = await axios.get(`${API_URL}/cart`, {
            method: 'GET',
            headers: {
                token: localStorage.getItem("token")
            }
        }).catch(err => {
            throw new Error(err);
        });

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
    async (order: Order) => {
        await axios.post(`${API_URL}/cart`, {order}, {
            method: 'POST',
            headers: {
                token: localStorage.getItem("token")
            }
        }).catch(err => {
            throw new Error(err)
        })
    }
)

/**
 * カートに存在する商品内容を更新する関数
 * @param order: Order
 * @return void
 */

export const updateOrderItem = createAsyncThunk(
    'order/updateOrderItem',
    async (order: Order) => {
        await axios.post(`${API_URL}/cart`, {order}, {
            method: 'PUT',
            headers: {
                token: localStorage.getItem("token")
            }
        }).catch(err => {
            throw new Error(err)
        })
    }
)

/**
 * カートに存在する商品を削除する関数
 * @param orderItemId: number
 * @return void
 */

export const deleteOrderItem = createAsyncThunk(
    'order/deleteOrderItem',
    async (orderItemId: number) => {
        await axios.delete(`${API_URL}/cart`, {
            method: 'DELETE',
            headers: {
                token: localStorage.getItem("token")
            },
            params: {
                orderItemId: orderItemId
            }
        }).catch(err => {
            throw new Error(err)
        })
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

        setOrderItemsAndSubTotalPrice: ((state: orderState, action) => {
            state.order.orderItems = action.payload
            // TODO: setSubTotalPriceの処理追加
        }),
        //追加機能
        setUserAddress:((state:orderState , action) => {

        }),

        setOrder: ((state, action) => {
            state.order = action.payload
        })

    },
    extraReducers: (builder => {
        builder.addCase(fetchOrderItems.fulfilled, (state, action) => {
            const _action = orderSlice.actions.setOrderItemsAndSubTotalPrice(action.payload.data.order.orderItems)
            orderSlice.caseReducers.setOrderItemsAndSubTotalPrice(state, _action)
        })
        builder.addCase(fetchOrderItems.rejected, (state, action) => {
            console.log(action.error)
        })
        builder.addCase(postOrderItem.fulfilled, (state, action) => {
        })
        builder.addCase(postOrderItem.rejected, (state, action) => {
            console.log(action.error)
        })
        builder.addCase(updateOrderItem.fulfilled, (state, action) => {
        })
        builder.addCase(updateOrderItem.rejected, (state, action) => {
            console.log(action.error)
        })
        builder.addCase(deleteOrderItem.fulfilled, (state, action) => {
        })
        builder.addCase(deleteOrderItem.rejected, (state, action) => {
            console.log(action.error)
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



export const selectOrderDate = (state: RootState) => state.order.order.orderDate
export const selectDeliveryTime = (state: RootState) => state.order.order.deliveryTime
export const selectPaymentMethod = (state: RootState) => state.order.order.paymentMethod
export const selectOrderUserInfo = (state: RootState) => state.order.order.user

export const selectOrder = (state: RootState) => state.order.order
export const selectOrderItems = (state: RootState) => state.order.order.orderItems


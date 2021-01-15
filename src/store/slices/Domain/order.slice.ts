import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {Order} from '../../../types/interfaces'
import {RootState} from "../../index";
import axios from "axios";
import {API_URL} from "../../api";
import camelcaseKeys from "camelcase-keys";


type orderState = {
    order: Order,
    orderSubTotalPrice: number,
}

const initialState: orderState = {
    order: {},
    orderSubTotalPrice: 0
}

// --------------------------------  async progress  -----------------------------------------------------

/**
 * カート一覧を取得するメソッド
 * @return res: orderItem[]
 */

export const fetchOrderItems = createAsyncThunk(
    'order/fetchOrderItems',
    async () => {
        // TODO: pass決まり次第変更
        const {data} = await axios.get(`${API_URL}/django/cart`, {
            method: 'GET',
            headers: {
                Authorization: localStorage.getItem("Authorization")
            }
        }).catch(err => {
            throw new Error(err);
        });

        return data
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
        // TODO: pass決まり次第変更
        await axios.post(`${API_URL}/django/cart`, {order}, {
            method: 'POST',
            headers: {
                Authorization: localStorage.getItem("Authorization")
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
        // TODO: pass決まり次第変更
        await axios.post(`${API_URL}/django/cart`, {order}, {
            method: 'PUT',
            headers: {
                Authorization: localStorage.getItem("Authorization")
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
        // TODO: pass決まり次第変更
        await axios.delete(`${API_URL}/django/cart`, {
            method: 'DELETE',
            headers: {
                Authorization: localStorage.getItem("Authorization")
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
    async (orderInfo: Order) => {
        await axios.post(
            `${API_URL}/django/order/`,
            {orderInfo},
            {
                method: 'POST',
                headers: {
                    Authorization: localStorage.getItem('Authorization')
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
        setOrderUserInfo: ((state: orderState, action) => {
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
            let subTotalPrice = state.orderSubTotalPrice

            // orderItemごとのsubTotalPriceをset, stateのorder全体のsubTotalPriceをset
            state.order.orderItems?.map(orderItem => {
                const toppingQuantity = orderItem.orderToppings?.length
                const orderItemQuantity = orderItem.quantity
                let orderItemPrice: number
                let toppingTotalPrice: number

                if (orderItem.size === 'M') {
                    orderItemPrice = orderItem.item.priceM
                    // TODO:toppingの価格がわかり次第修正
                    toppingTotalPrice = toppingQuantity! * 200
                } else if (orderItem.size === 'L') {
                    orderItemPrice = orderItem.item.priceL
                    toppingTotalPrice = toppingQuantity! * 300
                }
                orderItem.subTotalPrice = (orderItemPrice! + toppingTotalPrice!) * orderItemQuantity
                subTotalPrice += orderItem.subTotalPrice
            })

            state.orderSubTotalPrice = subTotalPrice
        }),
        //追加機能
        setUserAddress: ((state: orderState, action) => {

        }),
        setOrder: ((state, action) => {
            state.order = action.payload
        })
    },
    extraReducers: (builder => {
        // fetchOrderItems
        builder.addCase(fetchOrderItems.fulfilled, (state, action) => {
            const camelPayload = camelcaseKeys(action.payload, {deep: true})
            const _action = orderSlice.actions.setOrderItemsAndSubTotalPrice(camelPayload.order.orderItems)
            orderSlice.caseReducers.setOrderItemsAndSubTotalPrice(state, _action)
        })
        builder.addCase(fetchOrderItems.rejected, (state, action) => {
            console.log(action.error)
        })

        // postOrderItem
        builder.addCase(postOrderItem.fulfilled, (state, action) => {
        })
        builder.addCase(postOrderItem.rejected, (state, action) => {
            console.log(action.error)
        })

        // updateOrderItem
        builder.addCase(updateOrderItem.fulfilled, (state, action) => {
        })
        builder.addCase(updateOrderItem.rejected, (state, action) => {
            console.log(action.error)
        })

        // deleteOrderItem
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
export const selectOrderSubTotalPrice=(state: RootState) => state.order.orderSubTotalPrice

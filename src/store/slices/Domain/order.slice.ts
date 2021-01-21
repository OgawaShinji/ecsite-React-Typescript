import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Order, OrderItem, Topping} from '../../../types/interfaces'
import {RootState} from "../../index";
import axios from "axios";
import Axios, {API_URL} from "../../api";
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

export const asyncFetchOrderItems = createAsyncThunk(
    'order/fetchOrderItems',
    async () => {
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

export type OrderItemToPost = {
    newItem: {
        item: number,
        orderToppings: { topping: number }[],
        quantity: number,
        size: 'M' | 'L'
    },
    status: 0,
    newTotalPrice: number
}
/**
 * 商品をカートに入れる関数
 *  @param order: Order
 *  @return void
 */

export const asyncPostOrderItem = createAsyncThunk(
    'order/postOrderItem',
    async (order: OrderItemToPost) => {
        const {data} = await Axios.post(`${API_URL}/django/cart/`, {
            order_item: {
                item: order.newItem.item,
                orderToppings: order.newItem.orderToppings,
                quantity: order.newItem.quantity,
                size: order.newItem.size
            },
            status: 0,
            total_price: order.newTotalPrice
        }, {
            method: 'POST',
            headers: {
                Authorization: localStorage.getItem("Authorization")
            }
        }).catch(err => {
            throw new Error(err.response.status)
        })
        return data;
    }
)

/**
 * カートに存在する商品内容を更新する関数
 * @param order: Order
 * @return void
 */

export const asyncUpdateOrderItem = createAsyncThunk(
    'order/updateOrderItem',
    async (order: Order) => {
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

export const asyncDeleteOrderItem = createAsyncThunk(
    'order/deleteOrderItem',
    async (orderItemId: number) => {
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
        setOrderItemsAndSubTotalPrice: ((state: orderState, action: PayloadAction<OrderItem[]>) => {
            state.order.orderItems = action.payload
            let copyOrderItems = state.order.orderItems.slice()
            let orderSubTotalPrice = state.orderSubTotalPrice

            // orderItemごとのsubTotalPriceをset, stateのorder全体のsubTotalPriceをset
            copyOrderItems?.map(orderItem => {
                const toppingQuantity = orderItem.orderToppings?.length
                const orderItemQuantity = orderItem.quantity
                let orderItemPrice: number
                let toppingTotalPrice: number
                let subTotalPrice: number

                if (orderItem.size === 'M') {
                    orderItemPrice = orderItem.item.priceM
                    // TODO:toppingの価格がわかり次第修正
                    toppingTotalPrice = toppingQuantity! * 200
                } else if (orderItem.size === 'L') {
                    orderItemPrice = orderItem.item.priceL
                    toppingTotalPrice = toppingQuantity! * 300
                }
                subTotalPrice = (orderItemPrice! + toppingTotalPrice!) * orderItemQuantity
                orderItem.subTotalPrice = subTotalPrice
                orderSubTotalPrice += orderItem.subTotalPrice
            })
            state.order.orderItems = copyOrderItems
            state.orderSubTotalPrice = orderSubTotalPrice
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
        builder.addCase(asyncFetchOrderItems.fulfilled, (state, action) => {
            const camelPayload = camelcaseKeys(action.payload, {deep: true})
            const _action = orderSlice.actions.setOrderItemsAndSubTotalPrice(camelPayload.order.orderItems)
            orderSlice.caseReducers.setOrderItemsAndSubTotalPrice(state, _action)
        })
        builder.addCase(asyncFetchOrderItems.rejected, (state, action) => {
            console.log(action.error)
        })

        // postOrderItem
        builder.addCase(asyncPostOrderItem.fulfilled, (state, action) => {
            //post後受け取りたいデータが特に無いので返却値を自分で指定している
            // ->component/itemDetail/index/handleOrderClick にて、ここの指定値が返ってきた時のみ処理している
            action.payload="200"
        })
        builder.addCase(asyncPostOrderItem.rejected, (state, action) => {
            //createAsyncThunkのcatch内にてエラーコードのみをmessageに入れているので.
            //action.error.messageには上記エラーコードのみ入る
            throw new Error(action.error.message)
        })

        // updateOrderItem
        builder.addCase(asyncUpdateOrderItem.fulfilled, (state, action) => {
        })
        builder.addCase(asyncUpdateOrderItem.rejected, (state, action) => {
            console.log(action.error)
        })

        // deleteOrderItem
        builder.addCase(asyncDeleteOrderItem.fulfilled, (state, action) => {
        })
        builder.addCase(asyncDeleteOrderItem.rejected, (state, action) => {
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
export const selectOrderSubTotalPrice = (state: RootState) => state.order.orderSubTotalPrice


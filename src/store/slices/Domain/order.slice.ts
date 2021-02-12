import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Order, OrderItem} from '~/types/interfaces'
import {RootState} from "~/store";
import Axios from "../../api";

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
        const {data} = await Axios.get(`/django/cart/`, {
            method: 'GET',
            headers: {
                Authorization: localStorage.getItem("Authorization")
            }
        }).catch(err => {
            throw new Error(err.response.status);
        });

        return data
    }
)

export type OrderItemType = {
    id?: number,
    item: number,
    orderToppings: { topping: number }[],
    quantity: number,
    size: 'M' | 'L'
}

export type OrderItemsToPost = {
    orderItems: Array<OrderItemType>,
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
    async (order: OrderItemType) => {
        const {data} = await Axios.post(`/django/cart/`, {
            order_item: {
                item: order.item,
                orderToppings: order.orderToppings,
                quantity: order.quantity,
                size: order.size
            },
            status: 0,
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
    async (order: OrderItemsToPost) => {
        await Axios.put(`/django/cart/`, {
            order_items: order.orderItems,
            status: 0,
            total_price: order.newTotalPrice
        }, {
            method: 'PUT',
            headers: {
                Authorization: localStorage.getItem("Authorization")
            }
        }).catch(err => {
            throw new Error(err.response.status)
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
        await Axios.delete(`/django/delete_cart/${orderItemId}/`, {
            method: 'DELETE',
            headers: {
                Authorization: localStorage.getItem("Authorization")
            }
        }).catch(err => {
            throw new Error(err.response.status)
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
        const {data} = await Axios.post(
            `/django/order/`,
            {
                status: orderInfo.status,
                total_price: orderInfo.totalPrice,
                order_date: orderInfo.orderDate,
                destination_name: orderInfo.destinationName,
                destination_email: orderInfo.destinationEmail,
                destination_zipcode: orderInfo.destinationZipcode,
                destination_address: orderInfo.destinationAddress,
                destination_tel: orderInfo.destinationTel,
                delivery_time: orderInfo.deliveryTime,
                payment_method: orderInfo.paymentMethod
            },
            {
                method: 'POST',
                headers: {
                    Authorization: localStorage.getItem('Authorization')
                }
            }).catch(error => {
            throw new Error(error);
        });
        return data
    }
)

// ------------------------------------  slice  ---------------------------------------------------

export const orderSlice = createSlice({
    name: 'order',
    initialState: initialState,
    reducers: {
        setOrderItemsAndSubTotalPrice: ((state: orderState, action: PayloadAction<OrderItem[]>) => {
            if (action.payload) {
                state.order.orderItems = action.payload
                //注文内容の小計を初期化
                state.orderSubTotalPrice = 0
                let orderSubTotalPrice = state.orderSubTotalPrice

                // orderItemごとのsubTotalPriceをset, stateのorder全体のsubTotalPriceをset
                state.order.orderItems.forEach(orderItem => {
                    const toppingQuantity = orderItem.orderToppings?.length
                    const orderItemQuantity = orderItem.quantity
                    let orderItemPrice: number
                    let orderItemToppingTotalPrice: number
                    let orderItemSubTotalPrice: number

                    if (orderItem.size === 'M') {
                        orderItemPrice = orderItem.item.priceM
                        orderItemToppingTotalPrice = toppingQuantity! * 200
                    } else if (orderItem.size === 'L') {
                        orderItemPrice = orderItem.item.priceL
                        orderItemToppingTotalPrice = toppingQuantity! * 300
                    }
                    orderItemSubTotalPrice = (orderItemPrice! + orderItemToppingTotalPrice!) * orderItemQuantity
                    orderItem.subTotalPrice = orderItemSubTotalPrice
                    orderSubTotalPrice += orderItem.subTotalPrice
                })
                state.orderSubTotalPrice = orderSubTotalPrice
            } else {
                state.order.orderItems = []
                state.orderSubTotalPrice = 0
            }
        })
    },
    extraReducers: (builder => {
        // fetchOrderItems
        builder.addCase(asyncFetchOrderItems.fulfilled, (state, action) => {
            let _action: any
            if (action.payload.orderItems === undefined) {
                _action = []
            } else {
                _action = orderSlice.actions.setOrderItemsAndSubTotalPrice(action.payload.orderItems)
            }
            orderSlice.caseReducers.setOrderItemsAndSubTotalPrice(state, _action)
        })
        builder.addCase(asyncFetchOrderItems.rejected, (state, action) => {
            throw new Error(action.error.message)
        })

        // postOrderItem
        builder.addCase(asyncPostOrderItem.fulfilled, (state, action) => {
            //post後受け取りたいデータが特に無いので返却値を自分で指定している
            // ->component/itemDetail/index/handleOrderClick にて、ここの指定値が返ってきた時のみ処理している
            action.payload = "200"
        })
        builder.addCase(asyncPostOrderItem.rejected, (state, action) => {
            //createAsyncThunkのcatch内にてエラーコードのみをmessageに入れているので.
            //action.error.messageには上記エラーコードのみ入る
            throw new Error(action.error.message)
        })

        // updateOrderItem
        // builder.addCase(asyncUpdateOrderItem.fulfilled, (state, action) => {
        // })
        builder.addCase(asyncUpdateOrderItem.rejected, (state, action) => {
            throw new Error(action.error.message)
        })

        // deleteOrderItem
        // builder.addCase(asyncDeleteOrderItem.fulfilled, (state, action) => {
        // })
        builder.addCase(asyncDeleteOrderItem.rejected, (state, action) => {
            throw new Error(action.error.message)
        })

        //注文確定処理:postOrder
        builder.addCase(postOrder.fulfilled, (state, action) => {
            action.payload = "200"
        })
        builder.addCase(postOrder.rejected, (state, action) => {
            throw new Error(action.error.message)
        })
    })
})

export const {setOrderItemsAndSubTotalPrice} = orderSlice.actions

export const selectOrderDate = (state: RootState) => state.order.order.orderDate
export const selectDeliveryTime = (state: RootState) => state.order.order.deliveryTime
export const selectPaymentMethod = (state: RootState) => state.order.order.paymentMethod
export const selectOrderUserInfo = (state: RootState) => state.order.order.user

export const selectOrder = (state: RootState) => state.order.order
export const selectOrderItems = (state: RootState) => state.order.order.orderItems
export const selectOrderSubTotalPrice = (state: RootState) => state.order.orderSubTotalPrice


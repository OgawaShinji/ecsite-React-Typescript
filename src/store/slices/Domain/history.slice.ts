import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";

import {Order, DisplaySetting} from '~/types/interfaces';
import {RootState} from "~/store";
import Axios from '~/store/api';

type historyState = {
    orderHistory: Array<Order>;
    orderHistoryTotalCount: number | null;
}

const initialHistoryState: historyState = {
    orderHistory: [],
    orderHistoryTotalCount: null
}

//--------------------------------------------
/**
 * 注文履歴を取得する.
 *
 * @param {DisplaySetting} displaySetting 表示件数とページ番号
 * @return {Array<Order>} 注文履歴一覧
 */
export const fetchOrderHistory = createAsyncThunk('history/getOrderHistory', async (displaySetting: DisplaySetting) => {

    // DisplaySettingの変数をlimit, offsetに加工する
    // limit = displayCount
    // offset = (pageNum - 1) * displayCount
    const params = {
        limit: displaySetting.displayCount,
        offset: (displaySetting.pageNum - 1) * displaySetting.displayCount
    };

    try {
        const {data} = await Axios.get(`/flask/order-history`, {
            method: 'GET',
            params: params,
            headers: {
                Authorization: localStorage.getItem("Authorization")
            }
        })
        return data;
    } catch (e) {
        throw new Error(e.response.status);
    }
})

/**
 * 注文履歴総数を取得する.
 *
 * @return {number} 注文履歴総数
 */
export const fetchOrderHistoryTotalCount = createAsyncThunk('history/getTotalCount', async () => {
    try {
        const {data} = await Axios.get(`/flask/order-history/count`, {
            method: 'GET',
            headers: {
                Authorization: localStorage.getItem("Authorization")
            }
        })
        return data;
    } catch (e) {
        throw new Error(e.response.status);
    }
})

//--------------------------------------------

export const historySlice = createSlice({
    name: 'history',
    initialState: initialHistoryState,
    reducers: {
        setOrders: ((state: historyState, action) => {
            /////// 各注文商品の小計を算出し、subTotalPriceにセットする

            // 取得データのコピーを作成
            let copyOrderHistory = action.payload.orders.slice();

            copyOrderHistory.forEach((order: Order) => {
                if (order.orderItems) {
                    order.orderItems.forEach((orderItem) => {
                        let subTotalPrice: number = 0;
                        const size = orderItem.size;

                        // Topping
                        if (orderItem.orderToppings) {
                            orderItem.orderToppings.forEach((orderTopping) => {
                                if (orderTopping.topping.priceM && orderTopping.topping.priceL) {
                                    if (size === 'M') {
                                        subTotalPrice += orderTopping.topping.priceM;
                                    } else if (size === 'L') {
                                        subTotalPrice += orderTopping.topping.priceL;
                                    }
                                }
                            })
                        }

                        // Item
                        if (size === 'M') {
                            subTotalPrice += orderItem.item.priceM;
                        } else if (size === 'L') {
                            subTotalPrice += orderItem.item.priceL;
                        }

                        // subTotalPriceにセット
                        orderItem.subTotalPrice = subTotalPrice * orderItem.quantity;
                    })
                }
            });

            state.orderHistory = copyOrderHistory;
        }),
        setOrdersTotalCount: ((state: historyState, action) => {
            state.orderHistoryTotalCount = action.payload.count;
        })
    },
    extraReducers: ((builder) => {
        // fetchOrderHistory
        builder.addCase(fetchOrderHistory.fulfilled, (state, action) => {
            historySlice.caseReducers.setOrders(state, historySlice.actions.setOrders(action.payload));
        });
        builder.addCase(fetchOrderHistory.rejected, (state, action) => {
            throw new Error(action.error.message);
        });

        // fetchOrderHistoryTotalCount
        builder.addCase(fetchOrderHistoryTotalCount.fulfilled, (state, action) => {
            historySlice.caseReducers.setOrdersTotalCount(state, historySlice.actions.setOrdersTotalCount(action.payload));
        });
        builder.addCase(fetchOrderHistoryTotalCount.rejected, (state, action) => {
            throw new Error(action.error.message);
        });
    })
})

export const selectOrderHistory = (state: RootState) => state.history.orderHistory;
export const selectOrderHistoryTotalCount = (state: RootState) => state.history.orderHistoryTotalCount;
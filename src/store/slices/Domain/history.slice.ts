import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

import {Order, DisplaySetting} from '~/types/interfaces';
import {RootState} from "~/store";
import {API_URL} from '~/store/api';
import camelcaseKeys from "camelcase-keys";

type historyState = {
    orderHistory: Array<Order>;
    orderHistoryTotalCount: number;
}

const initialHistoryState: historyState = {
    orderHistory: [],
    orderHistoryTotalCount: 0
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
        const {data} = await axios.get(`${API_URL}/flask/order-history`, {
            method: 'GET',
            params: params,
            headers: {
                Authorization: localStorage.getItem("Authorization")
            }
        })
        return data;
    } catch (e) {
        throw new Error(e);
    }
})

/**
 * 注文履歴総数を取得する.
 *
 * @return {number} 注文履歴総数
 */
export const fetchOrderHistoryTotalCount = createAsyncThunk('history/getTotalCount', async () => {
    try {
        const {data} = await axios.get(`${API_URL}/flask/order-history/count`, {
            method: 'GET',
            headers: {
                Authorization: localStorage.getItem("Authorization")
            }
        })
        return data;
    } catch (e) {
        throw new Error(e);
    }
})

//--------------------------------------------

export const historySlice = createSlice({
    name: 'history',
    initialState: initialHistoryState,
    reducers: {
        setOrders: ((state: historyState, action) => {
            state.orderHistory = action.payload.orders;
        }),
        setOrdersTotalCount: ((state: historyState, action) => {
            state.orderHistoryTotalCount = action.payload.count;
        })
    },
    extraReducers: ((builder) => {
        // fetchOrderHistory
        builder.addCase(fetchOrderHistory.fulfilled, (state, action) => {
            const camelPayload = camelcaseKeys(action.payload, {deep: true});
            const _action = historySlice.actions.setOrders(camelPayload);

            historySlice.caseReducers.setOrders(state, _action);
        });
        builder.addCase(fetchOrderHistory.rejected, (state, action) => {
            console.log(action.error.message);
        });

        // fetchOrderHistoryTotalCount
        builder.addCase(fetchOrderHistoryTotalCount.fulfilled, (state, action) => {
            const _action = historySlice.actions.setOrdersTotalCount(action.payload);
            historySlice.caseReducers.setOrdersTotalCount(state, _action);
        });
        builder.addCase(fetchOrderHistoryTotalCount.rejected, (state, action) => {
            console.log(action.error.message);
        });
    })
})

export const selectOrderHistory = (state: RootState) => state.history.orderHistory;
export const selectOrderHistoryTotalCount = (state: RootState) => state.history.orderHistoryTotalCount;
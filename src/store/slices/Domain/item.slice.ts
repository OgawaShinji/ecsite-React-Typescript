import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";

import {Item, SearchForm} from "~/types/interfaces";
import {RootState} from "~/store";

import Axios from "~/store/api";

type itemState = {
    items: Array<Item>;
    itemNames: Array<string>;
    itemDetail: Item | null;
}

const initialItemState: itemState = {
    items: [],
    itemNames: [],
    itemDetail: null
}

//--------------------------------------------

/**
 * 商品一覧を取得する.
 *
 * @param {SearchForm} searchForm 検索フォーム
 * @return {Array<Item>} 全件または選択された商品一覧
 */
export const fetchItems = createAsyncThunk('item/getItems', async (searchForm: SearchForm) => {
    try {
        const {data} = await Axios.get(`/flask/item/`, {
            method: "GET",
            params: searchForm,
            headers: {
                Authorization: localStorage.getItem("Authorization")
            }
        })
        return data;
    } catch (e) {
        throw new Error(e.response.status);
    }
});

/**
 * 全商品名を取得する.
 *
 * @return {Array<string>} 商品名一覧
 */
export const fetchItemNames = createAsyncThunk('item/getItemNames', async () => {
    try {
        const {data} = await Axios.get(`/flask/item-name/`, {
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

/**
 * 商品詳細情報を取得する.
 *
 * @param {number} itemId 商品ID
 * @return {Item} 商品詳細情報
 */
export const fetchItemDetail = createAsyncThunk(
    'item/detail',
    async (itemId: number) => {
        try {
            const {data} = await Axios.get(`/flask/item/${itemId}/`, {
                method: "GET",
                headers: {
                    Authorization: localStorage.getItem("Authorization")
                }
            })
            return data;
        } catch (e) {
            throw new Error(e.response.status);
        }
    }
)

//--------------------------------------------

export const itemSlice = createSlice({
    name: 'item',
    initialState: initialItemState,
    reducers: {
        setItems: ((state: itemState, action) => {
            state.items = action.payload.items;
        }),
        setItemNames: ((state: itemState, action) => {
            state.itemNames = action.payload.itemNames;
        }),
        setItemDetail: ((state, action) => {
            state.itemDetail = action.payload
        })
    },
    extraReducers: ((builder) => {
        // fetchItems
        builder.addCase(fetchItems.fulfilled, (state, action) => {
            itemSlice.caseReducers.setItems(state, itemSlice.actions.setItems(action.payload));
        });
        builder.addCase(fetchItems.rejected, (state, action) => {
            throw new Error(action.error.message);
        });

        // fetchItemNames
        builder.addCase(fetchItemNames.fulfilled, (state, action) => {
            itemSlice.caseReducers.setItemNames(state, itemSlice.actions.setItems(action.payload));
        })
        builder.addCase(fetchItemNames.rejected, (state, action) => {
            throw new Error(action.error.message);
        })

        //fetchItemDetail
        builder.addCase(fetchItemDetail.fulfilled, (state, action) => {
            itemSlice.caseReducers.setItemDetail(state, itemSlice.actions.setItemDetail(action.payload))
        })
        builder.addCase(fetchItemDetail.rejected, (state, action) => {
            throw new Error(action.error.message);
        })
    })
})

export const {setItemDetail} = itemSlice.actions;

export const selectItems = (state: RootState) => state.item.items;
export const selectItemNames = (state: RootState) => state.item.itemNames;
export const selectItemDetail = (state: RootState) => state.item.itemDetail;
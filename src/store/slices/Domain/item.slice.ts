import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

import {Item, SearchForm} from "~/types/interfaces";
import {RootState} from "~/store";
import camelcaseKeys from "camelcase-keys";
import {API_URL} from "~/store/api";

type itemState = {
    items: Array<Item>;
    itemNames: Array<string>;
    itemDetail: Item;
}

const initialItemState: itemState = {
    items: [],
    itemNames: [],
    itemDetail: {
        id: 0,
        name: "",
        imagePath: "",
        priceM: 0,
        priceL: 0,
        description: "",
        deleted: 0
    }
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
        const {data} = await axios.get(`${API_URL}/flask/item`, {
            method: "GET",
            params: searchForm,
            headers: {
                Authorization: localStorage.getItem("Authorization")
            }
        })
        return data;
    } catch (e) {
        throw new Error(e);
    }
});

/**
 * 全商品名を取得する.
 *
 * @return {Array<string>} 商品名一覧
 */
export const fetchItemNames = createAsyncThunk('item/getItemNames', async () => {
    try {
        const {data} = await axios.get(`${API_URL}/flask/item-name`, {
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

export const fetchItemDetail = createAsyncThunk(
    'item/detail',
    async (itemId: number) => {
        try {
            const {data} = await axios.get(`${API_URL}/item/${itemId}`, {
                method: "GET",
                headers: {
                    Authorization: localStorage.getItem("Authorization")
                }
            })
            return data;
        } catch (e) {
            throw e;
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
            const camelPayload = camelcaseKeys(action.payload, {deep: true})
            const _action = itemSlice.actions.setItems(camelPayload);

            itemSlice.caseReducers.setItems(state, _action);
        });
        builder.addCase(fetchItems.rejected, (state, action) => {
            console.log(action.error.message);
        });

        // fetchItemNames
        builder.addCase(fetchItemNames.fulfilled, (state, action) => {
            const camelPayload = camelcaseKeys(action.payload)
            const _action = itemSlice.actions.setItems(camelPayload);
            itemSlice.caseReducers.setItemNames(state, _action);
        })
        builder.addCase(fetchItemNames.rejected, (state, action) => {
            console.log(action.error.message);
        })

        //fetchItemDetail
        builder.addCase(fetchItemDetail.fulfilled, (state, action) => {
            const camelPayload = camelcaseKeys(action.payload)
            itemSlice.caseReducers.setItemDetail(state, itemSlice.actions.setItemDetail(camelPayload))
        })
        builder.addCase(fetchItemDetail.rejected, (state, action) => {
            console.log(action.error.message)
        })
    })
})

export const selectItems = (state: RootState) => state.item.items;
export const selectItemNames = (state: RootState) => state.item.itemNames;
export const selectItemDetail = (state: RootState) => state.item.itemDetail;
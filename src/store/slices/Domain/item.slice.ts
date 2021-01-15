import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

import {Item, SearchForm} from "../../../types/interfaces";
import {RootState} from "../../index";
import camelcaseKeys from "camelcase-keys";

type itemState = {
    items: Array<Item>;
    itemNames: Array<string>;
}

const initialItemState: itemState = {
    items: [],
    itemNames: []
}

//--------------------------------------------

export const fetchItems = createAsyncThunk('item/getItems', async (searchForm: SearchForm) => {
    try {
        // TODO: pathが決定次第修正
        const {data} = await axios.get(`http://localhost:3000/items`, {
            method: "GET",
            params: searchForm,
            headers: {
                token: localStorage.getItem("token")
            }
        })
        return data;
    } catch (e) {
        throw new Error(e);
    }
});

export const fetchItemNames = createAsyncThunk('item/getItemNames', async () => {
    try {
        // TODO: pathが決定次第修正
        const {data} = await axios.get('http://localhost:3000/itemNames', {
            method: 'GET',
            headers: {
                token: localStorage.getItem("token")
            }
        })
        return data;
    } catch (e) {
        throw new Error(e);
    }
})


//--------------------------------------------

export const itemSlice = createSlice({
    name: 'item',
    initialState: initialItemState,
    reducers: {
        setItems: ((state: itemState, action) => {
            state.items = action.payload.items;
        }),
        setItemNames: ((state, action) => {
            state.itemNames = action.payload.itemNames;
        })
    },
    extraReducers: ((builder) => {
        // fetchItems
        builder.addCase(fetchItems.fulfilled, (state, action) => {
            const camelPayload = camelcaseKeys(action.payload)
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
    })
})

export const selectItems = (state: RootState) => state.item.items;
export const selectItemNames = (state: RootState) => state.item.itemNames;
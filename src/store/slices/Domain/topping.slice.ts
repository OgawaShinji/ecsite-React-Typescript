import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {Topping} from "~/types/interfaces"
import axios from "axios";
import {API_URL} from "~/store/api";
import {RootState} from "~/store/index";
import camelcaseKeys from "camelcase-keys";

type toppingState = {
    toppings: Topping[]
}
const initialToppingState: toppingState = {
    toppings: []
}
export const fetchToppings = createAsyncThunk(
    'topping/fetchToppings',
    async () => {
        try {
            const {data} = await axios.get(`${API_URL}/flask/topping/`, {
                method: "GET",
                headers: {
                    Authorization: localStorage.getItem("Authorization")
                }
            })
            return data
        } catch (e) {
            console.log(e)
            throw e
        }
    }
)
export const toppingSlice = createSlice({
    name: 'topping',
    initialState: initialToppingState,
    reducers: {
        setToppings: (((state: toppingState, action) => {
            state.toppings = action.payload
        }))
    },
    extraReducers: ((builder) => {
        builder.addCase(fetchToppings.fulfilled, (((state, action) => {
            const camelPayload = camelcaseKeys(action.payload)
            toppingSlice.caseReducers.setToppings(state, toppingSlice.actions.setToppings(camelPayload))
        })));
        builder.addCase(fetchToppings.rejected, ((state, action) => {
            console.log(action.error)
            //商品一覧画面遷移もしくはエラー画面？
        }))
    })
})
export const selectToppings = (state: RootState) => state.topping.toppings
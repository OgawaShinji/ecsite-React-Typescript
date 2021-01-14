import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {Topping} from "../../../types/interfaces"
import axios from "axios";
import {API_URL} from "../../api";

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
            const {data} = await axios.get(`${API_URL}/topping`, {
                method: "GET",
                headers: {
                    token: localStorage.getItem("token")
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
        setToppings: (((state, action) => {
            state.toppings = action.payload
        }))
    },
    extraReducers: ((builder) => {
        builder.addCase(fetchToppings.fulfilled, (((state, action) => {
            toppingSlice.caseReducers.setToppings(state, toppingSlice.actions.setToppings(action.payload))
        })));
        builder.addCase(fetchToppings.rejected, ((state, action) => {
            console.log(action.error)
            //商品一覧画面遷移もしくはエラー画面？
        }))
    })
})
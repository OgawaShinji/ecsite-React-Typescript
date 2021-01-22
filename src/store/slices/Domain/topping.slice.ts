import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {Topping} from "~/types/interfaces"
import Axios from "~/store/api";
import {RootState} from "~/store";

type toppingState = {
    toppings: Topping[]
}
const initialToppingState: toppingState = {
    toppings: []
}
/**
 * トッピング一覧を取得するようAPIを呼び出す
 * 成功時toppingSliceにて、RootState.topping.toppings を更新する
 * 失敗時toppingSliceにて、エラー画面遷移
 *
 * @return {toppingState.toppings}
 */
export const fetchToppings = createAsyncThunk(
    'topping/fetchToppings',
    async () => {
        try {
            const {data} = await Axios.get(`/flask/topping/`, {
                method: "GET",
                headers: {
                    Authorization: localStorage.getItem("Authorization")
                }
            })
            return data
        } catch (e) {
            throw new Error(e.response.status)
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
            toppingSlice.caseReducers.setToppings(state, toppingSlice.actions.setToppings(action.payload?.topping))
        })));
        builder.addCase(fetchToppings.rejected, ((state, action) => {
            throw new Error(action.error.message)
        }))
    })
})
export const selectToppings = (state: RootState) => state.topping.toppings
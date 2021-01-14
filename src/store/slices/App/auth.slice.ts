import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {User} from "../../../types/interfaces";
import {RootState} from "../../index";
import {API_URL} from "../../api";
import axios from "axios";

type authState = {
    loginUser: null | User
}
const initialAuthState: authState = {
    loginUser: null
}

export const logout = createAsyncThunk(
    'auth/logout',
    async () => {
        try {
            const {data} = await axios.put(`${API_URL}/logout`, {}, {
                method: "PUT",
                headers: {
                    token: localStorage.getItem("token")
                }
            })
            return {data}
        } catch (e) {
            console.log(e)
        }
    })
//--------------------------------------------
export const authSlice = createSlice({
    name: 'auth',
    initialState: initialAuthState,
    reducers: {
        setLoginUser: ((state: authState, action) => {
            state.loginUser = action.payload
        })
    },
    extraReducers: ((builder) => {
        builder.addCase(logout.fulfilled, ((state, action) => {
            //authSlice.caseReducers.setLoginUser(state, authSlice.actions.setLoginUser(null));
            //上記2文は次と同義
            state.loginUser = null;
            localStorage.removeItem("token")
        }));
        builder.addCase(logout.rejected, (((state) => {
            //商品一覧画面遷移もしくはエラー画面？
        })))
    })
})
export const selectLoginUser = (state: RootState) => state.auth.loginUser
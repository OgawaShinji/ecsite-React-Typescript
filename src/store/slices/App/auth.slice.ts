import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {User} from "~/types/interfaces";
import {RootState} from "~/store/index";
import {API_URL} from "~/store/api";
import axios from "axios";
import camelcaseKeys from "camelcase-keys";

type authState = {
    loginUser: null | User
}
const initialAuthState: authState = {
    loginUser: null
}
export type loginForm = {
    email: string;
    password: string;
}

export const logout = createAsyncThunk(
    'auth/logout',
    async () => {
        try {
            const {data} = await axios.put(`${API_URL}/auth/logout/`, {}, {
                method: "PUT",
                headers: {
                    Authorization: localStorage.getItem("Authorization")
                }
            })
            return {data}
        } catch (e) {
            throw e
        }
    })
export const login = createAsyncThunk(
    'auth/login',
    async (loginInfo: loginForm) => {
        try {
            const {data} = await axios.post(`${API_URL}/auth/login/`, loginInfo, {
                method: "POST",
            })
            return data;
        } catch (e) {
            throw e
        }
    }
)
export const fetchLoginUser = createAsyncThunk(
    'auth/user',
    async () => {
        try {
            const {data} = await axios.get(`${API_URL}/auth/user/`, {
                method: "GET",
                headers: {
                    Authorization: localStorage.getItem("Authorization")
                }
            })
            return data;
        } catch (e) {
            throw e
        }
    }
)
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
            //authSlice.caseReducers.setLoginUser(state, authSlice.actions.
            //上記は次と同義
            state.loginUser = null;
            localStorage.removeItem("Authorization")
        }));
        builder.addCase(logout.rejected, (((state) => {
            //商品一覧画面遷移もしくはエラー画面？
        })));
        builder.addCase(login.fulfilled, (state, action) => {
            const camelPayload = camelcaseKeys(action.payload['token'])
            localStorage.setItem("Authorization", camelPayload)
        })
        builder.addCase(login.rejected, (state) => {
        })
        builder.addCase(fetchLoginUser.fulfilled, ((state, action) => {
            const camelPayload = camelcaseKeys(action.payload)
            authSlice.caseReducers.setLoginUser(state, authSlice.actions.setLoginUser(camelPayload))
        }));
        builder.addCase(fetchLoginUser.rejected, (state) => {
        })
    })
})
export const selectLoginUser = (state: RootState) => state.auth.loginUser
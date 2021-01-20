import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {User} from "~/types/interfaces";
import {RootState} from "~/store/index";
import Axios, {API_URL} from "~/store/api";
import axios from "axios";
import camelcaseKeys from "camelcase-keys";
import snakecaseKeys from "snakecase-keys";

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

/**
 * logout処理するようAPIを呼び出す
 * 成功時authSliceにて、ローカルストレージからAuthorizationを削除し、RootState.auth.loginUserをnullに更新する
 * 失敗時authSliceにて、エラー画面遷移
 */
export const logout = createAsyncThunk(
    'auth/logout',
    async () => {
        try {
            const {data} = await axios.post(`${API_URL}/auth/logout/`, {}, {
                method: "POST",
                headers: {
                    Authorization: localStorage.getItem("Authorization")
                }
            })
            return {data}
        } catch (e) {
            throw e
        }
    })

/**
 * login処理するようAPIを呼び出す
 * 成功時authSliceにて、ローカルストレージにAuthorizationをsetし、fetchLoginUserを呼び出す
 * 失敗時authSliceにて、エラー画面遷移
 *
 * @return　token
 */
export const login = createAsyncThunk(
    'auth/login',
    async (loginInfo: loginForm) => {
        try {
            const sample={
                eMail:loginInfo.email,
                orderItem:{
                    itemId:"itemId"
                }
            }
            const {data} = await Axios.post(`${API_URL}/auth/login/`, sample, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            return data;
        } catch (e) {
            throw e
        }
    }
)

/**
 * loginUserの情報を取得するようAPIを呼び出す
 * 成功時authSliceにて、RootState .auth.loginUserにsetする
 * 失敗時authSliceにて、エラー画面遷移
 *
 * @return loginUser :User
 */
export const fetchLoginUser = createAsyncThunk(
    'auth/user',
    async () => {
        try {
            const {data} = await Axios.get(`${API_URL}/auth/user/`, {
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
        //logout
        builder.addCase(logout.fulfilled, ((state, action) => {
            state.loginUser = null;
            localStorage.removeItem("Authorization")
        }));
        builder.addCase(logout.rejected, (((state) => {
            //商品一覧画面遷移もしくはエラー画面？
        })));

        //login
        builder.addCase(login.fulfilled, (state, action) => {
            const camelPayload = camelcaseKeys(action.payload['token'])
            localStorage.setItem("Authorization", camelPayload)
        })
        builder.addCase(login.rejected, (state) => {
        })

        //fetchLoginUser
        builder.addCase(fetchLoginUser.fulfilled, ((state, action) => {
            const camelPayload = camelcaseKeys(action.payload)
            authSlice.caseReducers.setLoginUser(state, authSlice.actions.setLoginUser(camelPayload))
        }));
        builder.addCase(fetchLoginUser.rejected, (state) => {
        })
    })
})
export const selectLoginUser = (state: RootState) => state.auth.loginUser;
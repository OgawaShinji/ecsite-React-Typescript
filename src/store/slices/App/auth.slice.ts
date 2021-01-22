import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {User} from "~/types/interfaces";
import {RootState} from "~/store/index";
import Axios from "~/store/api";

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
            const {data} = await Axios.post(`/auth/logout/`, {}, {
                method: "POST",
                headers: {
                    Authorization: localStorage.getItem("Authorization")
                }
            })
            return data
        } catch (e) {
            throw new Error(e.response.status)
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
            const {data} = await Axios.post(`/auth/login/`, loginInfo, {
                method: "POST",
            })
            return data;
        } catch (e) {
            throw new Error(e.response.status)
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
            const {data} = await Axios.get(`/auth/user/`, {
                method: "GET",
                headers: {
                    Authorization: localStorage.getItem("Authorization")
                }
            })
            return data;
        } catch (e) {
            throw new Error(e.response.status)
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
        builder.addCase(logout.rejected, (((state, action) => {
            throw new Error(action.error.message)
        })));

        //login
        builder.addCase(login.fulfilled, (state, action) => {
            if (action.payload?.token) {
                localStorage.setItem("Authorization", action.payload.token)
                action.payload = "200"
            }
        })
        builder.addCase(login.rejected, (state, action) => {
            throw new Error(action.error.message)
        })

        //fetchLoginUser
        builder.addCase(fetchLoginUser.fulfilled, ((state, action) => {
            authSlice.caseReducers.setLoginUser(state, authSlice.actions.setLoginUser(action.payload?.user))
        }));
        builder.addCase(fetchLoginUser.rejected, (state, action) => {
            throw new Error(action.error.message)
        })
    })
})
export const selectLoginUser = (state: RootState) => state.auth.loginUser;
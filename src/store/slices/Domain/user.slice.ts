import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";
import {User} from "~/types/interfaces";
import {API_URL} from "~/store/api";


//-----非同期処理（createAsyncThunk)の記述
export const postRegisterUser = createAsyncThunk(
    'user/postUserRegister',
    async (userInfo:User) => {
        //dispatchでに渡されてきたユーザー情報をPOSTする
        await axios.post(
            `${API_URL}/auth/register/`,
            {userInfo},
            {
                method: 'POST',
                headers: {
                    Authorization: localStorage.getItem('Authorization')
                }
            }).catch(error => {
            throw new Error(error);
        });
    })

//-----ここから下はSlice

export const userSlice = createSlice({
    name: 'user',
    initialState:{},
    reducers: {},
    extraReducers: ((builder) => {
        builder.addCase(postRegisterUser.fulfilled, ((state, action) => {
            //なくていいかも
        }));
        builder.addCase(postRegisterUser.pending, (state, action) => {
            //なくていいかも
        });
        builder.addCase(postRegisterUser.rejected, (state, action) => {
            //保留中
            //エラー表示を想定
        });
    })
})
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import axios from "axios";
import {API_URL} from "../../index";
import {User} from "../../../types/interfaces";
import capitalize from "@material-ui/core/utils/capitalize";
import {userInfo} from "os";


type userState = {
    user: User,
}

//-----stateの定義

//必要ないかも

//-----非同期処理（createAsyncThunk)の記述

export const postRegisterUser = createAsyncThunk(
    'user/postUserRegister',
    async (userInfo:userState) => {

        //引数に渡されたユーザー情報を代入する
        await axios.post(
            //"http://localhost:3000"
            // `${API_URL}/auth/register/`,
            "http://localhost:3000/auth/register",
            {
                name: userInfo.user.userName,
                email: userInfo.user.email,
                password: userInfo.user.password,
                zipcode: userInfo.user.zipcode,
                address: userInfo.user.address,
                telephone: userInfo.user.telephone
            },
            {
                method: "POST",
                headers: {
                    token: localStorage.getItem("token")
                }
            })
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
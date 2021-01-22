import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {User} from "~/types/interfaces";
import Axios from "~/store/api";


//-----非同期処理（createAsyncThunk)の記述
export const postRegisterUser = createAsyncThunk(
    'user/postUserRegister',
    async (userInfo: User) => {
        //dispatchでに渡されてきたユーザー情報をPOSTする
        await Axios.post(
            `/auth/register/`,
            {
                name: userInfo.name,
                email: userInfo.email,
                password: userInfo.password,
                zipcode: userInfo.zipcode,
                address: userInfo.address,
                telephone: userInfo.telephone,
                status: '0'
            },
            {
                method: 'POST',
                headers: {
                    Authorization: localStorage.getItem("Authorization"),
                }
            }).catch(error => {
            throw new Error(error.response.status);
        });
    })

//-----ここから下はSlice

export const userSlice = createSlice({
    name: 'user',
    initialState: {},
    reducers: {},
    extraReducers: ((builder) => {
        builder.addCase(postRegisterUser.fulfilled, ((state, action) => {
            //なくていいかも
        }));
        builder.addCase(postRegisterUser.pending, (state, action) => {
            //なくていいかも
        });
        builder.addCase(postRegisterUser.rejected, (state, action) => {
            throw new Error(action.error.message)
        });
    })
})
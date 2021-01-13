import {createSlice} from "@reduxjs/toolkit";
import {User} from "../../../types/interfaces";

type authState = {
    loginUser: null | User
}
const initialAuthState: authState = {
    loginUser: null
}
export const authSlice = createSlice({
    name: 'auth',
    initialState: initialAuthState,
    reducers: {}
})
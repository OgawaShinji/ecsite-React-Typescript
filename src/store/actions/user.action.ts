import axios from "axios";
import {createAsyncThunk} from "@reduxjs/toolkit";
import {API_URL} from "../index";

export const logout = createAsyncThunk(
    'user/logout',
    async () => {
        await axios.put(`${API_URL}/logout`, {}, {
            method: "PUT",
            headers: {
                token: localStorage.getItem("token")
            }
        }).then((res) => {
            return res.status
        }).catch((e) => {
            console.log(e)
            return e
        });
    })
import {createSlice} from "@reduxjs/toolkit";
import {RootState} from "~/store";

type errorState = {
    error: {
        isError: boolean,
        code?: number
    }
}
const initialErrorState: errorState = {
    error: {
        isError: false
    }
}

export const errorSlice = createSlice({
    name: 'error',
    initialState: initialErrorState,
    reducers: {
        setError: ((state: errorState, action) => {
            console.log(action.payload)
            state.error = action.payload;
        })
    }
});
export const selectError = (state: RootState) => state.error.error;
export const {setError} = errorSlice.actions;
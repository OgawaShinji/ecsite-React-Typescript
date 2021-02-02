import {createSlice} from "@reduxjs/toolkit";
import {RootState} from "~/store";

type errorState = {
    error: {
        isError: boolean,
        code?: string
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
            state.error = action.payload;
        })
    }
});
export const selectError = (state: RootState) => state.error.error;
export const {setError} = errorSlice.actions;
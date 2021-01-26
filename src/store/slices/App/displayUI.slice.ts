import {createSlice} from "@reduxjs/toolkit";
import {RootState} from "~/store";

type displayState = {
    isLoading: boolean;
}
const initialDisplayState: displayState = {
    isLoading: false
}

export const displaySlice = createSlice({
    name: 'display',
    initialState: initialDisplayState,
    reducers: {
        setIsLoading: ((state: displayState, action) => {
            state.isLoading = action.payload;
        })
    }
});
export const selectIsLoading = (state: RootState) => state.display.isLoading;
export const {setIsLoading} = displaySlice.actions;
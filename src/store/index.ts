import {configureStore} from '@reduxjs/toolkit'
import {itemSlice} from "./slices/Domain/item.slice";
import {historySlice} from "./slices/Domain/history.slice";
import {orderSlice} from "./slices/Domain/order.slice";
import {toppingSlice} from "./slices/Domain/topping.slice";
import {userSlice} from "./slices/Domain/user.slice";
import {authSlice} from "./slices/App/auth.slice";

const store = configureStore({
    reducer: {
        history: historySlice.reducer,
        item: itemSlice.reducer,
        order: orderSlice.reducer,
        topping: toppingSlice.reducer,
        user: userSlice.reducer,
        auth: authSlice.reducer
    }
});
export default store;
export type RootState = ReturnType<typeof store.getState>;
export const API_URL = "http://localhost:3000"
export type AppDispatch = typeof store.dispatch

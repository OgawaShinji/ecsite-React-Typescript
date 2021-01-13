import {combineReducers, configureStore} from '@reduxjs/toolkit'
import {itemSlice} from "./slices/Domain/item.slice";
import {historySlice} from "./slices/Domain/history.slice";
import {orderSlice} from "./slices/Domain/order.slice";
import {toppingSlice} from "./slices/Domain/topping.slice";
import {userSlice} from "./slices/Domain/user.slice";

export type AppState = {}
const rootReducer = combineReducers<AppState>({
    history: historySlice.reducer,
    item: itemSlice.reducer,
    order: orderSlice.reducer,
    topping: toppingSlice.reducer,
    user: userSlice.reducer,
});
const store = configureStore({reducer: rootReducer});
export default store;
export type AppDispatch = typeof store.dispatch

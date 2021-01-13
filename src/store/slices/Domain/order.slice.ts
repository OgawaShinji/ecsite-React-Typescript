import {createSlice} from "@reduxjs/toolkit";
import {Order, Topping} from '../../../types/interfaces'

type orderState = {
    order: Order,
    subTotalPrice: number
}

const initialState: orderState = {
    order: {
        orderId: undefined,
        totalPrice: 0,
        destinationAddress: '',
        destinationName: '',
        deliveryDate: undefined,
        status: undefined,
        orderItems:[],
        destinationZipcode: '',
        paymentMethod: ''
    },
    subTotalPrice: 0
}

export const orderSlice = createSlice({
    name: '',
    initialState: initialState,
    reducers: {}
})
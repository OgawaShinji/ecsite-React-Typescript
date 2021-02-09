import {Order, OrderItem} from "~/types/interfaces";
import {
    asyncDeleteOrderItem,
    asyncFetchOrderItems,
    asyncPostOrderItem, asyncUpdateOrderItem,
    orderSlice, postOrder,
    setOrderItemsAndSubTotalPrice
} from "~/store/slices/Domain/order.slice";

type orderState = {
    order: Order,
    orderSubTotalPrice: number,
}

let initialState: orderState = {
    order: {},
    orderSubTotalPrice: 0
}

const createOrderItems = (start: number, end: number) => {
    let orderItems: Array<OrderItem> = [];
    for (let i = start; i <= end; i++) {
        orderItems.push({
            id: i,
            item: {
                deleted: 0,
                description: `説明文${i}`,
                id: i,
                imagePath: `imagePath${i}`,
                name: `item name${i}`,
                priceL: i * 1000,
                priceM: i * 2000
            },
            quantity: 1,
            size: 'M'
        });
    }
    return orderItems;
}

const reducer = orderSlice.reducer

describe('orderSlice test', () => {
    describe('Reducer', () => {
        describe('setOrderItemsAndSubTotalPrice', () => {
            it('setOrderItems when array.length>0', () => {
                let resOrderItems: Array<OrderItem> = createOrderItems(1, 3);
                const action = {type: setOrderItemsAndSubTotalPrice.type, payload: resOrderItems};
                const state = reducer(initialState, action);

                expect(state.order.orderItems?.length).toBe(3)
                expect(state.order.orderItems![0].id).toBe(1);
                expect(state.order.orderItems![1].id).toBe(2);
                expect(state.order.orderItems![2].id).toBe(3);
            })

            it('setOrderItems when array.length=0', () => {
                let resOrderItems: Array<OrderItem> = [];
                const action = {type: setOrderItemsAndSubTotalPrice.type, payload: resOrderItems};
                const state = reducer(initialState, action);

                expect(state.order.orderItems?.length).toBe(0)
            })

            it('setOrderItems update', () => {
                initialState.order.orderItems = createOrderItems(1, 3)

                let resOrderItems: Array<OrderItem> = createOrderItems(4, 5);
                const action = {type: setOrderItemsAndSubTotalPrice.type, payload: resOrderItems};
                const state = reducer(initialState, action);

                expect(state.order.orderItems?.length).toBe(2)
                expect(state.order.orderItems![0].id).toBe(4);
                expect(state.order.orderItems![1].id).toBe(5);
            })
        })
    })

    describe('extraReducers', () => {
        describe('asyncFetchOrderItems', () => {
            it('asyncFetchOrderItems fulfilled', () => {
                let resOrderItems: Array<OrderItem> = createOrderItems(1, 2);
                const res = {orderItems: resOrderItems}
                const action = {type: asyncFetchOrderItems.fulfilled.type, payload: res};
                const state = reducer(initialState, action);

                expect(state.order.orderItems?.length).toBe(2)
                expect(state.order.orderItems![0].id).toBe(1);
                expect(state.order.orderItems![1].id).toBe(2);
            })

            it('asyncFetchOrderItems rejected', () => {
                const action = {type: asyncFetchOrderItems.rejected.type, error: {message: '401 Error'}};

                let msg: string
                try {
                    reducer(initialState, action);
                } catch (e) {
                    msg = e.message;
                }

                expect(msg!).toBe('401 Error')
            })
        })
        describe('asyncPostOrderItem',()=>{
            it('asyncPostOrderItem rejected', () => {
                const action = {type: asyncPostOrderItem.rejected.type, error: {message: '401 Error'}};

                let msg: string
                try {
                    reducer(initialState, action);
                } catch (e) {
                    msg = e.message;
                }

                expect(msg!).toBe('401 Error')
            })
        })
        describe('asyncUpdateOrderItem',()=>{
            it('asyncUpdateOrderItem rejected', () => {
                const action = {type: asyncUpdateOrderItem.rejected.type, error: {message: '400 Error'}};

                let msg: string
                try {
                    reducer(initialState, action);
                } catch (e) {
                    msg = e.message;
                }

                expect(msg!).toBe('400 Error')
            })
        })
        describe('asyncDeleteOrderItem',()=>{
            it('asyncDeleteOrderItem rejected', () => {
                const action = {type: asyncDeleteOrderItem.rejected.type, error: {message: '400 Error'}};

                let msg: string
                try {
                    reducer(initialState, action);
                } catch (e) {
                    msg = e.message;
                }

                expect(msg!).toBe('400 Error')
            })
        })
        describe('postOrder',()=>{
            it('postOrder rejected', () => {
                const action = {type: postOrder.rejected.type, error: {message: '400 Error'}};

                let msg: string
                try {
                    reducer(initialState, action);
                } catch (e) {
                    msg = e.message;
                }

                expect(msg!).toBe('400 Error')
            })
        })
    })
})
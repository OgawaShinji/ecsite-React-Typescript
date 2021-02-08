import {
    itemSlice,
    setItemNamesAndItemCount,
    setItems,
    fetchItems,
    fetchItemNames
} from '~/store/slices/Domain/item.slice';
import {Item} from "~/types/interfaces";

type itemState = {
    items: Array<Item> | null;
    itemNames: Array<string>;
    itemCount: number | null;
    itemDetail: Item | null;
}

let initialItemState: itemState = {
    items: null,
    itemNames: [],
    itemCount: null,
    itemDetail: null
}

const reducer = itemSlice.reducer;

const createItems = (start: number, end: number) => {
    let items: Array<Item> = [];
    for (let i = start; i <= end; i++) {
        items.push({
            deleted: 0,
            description: `説明文${i}`,
            id: i,
            imagePath: `imagePath${i}`,
            name: `item name${i}`,
            priceL: i * 1000,
            priceM: i * 2000
        });
    }
    return items;
}

describe('itemSlice Test', () => {
    describe('Reducer', () => {
        describe('setItems action', () => {
            it('setItems when array.length > 0', () => {

                let resItems: Array<Item> = createItems(1, 3);

                const res = {items: resItems};
                const action = {type: setItems.type, payload: res};
                const state = reducer(initialItemState, action);

                expect(state.items?.length).toBe(3);
                expect(state.items![0].id).toBe(1);
                expect(state.items![1].id).toBe(2);
                expect(state.items![2].id).toBe(3);
            })

            it('setItems when array.length = 0', () => {

                const resItems: Array<Item> = [];
                const res = {items: resItems};
                const action = {type: setItems.type, payload: res};
                const state = reducer(initialItemState, action);

                expect(state.items?.length).toBe(0);
            })

            it('setItems updated', () => {
                initialItemState.items = createItems(1, 3);

                let resItems: Array<Item> = createItems(4, 5);

                const res = {items: resItems};
                const action = {type: setItems.type, payload: res};
                const state = reducer(initialItemState, action);

                expect(state.items?.length).toBe(2);
                expect(state.items![0].id).toBe(4);
                expect(state.items![1].id).toBe(5);
            })
        })

        it('setItemNamesAndItemCount action', () => {
            let resItemNames: Array<string> = ['name1', 'name2', 'name3', 'name4', 'name5'];
            const res = {itemNames: resItemNames};
            const action = {type: setItemNamesAndItemCount.type, payload: res};
            const state = reducer(initialItemState, action);

            expect(state.itemNames).toStrictEqual(resItemNames);
            expect(state.itemCount).toBe(5);
        })
    })

    describe('extraReducers', () => {
        it('fetchItems fulfilled', () => {
            let resItems: Array<Item> = createItems(1, 2);

            const res = {items: resItems};
            const action = {type: fetchItems.fulfilled.type, payload: res}
            const state = reducer(initialItemState, action);

            expect(state.items?.length).toBe(2);
            expect(state.items![0].id).toBe(1);
            expect(state.items![1].id).toBe(2);
        })

        it('fetchItems rejected', () => {
            const action = {type: fetchItems.rejected.type, error: {message: '404 Error'}};

            let msg: string
            try {
                reducer(initialItemState, action);
            } catch (e) {
                msg = e.message;
            }

            expect(msg!).toBe('404 Error')
        })

        it('fetchItemNames fulfilled', () => {
            let resItemNames: Array<string> = ['name1', 'name2', 'name3'];
            const res = {itemNames: resItemNames};
            const action = {type: fetchItemNames.fulfilled.type, payload: res};
            const state = reducer(initialItemState, action);

            expect(state.itemNames).toStrictEqual(resItemNames);
            expect(state.itemCount).toBe(3);
        })

        it('fetchItemNames rejected', () => {
            const action = {type: fetchItemNames.rejected.type, error: {message: '404 Error'}};

            let msg: string
            try {
                reducer(initialItemState, action);
            } catch (e) {
                msg = e.message;
            }

            expect(msg!).toBe('404 Error')
        })
    })
})
import React from "react"
import '@testing-library/jest-dom/extend-expect'
import ItemDetail from "~/components/itemDetail"
import {act, renderHook} from "@testing-library/react-hooks";

import {Item, Topping} from "~/types/interfaces";
import {Provider, useDispatch, useSelector} from "react-redux";
import store, {RootState} from "~/store";

jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom") as {},
    useParams: () => ({
        itemId: 1
    })
}));

const itemFromDB: Item = {
    id: 1,
    name: "item name",
    description: "description",
    priceM: 50,
    priceL: 100,
    imagePath: "",
    deleted: 0
}
const toppingFromDB: Topping[] = [{id: 1}, {id: 2}]

const mockDispatch = useDispatch as jest.Mock;
jest.mock('react-redux', () => ({
    ...jest.requireActual('react-redux') as {},
    //下記でuseSelector,useDispatchを詳しくMock化するためとりあえずここで関数を宣言
    useSelector: jest.fn(),
    useDispatch: jest.fn()
}));

const mockFetchItemDetail = (itemId: number) => {
    mockAppState.item.itemDetail = itemFromDB;
    return {
        payload: {
            item: itemFromDB
        }
    }
}
const mockFetchToppings = () => {
    mockAppState.topping.toppings = toppingFromDB;
    return ""
}

jest.mock('~/store/slices/Domain/item.slice', () => ({
    ...jest.requireActual('~/store/slices/Domain/item.slice')as{},
    fetchItemDetail: (itemId: number) => {
        return mockFetchItemDetail(itemId)
    },
    setItemDetail: (item: Item | null) => {
        mockAppState.item.itemDetail = item
    },
    //mockAppStateで定義された中から必要なstateをセレクトして返す
    selectItemDetail: (state: RootState) => {
        return state.item.itemDetail;
    },
}))

jest.mock("~/store/slices/Domain/topping.slice", () => ({
    selectToppings: (state: RootState) => {
        return state.topping.toppings
    },
    fetchToppings: () => {
        return mockFetchToppings();
    }
}))

let initialItemState: Item | null = null;
let initialToppingsState: Topping[] = [];

type appStateType = {
    item: {
        itemDetail: Item | null
    },
    topping: {
        toppings: { id: number }[]
    }
};

let mockAppState: appStateType = {
    item: {
        itemDetail: initialItemState
    },
    topping: {
        toppings: initialToppingsState
    }
}

//jest.useFakeTimers()
describe('ItemDetail', () => {
    afterEach(() => {
        jest.resetAllMocks()
    })
    beforeEach(() => {
        (useSelector as jest.Mock).mockImplementation(callback => {
            //useSelectorをそのまま使ってる？それでも良い？
            return callback(mockAppState)
        });
        mockDispatch.mockReturnValue(async (i: any) => {
            return i
        });
    })

    test("商品詳細のレンダリング:store(item:null, topping:[])", async () => {

        initialItemState = null;
        initialToppingsState = []

        //const itemComponent=render(<Provider store={mockStore}><ItemDetail/></Provider>)
        //console.log(itemComponent)
        await act(async () => {
            const {result, rerender, waitFor, waitForNextUpdate, waitForValueToChange}
                = renderHook(() => ItemDetail({}), {});
            await console.log(mockFetchToppings.call.length)
            await waitForNextUpdate();
            await console.log(mockFetchToppings.call.length)
        });
        await expect(mockFetchItemDetail.call.length).toBe(1);
        //unmount
        expect(mockFetchToppings.call.length).toBe(1);
    },100000)
})

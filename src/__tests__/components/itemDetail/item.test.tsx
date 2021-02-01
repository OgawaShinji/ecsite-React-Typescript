import React from "react"
import '@testing-library/jest-dom/extend-expect'
import ItemDetail from "~/components/itemDetail"

import {Item, Topping} from "~/types/interfaces";
import {Provider, useDispatch, useSelector} from "react-redux";
import store, {RootState} from "~/store";
import {act, render, screen} from "@testing-library/react";
import {unmountComponentAtNode} from "react-dom";

jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom") as {},
    useParams: () => ({
        itemId: 1
    })
}));

let itemFromDB: Item = {
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

let mockFetchItemDetail = jest.fn().mockImplementation(() => {
    mockAppState.item.itemDetail = itemFromDB;
    return {
        payload: {
            item: itemFromDB
        }
    }
});
let mockFetchToppings = jest.fn().mockImplementation(() => {
    mockAppState.topping.toppings = toppingFromDB;
    return ""
});

jest.mock('~/store/slices/Domain/item.slice', () => ({
    ...jest.requireActual('~/store/slices/Domain/item.slice') as {},
    fetchItemDetail: () => {
        return mockFetchItemDetail()
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
    ...jest.requireActual('~/store/slices/Domain/topping.slice') as {},
    selectToppings: (state: RootState) => {
        return state.topping.toppings
    },
    fetchToppings: () => {
        return mockFetchToppings();
    }

}))

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
        itemDetail: null
    },
    topping: {
        toppings: []
    }
}

describe('ItemDetail', () => {
    let container: null | Element | any = null;
    beforeEach(() => {
        (useSelector as jest.Mock).mockImplementation(callback => {
            //useSelectorをそのまま使ってる？それでも良い？
            return callback(mockAppState)
        });
        mockDispatch.mockReturnValue(async (i: any) => {
            return i
        });
        container = document.createElement('div');
        document.body.appendChild(container);
    })
    afterEach(() => {
        jest.resetAllMocks()
        if (container !== null) {
            unmountComponentAtNode(container);
            container.remove();
            container = null;
        }
    })


    /**
     * テストリスト的な
     *
     * 画面初期表示時loading表示になっている
     * 商品詳細情報がストアに入っていればそれが表示される
     * なければfetchItemDetailが呼び出される
     * 　それが表示される
     * 　エラー時setErrorが呼び出される
     *
     * サイズ変更メソッドが呼ばれると選択中のサイズ情報が代わり、金額が変更される
     * 数量・トッピングも同様
     *
     * カートに入れる・注文に進むボタン押下でRouter遷移メソッド呼び出し
     */
    test("商品詳細のレンダリング:store(item:null, topping:[])", async () => {

        mockAppState = {
            item: {
                itemDetail: null
            },
            topping: {
                toppings: []
            }
        }
        await act(async () => {
            await render(<Provider store={store}><ItemDetail/></Provider>, container)
            //loading中の処理
            //await screen.debug();
            await expect(mockFetchItemDetail.mock.calls.length).toBe(0);
            await expect(mockFetchToppings.mock.calls.length).toBe(0);
        })
        //loading後の処理
        //await screen.debug();
        await expect(mockFetchItemDetail.mock.calls.length).toBe(1);
        await expect(mockFetchToppings.mock.calls.length).toBe(1);
    });

    test("商品詳細のレンダリング:store(item:itemFromDB, topping:toppingFromDB)", async () => {

        mockAppState = {
            item: {
                itemDetail: itemFromDB
            },
            topping: {
                toppings: toppingFromDB
            }
        }

        await act(async () => {
            await render(<Provider store={store}><ItemDetail/></Provider>, container)
            //loading中の処理
            //await screen.debug();
            await expect(mockFetchItemDetail.mock.calls.length).toBe(0);
            await expect(mockFetchToppings.mock.calls.length).toBe(0);
        })
        //loading後の処理
        //await screen.debug();
        await expect(mockFetchItemDetail.mock.calls.length).toBe(0);
        await expect(mockFetchToppings.mock.calls.length).toBe(0);
    });
})

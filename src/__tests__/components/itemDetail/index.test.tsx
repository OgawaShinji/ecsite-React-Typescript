import React from "react";
import {render, screen, cleanup, act} from "@testing-library/react";

import {rest} from 'msw';
import {setupServer} from 'msw/node';

import {Provider} from "react-redux";
import {configureStore} from "@reduxjs/toolkit";
import {itemSlice} from '~/store/slices/Domain/item.slice';
import {BrowserRouter} from "react-router-dom";
import {REST_URL} from "~/store/api";
import {toppingSlice} from "~/store/slices/Domain/topping.slice";
import {orderSlice} from "~/store/slices/Domain/order.slice";
import ItemDetail from "~/components/itemDetail";
import {Item} from "~/types/interfaces";
import userEvent from "@testing-library/user-event";

jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom") as {},
    useParams: () => ({
        itemId: 1
    })
}));
const itemFromDB: Item = {
    id: 1,
    name: 'item name',
    description: 'description',
    priceM: 50,
    priceL: 100,
    imagePath: 'image path',
    deleted: 0
}
let calledCount = {
    url: '',
};
const server = setupServer(
    rest.get(REST_URL + '/flask/item/1', (req, res, ctx) => {
        calledCount.url = `${req.url}`
        return res(ctx.status(200), ctx.json({
            item: itemFromDB
        }))
    }),
    rest.get(REST_URL + '/flask/topping/', (req, res, ctx) => {
        return res(ctx.status(200), ctx.json({
            topping: [{
                "id": 1,
                "name": "フレッシュモッツァレラチーズ",
                "price_m": 20,
                "price_l": 50
            },
                {
                    "id": 2,
                    "name": "topping 2",
                    "price_m": 15,
                    "price_l": 30
                }]
        }))
    }),
    rest.post(REST_URL + '/django/cart/', ((req, res, ctx) => {
        return res(ctx.status(200), ctx.body('200'))
    }))
);

beforeAll(() => {
    server.listen()
})

let store: any;

beforeEach(() => {
    store = configureStore({
        reducer: {
            item: itemSlice.reducer,
            topping: toppingSlice.reducer,
            order: orderSlice.reducer
        }
    })
})

afterEach(() => {
    server.resetHandlers();
    cleanup();
    jest.resetAllMocks();
})

afterAll(() => {
    server.close();
})

describe('ItemList', () => {
    it('test', async () => {
        render(
            <Provider store={store}>
                <BrowserRouter>
                    <ItemDetail/>
                </BrowserRouter>
            </Provider>
        );

        await console.log(calledCount.url)

        /*Componentが呼び出されたタイミング*/
        //初期表示がローディング画面であること
        expect(screen.getByRole('progressbar')).toBeTruthy()
        //商品情報がレンダリングされていないこと
        expect(screen.queryByText(itemFromDB.name)).toBeNull();

        //await screen.debug();

        /*loading中*/
        expect(await screen.findByRole('progressbar')).toBeTruthy()
        //商品情報がレンダリングされていないこと
        expect(screen.queryByText(itemFromDB.name)).toBeNull();

        //await screen.debug();

        /*loading終了後*/
        expect(await screen.findByText(itemFromDB.name)).toBeTruthy();
        //ローディング画面がレンダリングされていないこと
        expect(screen.queryByRole('progressbar')).toBeNull();
        //商品画像のレンダリング(alt属性から特定)
        expect(screen.getByAltText('🍕')).toBeTruthy();

        /*Lサイズボタンクリックイベント*/
        const sizeButton_L = screen.getByText('L :');
        await act(async () => {
            //clickイベント発火(useStateの変更が起こるためactメソッドで発火させる必要がある)
            await userEvent.click(sizeButton_L)
        });
        //Lサイズが選択されていること
        expect(screen.getAllByRole('radio')[0]).not.toBeChecked();
        expect(screen.getAllByRole('radio')[1]).toBeChecked();
        //値段表示がLサイズに変更されていること
        const price = (price: number): string => {
            return `合計金額 : ${price} 円(税抜)`
        }
        expect(await screen.findByText(price(itemFromDB.priceL))).toBeTruthy();

        /*数量3選択イベント*/
        const quantitySelect = screen.getAllByRole('button')[0]
        await act(async () => {
            //select-box押下
            await userEvent.click(quantitySelect)
            //select-box選択肢から3を選択
            await userEvent.click(screen.getByText('3'))
        })
        //数量3を選択されていること
        expect(quantitySelect.textContent).toBe('3')
        //値段表示がLサイズ*3に変更されていること
        expect(await screen.findByText(price(itemFromDB.priceL * 3))).toBeTruthy();

        //await screen.debug();
        await console.log(calledCount.url)

    })
});
//子コンポーネントのモック化ok? indexではしない。理由は以下。
/**
 * いずれにせよ、React Testing Libraryは、Reactコンポーネントを分離してテストするよりも、
 * 他のコンポーネントと統合（統合テスト）することを推奨します。
 * この方法によってのみ、stateの更新がDOMに反映されたかどうかや、
 * 副作用が発生したかどうかを実際にテストすることができます。
 */

//メソッドの呼び出された回数はmockしかない? 画面に表れないpostどうする?
/**
 * 統合テストということを考慮するとpostメソッドをモック化してしまうのは怪しいので
 * 呼び出されたサーバー側の処理を追加する方が良い気がする
 */


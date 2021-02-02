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
import {Item, Topping} from "~/types/interfaces";
import userEvent from "@testing-library/user-event";

jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom") as {},
    useParams: () => ({
        itemId: 1
    }),
    useHistory: () => ({
        push: jest.fn().mockImplementation((to: string) => {
            calledMethod.history = to;
        })
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
};
const toppingsFromDB: Topping[] = [{
    id: 1,
    name: "topping 1",
    priceM: 20,
    priceL: 50
},
    {
        id: 2,
        name: "topping 2",
        priceM: 15,
        priceL: 30
    }]
let calledMethod = {
    url: '',
    history: ''
};
const server = setupServer(
    rest.get(REST_URL + '/flask/item/1', (req, res, ctx) => {
        return res(ctx.status(200), ctx.json({
            item: itemFromDB
        }))
    }),
    rest.get(REST_URL + '/flask/topping/', (req, res, ctx) => {
        return res(ctx.status(200), ctx.json({
            topping: toppingsFromDB
        }))
    }),
    rest.post(REST_URL + '/django/cart/', ((req, res, ctx) => {
        calledMethod.url = `${req.url}`
        return res(ctx.status(200), ctx.body('200'))
    }))
);

beforeAll(() => {
    server.listen()
});

let store: any;

beforeEach(() => {
    store = configureStore({
        reducer: {
            item: itemSlice.reducer,
            topping: toppingSlice.reducer,
            order: orderSlice.reducer
        }
    })
});

afterEach(() => {
    server.resetHandlers();
    cleanup();
    jest.resetAllMocks();
    calledMethod.history = '';
    calledMethod.url = '';
});

afterAll(() => {
    server.close();
});

describe('商品詳細画面', () => {
    it('index, OrderItemForm, OrderItemEntry, SelectTopping統合テスト', async () => {
        render(
            <Provider store={store}>
                <BrowserRouter>
                    <ItemDetail/>
                </BrowserRouter>
            </Provider>
        );

        /*Componentが呼び出されたタイミング*/
        //初期表示がローディング画面であること
        expect(screen.getByRole('progressbar')).toBeTruthy();
        //商品情報がレンダリングされていないこと
        expect(screen.queryByText(itemFromDB.name)).toBeNull();

        //await screen.debug();


        /*loading中*/
        expect(await screen.findByRole('progressbar')).toBeTruthy();
        //商品情報がレンダリングされていないこと
        expect(screen.queryByText(itemFromDB.name)).toBeNull();

        //await screen.debug();


        /*loading終了後*/
        expect(await screen.findByText(itemFromDB.name)).toBeTruthy();
        //ローディング画面がレンダリングされていないこと
        expect(screen.queryByRole('progressbar')).toBeNull();
        //商品画像のレンダリング
        expect(screen.getByRole('img', {name: '🍕'})).toBeTruthy();
        //商品説明などその他レンダリングは省略


        /*useEvent実行(useStateの変更が起こるためactメソッド内で発火させる必要がある)*/
        await act(async () => {

            /*Lサイズボタンクリックイベント*/
            const sizeButton_L = screen.getByRole('radio', {name: 'L :'});
            //clickイベント発火
            await userEvent.click(sizeButton_L);

            //Lサイズが選択されていること
            expect(screen.getByRole('radio', {name: 'M :'})).not.toBeChecked();
            expect(screen.getByRole('radio', {name: 'L :'})).toBeChecked();
            //値段表示がLサイズに変更されていること
            const price = async (price: number) => {
                return await screen.findByRole('heading', {name: `合計金額 : ${price} 円(税抜)`})
            }
            expect(price(itemFromDB.priceL)).toBeTruthy();


            /*数量3選択イベント*/
            const quantitySelect = screen.getAllByRole('button')[0]
            //select-box押下
            await userEvent.click(quantitySelect);
            //select-box選択肢から3を選択
            await userEvent.click(screen.getByRole('option', {name: '3'}));
            //数量3を選択されていること
            expect(quantitySelect.textContent).toBe('3');
            //値段表示がLサイズ*3に変更されていること
            expect(price(itemFromDB.priceL * 3)).toBeTruthy();


            /*トッピング選択モーダル表示*/
            const modalButton_open = screen.getByRole('button', {name: 'トッピング選択はこちら'})
            //modal表示ボタン押下
            await userEvent.click(modalButton_open);
            //modal画面になっていること
            expect(screen.queryByRole('button', {name: 'トッピング選択はこちら'})).toBeNull();
            const modalButton_close = screen.getByRole('button', {name: 'close'})
            await expect(modalButton_close).toBeTruthy();

            //DBから取得したトッピングがボタン表示されていること
            toppingsFromDB.forEach((t, i) => {
                const toppingButton = screen.getByRole('button', {name: `${t.name} L : ${t.priceL}円`})
                expect(toppingButton).toBeTruthy();

                //一つ目だけclickイベント発火
                if (i === 0) userEvent.click(toppingButton)
            })
            //modal closeボタン押下
            await userEvent.click(modalButton_close);
            expect(await screen.findByText('item name')).toBeTruthy();
            //選択したトッピングが表示されていること
            expect(screen.getByText(toppingsFromDB[0].name!)).toBeTruthy();


            /*カートに商品を追加*/
            await userEvent.click(screen.getByRole('button', {name: '商品をカートに入れる', hidden: true}))

            //const r = screen.getByRole('', {hidden: true})
        });
        //商品をカートに追加するAsyncThunkメソッドが呼び出されていること
        await expect(calledMethod.url).toBe(REST_URL + '/django/cart/');
        //loading画面になっていること
        await expect(await screen.findByRole('progressbar')).toBeTruthy();
        //cart画面に遷移するメソッドが呼び出されていること
        await expect(calledMethod.history).toBe('/cart')

    })
});

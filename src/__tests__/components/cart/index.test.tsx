import React from "react";
import {OrderItem, Topping} from "~/types/interfaces";
import {setupServer} from "msw/node";
import {rest} from "msw";
import {REST_URL} from "~/store/api";
import {configureStore} from "@reduxjs/toolkit";
import {orderSlice} from "~/store/slices/Domain/order.slice";
import {act, cleanup, render, screen} from "@testing-library/react";
import {BrowserRouter} from "react-router-dom";
import CartList from "~/components/cart";
import {Provider} from "react-redux";
import {toppingSlice} from "~/store/slices/Domain/topping.slice";
import userEvent from "@testing-library/user-event";

jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom") as {},
    // 画面遷移処理が働くと自動でmock化したpush処理が働き、擬似的に遷移したようにしてくれる
    useHistory: () => ({
        push: jest.fn().mockImplementation((to: string) => {
            methodStatus.history = to;
        })
    })
}));

let createOrderItems = (start: number, end: number) => {
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

const orderItemsFromDB = createOrderItems(1, 3)

const toppingsFromDB: Topping[] = [
    {
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

const server = setupServer(
    rest.get(REST_URL + '/django/cart/', ((req, res, ctx) => {
        if (!isExistOrderItems) {
            return res(ctx.status(200), ctx.json({
                orderItems: []
            }))
        }
        return res(ctx.status(200), ctx.json({
            orderItems: orderItemsFromDB
        }))
    })),
    rest.get(REST_URL + '/flask/topping/', (req, res, ctx) => {
        return res(ctx.status(200), ctx.json({
            topping: toppingsFromDB
        }))
    }),
    rest.put(REST_URL + '/django/cart/', ((req, res, ctx) => {
        methodStatus.url = `${req.url}`
        methodStatus.requestBody = req.body
        return res(ctx.status(200), ctx.body('200'))
    })),
    rest.delete(REST_URL + '/django/delete_cart/1', ((req, res, ctx) => {
        isNotDuplicateUrl(`${req.url}`)
        methodStatus.url = `${req.url}`
        methodStatus.requestBody = req.body
        return res(ctx.status(200), ctx.body('200'))
    })),
    rest.delete(REST_URL + '/django/delete_cart/2', ((req, res, ctx) => {
        isNotDuplicateUrl(`${req.url}`)
        methodStatus.url = `${req.url}`
        methodStatus.requestBody = req.body
        return res(ctx.status(200), ctx.body('200'))
    })),
    rest.delete(REST_URL + '/django/delete_cart/3', ((req, res, ctx) => {
        isNotDuplicateUrl(`${req.url}`)
        methodStatus.url = `${req.url}`
        methodStatus.requestBody = req.body
        return res(ctx.status(200), ctx.body('200'))
    }))
)


// react-routerで正しく遷移できているかを確かめる
type methodStatusType = {
    url: string;
    history: string;
    requestBody: any
}
let methodStatus: methodStatusType = {
    url: '',
    history: '',
    requestBody: null
};

let isExistOrderItems = true

// RESTの処理が一度に複数走った場合にURLを取得
let ranProgressUrlList: Array<string> = []

const isNotDuplicateUrl = (insertUrl: string) => {
    ranProgressUrlList.push(insertUrl)
}

beforeAll(() => {
    server.listen()
});

let store: any;

beforeEach(() => {
    store = configureStore({
        reducer: {
            topping: toppingSlice.reducer,
            order: orderSlice.reducer
        }
    })
});

afterEach(() => {
    server.resetHandlers();
    cleanup();
    jest.resetAllMocks();
    methodStatus.history = '';
    methodStatus.url = '';
    methodStatus.requestBody = null;
});

afterAll(() => {
    server.close();
});

describe('カート一覧画面（注文商品がある場合）', () => {
    beforeEach(() => {
        render(
            <Provider store={store}>
                <BrowserRouter>
                    <CartList/>
                </BrowserRouter>
            </Provider>
        )
    })
    describe('初期表示', () => {
        it('(index,CartItem,OrderOperator): components', async () => {

            /*Componentが呼び出されたタイミング*/
            //初期表示がローディング画面であること
            expect(screen.getByRole('progressbar')).toBeTruthy();
            //商品情報がレンダリングされていないこと
            expect(screen.queryByText(orderItemsFromDB[0].item.name)).toBeNull();

            /*loading中*/
            // awaitとfind~の組み合わせは、指定した要素が見つかるまで待ってくれる（画面の変更に使える）
            expect(await screen.findByRole('progressbar')).toBeTruthy();
            //商品情報がレンダリングされていないこと
            expect(screen.queryByText(orderItemsFromDB[0].item.name)).toBeNull();

            /*loading終了後*/
            expect(await screen.findByText(orderItemsFromDB[0].item.name)).toBeTruthy();
            //ローディング画面がレンダリングされていないこと
            expect(screen.queryByRole('progressbar')).toBeNull();
            expect(screen.queryByText(orderItemsFromDB[1].item.name)).toBeTruthy();
            expect(screen.queryByText(orderItemsFromDB[2].item.name)).toBeTruthy();

            // const r = screen.getByRole('', {hidden: true})
        })
    })
    // type user action
    describe('act', () => {
        beforeEach(async () => {
            /*loading終了後*/
            expect(await screen.findByText(orderItemsFromDB[0].item.name)).toBeTruthy();
        })
        describe('orderItem', () => {
            it('「削除」ボタン押下時', async () => {
                // act操作した後の画面の変化は流れで書く
                await act(async () => {
                    // getBy- :　値がない場合エラーが吐き出される（値がある場合しか動いてほしくない）
                    // queryBy- :　値がない場合nullが吐き出される（値があるかないかチェック）
                    // findBy- : 値が見つかるまで待つ（awaitと併用し、見つかるまで処理が走るのを待つ）
                    const deleteBtn = screen.getByTestId('deleteButton0')
                    // userEvent: イベントハンドラだけでなく、その時に起こるkeyup等の処理も走り、実際に近い動きを再現する
                    await userEvent.click(deleteBtn)
                })
                // act操作した後のRESTの処理チェックはact捜査の後に確かめる
                await expect(methodStatus.url).toBe(REST_URL + '/django/delete_cart/1/');
            })
            it('「注文内容を変更ボタン」押下時', async () => {
                await act(async () => {
                    const updateBtn = screen.getByTestId('updateButton0')
                    await userEvent.click(updateBtn)
                })
                const entryModalButton_close = screen.getByTestId('orderItemEntry-modalButton')
                expect(entryModalButton_close).toBeTruthy();
            })
            it('商品名押下時', async () => {
                await act(async () => {
                    const itemName = screen.getByRole('heading', {name: "item name1"})
                    await userEvent.click(itemName)
                    expect(methodStatus.history).toBe('/itemDetail/1')
                })
            })
            it('商品イメージ押下時', async () => {
                await act(async () => {
                    const itemImage = screen.getByRole('img', {name: 'image0'})
                    await userEvent.click(itemImage)
                    expect(methodStatus.history).toBe('/itemDetail/1')
                })
            })
        })
        describe('orderOperator', () => {
            it('「注文確認画面へ進む」ボタン押下時', async () => {
                await act(async () => {
                    const goOrderConfirmationBtn = screen.getByRole('button', {name: '注文確認画面へ進む'})
                    await userEvent.click(goOrderConfirmationBtn)
                    expect(methodStatus.history).toBe('/orderConfirm')
                })
            })
            it('「カートを空にする」ボタン押下時', async () => {
                await act(async () => {
                    const emptyCartBtn = screen.getByRole('button', {name: 'カートを空にする'})
                    await userEvent.click(emptyCartBtn)
                })
                const testUrls = ranProgressUrlList.filter(function (x, i, self) {
                    return self.indexOf(x) === i;
                });
                await expect(testUrls[0]).toBe(REST_URL + '/django/delete_cart/1/')
                await expect(testUrls[1]).toBe(REST_URL + '/django/delete_cart/2/')
                await expect(testUrls[2]).toBe(REST_URL + '/django/delete_cart/3/')
            })
            it('「買い物を続ける」ボタン押下時', async () => {
                await act(async () => {
                    const continueShoppingBtn = screen.getByRole('button', {name: '買い物を続ける'})
                    await userEvent.click(continueShoppingBtn)
                    expect(methodStatus.history).toBe('/itemList')
                })
            })
        })
        describe('OrderItemEntry', () => {
            beforeEach(async () => {
                // モーダル初期表示
                // 配列が1番目のorderItemの注文変更モーダルを表示
                const updateBtn = screen.getByTestId('updateButton0')
                await userEvent.click(updateBtn)
            })
            it('サイズMからLへ変更', async () => {
                // 初めのサイズがMであることを証明する
                expect(orderItemsFromDB[0].size).toBe('M')
                await act(async () => {
                    const sizeButton_L = screen.getByRole('radio', {name: 'L :'});
                    await userEvent.click(sizeButton_L);
                })
                // updateリクエスト送られているか
                expect(methodStatus.url).toBe(REST_URL + '/django/cart/')
                expect(methodStatus.requestBody.order_items[0].size).toBe('L')
            })
            it('数量を変更', async () => {
                expect(orderItemsFromDB[0].quantity).toBe(1)
                await act(async () => {
                    const quantitySelect = screen.getByRole('button', {name: '1'})
                    await userEvent.click(quantitySelect);
                    await userEvent.click(screen.getByRole('option', {name: '3'}));
                })
                // updateリクエスト送られているか
                expect(methodStatus.url).toBe(REST_URL + '/django/cart/')
                expect(methodStatus.requestBody.order_items[0].quantity).toBe(3)
            })
            it('「トッピング選択はこちら」ボタンを押下', async () => {
                await act(async () => {
                    const modalButton_open = screen.getByRole('button', {name: 'トッピング選択はこちら'})
                    await userEvent.click(modalButton_open);
                    // topping選択画面のcloseが表示されているチェック
                    const selectToppingModalButton_close = screen.getByTestId('selectTopping-modalButton')
                    expect(selectToppingModalButton_close).toBeTruthy();
                })
            })
            it('「close」ボタンを押下', async () => {
                const entryModalButton_close = screen.getByTestId('orderItemEntry-modalButton')
                expect(entryModalButton_close).toBeTruthy();
                await act(async () => {
                    await userEvent.click(entryModalButton_close)
                    // orderItemEntryモーダルが閉じているか
                    expect(screen.queryByRole('button', {name: 'close'})).toBeNull()
                })
            })
        })
        describe('SelectTopping', () => {
            beforeEach(async () => {
                // モーダル初期表示
                const updateBtn = screen.getByTestId('updateButton0')
                await userEvent.click(updateBtn)
                const modalButton_open = screen.getByRole('button', {name: 'トッピング選択はこちら'})
                await userEvent.click(modalButton_open);
            })
            it('いずれかのトッピングを押下時', async () => {
                expect(await screen.findByTestId('selectTopping-modalButton')).toBeTruthy();
                await act(async () => {
                    toppingsFromDB.forEach((t, i) => {
                        const toppingButton = screen.getByRole('button', {name: `${t.name} M : ${t.priceM}円`})
                        expect(toppingButton).toBeTruthy();

                        //一つ目だけclickイベント発火
                        if (i === 0) userEvent.click(toppingButton)
                    })
                })
            })
            it('「closeボタンを押下', async () => {
                const selectToppingModalButton_close = screen.getByTestId('selectTopping-modalButton')
                expect(selectToppingModalButton_close).toBeTruthy();
                await act(async () => {
                    userEvent.click(selectToppingModalButton_close)
                })
                expect(screen.queryByTestId('selectTopping-modalButton')).toBeNull();
            })
        })
    })
    describe('カート一覧画面（注文商品がない場合）', () => {
        beforeEach(async () => {
            isExistOrderItems = false
            await render(
                <Provider store={store}>
                    <BrowserRouter>
                        <CartList/>
                    </BrowserRouter>
                </Provider>
            )
            /*loading終了後*/
            expect(await screen.findByText('ショッピングカート')).toBeTruthy();
        })
        describe('初期表示(更新バー表示終了後)', () => {
            it('(index,CartItem,OrderOperator): components', () => {
                expect(screen.queryByRole('heading', {name: 'カートに商品がありません'})).toBeTruthy();
                expect(screen.queryByRole('heading', {name: '合計金額: 0 円'})).toBeTruthy();
            })
            it('「注文確認画面へ進む」がdisableになっている', () => {
                // const r = screen.getByRole('', {hidden: true});
                expect(screen.queryByRole('button', {name: '注文確認画面へ進む'})).toHaveAttribute('disabled')
            })
            it('「カートを空にする」がdisableになっている', () => {
                expect(screen.queryByRole('button', {name: 'カートを空にする'})).toHaveAttribute('disabled')
            })
        })
    })

})
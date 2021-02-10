import {setupServer} from "msw/node";
import {rest} from "msw";
import {REST_URL} from "~/store/api";
import {configureStore} from "@reduxjs/toolkit";
import {orderSlice} from "~/store/slices/Domain/order.slice";
import {cleanup, screen, act, render} from "@testing-library/react";
import {Provider} from "react-redux";
import {BrowserRouter} from "react-router-dom";
import OrderConfirm from "~/components/orderConfirm";
import {authSlice} from "~/store/slices/App/auth.slice";
import {OrderItem} from "~/types/interfaces";
import {toppingSlice} from "~/store/slices/Domain/topping.slice";
import React from "react";
import userEvent from "@testing-library/user-event";


jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom") as {},
    useHistory: () => ({
        push: jest.fn().mockImplementation((to: string) => {
            methodStatus.history = to;
        })
    })
}));

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
                priceM: i * 1000,
                priceL: i * 2000
            },
            orderToppings: [
                {
                    id: i,
                    topping: {
                        id: i,
                        name: `topping name${i}`,
                        priceM: i * 100,
                        priceL: i * 200,
                    },
                    orderItemId: i
                },
            ],
            quantity: i,
            size: 'M',
        });
    }
    return orderItems;
}

const orderItemsFromDB = createOrderItems(1, 3)

const loginUserFromDB = {
    id: 20,
    name: "らくらくたろう",
    email: "test@test.com",
    zipcode: "1234567",
    address: "東京都新宿区",
    telephone: "090-1234-5678",
    status: 0
}

const server = setupServer(
    rest.get(REST_URL + '/django/cart/', ((req, res, ctx) => {
        return res(ctx.status(200), ctx.json({
            orderItems: orderItemsFromDB
        }))
    })),
    rest.get(REST_URL + '/auth/user/', ((req, res, ctx) => {
        return res(ctx.status(200), ctx.json({
            user: loginUserFromDB
        }))
    })),
    rest.post(REST_URL + '/django/order/', ((req, res, ctx) => {
        methodStatus.url = `${req.url}`
        methodStatus.requestBody = req.body
        return res(ctx.status(200), ctx.body('200'))
    }))
);

let store: any;

beforeAll(() => {
    server.listen();
})
beforeEach(() => {
    store = configureStore({
        reducer: {
            auth: authSlice.reducer,
            order: orderSlice.reducer,
            topping: toppingSlice.reducer,
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

//レンダリング
const rendering = () => {
    render(
        <Provider store={store}>
            <BrowserRouter>
                <OrderConfirm/>
            </BrowserRouter>
        </Provider>
    );
}

//現在時刻の2時間後の値を返す
const dateHour = (date: Date | null) => {
    if (date) {
        let hour = date.getHours() + 2
        return String(hour);
    }
}
// 日付をYYYY-MM-DDの書式で返す
const formatDateOfBar = (date: Date | null) => {
    if (date) {
        let year = date.getFullYear();
        let month = ('00' + (date.getMonth() + 1)).slice(-2);
        let day = ('00' + date.getDate()).slice(-2);
        return (year + '-' + month + '-' + day);
    }
}
//日付をYYYY/MM/DDの書式で返す
const formatDateOfSlash = (date: Date | null) => {
    if (date) {
        let year = date.getFullYear();
        let month = ('00' + (date.getMonth() + 1)).slice(-2);
        let day = ('00' + date.getDate()).slice(-2);
        return (year + '/' + month + '/' + day);
    }
}

describe("OrderConfirm Component Test", () => {
    it("レンダリングテスト", async () => {
        await rendering();
        //初期表示がローディング画面であること
        expect(screen.getByRole('progressbar')).toBeTruthy();
        //ユーザー情報がレンダリングされていないこと
        expect(screen.queryByText(orderItemsFromDB[0].item.name)).toBeNull();

        //loading中//
        expect(await screen.findByRole('progressbar')).toBeTruthy();
        //商品情報がレンダリングされていないこと
        expect(screen.queryByText(orderItemsFromDB[0].item.name)).toBeNull();

        /*loading終了後*/
        //注文内容、ユーザー情報、合計金額が表示されているか
        expect(await screen.findByText(orderItemsFromDB[0].item.name)).toBeTruthy();
        expect(await screen.getAllByRole("img")[2]).toBeTruthy();
        expect(screen.getByRole("heading", {name: "お名前: " + loginUserFromDB.name})).toBeTruthy()
        expect(screen.getByRole("heading", {name: "電話番号: " + loginUserFromDB.telephone})).toBeTruthy();
        expect(screen.getByRole("heading", {name: "小計: 15,200 円"})).toBeTruthy()
        expect(screen.getByRole("heading", {name: "合計金額: 16,720 円"})).toBeTruthy()

        //ローディング画面がレンダリングされていないこと
        expect(screen.queryByRole('progressbar')).toBeNull();
    }, 15000)


    it("ダイアログ(お届け先情報変更フォーム)の開閉", async () => {
        await rendering();
        await act(async () => {
            //変更ボタンを押下
            const changeButton = await screen.findByRole("button", {name: "変更"});
            await userEvent.click(await changeButton);

            //お届け先情報の変更ダイアログの[ 閉じる ]ボタンが表示されているか
            const closeButton = await screen.findByRole("button", {name: "閉じる"});
            expect(await closeButton).toBeTruthy();

            //ユーザー情報がセットされているか
            expect(screen.getByRole("textbox", {name: "名前"})).toHaveValue(loginUserFromDB.name);
            expect(screen.getByRole("textbox", {name: "メールアドレス"})).toHaveValue(loginUserFromDB.email);
            expect(screen.getByRole("textbox", {name: "郵便番号( ○○○ )"})).toHaveValue("123");
            expect(screen.getByRole("textbox", {name: "郵便番号( ○○○○ )"})).toHaveValue("4567");
            expect(screen.getByRole("textbox", {name: "住所"})).toHaveValue(loginUserFromDB.address);
            expect(await screen.getAllByRole("textbox", {name: "電話番号"})[0]).toHaveValue("090");
            expect(await screen.getAllByRole("textbox", {name: "電話番号"})[1]).toHaveValue("1234");
            expect(await screen.getAllByRole("textbox", {name: "電話番号"})[2]).toHaveValue("5678");

            //閉じるボタンを押下
            await userEvent.click(await closeButton);
            //変更ダイアログが存在していないか
            expect(await screen.findByRole("button", {name: "変更"})).toBeTruthy();
            expect(await screen.findByRole("button", {name: "この内容で注文する"})).toBeTruthy();
            expect(screen.queryByRole("button", {name: "閉じる"})).toBeNull();
            expect(screen.queryByRole("button", {name: "変更する"})).toBeNull();
        })

    }, 30000)

    it("お届け先情報を変更する", async () => {
        await rendering();
        await act(async () => {
            //変更ボタンを押下
            const changeButton = await screen.findByRole("button", {name: "変更"});
            await userEvent.click(await changeButton);

            //お届け先情報の変更ダイアログの[変更する]ボタンが表示されているか
            const updateButton = await screen.findByRole("button", {name: "変更する"});
            expect(await updateButton).toBeTruthy();

            //入力フォームの値によって[変更する]ボタンがdisabledになっているか
            //一文字削除
            await userEvent.type(await screen.findByRole('textbox', {name: '郵便番号( ○○○ )'}), '{backspace}');
            expect(screen.getByRole("textbox", {name: "郵便番号( ○○○ )"})).toHaveValue("12");
            //エラーメッセージが出てるか確認
            expect(screen.getByRole("heading", {name: "※3桁で入力して下さい"})).toBeTruthy();
            //削除して空文字にする
            await userEvent.type(await screen.findByRole('textbox', {name: '郵便番号( ○○○ )'}), '{backspace}{backspace}');
            expect(screen.getByRole("textbox", {name: "郵便番号( ○○○ )"})).toHaveValue("");
            //エラーメッセージが出てるか確認
            expect(screen.getByRole("heading", {name: "※郵便番号を入力して下さい"})).toBeTruthy();
            //文字を入力
            await userEvent.type(await screen.findByRole('textbox', {name: '郵便番号( ○○○ )'}), 'あ');
            //エラーメッセージが出てるか確認
            expect(screen.getByRole("heading", {name: "※半角数字を入力して下さい"})).toBeTruthy();

            //[変更する]ボタンがdisabledになっているかの確認
            expect(screen.getByRole("button", {name: "変更する"})).toBeDisabled();

            //文字列「あ」を消して、郵便番号フォームに999を入力
            await userEvent.type(await screen.findByRole('textbox', {name: '郵便番号( ○○○ )'}), '{backspace}');
            await userEvent.type(await screen.findByRole('textbox', {name: '郵便番号( ○○○ )'}), "999");
            expect(await screen.findByRole("textbox", {name: "郵便番号( ○○○ )"})).toHaveValue("999");

            //[変更する]ボタンを押下
            await userEvent.click(screen.getByRole("button", {name: "変更する"}));

        })
        //変更ダイアログが存在していないか
        expect(await screen.findByRole("button", {name: "変更"})).toBeTruthy();
        expect(await screen.findByRole("button", {name: "この内容で注文する"})).toBeTruthy();
        expect(screen.queryByRole("button", {name: "閉じる"})).toBeNull();
        expect(screen.queryByRole("button", {name: "変更する"})).toBeNull();
        //変更内容が反映されているか
        expect(await screen.findByText(orderItemsFromDB[0].item.name)).toBeTruthy();
        expect(screen.getByRole("heading", {name: "郵便番号: 999-4567"})).toBeTruthy()
    }, 30000)

    it("お支払方法の操作確認", async () => {
        await rendering();
        //お支払方法とチェックボックスが表示されているか
        expect(await screen.findByRole("heading", {name: "お支払方法"})).toBeTruthy();
        expect(await screen.findByRole("heading", {name: "代金引換"})).toBeTruthy();
        expect(await screen.findByRole("heading", {name: "クレジットカード決済"})).toBeTruthy();

        const cashedCheck = screen.getAllByRole("checkbox")[0];
        const creditCardCheck = screen.getAllByRole("checkbox")[1];
        expect(await cashedCheck).toBeTruthy();
        expect(await creditCardCheck).toBeTruthy();

        //デフォルトで代金引換にチェックが入っているか
        await expect(await cashedCheck).toBeChecked();

        await act(async () => {
            //お支払方法をクレジットカード決済に変更
            await userEvent.click(await creditCardCheck);
            //クレジットカード決済にチェックが入っているか
            await expect(await creditCardCheck).toBeChecked();
            //お支払方法を代金引換に変更
            await userEvent.click(await cashedCheck);
            //代金引換にチェックが入っているか
            await expect(await cashedCheck).toBeChecked();
        })
    }, 30000)

    it("配送日時を変更する", async () => {
        await rendering();

        //配送日時が表示されているか
        const deliveryHour = screen.findByText("時");
        const deliveryMinute = screen.findByText("分");
        expect(await screen.findByRole("heading", {name: "配送日時"})).toBeTruthy();
        expect(await screen.findByRole("textbox", {name: "配送日"})).toBeTruthy();
        expect(await deliveryHour).toBeTruthy();
        expect(await deliveryMinute).toBeTruthy();

        //デフォルトで現在時刻の2時間後が設定されているか
        const defaultDeliveryTime = formatDateOfSlash(new Date());
        expect(await screen.findByRole("textbox", {name: "配送日"})).toHaveValue(defaultDeliveryTime);

        await act(async () => {
            //配送時間を押下 (~時)
            await userEvent.click(screen.getByRole("button", {name: dateHour(new Date())}));
            //一覧から配送時間を選択する : 20時にセット
            await userEvent.click(screen.getByRole("option", {name: "20"}));

        })
        //20時がセットされているか
        expect(await screen.findByRole("button", {name: "20"})).toBeTruthy();

        await act(async () => {
            //配送時間を押下 (~分)
            await userEvent.click(screen.getByRole("button", {name: "00"}));
            //一覧から配送時間を選択する : 50分にセット
            await userEvent.click(screen.getByRole("option", {name: "50"}));
        })
        //50分がセットされているか
        expect(await screen.findByRole("button", {name: "50"})).toBeTruthy();
        //エラーメッセージが表示されていないか
        expect(screen.queryByRole("heading", {name: "現在時刻よりも後を選んでください"})).toBeNull();
    }, 30000)

    it("配送日時を変更する : エラーメッセージを発生", async () => {
        await rendering();

        //配送日時が表示されているか
        expect(await screen.findByRole("heading", {name: "配送日時"})).toBeTruthy();
        expect(await screen.findByRole("textbox", {name: "配送日"})).toBeTruthy();
        expect(await screen.findByText("時")).toBeTruthy();
        expect(await screen.findByText("分")).toBeTruthy();

        //デフォルトで現在時刻の2時間後が設定されているか
        const defaultDeliveryTime = formatDateOfSlash(new Date());

        expect(await screen.findByRole("textbox", {name: "配送日"})).toHaveValue(defaultDeliveryTime);

        await act(async () => {
            //配送時間を押下 (~時)
            await userEvent.click(screen.getByRole("button", {name: dateHour(new Date())}));
            //一覧から配送時間を選択する : 7時にセット
            await userEvent.click(screen.getByRole("option", {name: "7"}));
        })
        //7時がセットされているか
        expect(await screen.findByRole("button", {name: "7"})).toBeTruthy();

        //エラーメッセージが表示されているか
        expect(await screen.findByRole("heading", {name: "現在時刻よりも後を選んでください"})).toBeTruthy();
        //[この内容で注文する]ボタンがdisabledになっているか
        await expect(await screen.findByRole("button", {name: "この内容で注文する"})).toBeDisabled();

    }, 50000)

    it("注文する", async () => {
        await rendering();
        let deliveryDate = new Date();
        let deliveryHour = deliveryDate.getHours() - 7;
        let deliverySetHour;
        if (deliveryHour < 10) {
            deliverySetHour = "0" + String(deliveryHour);
        } else {
            deliverySetHour = String(deliveryHour);
        }
        const a = "T" + deliverySetHour + ":00:00.000Z";
        const deliverySetDate = formatDateOfBar(deliveryDate) + a;

        await act(async () => {
            await userEvent.click(await screen.findByRole("button", {name: "この内容で注文する"}));
        })
        //loading画面になっていること
        await expect(await screen.findByRole('progressbar')).toBeTruthy();
        await expect(methodStatus.url).toBe(REST_URL + '/django/order/');
        await expect(methodStatus.requestBody).toStrictEqual({
            delivery_time: deliverySetDate,
            destination_address: loginUserFromDB.address,
            destination_email: loginUserFromDB.email,
            destination_name: loginUserFromDB.name,
            destination_tel: loginUserFromDB.telephone,
            destination_zipcode: loginUserFromDB.zipcode,
            order_date: formatDateOfBar(new Date()),
            payment_method: "1",
            status: 1,
            total_price: 16720,
        })
        //注文完了画面に遷移するメソッドが呼び出されていること
        await expect(methodStatus.history).toStrictEqual(
            {
                pathname: '/orderComplete',
                state: {
                    judge: true
                }
            });
    }, 10000);
})
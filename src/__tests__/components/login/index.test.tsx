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
import {authSlice} from "~/store/slices/App/auth.slice";
import Login from "~/components/login";

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
const server = setupServer(
    rest.post(REST_URL + '/auth/login/', ((req, res, ctx) => {
        methodStatus.url = `${req.url}`
        methodStatus.requestBody = req.body
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
            auth: authSlice.reducer
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
})

describe('商品詳細画面', () => {
    it('(index, OrderItemForm, OrderItemEntry, SelectTopping)コンポーネントと' +
        '(itemSlice.fetchItemDetail, toppingSlice.fetchToppings, orderSlice.asyncPostOrderItem)統合テスト', async () => {
        render(
            <Provider store={store}>
                <BrowserRouter>
                    <Login/>
                </BrowserRouter>
            </Provider>
        );
        //初期表示がローディング画面であること
        expect(screen.getByRole('progressbar')).toBeTruthy();


        /*loading中*/
        expect(await screen.findByRole('progressbar')).toBeTruthy();
    });
});
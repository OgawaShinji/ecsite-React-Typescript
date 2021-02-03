import React from "react";
import {render, screen, cleanup, act} from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import {rest} from 'msw';
import {setupServer} from "msw/node";

import {Provider} from "react-redux";
import {configureStore} from "@reduxjs/toolkit";
import {BrowserRouter} from "react-router-dom";

import {itemSlice} from "~/store/slices/Domain/item.slice";
import {REST_URL} from "~/store/api";

import ItemList from "~/components/itemList";
import {Item} from "~/types/interfaces";

type methodStatusType = {
    url: string;
    history: string;
    requestBody: any
};

let methodStatus: methodStatusType = {
    url: '',
    history: '',
    requestBody: null
};

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom') as {},
    useHistory: () => ({
        push: jest.fn().mockImplementation((to: string) => {
            methodStatus.history = to;
        })
    }),
    useLocation: () => jest.fn().mockReturnValue({
        pathname: '/',
        hash: '',
        key: '',
        state: {judge: false}
    })
}))

const createItems = (length: number) => {
    let items: Array<Item> = [];
    for (let i = 1; i <= length; i++) {
        items.push({
            id: i,
            name: `item name${i}`,
            description: `description${i}`,
            priceM: 1000 * i,
            priceL: 2000 * i,
            imagePath: `image path${i}`,
            deleted: 0
        })
    }
    return items;
}

const server = setupServer(
    // 商品一覧取得
    rest.get(REST_URL + '/flask/item/', (req, res, ctx) => {
        console.log(req);
        return res(ctx.status(200), ctx.json({
            items: createItems(18)
        }))
    }),
    rest.get(REST_URL + '/flask/item-name/', (req, res, ctx) => {
        let itemNames: Array<string> = [];
        for (let i = 1; i <= 18; i++) {
            itemNames.push(`item name${i}`);
        }
        return res(ctx.status(200), ctx.json({
            itemNames: itemNames
        }))
    })
)

beforeAll(() => {
    server.listen();
})

let store;

beforeEach(() => {
    store = configureStore({
        reducer: {
            item: itemSlice.reducer
        }
    })
})

afterEach(() => {
    server.resetHandlers();
    cleanup();
    jest.resetAllMocks();

    methodStatus.history = '';
    methodStatus.url = '';
    methodStatus.requestBody = null;
})

afterAll(() => {
    server.close();
})


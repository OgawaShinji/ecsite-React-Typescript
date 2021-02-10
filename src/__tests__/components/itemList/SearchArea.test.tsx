import React from "react";
import {render, screen, cleanup, act} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {setupServer} from "msw/node";
import {rest} from "msw";
import {REST_URL} from "~/store/api";
import {configureStore} from "@reduxjs/toolkit";
import {itemSlice} from "~/store/slices/Domain/item.slice";
import {Provider} from "react-redux";
import SearchArea from "~/components/itemList/SearchArea";

type methodStatusType = {
    url: string
}

let methodStatus: methodStatusType = {
    url: ''
}

const server = setupServer(
    // 商品名取得（Autocomplete用）
    rest.get(REST_URL + '/flask/item-name/', (req, res, ctx) => {
        methodStatus.url = `${req.url}`;
        let itemNames: Array<string> = [];
        for (let i = 1; i <= 18; i++) {
            itemNames.push(`name${i}`);
        }
        return res(ctx.status(200), ctx.json({
            itemNames: itemNames
        }))
    })
)

beforeAll(() => {
    server.listen();
})

let store: any;

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

    methodStatus.url = '';
})

afterAll(() => {
    server.close();
})

describe('SearchArea Component Test', () => {
    it('test', async () => {
        const itemName = '';
        const sortId = 0;
        const handleItemNameChange = jest.fn();
        const handleSortIdChange = jest.fn();
        const handleSearch = jest.fn();

        render(
            <Provider store={store}>
                <SearchArea itemName={itemName} sortId={sortId} handleItemNameChange={handleItemNameChange}
                            handleSortIdChange={handleSortIdChange} handleSearch={handleSearch}/>
            </Provider>
        );

        //screen.debug();
    })
})
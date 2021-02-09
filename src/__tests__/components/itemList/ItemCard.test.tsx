import React from "react";
import {render, screen, cleanup, act} from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import {configureStore} from "@reduxjs/toolkit";
import {itemSlice} from "~/store/slices/Domain/item.slice";
import {Provider} from "react-redux";

import ItemCard from "~/components/itemList/ItemCard";
import {Item} from "~/types/interfaces";


type methodStatusType = {
    history: string
}

let methodStatus: methodStatusType = {
    history: ''
}

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom') as {},
    useHistory: () => ({
        push: jest.fn().mockImplementation((to: string) => {
            methodStatus.history = to;
        })
    })
}))


let store: any;

beforeEach(() => {
    store = configureStore({
        reducer: {
            item: itemSlice.reducer
        }
    })
})

afterEach(() => {
    cleanup();
    methodStatus.history = '';
})

const rendering = (item: Item) => {
    render(
        <Provider store={store}>
            <ItemCard item={item}/>
        </Provider>
    );
}

describe('ItemCard Component Test', () => {
    it('test', async () => {
        const item: Item = {
            id: 3,
            name: 'itemName',
            description: 'item description',
            imagePath: 'imagePath',
            priceM: 1000,
            priceL: 1200,
            deleted: 0
        }
        rendering(item);

        // 商品画像
        const image = screen.getByRole('img');
        expect(image.getAttribute('src')).toBe(item.imagePath);

        // 商品名
        const itemName = screen.getByRole('typoItemName');
        expect(itemName.textContent).toBe(item.name);
        expect(itemName.classList[1]).toBe('makeStyles-title-2');

        // Mサイズ価格
        const avatarM = screen.getByRole('avatarM');
        expect(avatarM.textContent).toBe('M');
        expect(screen.getByRole('typoPriceM').textContent).toBe('1,000円');

        // Lサイズ価格
        const avatarL = screen.getByRole('avatarL');
        expect(avatarL.textContent).toBe('L');
        expect(screen.getByRole('typoPriceL').textContent).toBe('1,200円');

        await act(async () => {
            userEvent.click(screen.getByRole('cardActionArea'));
        })
        expect(methodStatus.history).toStrictEqual({pathname: "/itemDetail/3"});
    })
})
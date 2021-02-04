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
    history: string;
    searchParams: {
        itemName: string | null,
        sortId: number | null
    }
};

let methodStatus: methodStatusType = {
    history: '',
    searchParams: {
        itemName: '',
        sortId: null
    }
};

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom') as {},
    useHistory: () => ({
        push: jest.fn().mockImplementation((to: string) => {
            methodStatus.history = to;
        })
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
        const itemName = String(req.url.searchParams.get('item_name'));
        const sortId = Number(req.url.searchParams.get('sort_id'));
        methodStatus.searchParams.itemName = itemName;
        methodStatus.searchParams.sortId = sortId;

        if (itemName === '') {
            if (sortId === 1) {
                return res(ctx.status(200), ctx.json({
                    items: createItems(18).reverse()
                }))
            } else {
                return res(ctx.status(200), ctx.json({
                    items: createItems(18)
                }))
            }
        } else if (itemName === 'non exist') {
            return res(ctx.status(200), ctx.json({
                items: []
            }))
        } else {
            return res(ctx.status(200), ctx.json({
                items: createItems(4)
            }))
        }
    }),

    // 商品名取得（Autocomplete用）
    rest.get(REST_URL + '/flask/item-name/', (req, res, ctx) => {
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

    methodStatus.history = '';
    methodStatus.searchParams.itemName = null;
    methodStatus.searchParams.sortId = null;
})

afterAll(() => {
    server.close();
})

describe('商品一覧画面', () => {
    it('test', async () => {
        render(
            <Provider store={store}>
                <BrowserRouter>
                    <ItemList/>
                </BrowserRouter>
            </Provider>
        );

        // 検索ボックス　クリアボタン
        const clearButton = screen.getByRole('button', {name: 'Clear'});

        // 検索ボタン
        const searchButton = screen.getByRole('button', {name: '検索'});

        // 並び順selectBox
        const sortSelect = screen.getByText('安い順');

        // 表示件数selectBox
        const displayCntSelect = screen.getByText('9件');


        //=============== 初期表示時 ===============
        // 表示
        // : loading, 検索ボックス、表示件数切り替え
        expect(screen.queryByRole('progressbar')).toBeTruthy();
        expect(screen.getAllByRole('combobox')).toBeTruthy();
        expect(screen.getByRole('textbox')).toBeTruthy();
        expect(clearButton).toBeTruthy();
        expect(searchButton).toBeTruthy();
        expect(sortSelect).toBeTruthy();
        expect(displayCntSelect).toBeTruthy();

        // 非表示
        // : 商品名、商品画像等（ItemCard関連）、「※価格は全て税抜です。」、
        // 　pagination、商品全件表示ボタン、「検索された商品は存在しません。」
        expect(screen.queryByRole('item1')).toBeNull();
        expect(screen.queryByRole('item2')).toBeNull();
        expect(screen.queryByRole('item10')).toBeNull();
        expect(screen.queryByRole('item17')).toBeNull();
        expect(screen.queryByRole('item18')).toBeNull();
        expect(screen.queryByText('※価格は全て税抜です。')).toBeNull();
        expect(screen.queryByRole('navigation')).toBeNull();
        expect(screen.queryByRole('button', {name: '商品を全件表示する'})).toBeNull();
        expect(screen.queryByText('検索された商品は存在しません。')).toBeNull();


        //=============== Loading終了時 ===============
        // 表示
        // item1~9
        expect(await screen.findByRole('item1')).toBeTruthy();
        expect(await screen.findByRole('item2')).toBeTruthy();
        expect(await screen.findByRole('item8')).toBeTruthy();
        expect(await screen.findByRole('item9')).toBeTruthy();

        // 「※価格は全て税抜です。」
        expect(screen.getByText('※価格は全て税抜です。')).toBeTruthy();

        // pagination
        const pagination = screen.getByRole('navigation')
        expect(pagination).toBeTruthy();

        // paginationに関するボタン
        const page1Button = screen.getByRole('button', {name: 'page 1'});
        const page2Button = screen.getByRole('button', {name: 'Go to page 2'});
        const pagePrevButton = screen.getByRole('button', {name: 'Go to previous page'});
        const pageNextButton = screen.getByRole('button', {name: 'Go to next page'});
        expect(page1Button).toBeTruthy();
        expect(page2Button).toBeTruthy();
        expect(pagePrevButton).toBeTruthy();
        expect(pageNextButton).toBeTruthy();

        // 非表示
        // item10~18、progressbar
        expect(screen.queryByRole('item10')).toBeNull();
        expect(screen.queryByRole('item17')).toBeNull();
        expect(screen.queryByRole('item18')).toBeNull();
        expect(screen.queryByRole('progressbar')).toBeNull();

        // 商品全件表示ボタン、「検索された商品は存在しません。」
        expect(screen.queryByRole('button', {name: '商品を全件表示する'})).toBeNull();
        expect(screen.queryByText('検索された商品は存在しません。')).toBeNull();


        //=============== Paging ===============
        ///// page2Buttonで2ページ目に移動 /////
        // 表示
        // item10~18
        userEvent.click(page2Button);
        expect(await screen.findByRole('item10')).toBeTruthy();
        expect(screen.getByRole('item11')).toBeTruthy();
        expect(screen.getByRole('item17')).toBeTruthy();
        expect(screen.getByRole('item18')).toBeTruthy();
        // 非表示
        // item1~9
        expect(screen.queryByRole('item1')).toBeNull();
        expect(screen.queryByRole('item5')).toBeNull();
        expect(screen.queryByRole('item9')).toBeNull();

        ///// pagePrevButtonで1ページ目に移動 /////
        // 表示
        // item1~9
        userEvent.click(pagePrevButton);
        expect(await screen.findByRole('item1')).toBeTruthy();
        expect(screen.getByRole('item2')).toBeTruthy();
        expect(screen.getByRole('item8')).toBeTruthy();
        expect(screen.getByRole('item9')).toBeTruthy();
        // 非表示
        // item10~18
        expect(screen.queryByRole('item10')).toBeNull();
        expect(screen.queryByRole('item15')).toBeNull();
        expect(screen.queryByRole('item18')).toBeNull();

        ///// pageNextButtonで2ページ目に移動 /////
        // 表示
        // item10~18
        userEvent.click(pageNextButton);
        expect(await screen.findByRole('item10')).toBeTruthy();
        expect(screen.getByRole('item11')).toBeTruthy();
        expect(screen.getByRole('item15')).toBeTruthy();
        expect(screen.getByRole('item18')).toBeTruthy();
        // 非表示
        // item1~9
        expect(screen.queryByRole('item1')).toBeNull();
        expect(screen.queryByRole('item5')).toBeNull();
        expect(screen.queryByRole('item9')).toBeNull();


        //=============== 表示件数の変更 ===============
        ///// 表示件数を18件に変更 /////
        await act(async () => {
            await userEvent.click(displayCntSelect);
            await userEvent.click(screen.getByText('18件'));
        })
        // loadingの表示
        expect(screen.queryByRole('progressbar')).toBeTruthy();

        // item1~18の表示
        expect(await screen.findByRole('item1')).toBeTruthy();
        expect(screen.getByRole('item2')).toBeTruthy();
        expect(screen.getByRole('item8')).toBeTruthy();
        expect(screen.getByRole('item9')).toBeTruthy();
        expect(screen.getByRole('item10')).toBeTruthy();
        expect(screen.getByRole('item11')).toBeTruthy();
        expect(screen.getByRole('item17')).toBeTruthy();
        expect(screen.getByRole('item18')).toBeTruthy();
        expect(screen.getAllByRole('img').length).toBe(18);

        // loadingの非表示
        expect(screen.queryByRole('progressbar')).toBeNull();

        // pagination: button list -> prev, page1, next
        expect(screen.getAllByRole('listitem').length).toBe(3);

        ///// 表示件数を9件に変更 /////
        await act(async () => {
            await userEvent.click(displayCntSelect);
            await userEvent.click(screen.getByText('9件'));
        })
        // loadingの表示
        expect(screen.queryByRole('progressbar')).toBeTruthy();

        // item1~9の表示
        expect(await screen.findByRole('item1')).toBeTruthy();
        expect(screen.getByRole('item2')).toBeTruthy();
        expect(screen.getByRole('item8')).toBeTruthy();
        expect(screen.getByRole('item9')).toBeTruthy();
        expect(screen.getAllByRole('img').length).toBe(9);

        // item10~18の非表示
        expect(screen.queryByRole('item10')).toBeNull();
        expect(screen.queryByRole('item11')).toBeNull();
        expect(screen.queryByRole('item17')).toBeNull();
        expect(screen.queryByRole('item18')).toBeNull();

        // loadingの非表示
        expect(screen.queryByRole('progressbar')).toBeNull();

        // pagination: button list -> prev, page1, page2, next
        expect(screen.getAllByRole('listitem').length).toBe(4);


        //=============== 並び順の変更 ===============
        ///// 安い順 -> 高い順表示に変更 /////
        await act(async () => {
            await userEvent.click(sortSelect);
            await userEvent.click(screen.getByText('高い順'));
            await userEvent.click(searchButton);
        })
        // loadingの表示
        expect(screen.queryByRole('progressbar')).toBeTruthy();

        // item18~10の表示
        expect(await screen.findByRole('item18')).toBeTruthy();
        expect(screen.getByRole('item17')).toBeTruthy();
        expect(screen.getByRole('item11')).toBeTruthy();
        expect(screen.getByRole('item10')).toBeTruthy();
        expect(screen.getAllByRole('img').length).toBe(9);

        // item9~1の非表示
        expect(screen.queryByRole('item9')).toBeNull();
        expect(screen.queryByRole('item8')).toBeNull();
        expect(screen.queryByRole('item2')).toBeNull();
        expect(screen.queryByRole('item1')).toBeNull();

        // loadingの非表示
        expect(screen.queryByRole('progressbar')).toBeNull();

        // searchParamが受け渡せているか確認
        expect(methodStatus.searchParams.sortId).toBe(1);
        expect(methodStatus.searchParams.itemName).toBe('');


        //=============== 検索 ===============
        const inputForm = screen.getByRole('textbox');

        ///// 検索フォームへの入力, 検索ボタンのクリック /////
        await act(async () => {
            await userEvent.type(await inputForm, 'item name');
            await userEvent.click(searchButton);
        })

        // loadingの表示
        expect(screen.queryByRole('progressbar')).toBeTruthy();

        // searchParamが受け渡せているか確認
        expect(methodStatus.searchParams.itemName).toBe('item name');

        // item1~4の表示(検索ワード入力時に４つ商品を返すようにserverで設定)
        expect(await screen.findByRole('item1')).toBeTruthy();
        expect(screen.getByRole('item2')).toBeTruthy();
        expect(screen.getByRole('item3')).toBeTruthy();
        expect(screen.getByRole('item4')).toBeTruthy();
        expect(screen.getAllByRole('img').length).toBe(4);

        // item5~9の表示
        expect(screen.queryByRole('item5')).toBeNull();
        expect(screen.queryByRole('item7')).toBeNull();
        expect(screen.queryByRole('item9')).toBeNull();

        // loadingの非表示
        expect(screen.queryByRole('progressbar')).toBeNull();


        //=============== 商品全件表示 ===============
        const showAllItemButton = screen.getByRole('button', {name: '商品を全件表示する'});

        // 商品全件表示ボタンの表示
        expect(showAllItemButton).toBeTruthy();

        // ボタン押下前 フォーム内容
        expect(inputForm).toHaveValue('item name');

        ///// 商品全件表示ボタンの押下 /////
        await act(async () => {
            await userEvent.click(showAllItemButton);
        })

        // loadingの表示
        expect(screen.queryByRole('progressbar')).toBeTruthy();

        // item1~9の表示
        expect(await screen.findByRole('item1')).toBeTruthy();
        expect(screen.getByRole('item2')).toBeTruthy();
        expect(screen.getByRole('item8')).toBeTruthy();
        expect(screen.getByRole('item9')).toBeTruthy();
        expect(screen.getAllByRole('img').length).toBe(9);

        // item10~18の非表示
        expect(screen.queryByRole('item10')).toBeNull();
        expect(screen.queryByRole('item17')).toBeNull();
        expect(screen.queryByRole('item18')).toBeNull();

        // loadingの非表示
        expect(screen.queryByRole('progressbar')).toBeNull();
        expect(screen.queryByRole('button', {name: '商品を全件表示する'})).toBeNull();

        // 各フォームのリセットを確認
        expect(inputForm).toHaveValue('');
        expect(methodStatus.searchParams.sortId).toBe(0);
        expect(methodStatus.searchParams.itemName).toBe('');


        //=============== Autocomplete ===============
        ///// 検索フォームの押下 /////
        await act(async () => {
            await userEvent.click(inputForm);
        })
        // Autocompleteされた商品名一覧の表示（name1~name18）
        const options = await screen.findAllByRole('option');
        expect(options.length).toBe(18);
        expect(screen.getByRole('option', {name: 'name1'})).toBeTruthy();
        expect(screen.getByRole('option', {name: 'name2'})).toBeTruthy();
        expect(screen.getByRole('option', {name: 'name17'})).toBeTruthy();
        expect(screen.getByRole('option', {name: 'name18'})).toBeTruthy();

        ///// Autocompleteで表示されるoptionをクリックし検索 /////
        expect(inputForm).toHaveValue('');
        await act(async () => {
            await userEvent.click(screen.getByRole('option', {name: 'name5'}));
        })
        // optionの非表示
        await expect(screen.queryByRole('option')).toBeNull();
        // 検索フォームに選択したoptionが反映されているか確認
        expect(inputForm).toHaveValue('name5');

        ///// 検索ボタンの押下 /////
        await act(async () => {
            await userEvent.click(searchButton);
        })
        // searchParamが受け渡せているか確認
        await expect(methodStatus.searchParams.itemName).toBe('name5');


        //=============== 検索フォームのクリア ===============
        expect(inputForm).toHaveValue('name5');
        ///// 検索フォームのクリアボタンを押下 /////
        await act(async () => {
            await userEvent.click(clearButton);
        })
        // 空になったことを確認
        expect(inputForm).toHaveValue('');


        //=============== 検索された商品が存在しなかった場合 ===============
        ///// 存在しない商品名の入力およびEnterキー押下での検索 /////
        await act(async () => {
            await userEvent.type(await inputForm, 'non exist{enter}',);
        })
        // loadingの表示
        expect(screen.queryByRole('progressbar')).toBeTruthy();
        // 「検索された商品は存在しません。」の表示
        expect(await screen.findByText('検索された商品は存在しません。')).toBeTruthy();
        // 商品全件表示ボタンの表示
        expect(screen.getByRole('button', {name: '商品を全件表示する'})).toBeTruthy();

        ///// 全件表示ボタンの押下 /////
        await act(async () => {
            await userEvent.click(screen.getByRole('button', {name: '商品を全件表示する'}));
        })
        expect(screen.queryByRole('progressbar')).toBeTruthy();


        //=============== 商品詳細ページへの遷移 ===============
        expect(await screen.findByRole('item1')).toBeTruthy();
        const item1Card = await screen.findByRole('button', {name: 'pizza item name1 M 1,000円 L 2,000円'});

        ///// 商品（ItemCardコンポ―ネント）を押下 /////
        await act(async () => {
            await userEvent.click(item1Card);
        })
        // history.pushの内容を確認
        expect(methodStatus.history).toStrictEqual({pathname: '/itemDetail/1'});

    }, 1000000)
})
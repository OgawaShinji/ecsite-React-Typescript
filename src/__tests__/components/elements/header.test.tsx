import React from "react";
import {act, cleanup, render, screen} from "@testing-library/react";
import {rest} from "msw";
import {setupServer} from "msw/node";
import {REST_URL} from "~/store/api";
import {configureStore} from "@reduxjs/toolkit";
import {authSlice} from "~/store/slices/App/auth.slice";
import {Provider} from "react-redux";
import {BrowserRouter} from "react-router-dom";
import Header from "~/components/elements/Header";
import userEvent from "@testing-library/user-event";


// mock内の変数を変更したい場合は、変数名の最初にmock○○とつけてあげる
let mockUri = '/login'

jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom") as {},
    // 画面遷移処理が働くと自動でmock化したpush処理が働き、擬似的に遷移したようにしてくれる
    useHistory: () => ({
        push: jest.fn().mockImplementation((to: string) => {
            methodStatus.history = to;
        }),
        listen: jest.fn()
    }),
    useLocation: () => ({
        pathname: mockUri
    })
}));

const server = setupServer(
    rest.post(REST_URL + '/auth/logout/', ((req, res, ctx) => {
        methodStatus.url.push(`${req.url}`)
        methodStatus.requestBody = req.body
        return res(ctx.status(200), ctx.json({}))
    }))
)

type methodStatusType = {
    url: Array<String>;
    history: string;
    requestBody: any
}
let methodStatus: methodStatusType = {
    url: [],
    history: '',
    requestBody: null
};

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
    localStorage.clear();
    methodStatus.history = '';
    methodStatus.url = [];
    methodStatus.requestBody = null;
});

afterAll(() => {
    server.close();
})

const rendering = (isLogin: boolean) => {
    render(
        <Provider store={store}>
            <BrowserRouter>
                <Header isLogin={isLogin}/>
            </BrowserRouter>
        </Provider>
    );
}


describe("headerコンポーネント", () => {

    describe("（ pathname: '/', ログイン時 ）", () => {
        beforeEach(() => {
            mockUri = '/'
            rendering(true)
        })
        it("初期表示", () => {
            expect(screen.getByTestId('header-logo')).toBeTruthy();
            expect(screen.getByRole('button', {name: '商品一覧'})).toBeTruthy();
            expect(screen.getByRole('button', {name: 'カート一覧'})).toBeTruthy();
            expect(screen.getByRole('button', {name: 'account of current user'})).toBeTruthy();
        })
        describe('動作確認', () => {
            it("ヘッダーロゴ押下時、商品一覧画面に遷移している", async () => {
                await act(async () => {
                    await userEvent.click(screen.getByTestId('header-logo'))
                })
                expect(methodStatus.history).toBe('/')
            })
            it("「商品一覧」ボタン押下時、商品一覧画面に遷移している", async () => {
                await act(async () => {
                    await userEvent.click(screen.getByRole('button', {name: '商品一覧'}))
                })
                expect(methodStatus.history).toBe('/')
            })
            it("「カート一覧」ボタン押下時、商品一覧画面に遷移している", async () => {
                await act(async () => {
                    await userEvent.click(screen.getByRole('button', {name: 'カート一覧'}))
                    expect(methodStatus.history).toBe('/cart')
                })
            })
            it("ユーザーアイコン押下時、メニューが表示される", async () => {
                await act(async () => {
                    await userEvent.click(screen.getByRole('button', {name: 'account of current user'}))
                })
                // const r = screen.getByRole('', {hidden: true});
                expect(screen.queryByRole('menuitem', {name: '注文履歴'})).toBeTruthy();
                expect(screen.queryByRole('menuitem', {name: 'ログアウト'})).toBeTruthy();
            })
            describe("ユーザーアイコン押下時", () => {
                beforeEach(async () => {
                    await act(async () => {
                        await userEvent.click(screen.getByRole('button', {name: 'account of current user'}))
                    })
                })
                it("「注文履歴」押下時、注文位履歴画面に遷移している", async () => {
                    await act(async () => {
                        await userEvent.click(screen.getByRole('menuitem', {name: '注文履歴'}))
                        expect(methodStatus.history).toBe('/history')
                    })
                })
                it("「ログアウト」ボタン押下時、ログアウト処理が走り、ログイン画面へ遷移", async () => {
                    await localStorage.setItem("Authorization", 'token')
                    await expect(localStorage.getItem('Authorization')).toBe('token')
                    await act(async () => {
                        await userEvent.click(screen.getByRole('menuitem', {name: 'ログアウト'}))
                    })
                    expect(methodStatus.url[0]).toBe(REST_URL + '/auth/logout/')
                    await expect(localStorage.getItem('Authorization')).toBeNull()
                })
            })
        })
    })

    describe("( pathname: '/login', 未ログイン時)", () => {
        beforeEach(() => {
            mockUri = '/login'
            rendering(false)
        })
        it('初期表示', () => {
            expect(screen.getByTestId('header-logo')).toBeTruthy();
            expect(screen.queryByRole('button', {name: '商品一覧'})).toBeNull();
            expect(screen.queryByRole('button', {name: 'カート一覧'})).toBeNull();
            expect(screen.queryByRole('button', {name: 'account of current user'})).toBeNull();
            // const r = screen.getByRole('', {hidden: true});
        })
    })

    describe("( pathname: '/register', 未ログイン時)", () => {
        beforeEach(() => {
            mockUri = '/register'
            rendering(false)
        })
        it('初期表示', () => {
            expect(screen.queryByRole('button', {name: '商品一覧'})).toBeNull();
            expect(screen.queryByRole('button', {name: 'カート一覧'})).toBeNull();
            expect(screen.queryByRole('button', {name: 'account of current user'})).toBeNull();
            expect(screen.getByRole('button', {name: 'Login'})).toBeTruthy();
            // const r = screen.getByRole('', {hidden: true});
        })
        it('「Login」ボタン押下時、ログイン画面へ遷移する', async () => {
            await act(async () => {
                await userEvent.click(screen.getByRole('button', {name: 'Login'}))
            })
            expect(methodStatus.history).toBe('/login')
        })
    })
})


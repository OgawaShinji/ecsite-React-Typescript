import React from "react";
import {render, screen, cleanup, act} from "@testing-library/react";

import {rest} from 'msw';
import {setupServer} from 'msw/node';

import {Provider} from "react-redux";
import {configureStore} from "@reduxjs/toolkit";
import {BrowserRouter} from "react-router-dom";
import {REST_URL} from "~/store/api";
import {User} from "~/types/interfaces";
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
    url: string[];
    history: string;
    requestBody: any
}
let methodStatus: methodStatusType = {
    url: [],
    history: '',
    requestBody: null
};
const userFromDB: User = {
    id: 1,
    name: 'test name',
    email: 'a@a.a',
    zipcode: '111-1111',
    address: 'test address',
    telephone: '000-0000-0000',
    status: 0
}
const server = setupServer(
    rest.post(REST_URL + '/auth/login/', ((req, res, ctx) => {
        methodStatus.url.push(`${req.url}`)
        methodStatus.requestBody = req.body
        return res(ctx.status(200), ctx.json({token: 'token'}))
    })),
    rest.get(REST_URL + '/auth/user/', ((req, res, context) => {
        methodStatus.url.push(`${req.url}`);
        return res(context.status(200), context.json({
            user: userFromDB
        }))
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
    localStorage.clear();
    methodStatus.history = '';
    methodStatus.url = [];
    methodStatus.requestBody = null;
});

afterAll(() => {
    server.close();
})

describe('login画面:(index, LoginFrom)コンポーネントと' +
    '(authSlice.login)統合テスト', () => {
    const rendering = () => {
        render(
            <Provider store={store}>
                <BrowserRouter>
                    <Login/>
                </BrowserRouter>
            </Provider>
        );
    }

    it('初期画面表示からローディング画面終了後のレンダリングテスト', async () => {
        await rendering();
        expect(screen.getByRole('progressbar')).toBeTruthy();

        expect(await screen.findByRole('progressbar')).toBeTruthy();
        const startTime = performance.now();

        expect(await screen.findByRole('button')).toBeTruthy();
        const endTime = performance.now();
        expect(endTime - startTime > 500).toBeTruthy();

        expect(await screen.findByRole('textbox', {name: 'e-mail'})).toBeTruthy();
        expect(screen.getByRole('button', {name: 'Login'})).toBeTruthy();
        expect(screen.getByRole('link', {name: 'ユーザー登録はこちらから'})).toBeTruthy();
        expect(screen.getByLabelText('password')).toBeTruthy();

        //const r = screen.getByRole('', {hidden: true});
    });
    it('ユーザー登録クリックイベント：正常系', async () => {
        await rendering();

        expect(await screen.findByRole('textbox', {name: 'e-mail'})).toBeTruthy();
        await act(async () => {
            await userEvent.click(screen.getByRole('link', {name: 'ユーザー登録はこちらから'}))
            expect(global.window.location.pathname).toBe('/register');
        })

        //const r = screen.getByRole('', {hidden: true});
    });

    const EMAIL_ERROR_MESSAGE_1 = '※メールアドレスを入力してください';
    const EMAIL_ERROR_MESSAGE_2 = '※正しい形式でメールアドレスを入力してください';
    const PASS_ERROR_MESSAGE_1 = '*パスワードを入力してください';
    const PASS_ERROR_MESSAGE_2 = '*6字以上16字以内で入力してください';

    it('e-mail, password入力', async () => {
        await rendering();

        expect(await screen.findByRole('textbox', {name: 'e-mail'})).toBeTruthy();
        let inputEmail: string = 'a@a.a'
        let inputPass: string = '123456';
        await act(async () => {
            //正常入力
            await userEvent.type(await screen.findByRole('textbox', {name: 'e-mail'}), inputEmail);
            expect(screen.getByRole('textbox', {name: 'e-mail'})).toHaveValue(inputEmail)
            expect(screen.queryByText(EMAIL_ERROR_MESSAGE_1)).toBeNull();
            expect(screen.queryByText(EMAIL_ERROR_MESSAGE_2)).toBeNull();
            await userEvent.type(await screen.findByLabelText('password'), inputPass);
            expect(screen.getByLabelText('password')).toHaveValue(inputPass)
            expect(screen.queryByText(PASS_ERROR_MESSAGE_1)).toBeNull();
            expect(screen.queryByText(PASS_ERROR_MESSAGE_2)).toBeNull();
            expect(screen.getByRole('button', {name: 'Login'})).not.toHaveAttribute('disabled')

            //異常入力(1字削除: e-mail=a@a. pass=12345)
            await userEvent.type(await screen.findByRole('textbox', {name: 'e-mail'}), '{backspace}')
            expect(screen.getByRole('textbox', {name: 'e-mail'})).toHaveValue('a@a.')
            expect(screen.queryByText(EMAIL_ERROR_MESSAGE_2)).toBeTruthy();
            await userEvent.type(await screen.findByLabelText('password'), '{backspace}');
            expect(screen.getByLabelText('password')).toHaveValue('12345')
            expect(screen.queryByText(PASS_ERROR_MESSAGE_2)).toBeTruthy();
            expect(screen.getByRole('button', {name: 'Login'})).toHaveAttribute('disabled')

            //e-mail入力時にEnter Key押下しても画面が変わらないこと
            await userEvent.type(await screen.findByRole('textbox', {name: 'e-mail'}), '{enter}')
            expect(methodStatus.history).toBe('');
            expect(screen.getByRole('textbox', {name: 'e-mail'})).toHaveValue('a@a.')
            expect(screen.getByLabelText('password')).toHaveValue('12345')

            //password入力時にEnter Key押下しても画面が変わらないこと
            await userEvent.type(await screen.findByLabelText('password'), '{enter}')
            expect(methodStatus.history).toBe('');
            expect(screen.getByRole('textbox', {name: 'e-mail'})).toHaveValue('a@a.')
            expect(screen.getByLabelText('password')).toHaveValue('12345')


            //異常入力(全字削除)
            await userEvent.type(await screen.findByRole('textbox', {name: 'e-mail'}), '{backspace}{backspace}{backspace}{backspace}')
            expect(screen.queryByText(EMAIL_ERROR_MESSAGE_1)).toBeTruthy();
            await userEvent.type(await screen.findByLabelText('password'), '{backspace}{backspace}{backspace}{backspace}{backspace}');
            expect(screen.queryByText(PASS_ERROR_MESSAGE_1)).toBeTruthy();
            expect(screen.getByRole('button', {name: 'Login'})).toHaveAttribute('disabled')

            //以下Enter Key押下
            await userEvent.type(await screen.findByRole('textbox', {name: 'e-mail'}), '{enter}')
            expect(methodStatus.history).toBe('');
            expect(screen.getByLabelText('password').textContent).toBe('')

            await userEvent.type(await screen.findByLabelText('password'), '{enter}')
            expect(methodStatus.history).toBe('');
            expect(screen.getByLabelText('password').textContent).toBe('')


        })

        //const r = screen.getByRole('', {hidden: true});
    });
    it('login button：正常系', async () => {
        await rendering();

        expect(await screen.findByRole('textbox', {name: 'e-mail'})).toBeTruthy();
        let inputEmail: string = 'a@a.a'
        let inputPass: string = '123456';
        await act(async () => {
            //正常入力
            userEvent.type(await screen.findByRole('textbox', {name: 'e-mail'}), inputEmail);
            userEvent.type(await screen.findByLabelText('password'), inputPass);

            await userEvent.click(screen.getByRole('button', {name: 'Login'}));
            //ローディング画面表示、login->fetchUserの順で呼び出されている、商品一覧へと遷移、tokenがローカルストレージに入っている
            await expect(await screen.findByRole('progressbar')).toBeTruthy();
            await expect(methodStatus.url).toStrictEqual([REST_URL + '/auth/login/', REST_URL + '/auth/user/']);
            await expect(methodStatus.history).toBe('/')
            await expect(localStorage.getItem('Authorization')).toBe('token')

            //const r = screen.getByRole('', {hidden: true});
        })

    });

    const FAILED_LOGIN_MESSAGE = "メールアドレスもしくはパスワードが違います"

    it('login button：異常系', async () => {
        await rendering();

        server.use(
            rest.post(REST_URL + '/auth/login/', ((req, res, context) => {
                methodStatus.url.push(`${req.url}`)
                return res(context.status(200), context.json(null))
            }))
        )
        expect(await screen.findByRole('textbox', {name: 'e-mail'})).toBeTruthy();
        let inputEmail: string = 'a@a.a'
        let inputPass: string = '123456';
        await act(async () => {
            //正常入力
            userEvent.type(await screen.findByRole('textbox', {name: 'e-mail'}), inputEmail);
            userEvent.type(await screen.findByLabelText('password'), inputPass);

            //password入力時にenter key押下
            await userEvent.type(await screen.findByLabelText('password'), '{enter}')
            //エラーメッセージ表示、loginメソッドのみ呼ばれいる、tokenがローカルストレージに入っていない、パスワード入力欄が空文字に戻されていること
            await expect(await screen.findByText(FAILED_LOGIN_MESSAGE)).toBeTruthy();
            await expect(methodStatus.url).toStrictEqual([REST_URL + '/auth/login/']);
            await expect(localStorage.getItem('Authorization')).toBeNull();
            await expect(screen.getByLabelText('password').textContent).toBe('')

            //const r = screen.getByRole('', {hidden: true});
        })

    })
});
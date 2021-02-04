import {setupServer} from "msw/node";
import {configureStore} from "@reduxjs/toolkit";
import {userSlice} from "~/store/slices/Domain/user.slice";
import {act, cleanup, fireEvent, render, screen} from "@testing-library/react";
import {Provider} from "react-redux";
import {BrowserRouter} from "react-router-dom";
import React from "react";
import store from "~/store";
import Register from "~/components/register";
import userEvent from "@testing-library/user-event";
import {rest} from "msw";
import {REST_URL} from "~/store/api";
import {stringify} from "querystring";

jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom") as {},
    //遷移処理を設定
    useHistory: () => ({
        push: jest.fn().mockImplementation((to: string) => {
            methodStatus.history = to;
        })
    })
}));



type methodStatusType = {
    url: string;
    history: string;
    requestBody: any;
}

let methodStatus: methodStatusType = {
    url: '',
    history: '',
    requestBody: null
}


//登録画面でできる非同期（axios）処理を記述？
const server = setupServer(
    rest.post( REST_URL + "/auth/register/", ( ( req, res, ctx) => {
        methodStatus.url = `${req.url}`
        methodStatus.requestBody = req.body
        return res(ctx.status(200),ctx.body("200"))
    }))
);

//サーバーを立ち上げる
beforeAll( () => {
   server.listen()
});
//storeの初期化
beforeEach(() => {
    const store = configureStore({
        reducer:{
            user:userSlice.reducer
        }
    })
})

afterEach(() => {
    server.resetHandlers();
    cleanup();
    jest.resetAllMocks();
});
//サーバーを閉じる
afterAll(() => {
    server.close();
});

describe("ユーザー登録画面", () => {
    it( "レンダリングのテスト", async () => {
        render(
            <Provider store={store}>
                <BrowserRouter>
                   <Register/>
                </BrowserRouter>
            </Provider>
        );
        expect(screen.getByRole("heading",{name: "新規ユーザー登録"})).toBeTruthy()
    });

    it("入力フォーム：入力されたデータが反映されているかの確認 ( 名前 )　",async () => {
        render(
            <Provider store={store}>
                <BrowserRouter>
                    <Register/>
                </BrowserRouter>
            </Provider>
        );
        await act( async () => {
            const nameInputForm = screen.getByRole("textbox",{name:"name"});
            //レンダリング後、フォームの初期値が "" であるか確認
            expect(nameInputForm).toHaveValue("");
            //type先もawait必須：keyDown、keyPressやkeyUpイベントも発火させているため、その処理を待つ必要があるから？
            await userEvent.type(await nameInputForm,"らくらくたろう");
            expect(nameInputForm).toHaveValue("らくらくたろう");
            //エラーが表示されているか(空文字)
            await userEvent.clear(await nameInputForm);
            expect(screen.getByRole("heading",{name:"※名前を入力してください"})).toBeTruthy()
        })
    })

    it("入力フォーム：入力されたデータが反映されているかの確認 ( メールアドレス )　",async () => {
        render(
            <Provider store={store}>
                <BrowserRouter>
                    <Register/>
                </BrowserRouter>
            </Provider>
        );
        await act( async () => {
            const emailInputForm = screen.getByRole("textbox",{name:"e-mail"});
            //レンダリング後、フォームの初期値が "" であるか確認
            expect(emailInputForm).toHaveValue("");
            await userEvent.type(await emailInputForm,"test@test.com");
            expect(emailInputForm).toHaveValue("test@test.com");
            //エラーが表示されているか(空文字)
            await userEvent.clear(await emailInputForm);
            expect(emailInputForm).toHaveValue("");
            expect(screen.getByRole("heading",{name:"※メールアドレスを入力してください"})).toBeTruthy()
            //エラーが表示されているか(メール形式ではないものを入力)
            await userEvent.clear(await emailInputForm);
            expect(emailInputForm).toHaveValue("");
            await userEvent.type(await emailInputForm,"a");
            expect(emailInputForm).toHaveValue("a");
            expect(screen.getByRole("heading",{name:"※正しい形式でメールアドレスを入力してください"})).toBeTruthy()
        })
    })

    it("入力フォーム：入力されたデータが反映されているかの確認 ( 郵便番号 : 上3桁 )　",async () => {
        render(
            <Provider store={store}>
                <BrowserRouter>
                    <Register/>
                </BrowserRouter>
            </Provider>
        );
        await act( async () => {
            const zipcodeInputForm = screen.getByRole("textbox",{name:"zipcode（○○○）"});
            //レンダリング後、フォームの初期値が "" であるか確認
            expect(zipcodeInputForm).toHaveValue("");
            await userEvent.type(await zipcodeInputForm,"123");
            expect(zipcodeInputForm).toHaveValue("123");
            //エラーが表示されているか（空文字）
            await userEvent.clear(await zipcodeInputForm);
            expect(zipcodeInputForm).toHaveValue("");
            expect(screen.getByRole("heading",{name:"※郵便番号を入力してください"})).toBeTruthy()
            //エラーが表示されているか（1桁入力）
            await userEvent.clear(await zipcodeInputForm);
            await userEvent.type(await zipcodeInputForm,"1");
            expect(zipcodeInputForm).toHaveValue("1");
            expect(screen.getByRole("heading",{name:"※3桁で入力してください"})).toBeTruthy()
            //エラーが表示されているか（文字入力）
            await userEvent.clear(await zipcodeInputForm);
            await userEvent.type(await zipcodeInputForm,"あ");
            expect(zipcodeInputForm).toHaveValue("あ");
            expect(screen.getByRole("heading",{name:"※半角数字を入力してください"})).toBeTruthy()
        })
    })

    it("入力フォーム：入力されたデータが反映されているかの確認 ( 郵便番号 : 上4桁 )　",async () => {
        render(
            <Provider store={store}>
                <BrowserRouter>
                    <Register/>
                </BrowserRouter>
            </Provider>
        );
        await act( async () => {
            const zipcodeInputForm = screen.getByRole("textbox",{name:"zipcode（○○○○）"});
            //レンダリング後、フォームの初期値が "" であるか確認
            expect(zipcodeInputForm).toHaveValue("");
            await userEvent.type(await zipcodeInputForm,"5678");
            expect(zipcodeInputForm).toHaveValue("5678");
            //エラーが表示されているか（空文字）
            await userEvent.clear(await zipcodeInputForm);
            expect(zipcodeInputForm).toHaveValue("");
            expect(screen.getByRole("heading",{name:"※郵便番号を入力してください"})).toBeTruthy()
            //エラーが表示されているか（1桁入力）
            await userEvent.clear(await zipcodeInputForm);
            await userEvent.type(await zipcodeInputForm,"1");
            expect(zipcodeInputForm).toHaveValue("1");
            expect(screen.getByRole("heading",{name:"※4桁で入力してください"})).toBeTruthy()
            //エラーが表示されているか（文字入力）
            await userEvent.clear(await zipcodeInputForm);
            await userEvent.type(await zipcodeInputForm,"あ");
            expect(zipcodeInputForm).toHaveValue("あ");
            expect(screen.getByRole("heading",{name:"※半角数字を入力してください"})).toBeTruthy()
        })
    })

    it("入力フォーム：入力されたデータが反映されているかの確認 ( 住所 )　",async () => {
        render(
            <Provider store={store}>
                <BrowserRouter>
                    <Register/>
                </BrowserRouter>
            </Provider>
        );
        await act( async () => {
            const addressInputForm = screen.getByRole("textbox",{name:"address"});
            //レンダリング後、フォームの初期値が "" であるか確認
            expect(addressInputForm).toHaveValue("");
            await userEvent.type(await addressInputForm,"東京都新宿区");
            expect(addressInputForm).toHaveValue("東京都新宿区");
            //エラーが表示されているか(空文字)
            await userEvent.clear(await addressInputForm);
            expect(addressInputForm).toHaveValue("");
            expect(screen.getByRole("heading",{name:"※住所を入力してください"})).toBeTruthy()
            await userEvent.clear(await addressInputForm);
            expect(addressInputForm).toHaveValue("");
            const text = "東京都新宿区"
            await userEvent.type(await addressInputForm, text.repeat(34));//計204文字
            expect(addressInputForm).toHaveValue(text.repeat(34));//計204文字
            expect(screen.getByRole("heading",{name:"※200字以内で入力してください"})).toBeTruthy()
        })
    })

    it("入力フォーム：入力されたデータが反映されているかの確認 ( 電話番号: 最初 )　",async () => {
        render(
            <Provider store={store}>
                <BrowserRouter>
                    <Register/>
                </BrowserRouter>
            </Provider>
        );
        await act( async () => {
            const telephoneInputForm = screen.getAllByRole("textbox",{name:"telephone"})[0];
            //レンダリング後、フォームの初期値が "" であるか確認
            expect(telephoneInputForm).toHaveValue("");
            await userEvent.type(await telephoneInputForm,"090");
            expect(telephoneInputForm).toHaveValue("090");
            //エラーが表示されているか
            await userEvent.clear(await telephoneInputForm);
            expect(telephoneInputForm).toHaveValue("");
            expect(screen.getByRole("heading",{name:"※電話番号を入力してください"})).toBeTruthy()
            //エラーが表示されているか（文字入力）
            await userEvent.clear(await telephoneInputForm);
            await userEvent.type(await telephoneInputForm,"あ");
            expect(telephoneInputForm).toHaveValue("あ");
            expect(screen.getByRole("heading",{name:"※半角数字を入力してください"})).toBeTruthy()
            //エラーが表示されているか（数字1桁入力）
            await userEvent.clear(await telephoneInputForm);
            await userEvent.type(await telephoneInputForm,"1");
            expect(telephoneInputForm).toHaveValue("1");
            expect(screen.getByRole("heading",{name:"※2桁以上4桁以内で入力して下さい"})).toBeTruthy()
        })
    })

    it("入力フォーム：入力されたデータが反映されているかの確認 ( 電話番号: 中 )　",async () => {
        render(
            <Provider store={store}>
                <BrowserRouter>
                    <Register/>
                </BrowserRouter>
            </Provider>
        );
        await act( async () => {
            const telephoneInputForm = screen.getAllByRole("textbox",{name:"telephone"})[1];
            //レンダリング後、フォームの初期値が "" であるか確認
            expect(telephoneInputForm).toHaveValue("");
            await userEvent.type(await telephoneInputForm,"1234");
            expect(telephoneInputForm).toHaveValue("1234");
            //エラーが表示されているか
            await userEvent.clear(await telephoneInputForm);
            expect(telephoneInputForm).toHaveValue("");
            expect(screen.getAllByRole("heading",{name:"※電話番号を入力してください"})).toBeTruthy()
            //エラーが表示されているか（文字入力）
            await userEvent.clear(await telephoneInputForm);
            await userEvent.type(await telephoneInputForm,"あ");
            expect(telephoneInputForm).toHaveValue("あ");
            expect(screen.getByRole("heading",{name:"※半角数字を入力してください"})).toBeTruthy()
            //エラーが表示されているか（数字1桁入力）
            await userEvent.clear(await telephoneInputForm);
            await userEvent.type(await telephoneInputForm,"1");
            expect(telephoneInputForm).toHaveValue("1");
            expect(screen.getByRole("heading",{name:"※4桁で入力して下さい"})).toBeTruthy()
        })
    })

    it("入力フォーム：入力されたデータが反映されているかの確認 ( 電話番号: 最後 )　",async () => {
        render(
            <Provider store={store}>
                <BrowserRouter>
                    <Register/>
                </BrowserRouter>
            </Provider>
        );
        await act( async () => {
            const telephoneInputForm = screen.getAllByRole("textbox",{name:"telephone"})[2];
            //レンダリング後、フォームの初期値が "" であるか確認
            expect(telephoneInputForm).toHaveValue("");
            await userEvent.type(await telephoneInputForm,"5678");
            expect(telephoneInputForm).toHaveValue("5678");
            //エラーが表示されているか
            await userEvent.clear(await telephoneInputForm);
            expect(telephoneInputForm).toHaveValue("");
            expect(screen.getAllByRole("heading",{name:"※電話番号を入力してください"})).toBeTruthy()
            //エラーが表示されているか（文字入力）
            await userEvent.clear(await telephoneInputForm);
            await userEvent.type(await telephoneInputForm,"あ");
            expect(telephoneInputForm).toHaveValue("あ");
            expect(screen.getByRole("heading",{name:"※半角数字を入力して下さい"})).toBeTruthy()
            //エラーが表示されているか（数字1桁入力）
            await userEvent.clear(await telephoneInputForm);
            await userEvent.type(await telephoneInputForm,"1");
            expect(telephoneInputForm).toHaveValue("1");
            expect(screen.getByRole("heading",{name:"※4桁で入力して下さい"})).toBeTruthy()
        })
    })

    it("入力フォーム：入力されたデータが反映されているかの確認 ( パスワード )　",async () => {
        render(
            <Provider store={store}>
                <BrowserRouter>
                    <Register/>
                </BrowserRouter>
            </Provider>
        );
        await act( async () => {
            const passwordInputForm = screen.getByRole("textbox",{name:"password"});
            //レンダリング後、フォームの初期値が "" であるか確認
            expect(passwordInputForm).toHaveValue("");
            await userEvent.type(await passwordInputForm,"111111");
            expect(passwordInputForm).toHaveValue("111111");
            //エラーが表示されているか（空文字）
            await userEvent.clear(await passwordInputForm);
            expect(passwordInputForm).toHaveValue("");
            expect(screen.getAllByRole("heading",{name:"※パスワードを入力してください"})).toBeTruthy()
            //エラーが表示されているか（文字入力）
            await userEvent.clear(await passwordInputForm);
            await userEvent.type(await passwordInputForm,"あ");
            expect(passwordInputForm).toHaveValue("あ");
            expect(screen.getByRole("heading",{name:"※半角数字を入力してください"})).toBeTruthy()
            //エラーが表示されているか（数字1桁入力）
            await userEvent.clear(await passwordInputForm);
            await userEvent.type(await passwordInputForm,"1");
            expect(passwordInputForm).toHaveValue("1");
            expect(screen.getByRole("heading",{name:"※6字以上16字以内で入力してください"})).toBeTruthy()
        })
    })

    it("入力フォーム：入力されたデータが反映されているかの確認 ( 確認パスワード )　",async () => {
        render(
            <Provider store={store}>
                <BrowserRouter>
                    <Register/>
                </BrowserRouter>
            </Provider>
        );
        await act( async () => {
            const passwordInputForm = screen.getByRole("textbox", {name:"password"});
            const confirmPasswordInputForm = screen.getByRole("textbox", {name:"confirmationPassword"});
            //レンダリング後、フォームの初期値が "" であるか確認
            expect(confirmPasswordInputForm).toHaveValue("");
            await userEvent.type(await confirmPasswordInputForm,"111111");
            expect(confirmPasswordInputForm).toHaveValue("111111");
            //エラーが表示されているか(空文字)
            await userEvent.clear(await confirmPasswordInputForm);
            expect(confirmPasswordInputForm).toHaveValue("");
            expect(screen.getAllByRole("heading",{name:"※確認用パスワードを入力してください"})).toBeTruthy()
            //エラーが表示されているか（確認用パスワードのみ文字入力）
            await userEvent.clear(await confirmPasswordInputForm);
            await userEvent.type(await confirmPasswordInputForm,"あ");
            expect(confirmPasswordInputForm).toHaveValue("あ");
            expect(screen.getByRole("heading",{name:"※パスワードと一致していません"})).toBeTruthy()
            //エラーが表示されているか（パスワード、確認用パスワードに文字入力）
            await userEvent.clear(await confirmPasswordInputForm);
            await userEvent.type(await passwordInputForm,"あ");
            expect(passwordInputForm).toHaveValue("あ");
            await userEvent.type(await confirmPasswordInputForm,"あ");
            expect(confirmPasswordInputForm).toHaveValue("あ");
            expect(screen.getAllByRole("heading")[10]).toHaveTextContent("※半角数字を入力してください");
            //エラーが表示されているか（パスワード、確認用パスワードに数字1桁入力）
            await userEvent.clear(await passwordInputForm);
            await userEvent.clear(await confirmPasswordInputForm);
            await userEvent.type(await passwordInputForm,"1");
            expect(passwordInputForm).toHaveValue("1");
            await userEvent.type(await confirmPasswordInputForm,"1");
            expect(confirmPasswordInputForm).toHaveValue("1");
            expect(screen.getAllByRole("heading")[10]).toHaveTextContent("※6字以上16字以内で入力してください");
        })
    })



    it( "登録処理の確認" , async () => {
        render(
            <Provider store={store}>
                <BrowserRouter>
                    <Register/>
                </BrowserRouter>
            </Provider>
        );
        await act( async () => {
            const inputs = screen.getAllByRole("textbox");
            await userEvent.type( await inputs[0], "らくらくたろう");
            await userEvent.type( await inputs[1], "test@test.com");
            await userEvent.type( await inputs[2], "123");
            await userEvent.type( await inputs[3], "4567");
            await userEvent.type( await inputs[4], "東京都新宿区");
            await userEvent.type( await inputs[5], "090");
            await userEvent.type( await inputs[6], "1234");
            await userEvent.type( await inputs[7], "5678");
            await userEvent.type( await inputs[8], "111111");
            await userEvent.type( await inputs[9], "111111");
            await userEvent.click(screen.getAllByRole("button")[2]);
        })
        //actの中で書かない
        await expect(methodStatus.url).toBe(REST_URL + '/auth/register/');
        await expect(methodStatus.requestBody).toStrictEqual({
            name: "らくらくたろう",
            email: "test@test.com",
            password : "111111",
            status: "0",
            zipcode: "1234567",
            address: "東京都新宿区",
            telephone: "090-1234-5678"
        })
        await expect(await screen.findByRole('progressbar')).toBeTruthy();
        await expect(methodStatus.history).toBe('/login')
    })

    //--------------------保留---------------------------------------
    // it( "登録処理の確認（　エラー時　）" , async () => {
    //     render(
    //         <Provider store={store}>
    //             <BrowserRouter>
    //                 <Register/>
    //             </BrowserRouter>
    //         </Provider>
    //     );
    //     await act( async () => {
    //         const inputs = screen.getAllByRole("textbox");
    //         await userEvent.type( await inputs[0], "らくらくたろう");
    //         await userEvent.type( await inputs[1], "test@test.co");//メールアドレス形式ではない状態
    //         await userEvent.type( await inputs[2], "123");
    //         await userEvent.type( await inputs[3], "4567");
    //         await userEvent.type( await inputs[4], "東京都新宿区");
    //         await userEvent.type( await inputs[5], "090");
    //         await userEvent.type( await inputs[6], "1234");
    //         await userEvent.type( await inputs[7], "5678");
    //         await userEvent.type( await inputs[8], "111111");
    //         await userEvent.type( await inputs[9], "111111");
    //         await userEvent.click(screen.getAllByRole("button")[2]);
    //
    //     })
    //     //actの中で書かない
    //     await expect(methodStatus.url).toBe(REST_URL + '/auth/register/');
    //     await expect(methodStatus.requestBody).toStrictEqual({
    //         name: "らくらくたろう",
    //         email: "test@test.com",
    //         password : "111111",
    //         status: "0",
    //         zipcode: "1234567",
    //         address: "東京都新宿区",
    //         telephone: "090-1234-5678"
    //     })
    //     await expect(await screen.findByRole('progressbar')).toBeTruthy();
    //
    //     await expect(methodStatus.history).toBe('/login')
    //     // await screen.findByRole("")
    //
    // })

})
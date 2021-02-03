import {setupServer} from "msw/node";
import {configureStore} from "@reduxjs/toolkit";
import {userSlice} from "~/store/slices/Domain/user.slice";
import {act, cleanup, render, screen} from "@testing-library/react";
import {Provider} from "react-redux";
import {BrowserRouter} from "react-router-dom";
import React from "react";
import store from "~/store";
import Register from "~/components/register";
import userEvent from "@testing-library/user-event";

jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom") as {},

}));

//登録画面でできる非同期（axios）処理を記述？
const server = setupServer(

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
        // screen.getByRole("");
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
            const message = "らくらくたろう";
            await userEvent.type(screen.getByRole("textbox",{name:"name"}), "らくらくたろう" );
            expect(nameInputForm).toHaveValue("らくらくたろう");
        })
    })

    it("入力フォーム：入力されたデータが反映されているかの確認 ( メールアドレス )　",() => {
        render(
            <Provider store={store}>
                <BrowserRouter>
                    <Register/>
                </BrowserRouter>
            </Provider>
        );
    })

    it("入力フォーム：入力されたデータが反映されているかの確認 ( 郵便番号 )　",() => {
        render(
            <Provider store={store}>
                <BrowserRouter>
                    <Register/>
                </BrowserRouter>
            </Provider>
        );
    })

    it("",() => {
        render(
            <Provider store={store}>
                <BrowserRouter>
                    <Register/>
                </BrowserRouter>
            </Provider>
        );
    })

    it("",() => {
        render(
            <Provider store={store}>
                <BrowserRouter>
                    <Register/>
                </BrowserRouter>
            </Provider>
        );
    })

    it("",() => {
        render(
            <Provider store={store}>
                <BrowserRouter>
                    <Register/>
                </BrowserRouter>
            </Provider>
        );
    })

    it("",() => {
        render(
            <Provider store={store}>
                <BrowserRouter>
                    <Register/>
                </BrowserRouter>
            </Provider>
        );
    })










})
import React from "react";
import {fireEvent, render,screen} from "@testing-library/react";
import {Provider} from "react-redux";
import store from "~/store";
import ShippingDialog from "~/components/orderConfirm/shippingDialog";



describe('shippingDialog test',() => {
    const props = {
        open: true,
        close: jest.fn(),
        changeUserInfo: jest.fn(),
        userInfo: {
            name: 'name',
            email: 'email',
            zipcode: 'zipcode',
            address: 'address',
            telephone: 'telephone',
        }
    }


    it("コンポーネントの描画", () => {
        render(
            <Provider store={store}>
                <ShippingDialog {...props} ></ShippingDialog>
            </Provider>
        )
        expect(screen.getByText("お届け先情報")).toBeInTheDocument();
    })

    it("存在している要素の確認", () => {
        render(
            <Provider store={store}>
                <ShippingDialog {...props} ></ShippingDialog>
            </Provider>
        )
        expect(screen.getByText('お届け先情報')).toBeInTheDocument();
    })

    it("存在しない要素の確認", () => {
        render(
            <Provider store={store}>
                <ShippingDialog {...props} ></ShippingDialog>
            </Provider>
        )
        //存在しない要素を確認されするときはquery?
        expect(screen.queryByText('らくらくピザ')).toBeNull();
    })

    it("入力フォームに対する入力の検知 : 名前", () => {
        render(
            <Provider store={store}>
                <ShippingDialog {...props} ></ShippingDialog>
            </Provider>
        )
        fireEvent.change(screen.getByDisplayValue("name"),{
            target:{value: "あいうえお"}
        })
        expect(screen.getByDisplayValue("あいうえお")).toBeInTheDocument();
        // 部分一致で検索
        expect(screen.getByDisplayValue(/あいう/)).toBeInTheDocument();
    })

    it("入力フォームに対する入力の検知 : メールアドレス", () => {
        render(
            <Provider store={store}>
                <ShippingDialog {...props} ></ShippingDialog>
            </Provider>
        )
        fireEvent.change(screen.getByDisplayValue("email"),{
            target:{value: "demo@ryu.com"}
        })
        expect(screen.getByDisplayValue("demo@ryu.com")).toBeInTheDocument();
        // 部分一致で検索
        expect(screen.getByDisplayValue(/ryu/)).toBeInTheDocument();
    })

    it("入力フォームに対する入力の検知 : 郵便番号(3桁)", () => {
        render(
            <Provider store={store}>
                <ShippingDialog {...props} ></ShippingDialog>
            </Provider>
        )
        fireEvent.change(screen.getByDisplayValue("zip"),{
            target:{value: "123"}
        })
        expect(screen.getByDisplayValue("123")).toBeInTheDocument();
        // 部分一致で検索
        expect(screen.getByDisplayValue(/1/)).toBeInTheDocument();
    })

    it("入力フォームに対する入力の検知 : 郵便番号(4桁)", () => {
        render(
            <Provider store={store}>
                <ShippingDialog {...props} ></ShippingDialog>
            </Provider>
        )
        fireEvent.change(screen.getByDisplayValue("code"),{
            target:{value: "4567"}
        })
        expect(screen.getByDisplayValue("4567")).toBeInTheDocument();
        // 部分一致で検索
        expect(screen.getByDisplayValue(/56/)).toBeInTheDocument();
    })

    it("入力フォームに対する入力の検知 : 住所", () => {
        render(
            <Provider store={store}>
                <ShippingDialog {...props} ></ShippingDialog>
            </Provider>
        )
        fireEvent.change(screen.getByDisplayValue("address"),{
            target:{value: "東京都新宿区"}
        })
        expect(screen.getByDisplayValue("東京都新宿区")).toBeInTheDocument();
        // 部分一致で検索
        expect(screen.getByDisplayValue(/新宿/)).toBeInTheDocument();
    })

    it("入力フォームに対する入力の検知 : 電話番号（上4桁）", () => {
        render(
            <Provider store={store}>
                <ShippingDialog {...props} ></ShippingDialog>
            </Provider>
        )
        fireEvent.change(screen.getByDisplayValue("telephone"),{
            target:{value: "090"}
        })
        expect(screen.getByDisplayValue("090")).toBeInTheDocument();
        // 部分一致で検索
        expect(screen.getByDisplayValue(/9/)).toBeInTheDocument();
    })

    it("入力フォームに対する入力の検知 : 電話番号（中4桁）", () => {
        render(
            <Provider store={store}>
                <ShippingDialog {...props} ></ShippingDialog>
            </Provider>
        )
        fireEvent.change(screen.getByTestId("tel2"),{
            target:{value: "1234"}
        })
        expect(screen.getByDisplayValue("1234")).toBeInTheDocument();
        // 部分一致で検索
        expect(screen.getByDisplayValue(/23/)).toBeInTheDocument();
    })

    it("入力フォームに対する入力の検知 : 電話番号（下4桁）", () => {
        render(
            <Provider store={store}>
                <ShippingDialog {...props} ></ShippingDialog>
            </Provider>
        )

        fireEvent.change(screen.getByTestId("tel3"),{
            target:{value: "5678"}
        })
        expect(screen.getByDisplayValue("5678")).toBeInTheDocument();
        // 部分一致で検索
        expect(screen.getByDisplayValue(/5678/)).toBeInTheDocument();
    })

    it("【閉じる】ボタンが押下されているか", () => {
        render(
            <Provider store={store}>
                <ShippingDialog {...props} ></ShippingDialog>
            </Provider>
        )
        screen.getByRole('');
        // screen.debug()

        //getByRoleで名前を指定
        fireEvent.click(screen.getByRole('button',{name:"閉じる"}));
        //親で管理しているメソッドが子コンポーネントで発火されたかを確認
        expect( props.close ).toHaveBeenCalled();
    })
})
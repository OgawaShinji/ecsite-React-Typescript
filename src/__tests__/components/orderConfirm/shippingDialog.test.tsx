import {act, cleanup, render, screen} from "@testing-library/react";
import ShippingDialog from "~/components/orderConfirm/shippingDialog";
import {User} from "~/types/interfaces";
import userEvent from "@testing-library/user-event";
import {Provider} from "react-redux";
import store from "~/store";
import {BrowserRouter} from "react-router-dom";
import Register from "~/components/register";
import React from "react";

afterEach(() => {
    cleanup();
})

describe("ShippingDialog Component Test" , () => {

    it("Rendering Test",  async () => {
        //propsをセット
        const userInfo: User | null = {
            id: 1,
            name: "らくらくたろう",
            email: "test@test.com",
            zipcode: "1234567",
            address: "東京都新宿区",
            telephone: "090-1234-5678",
            status: 0,
            password: "111111"
        }
        const open: boolean = true;
        const handleClose:() => void = jest.fn();
        const changeUserInfo:() => void = jest.fn();
        render(
            <ShippingDialog open={open} close={handleClose} changeUserInfo={changeUserInfo} userInfo={userInfo}/>
        )
        // await screen.getByRole("heading");
        await expect(screen.getByRole("heading",{name: "お届け先情報"})).toBeTruthy();
    });

    it("Props (userInfo) Test",  async () => {
        //propsをセット
        const userInfo: User | null = {
            id: 1,
            name: "らくらくたろう",
            email: "test@test.com",
            zipcode: "1234567",
            address: "東京都新宿区",
            telephone: "090-1234-5678",
            status: 0,
            password: "111111"
        }
        const open: boolean = true;
        const handleClose:() => void = jest.fn();
        const changeUserInfo:() => void = jest.fn();
        render(
            <ShippingDialog open={open} close={handleClose} changeUserInfo={changeUserInfo} userInfo={userInfo}/>
        )
        // await screen.getByRole("heading");
        await expect(screen.getAllByRole("textbox")[0]).toHaveValue("らくらくたろう")
        await expect(screen.getAllByRole("textbox")[1]).toHaveValue("test@test.com")
        await expect(screen.getAllByRole("textbox")[2]).toHaveValue("123")
        await expect(screen.getAllByRole("textbox")[3]).toHaveValue("4567")
        await expect(screen.getAllByRole("textbox")[4]).toHaveValue("東京都新宿区")
        await expect(screen.getAllByRole("textbox")[5]).toHaveValue("090")
        await expect(screen.getAllByRole("textbox")[6]).toHaveValue("1234")
        await expect(screen.getAllByRole("textbox")[7]).toHaveValue("5678")
    });

    //--------------------登録画面のテストと同様に入力の反映を確認------------------------------------------

    it("入力フォーム：入力されたデータが反映されているかの確認 ( 名前 )　",async () => {
        //propsをセット
        const userInfo: User | null = {
            id: 1,
            name: "らくらくたろう",
            email: "test@test.com",
            zipcode: "1234567",
            address: "東京都新宿区",
            telephone: "090-1234-5678",
            status: 0,
            password: "111111"
        }
        const open: boolean = true;
        const handleClose:() => void = jest.fn();
        const changeUserInfo:() => void = jest.fn();
        render(
            <ShippingDialog open={open} close={handleClose} changeUserInfo={changeUserInfo} userInfo={userInfo}/>
        )
        await act( async () => {
            const nameInputForm = screen.getByRole("textbox",{name:"名前"});
            //エラーが表示されているか(空文字)
            await userEvent.clear(await nameInputForm);
            expect(screen.getByRole("heading",{name:"※名前を入力して下さい"})).toBeTruthy();
            await userEvent.type(await nameInputForm,"らくすはなこ");
            expect(nameInputForm).toHaveValue("らくすはなこ");
        })
    })

    it("入力フォーム：入力されたデータが反映されているかの確認 ( メールアドレス )　",async () => {
        //propsをセット
        const userInfo: User | null = {
            id: 1,
            name: "らくらくたろう",
            email: "test@test.com",
            zipcode: "1234567",
            address: "東京都新宿区",
            telephone: "090-1234-5678",
            status: 0,
            password: "111111"
        }
        const open: boolean = true;
        const handleClose:() => void = jest.fn();
        const changeUserInfo:() => void = jest.fn();
        render(
            <ShippingDialog open={open} close={handleClose} changeUserInfo={changeUserInfo} userInfo={userInfo}/>
        )
        await act( async () => {
            const emailInputForm = screen.getByRole("textbox",{name:"メールアドレス"});
            //エラーが表示されているか(空文字)
            await userEvent.clear(await emailInputForm);
            await expect(screen.getByRole("heading",{name:"※メールアドレスを入力して下さい"})).toBeTruthy()
            await userEvent.type(await emailInputForm,"rakus@rakus.com");
            await expect(emailInputForm).toHaveValue("rakus@rakus.com");
            //エラーが表示されているか(メール形式ではないものを入力)
            await userEvent.clear(await emailInputForm);
            await userEvent.type(await emailInputForm,"a");
            expect(emailInputForm).toHaveValue("a");
            expect(screen.getByRole("heading",{name:"※正しい形式でメールアドレスを入力して下さい"})).toBeTruthy()
        })
    })

    it("入力フォーム：入力されたデータが反映されているかの確認 ( 郵便番号 : 上3桁 )　",async () => {
        //propsをセット
        const userInfo: User | null = {
            id: 1,
            name: "らくらくたろう",
            email: "test@test.com",
            zipcode: "1234567",
            address: "東京都新宿区",
            telephone: "090-1234-5678",
            status: 0,
            password: "111111"
        }
        const open: boolean = true;
        const handleClose:() => void = jest.fn();
        const changeUserInfo:() => void = jest.fn();
        render(
            <ShippingDialog open={open} close={handleClose} changeUserInfo={changeUserInfo} userInfo={userInfo}/>
        )
        await act( async () => {
            const zipcodeInputForm = screen.getByRole("textbox",{name:"郵便番号( ○○○ )"});
            //エラーが表示されているか（空文字）
            await userEvent.clear(await zipcodeInputForm);
            expect(zipcodeInputForm).toHaveValue("");
            expect(screen.getByRole("heading",{name:"※郵便番号を入力して下さい"})).toBeTruthy()
            //エラーが表示されているか（1桁入力）
            await userEvent.clear(await zipcodeInputForm);
            await userEvent.type(await zipcodeInputForm,"1");
            expect(zipcodeInputForm).toHaveValue("1");
            expect(screen.getByRole("heading",{name:"※3桁で入力して下さい"})).toBeTruthy()
            //エラーが表示されているか（文字入力）
            await userEvent.clear(await zipcodeInputForm);
            await userEvent.type(await zipcodeInputForm,"あ");
            expect(zipcodeInputForm).toHaveValue("あ");
            expect(screen.getByRole("heading",{name:"※半角数字を入力して下さい"})).toBeTruthy()
        })
    })

    it("入力フォーム：入力されたデータが反映されているかの確認 ( 郵便番号 : 上4桁 )　",async () => {
        //propsをセット
        const userInfo: User | null = {
            id: 1,
            name: "らくらくたろう",
            email: "test@test.com",
            zipcode: "1234567",
            address: "東京都新宿区",
            telephone: "090-1234-5678",
            status: 0,
            password: "111111"
        }
        const open: boolean = true;
        const handleClose:() => void = jest.fn();
        const changeUserInfo:() => void = jest.fn();
        render(
            <ShippingDialog open={open} close={handleClose} changeUserInfo={changeUserInfo} userInfo={userInfo}/>
        )
        await act( async () => {
            const zipcodeInputForm = screen.getByRole("textbox",{name:"郵便番号( ○○○○ )"});
            //エラーが表示されているか（空文字）
            await userEvent.clear(await zipcodeInputForm);
            expect(zipcodeInputForm).toHaveValue("");
            expect(screen.getByRole("heading",{name:"※郵便番号を入力して下さい"})).toBeTruthy()
            //エラーが表示されているか（1桁入力）
            await userEvent.clear(await zipcodeInputForm);
            await userEvent.type(await zipcodeInputForm,"1");
            expect(zipcodeInputForm).toHaveValue("1");
            expect(screen.getByRole("heading",{name:"※4桁で入力して下さい"})).toBeTruthy()
            //エラーが表示されているか（文字入力）
            await userEvent.clear(await zipcodeInputForm);
            await userEvent.type(await zipcodeInputForm,"あ");
            expect(zipcodeInputForm).toHaveValue("あ");
            expect(screen.getByRole("heading",{name:"※半角数字を入力して下さい"})).toBeTruthy()
        })
    })

    it("入力フォーム：入力されたデータが反映されているかの確認 ( 住所 )　",async () => {
        //propsをセット
        const userInfo: User | null = {
            id: 1,
            name: "らくらくたろう",
            email: "test@test.com",
            zipcode: "1234567",
            address: "東京都新宿区",
            telephone: "090-1234-5678",
            status: 0,
            password: "111111"
        }
        const open: boolean = true;
        const handleClose:() => void = jest.fn();
        const changeUserInfo:() => void = jest.fn();
        render(
            <ShippingDialog open={open} close={handleClose} changeUserInfo={changeUserInfo} userInfo={userInfo}/>
        )
        await act( async () => {
            const addressInputForm = screen.getByRole("textbox",{name:"住所"});
            //エラーが表示されているか(空文字)
            await userEvent.clear(await addressInputForm);
            expect(addressInputForm).toHaveValue("");
            expect(screen.getByRole("heading",{name:"※住所を入力して下さい"})).toBeTruthy()
            await userEvent.clear(await addressInputForm);
            expect(addressInputForm).toHaveValue("");
            const text = "東京都新宿区"
            await userEvent.type(await addressInputForm, text.repeat(34));//計204文字
            expect(addressInputForm).toHaveValue(text.repeat(34));//計204文字
            expect(screen.getByRole("heading",{name:"※200字以内で入力して下さい"})).toBeTruthy()
        })
    })

    it("入力フォーム：入力されたデータが反映されているかの確認 ( 電話番号: 最初 )　",async () => {
        //propsをセット
        const userInfo: User | null = {
            id: 1,
            name: "らくらくたろう",
            email: "test@test.com",
            zipcode: "1234567",
            address: "東京都新宿区",
            telephone: "090-1234-5678",
            status: 0,
            password: "111111"
        }
        const open: boolean = true;
        const handleClose:() => void = jest.fn();
        const changeUserInfo:() => void = jest.fn();
        render(
            <ShippingDialog open={open} close={handleClose} changeUserInfo={changeUserInfo} userInfo={userInfo}/>
        )
        await act( async () => {
            const telephoneInputForm = screen.getAllByRole("textbox",{name:"電話番号"})[0];
            //エラーが表示されているか
            await userEvent.clear(await telephoneInputForm);
            expect(telephoneInputForm).toHaveValue("");
            expect(screen.getByRole("heading",{name:"※電話番号を入力して下さい"})).toBeTruthy()
            //エラーが表示されているか（文字入力）
            await userEvent.clear(await telephoneInputForm);
            await userEvent.type(await telephoneInputForm,"あ");
            expect(telephoneInputForm).toHaveValue("あ");
            expect(screen.getByRole("heading",{name:"※半角数字を入力して下さい"})).toBeTruthy()
            //エラーが表示されているか（数字1桁入力）
            await userEvent.clear(await telephoneInputForm);
            await userEvent.type(await telephoneInputForm,"1");
            expect(telephoneInputForm).toHaveValue("1");
            expect(screen.getByRole("heading",{name:"※2桁以上4桁以内で入力して下さい"})).toBeTruthy()
        })
    })

    it("入力フォーム：入力されたデータが反映されているかの確認 ( 電話番号: 中 )　",async () => {
        //propsをセット
        const userInfo: User | null = {
            id: 1,
            name: "らくらくたろう",
            email: "test@test.com",
            zipcode: "1234567",
            address: "東京都新宿区",
            telephone: "090-1234-5678",
            status: 0,
            password: "111111"
        }
        const open: boolean = true;
        const handleClose:() => void = jest.fn();
        const changeUserInfo:() => void = jest.fn();
        render(
            <ShippingDialog open={open} close={handleClose} changeUserInfo={changeUserInfo} userInfo={userInfo}/>
        )
        await act( async () => {
            const telephoneInputForm = screen.getAllByRole("textbox",{name:"電話番号"})[1];
            //エラーが表示されているか
            await userEvent.clear(await telephoneInputForm);
            expect(telephoneInputForm).toHaveValue("");
            expect(screen.getAllByRole("heading",{name:"※電話番号を入力して下さい"})).toBeTruthy()
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

    it("入力フォーム：入力されたデータが反映されているかの確認 ( 電話番号: 最後 )　",async () => {
        //propsをセット
        const userInfo: User | null = {
            id: 1,
            name: "らくらくたろう",
            email: "test@test.com",
            zipcode: "1234567",
            address: "東京都新宿区",
            telephone: "090-1234-5678",
            status: 0,
            password: "111111"
        }
        const open: boolean = true;
        const handleClose:() => void = jest.fn();
        const changeUserInfo:() => void = jest.fn();
        render(
            <ShippingDialog open={open} close={handleClose} changeUserInfo={changeUserInfo} userInfo={userInfo}/>
        )
        await act( async () => {
            const telephoneInputForm = screen.getAllByRole("textbox",{name:"電話番号"})[2];
            //エラーが表示されているか
            await userEvent.clear(await telephoneInputForm);
            expect(telephoneInputForm).toHaveValue("");
            expect(screen.getAllByRole("heading",{name:"※電話番号を入力して下さい"})).toBeTruthy()
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

})


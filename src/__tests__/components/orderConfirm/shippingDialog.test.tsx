import {act, cleanup, render, screen} from "@testing-library/react";
import ShippingDialog from "~/components/orderConfirm/ShippingDialog";
import {User} from "~/types/interfaces";
import userEvent from "@testing-library/user-event";
import React from "react";

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

afterEach(() => {
    cleanup();
})

describe("ShippingDialog Component Test" , () => {

    it("レンダリングテスト",  async () => {
        render(
            <ShippingDialog open={open} close={handleClose} changeUserInfo={changeUserInfo} userInfo={userInfo}/>
        )
        await expect(screen.getByRole("heading",{name: "お届け先情報"})).toBeTruthy();
    },100000);

    it("propsが正常に渡されているか",  async () => {
        render(
            <ShippingDialog open={open} close={handleClose} changeUserInfo={changeUserInfo} userInfo={userInfo}/>
        )
        await expect(screen.getAllByRole("textbox")[0]).toHaveValue("らくらくたろう")
        await expect(screen.getAllByRole("textbox")[1]).toHaveValue("test@test.com")
        await expect(screen.getAllByRole("textbox")[2]).toHaveValue("123")
        await expect(screen.getAllByRole("textbox")[3]).toHaveValue("4567")
        await expect(screen.getAllByRole("textbox")[4]).toHaveValue("東京都新宿区")
        await expect(screen.getAllByRole("textbox")[5]).toHaveValue("090")
        await expect(screen.getAllByRole("textbox")[6]).toHaveValue("1234")
        await expect(screen.getAllByRole("textbox")[7]).toHaveValue("5678")
    },100000);

    //--------------------登録画面のテストと同様に入力の反映を確認------------------------------------------

    it("入力フォーム：入力されたデータが反映されているかの確認 ( 名前 )　",async () => {
        render(
            <ShippingDialog open={open} close={handleClose} changeUserInfo={changeUserInfo} userInfo={userInfo}/>
        )
        await act( async () => {
            const nameInputForm = screen.getByRole("textbox",{name:"名前"});

            //エラーが表示されているか(空文字)
            await userEvent.type(await nameInputForm,"{backspace}{backspace}{backspace}{backspace}{backspace}{backspace}{backspace}");
            expect(screen.getByRole("heading",{name:"※名前を入力して下さい"})).toBeTruthy();
            await userEvent.type(await nameInputForm,"らくすはなこ");
            expect(nameInputForm).toHaveValue("らくすはなこ");
        })
    },100000)

    it("入力フォーム：入力されたデータが反映されているかの確認 ( メールアドレス )　",async () => {
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
            await userEvent.type(await emailInputForm,"{backspace}{backspace}{backspace}");
            expect(emailInputForm).toHaveValue("rakus@rakus.");
            expect(screen.getByRole("heading",{name:"※正しい形式でメールアドレスを入力して下さい"})).toBeTruthy()
        })
    },100000)

    it("入力フォーム：入力されたデータが反映されているかの確認 ( 郵便番号 : 上3桁 )　",async () => {
        render(
            <ShippingDialog open={open} close={handleClose} changeUserInfo={changeUserInfo} userInfo={userInfo}/>
        )
        await act( async () => {
            const zipcodeInputForm = screen.getByRole("textbox",{name:"郵便番号( ○○○ )"});
            //エラーが表示されているか（1桁削除）
            await userEvent.type(await zipcodeInputForm,"{backspace}");
            expect(zipcodeInputForm).toHaveValue("12");
            expect(screen.getByRole("heading",{name:"※3桁で入力して下さい"})).toBeTruthy()

            //エラーが表示されているか（空文字）
            await userEvent.type(await zipcodeInputForm,"{backspace}{backspace}");
            expect(zipcodeInputForm).toHaveValue("");
            expect(screen.getByRole("heading",{name:"※郵便番号を入力して下さい"})).toBeTruthy()

            //エラーが表示されているか（文字入力）
            await userEvent.type(await zipcodeInputForm,"あ");
            expect(zipcodeInputForm).toHaveValue("あ");
            expect(screen.getByRole("heading",{name:"※半角数字を入力して下さい"})).toBeTruthy()

            //エラーが表示されているか（文字と数字共存）
            await userEvent.type(await zipcodeInputForm,"1");
            expect(zipcodeInputForm).toHaveValue("あ1");
            expect(screen.getByRole("heading",{name:"※半角数字を入力して下さい"})).toBeTruthy()
        })
    },100000)

    it("入力フォーム：入力されたデータが反映されているかの確認 ( 郵便番号 : 上4桁 )　",async () => {
        render(
            <ShippingDialog open={open} close={handleClose} changeUserInfo={changeUserInfo} userInfo={userInfo}/>
        )
        await act( async () => {
            const zipcodeInputForm = screen.getByRole("textbox",{name:"郵便番号( ○○○○ )"});

            //エラーが表示されているか（1桁削除）
            await userEvent.type(await zipcodeInputForm,"{backspace}");
            expect(zipcodeInputForm).toHaveValue("456");
            expect(screen.getByRole("heading",{name:"※4桁で入力して下さい"})).toBeTruthy()

            //エラーが表示されているか（空文字）
            await userEvent.type(await zipcodeInputForm,"{backspace}{backspace}{backspace}");
            expect(zipcodeInputForm).toHaveValue("");
            expect(screen.getByRole("heading",{name:"※郵便番号を入力して下さい"})).toBeTruthy()

            //エラーが表示されているか（文字入力）
            await userEvent.type(await zipcodeInputForm,"あ");
            expect(zipcodeInputForm).toHaveValue("あ");
            expect(screen.getByRole("heading",{name:"※半角数字を入力して下さい"})).toBeTruthy()

            //エラーが表示されているか（文字と数字共存）
            await userEvent.type(await zipcodeInputForm,"1");
            expect(zipcodeInputForm).toHaveValue("あ1");
            expect(screen.getByRole("heading",{name:"※半角数字を入力して下さい"})).toBeTruthy()
        })
    },100000)

    it("入力フォーム：入力されたデータが反映されているかの確認 ( 住所 )　",async () => {
        render(
            <ShippingDialog open={open} close={handleClose} changeUserInfo={changeUserInfo} userInfo={userInfo}/>
        )
        await act( async () => {
            const addressInputForm = screen.getByRole("textbox",{name:"住所"});

            //エラーが表示されているか(空文字)
            await userEvent.type(await addressInputForm,"{backspace}{backspace}{backspace}{backspace}{backspace}{backspace}");
            expect(addressInputForm).toHaveValue("");
            expect(screen.getByRole("heading",{name:"※住所を入力して下さい"})).toBeTruthy()

            //200文字以上を入力
            await userEvent.clear(await addressInputForm);
            expect(addressInputForm).toHaveValue("");
            const text = "東京都新宿区"
            await userEvent.type(await addressInputForm, text.repeat(34));//計204文字
            expect(addressInputForm).toHaveValue(text.repeat(34));//計204文字
            expect(screen.getByRole("heading",{name:"※200字以内で入力して下さい"})).toBeTruthy()
        })
    },100000)

    it("入力フォーム：入力されたデータが反映されているかの確認 ( 電話番号: 最初 )　",async () => {
        render(
            <ShippingDialog open={open} close={handleClose} changeUserInfo={changeUserInfo} userInfo={userInfo}/>
        )
        await act( async () => {
            const telephoneInputForm = screen.getAllByRole("textbox",{name:"電話番号"})[0];

            //エラーが表示されているか
            await userEvent.type(await telephoneInputForm,"{backspace}{backspace}{backspace}");
            expect(telephoneInputForm).toHaveValue("");
            expect(screen.getByRole("heading",{name:"※電話番号を入力して下さい"})).toBeTruthy()

            //エラーが表示されているか（文字入力）
            await userEvent.type(await telephoneInputForm,"あ");
            expect(telephoneInputForm).toHaveValue("あ");
            expect(screen.getByRole("heading",{name:"※半角数字を入力して下さい"})).toBeTruthy()

            //エラーが表示されているか（文字と数字共存）
            await userEvent.type(await telephoneInputForm,"1");
            expect(telephoneInputForm).toHaveValue("あ1");
            expect(screen.getByRole("heading",{name:"※半角数字を入力して下さい"})).toBeTruthy()

            //エラーが表示されているか（数字1桁入力）
            await userEvent.clear(await telephoneInputForm);//入力フォームをリセット
            await userEvent.type(await telephoneInputForm,"1");
            expect(telephoneInputForm).toHaveValue("1");
            expect(screen.getByRole("heading",{name:"※2桁以上4桁以内で入力して下さい"})).toBeTruthy()

            //5桁入力
            await userEvent.type(await telephoneInputForm,"1111");
            expect(telephoneInputForm).toHaveValue("11111");
            expect(screen.getByRole("heading",{name:"※2桁以上4桁以内で入力して下さい"})).toBeTruthy()
        })
    },100000)

    it("入力フォーム：入力されたデータが反映されているかの確認 ( 電話番号: 中 )　",async () => {
        render(
            <ShippingDialog open={open} close={handleClose} changeUserInfo={changeUserInfo} userInfo={userInfo}/>
        )
        await act( async () => {
            const telephoneInputForm = screen.getAllByRole("textbox",{name:"電話番号"})[1];

            //エラーが表示されているか
            await userEvent.type(await telephoneInputForm,"{backspace}{backspace}{backspace}{backspace}");
            expect(telephoneInputForm).toHaveValue("");
            expect(screen.getByRole("heading",{name:"※電話番号を入力して下さい"})).toBeTruthy()

            //エラーが表示されているか（文字入力）
            await userEvent.type(await telephoneInputForm,"あ");
            expect(telephoneInputForm).toHaveValue("あ");
            expect(screen.getByRole("heading",{name:"※半角数字を入力して下さい"})).toBeTruthy()

            //エラーが表示されているか（文字と数字共存）
            await userEvent.type(await telephoneInputForm,"1");
            expect(telephoneInputForm).toHaveValue("あ1");
            expect(screen.getByRole("heading",{name:"※半角数字を入力して下さい"})).toBeTruthy()

            //エラーが表示されているか（数字1桁入力）
            await userEvent.clear(await telephoneInputForm);//入力フォームをリセット
            await userEvent.type(await telephoneInputForm,"1");
            expect(telephoneInputForm).toHaveValue("1");
            expect(screen.getByRole("heading",{name:"※4桁で入力して下さい"})).toBeTruthy()

            //5桁入力
            await userEvent.type(await telephoneInputForm,"1111");
            expect(telephoneInputForm).toHaveValue("11111");
            expect(screen.getByRole("heading",{name:"※4桁で入力して下さい"})).toBeTruthy()
        })
    },100000)

    it("入力フォーム：入力されたデータが反映されているかの確認 ( 電話番号: 最後 )　",async () => {
        render(
            <ShippingDialog open={open} close={handleClose} changeUserInfo={changeUserInfo} userInfo={userInfo}/>
        )
        await act( async () => {
            const telephoneInputForm = screen.getAllByRole("textbox",{name:"電話番号"})[1];

            //エラーが表示されているか
            await userEvent.type(await telephoneInputForm,"{backspace}{backspace}{backspace}{backspace}");
            expect(telephoneInputForm).toHaveValue("");
            expect(screen.getByRole("heading",{name:"※電話番号を入力して下さい"})).toBeTruthy()

            //エラーが表示されているか（文字入力）
            await userEvent.type(await telephoneInputForm,"あ");
            expect(telephoneInputForm).toHaveValue("あ");
            expect(screen.getByRole("heading",{name:"※半角数字を入力して下さい"})).toBeTruthy()

            //エラーが表示されているか（文字と数字共存）
            await userEvent.type(await telephoneInputForm,"1");
            expect(telephoneInputForm).toHaveValue("あ1");
            expect(screen.getByRole("heading",{name:"※半角数字を入力して下さい"})).toBeTruthy()

            //エラーが表示されているか（数字1桁入力）
            await userEvent.clear(await telephoneInputForm);//入力フォームをリセット
            await userEvent.type(await telephoneInputForm,"1");
            expect(telephoneInputForm).toHaveValue("1");
            expect(screen.getByRole("heading",{name:"※4桁で入力して下さい"})).toBeTruthy()

            //5桁入力
            await userEvent.type(await telephoneInputForm,"1111");
            expect(telephoneInputForm).toHaveValue("11111");
            expect(screen.getByRole("heading",{name:"※4桁で入力して下さい"})).toBeTruthy()
        })
    },100000)

})


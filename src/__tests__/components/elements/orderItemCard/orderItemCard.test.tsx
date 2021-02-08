import { cleanup, render, screen} from "@testing-library/react";
import OrderItemCard from "~/components/elements/orderItemCard/OrderItemCard";
import {BrowserRouter} from "react-router-dom";
import React from "react";

//propsをセット
const orderItem = {
    id: 1,
    item: {
        id: 3,
        name: "めちゃマヨミート",
        description: "あらびきスライスソーセージとイタリアンソーセージの2種類のソーセージを…",
        priceM: 800,
        priceL: 900,
        imagePath: "http://34.84.118.239/static/img/item/13.jpg",
        deleted: 0
    },
    orderToppings: [
        {
            id: 3,
            topping: {
                id: 7,
                name: "エビ",
                priceM: 200,
                priceL: 300
            },
            orderItemId: 3
        },
        {
            id: 4,
            topping: {
                id: 6,
                name: "ベーコン",
                priceM: 200,
                priceL: 300
            },
            orderItemId: 3
        },
    ],
    quantity: 2,
    size: "M",
    subTotalPrice: 2000
}

afterEach(() => {
    cleanup();
})

describe( "OrderItemCard Component Test",  () => {

    it("レンダリングテスト", async () => {
        render(
            <BrowserRouter>
                <OrderItemCard orderItem={orderItem}/>
            </BrowserRouter>
        )
        await expect(screen.getAllByRole("button")[0]).toBeTruthy();
    })

    it("Propsが正常に渡されているか", async () => {
        render(
            <BrowserRouter>
                <OrderItemCard orderItem={orderItem}/>
            </BrowserRouter>
        )
        await expect(screen.getAllByRole("heading")[0]).toHaveTextContent("めちゃマヨミート");
        await expect(screen.getAllByRole("heading")[1]).toHaveTextContent("価格 : 800円");
        await expect(screen.getAllByRole("heading")[2]).toHaveTextContent("サイズ : M");
        await expect(screen.getAllByRole("heading")[3]).toHaveTextContent("数量 : 2個");
        await expect(screen.getAllByRole("heading")[4]).toHaveTextContent("エビ");
        await expect(screen.getAllByRole("heading")[5]).toHaveTextContent("ベーコン");
        await expect(screen.getAllByRole("heading")[6]).toHaveTextContent("2,000円");
    })
})
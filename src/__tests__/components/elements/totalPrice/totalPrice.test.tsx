import {cleanup, render, screen} from "@testing-library/react";
import TotalPrice from "~/components/elements/totalPrice/totalPrice";


afterEach(() => {
    cleanup();
})

describe("TotalPrice Component Test", () => {

    it("Rendering Test", async () =>{
        //propsをセット
        const subTotalPrice = 10000;
        render(
            <TotalPrice subTotalPrice={subTotalPrice}/>
        )
        await expect(screen.getAllByRole("heading")[0]).toBeTruthy()
    })

    it("SubTotalPrice Test", async () =>{
        //propsをセット
        const subTotalPrice = 10000;
        render(
            <TotalPrice subTotalPrice={subTotalPrice}/>
        )
        await expect(screen.getAllByRole("heading")[0]).toHaveTextContent("小計: 10,000 円")
    })

    it("ConsumptionTax Test", async () =>{
        //propsをセット
        const subTotalPrice = 10000;
        render(
            <TotalPrice subTotalPrice={subTotalPrice}/>
        )
        await expect(screen.getAllByRole("heading")[1]).toHaveTextContent("消費税: 1,000 円")
    })

    it("TotalPrice Test", async () =>{
        //propsをセット
        const subTotalPrice = 10000;
        render(
            <TotalPrice subTotalPrice={subTotalPrice}/>
        )
        await expect(screen.getAllByRole("heading")[2]).toHaveTextContent("合計金額: 11,000 円")
    })
})
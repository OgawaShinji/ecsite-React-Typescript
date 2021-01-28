import React from "react"
import '@testing-library/jest-dom/extend-expect'
import {render,screen} from "@testing-library/react"
import ItemDetail from "~/components/itemDetail"
import store from "~/store";
import {Provider} from "react-redux";

describe('<ItemDetail>', () => {
    test("商品詳細のレンダリング", () => {
        render(<Provider store={store}><ItemDetail/></Provider>)
        screen.debug();
        expect(true).toBe(true);

    })
})

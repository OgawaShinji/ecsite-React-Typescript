import {FC} from "react";
import CartList from "./CartList"
import Header from "~/components/elements/Header"

const Cart: FC = () => {
    return (
        <>
            <Header/>
            <CartList/>
        </>
    )
}
export default Cart;